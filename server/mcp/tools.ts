import { generateBlueprint } from '../../src/lib/recommendationEngine.js';
import { calculateCommercialDscr } from '../../src/lib/capitalMath.js';
import { recommendCapitalStack } from '../../src/lib/capitalStack.js';
import { evaluateCapitalRoutes } from '../../src/lib/capitalRouting.js';
import { normalizeFundingIntent, getFundingIntentMissingFields } from '../../src/lib/fundingIntent.js';
import { findFundingOptions } from '../../src/lib/fundingOptions.js';
import { checkFundingReadiness } from '../../src/lib/fundingReadiness.js';
import { buildCapitalCase } from '../../src/lib/capitalCase.js';
import { getFundingDocumentChecklist } from '../../src/lib/fundingDocuments.js';
import { findVerifiedProviderCandidates } from '../../src/config/fundingProviders.js';
import { TOOLS_CATALOG } from '../../src/config/tools.js';
import { findFundingResourceAssets, RESOURCE_ASSET_SOURCE_STATUS } from '../../src/config/resourceAssets.js';
import { WORKFLOW_STAGES } from '../../src/config/workflowStages.js';
import { authenticateHeaders } from '../auth/authService.js';
import { AuthenticationError } from '../auth/types.js';
import { createDealFromIntent, DealDomainError, getDeal } from '../deals/service.js';
import { getNextFundingActionForDeal } from '../deals/status.js';
import { getPersistenceCapability } from '../persistence/index.js';
import { PersistenceUnavailableError } from '../persistence/types.js';
import { compareOffers, getTransactionStatus, prepareFundingHandoff, TransactionDomainError } from '../transactions/service.js';
import type { AssessmentAnswers } from '../../src/types.js';
import type { BuyBoxMatchRequest } from '../../src/types/api.js';
import type { FundingIntentInput } from '../../src/types/funding.js';
import type { McpExecutionContext, McpToolDefinition, McpToolResult } from './types.js';

const FUNDING_INTENT_PROPERTIES = {
  objective:{type:'string'},
  requestedAmount:{type:'number',exclusiveMinimum:0},
  useOfFunds:{type:'string'},
  fundingPurpose:{type:'string'},
  vertical:{type:'string'},
  urgency:{type:'string'},
  location:{type:'string'},
  collateralAvailable:{type:'boolean'},
  source:{type:'string'},
  attribution:{type:'object'},
  businessProfile:{type:'object'},
  assetContext:{type:'object'},
  receivableContext:{type:'object'},
  contractContext:{type:'object'},
  acquisitionContext:{type:'object'},
  realEstateContext:{type:'object'},
  currentDebtContext:{type:'object'}
};

export const MCP_TOOLS: McpToolDefinition[] = [
  {
    name:'start_funding_request',
    description:'GET FUNDED: normalize a plain-language funding objective into a non-persistent FundingIntent, identify missing fields, and return the next practical action.',
    inputSchema:{type:'object',properties:FUNDING_INTENT_PROPERTIES}
  },
  {
    name:'create_deal',
    description:'GET FUNDED: authenticated state-creating tool that persists a normalized FundingIntent and creates a workspace-scoped Deal when a persistence adapter is available.',
    inputSchema:{type:'object',properties:{intent:{type:'object'},...FUNDING_INTENT_PROPERTIES}}
  },
  {
    name:'check_funding_readiness',
    description:'PREPARE: identify missing information, document preparation items, capital-case readiness, and routing readiness. This is not a funding probability score.',
    inputSchema:{type:'object',properties:FUNDING_INTENT_PROPERTIES}
  },
  {
    name:'build_capital_case',
    description:'PREPARE: build a structured, source-traceable capital case from supplied facts and deterministic metrics. Missing facts are never invented.',
    inputSchema:{type:'object',properties:FUNDING_INTENT_PROPERTIES}
  },
  {
    name:'get_funding_document_checklist',
    description:'PREPARE: return a purpose/vertical-specific preparation checklist and distinguish canonical preparation guidance from provider-specific requirements.',
    inputSchema:{type:'object',properties:FUNDING_INTENT_PROPERTIES}
  },
  {
    name:'find_funding_options',
    description:'FIND CAPITAL: return ranked funding outcomes, families, products, verified provider candidates, qualification gaps, documents, live support resources, handoff route, and next action. Never implies approval or eligibility.',
    inputSchema:{type:'object',properties:FUNDING_INTENT_PROPERTIES}
  },
  {
    name:'find_capital_providers',
    description:'FIND CAPITAL: search canonical verified provider/product criteria using product-path filters or a funding request. Returns explainable relevance, qualification gaps, provenance, and handoff routes without implying approval.',
    inputSchema:{type:'object',properties:{productPathIds:{type:'array',items:{type:'string'},minItems:1},...FUNDING_INTENT_PROPERTIES}}
  },
  {
    name:'get_next_funding_action',
    description:'TRACK: authenticated read-only tool that returns the blocking item, responsible party, human checkpoint, and next action for a workspace-scoped deal.',
    inputSchema:{type:'object',required:['dealId'],properties:{dealId:{type:'string',minLength:1}}}
  },
  {
    name:'get_funding_status',
    description:'TRACK: authenticated read-only funding status for a workspace-scoped deal. Transaction subsystems not yet persisted are explicitly marked SPECIFIED.',
    inputSchema:{type:'object',required:['dealId'],properties:{dealId:{type:'string',minLength:1}}}
  },
  {
    name:'compare_received_offers',
    description:'COMPARE: authenticated read-only comparison of ACTUAL stored received terms. Missing terms remain missing and no winning offer is selected.',
    inputSchema:{type:'object',required:['dealId'],properties:{dealId:{type:'string',minLength:1}}}
  },
  {
    name:'initiate_funding_handoff',
    description:'APPLY / HANDOFF: prepare the canonical funding-intake handoff and preserve deal context. This tool does not transmit externally; external action requires explicit human authorization.',
    inputSchema:{type:'object',required:['dealId'],properties:{dealId:{type:'string',minLength:1}}}
  },
  {
    name:'recommend_funding_support_tools',
    description:'OPERATE: recommend canonical live support tools in the context of a funding request or workflow stage without making a capital decision.',
    inputSchema:{type:'object',properties:{stage:{type:'integer',minimum:1,maximum:8},tag:{type:'string'},includeConcepts:{type:'boolean'},limit:{type:'integer',minimum:1,maximum:10},...FUNDING_INTENT_PROPERTIES}}
  },

  { name:'generate_capital_blueprint', description:'Generate a deterministic Capital Operator blueprint from canonical assessment answers.', inputSchema:{type:'object',required:['answers'],properties:{answers:{type:'object'}}} },
  { name:'calculate_commercial_dscr', description:'Calculate DSCR deterministically as NOI divided by annual debt service.', inputSchema:{type:'object',required:['netOperatingIncome','annualDebtService'],properties:{netOperatingIncome:{type:'number'},annualDebtService:{type:'number',exclusiveMinimum:0}}} },
  { name:'recommend_capital_stack', description:'Generate non-binding capital-structure planning categories for human review.', inputSchema:{type:'object',required:['requestedAmount'],properties:{requestedAmount:{type:'number',exclusiveMinimum:0},useOfFunds:{type:'string'},collateralAvailable:{type:'boolean'},recurringWorkingCapitalNeed:{type:'boolean'},receivablesDriven:{type:'boolean'},realEstateRelated:{type:'boolean'},preserveLiquidity:{type:'boolean'}}} },
  { name:'query_capital_tools', description:'Query the canonical source-controlled Capital Operator tools registry.', inputSchema:{type:'object',properties:{workflowStage:{type:'integer',minimum:1,maximum:8},category:{type:'string'},tag:{type:'string'},limit:{type:'integer',minimum:1,maximum:25}}} },
  { name:'explain_operating_stage', description:'Return the canonical definition for one of the eight Capital Operator workflow stages.', inputSchema:{type:'object',required:['stage'],properties:{stage:{type:'integer',minimum:1,maximum:8}}} },
  { name:'match_capital_routes', description:'SANDBOX informational capital-route classification. Never represents lender eligibility, approval, pricing, or availability.', inputSchema:{type:'object',required:['annual_revenue','avg_monthly_deposits','time_in_business_months','requested_amount'],properties:{annual_revenue:{type:'number',minimum:0},avg_monthly_deposits:{type:'number',minimum:0},time_in_business_months:{type:'integer',minimum:0},requested_amount:{type:'number',exclusiveMinimum:0},credit_score:{type:'number'},industry:{type:'string'},collateral_available:{type:'boolean'},use_of_funds:{type:'string'},has_tax_liens:{type:'boolean'},has_bankruptcy:{type:'boolean'}}} }
];

function result(data: Record<string, unknown>): McpToolResult {
  return {content:[{type:'text',text:JSON.stringify(data)}],structuredContent:data};
}

function operationalError(error: unknown): McpToolResult {
  const known =
    error instanceof AuthenticationError ||
    error instanceof PersistenceUnavailableError ||
    error instanceof DealDomainError ||
    error instanceof TransactionDomainError;
  const code = known && 'code' in error ? String(error.code) : 'TOOL_EXECUTION_FAILED';
  const message = error instanceof Error ? error.message : 'MCP tool execution failed.';
  const payload = {status:'error',code,message};
  return {
    content:[{type:'text',text:JSON.stringify(payload)}],
    structuredContent:payload,
    isError:true
  };
}

function intentFrom(args: Record<string, any>) {
  const source = args.intent && typeof args.intent === 'object' ? args.intent : args;
  return normalizeFundingIntent(source as FundingIntentInput);
}

export async function callMcpTool(
  name: string,
  args: Record<string, any>,
  context: McpExecutionContext={}
): Promise<McpToolResult> {
  try {
    switch(name) {
      case 'start_funding_request': {
        const intent=intentFrom(args);
        const missing=getFundingIntentMissingFields(intent);
        const options=findFundingOptions(intent);
        return result({
          status:'LIVE',
          capability_group:'GET FUNDED',
          intent,
          missing_fields:missing,
          relevant_capital_categories:options.categoryFits,
          recommended_next_action:missing.length
            ? 'Collect the missing information.'
            : 'Check readiness, build the capital case, then route with human review.',
          persistence:'NON_PERSISTENT',
          human_review_required:true
        });
      }
      case 'create_deal': {
        const session=authenticateHeaders(context.headers || {});
        const intent=intentFrom(args);
        const deal=await createDealFromIntent(session,intent);
        return result({
          status:getPersistenceCapability().status,
          capability_group:'GET FUNDED',
          deal,
          funding_intent_persistence:'PERSISTED',
          workspace_id:session.workspaceId,
          human_review_required:true
        });
      }
      case 'check_funding_readiness': {
        const intent=intentFrom(args);
        return result({capability_group:'PREPARE',intent,readiness:checkFundingReadiness(intent)});
      }
      case 'build_capital_case': {
        const intent=intentFrom(args);
        return result({capability_group:'PREPARE',intent,capital_case:buildCapitalCase(intent)});
      }
      case 'get_funding_document_checklist': {
        const intent=intentFrom(args);
        return result({capability_group:'PREPARE',intent,document_checklist:getFundingDocumentChecklist(intent)});
      }
      case 'find_funding_options': {
        const intent=intentFrom(args);
        return result({capability_group:'FIND CAPITAL',...findFundingOptions(intent)});
      }
      case 'find_capital_providers': {
        const suppliedIds=Array.isArray(args.productPathIds)?args.productPathIds.map(String):[];
        if(suppliedIds.length){
          const providers=findVerifiedProviderCandidates(suppliedIds);
          return result({
            status:providers.length?'BETA':'SPECIFIED',
            capability_group:'FIND CAPITAL',
            provider_discovery_status:providers.length?'VERIFIED_RESULTS':'NO_VERIFIED_PROVIDER_DATA',
            providers,
            disclaimer:'Only provider records with verified criteria provenance are returned. No provider availability or eligibility is implied.',
            human_review_required:true
          });
        }
        const intent=intentFrom(args);
        const discovery=findFundingOptions(intent);
        return result({
          status:discovery.providerCandidates.length?'BETA':'SPECIFIED',
          capability_group:'FIND CAPITAL',
          intent,
          provider_discovery_status:discovery.providerDiscoveryStatus,
          providers:discovery.providerCandidates,
          related_products:discovery.productMatches.slice(0,10),
          missing_information:discovery.missingInformation,
          handoff:discovery.handoff,
          disclaimer:discovery.disclaimer,
          human_review_required:true
        });
      }
      case 'get_next_funding_action': {
        const session=authenticateHeaders(context.headers || {});
        const tx=await getTransactionStatus(session,String(args.dealId || ''));
        return result({
          status:getPersistenceCapability().status,
          capability_group:'TRACK',
          deal_id:tx.deal.id,
          discovery:tx.discovery,
          next_action:getNextFundingActionForDeal(tx.deal,{
            missingInformationCount:tx.discovery?.missingInformation.length,
            requiredDocumentCount:tx.discovery?.documentChecklist.items.filter(item=>item.required).length,
            providerCandidateCount:tx.discovery?.providerCandidates.length,
            routingDecisionCount:tx.routing.length,
            submissionCount:tx.submissions.length,
            offerCount:tx.offers.length,
            outstandingConditionCount:tx.outstandingConditions.length
          }),
          supporting_actions:tx.discovery?.missingInformation.slice(0,3).map(item=>item.reason)||[],
          human_review_required:true
        });
      }
      case 'get_funding_status': {
        const session=authenticateHeaders(context.headers || {});
        const tx=await getTransactionStatus(session,String(args.dealId || ''));
        return result({
          status:getPersistenceCapability().status,
          capability_group:'TRACK',
          deal_stage:tx.deal.status,
          workflow_stage:tx.deal.workflowStage,
          funding_intent:tx.intent,
          discovery:tx.discovery,
          capital_case:tx.capitalCase,
          documents:tx.documents,
          routing_review:tx.routing,
          submissions:tx.submissions,
          outstanding_conditions:tx.outstandingConditions,
          offers_received:tx.offers,
          relationship:tx.relationship,
          attribution:tx.attribution,
          next_action:getNextFundingActionForDeal(tx.deal,{
            missingInformationCount:tx.discovery?.missingInformation.length,
            requiredDocumentCount:tx.discovery?.documentChecklist.items.filter(item=>item.required).length,
            providerCandidateCount:tx.discovery?.providerCandidates.length,
            routingDecisionCount:tx.routing.length,
            submissionCount:tx.submissions.length,
            offerCount:tx.offers.length,
            outstandingConditionCount:tx.outstandingConditions.length
          }),
          human_review_required:true
        });
      }
      case 'compare_received_offers': {
        const session=authenticateHeaders(context.headers || {});
        return result({
          capability_group:'COMPARE',
          ...(await compareOffers(session,String(args.dealId || '')))
        });
      }
      case 'initiate_funding_handoff': {
        const session=authenticateHeaders(context.headers || {});
        return result({
          capability_group:'APPLY / HANDOFF',
          ...(await prepareFundingHandoff(session,String(args.dealId || '')))
        });
      }
      case 'recommend_funding_support_tools': {
        const limit=Math.min(Number(args.limit)||5,10);
        const stage=Number(args.stage)||undefined;
        const tag=String(args.tag||'').toLowerCase();
        const tools=TOOLS_CATALOG.filter(tool =>
          (!stage || tool.workflowStage===stage) &&
          (!tag || tool.tags.some(item=>item.toLowerCase().includes(tag)) || tool.category.toLowerCase().includes(tag))
        ).slice(0,limit);
        const hasFundingContext=Boolean(args.objective||args.fundingPurpose||args.vertical||args.requestedAmount);
        const contextual=hasFundingContext?findFundingOptions(intentFrom(args)).supportResources:[];
        const resourceAssets=contextual.length
          ? contextual.slice(0,limit)
          : findFundingResourceAssets({query:tag||undefined,status:args.includeConcepts===true?'ANY':'LIVE',limit});
        return result({status:'LIVE',capability_group:'OPERATE',tools,resource_assets:resourceAssets,resource_source_status:RESOURCE_ASSET_SOURCE_STATUS,human_review_required:true});
      }
      case 'generate_capital_blueprint':
        if (!args.answers || typeof args.answers !== 'object') throw new Error('answers object is required.');
        return result({status:'LIVE',blueprint:generateBlueprint(args.answers as AssessmentAnswers),human_review_required:true});
      case 'calculate_commercial_dscr':
        return result({status:'LIVE',...calculateCommercialDscr({netOperatingIncome:Number(args.netOperatingIncome),annualDebtService:Number(args.annualDebtService)})});
      case 'recommend_capital_stack':
        return result({...recommendCapitalStack({
          requestedAmount:Number(args.requestedAmount),
          useOfFunds:args.useOfFunds,
          collateralAvailable:args.collateralAvailable,
          recurringWorkingCapitalNeed:args.recurringWorkingCapitalNeed,
          receivablesDriven:args.receivablesDriven,
          realEstateRelated:args.realEstateRelated,
          preserveLiquidity:args.preserveLiquidity
        }),human_review_required:true});
      case 'query_capital_tools': {
        const limit=Math.min(Number(args.limit)||10,25);
        const tools=TOOLS_CATALOG.filter(tool =>
          (!args.workflowStage || tool.workflowStage===Number(args.workflowStage)) &&
          (!args.category || tool.category.toLowerCase()===String(args.category).toLowerCase()) &&
          (!args.tag || tool.tags.some(tag=>tag.toLowerCase().includes(String(args.tag).toLowerCase())))
        ).slice(0,limit);
        return result({status:'LIVE',count:tools.length,tools});
      }
      case 'explain_operating_stage': {
        const stage=WORKFLOW_STAGES.find(item=>item.number===Number(args.stage));
        if (!stage) throw new Error('stage must be an integer from 1 to 8.');
        return result({status:'LIVE',stage});
      }
      case 'match_capital_routes': {
        const request=args as BuyBoxMatchRequest;
        if (![request.annual_revenue,request.avg_monthly_deposits,request.time_in_business_months,request.requested_amount].every(Number.isFinite)) {
          throw new Error('Required numeric routing fields are missing or invalid.');
        }
        return result({
          status:'SANDBOX',
          human_review_required:true,
          disclaimer:'Informational route classification only; not lender eligibility, approval, pricing, or availability.',
          matches:evaluateCapitalRoutes(request)
        });
      }
      default:
        return {content:[{type:'text',text:`Unknown MCP tool: ${name}`}],isError:true};
    }
  } catch (error) {
    return operationalError(error);
  }
}
