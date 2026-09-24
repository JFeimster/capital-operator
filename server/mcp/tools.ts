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
import { WORKFLOW_STAGES } from '../../src/config/workflowStages.js';
import type { AssessmentAnswers } from '../../src/types.js';
import type { BuyBoxMatchRequest } from '../../src/types/api.js';
import type { FundingIntentInput } from '../../src/types/funding.js';
import type { McpToolDefinition, McpToolResult } from './types.js';

export const MCP_TOOLS: McpToolDefinition[] = [
  {
    name:'start_funding_request',
    description:'GET FUNDED: normalize a plain-language funding objective into a non-persistent FundingIntent, identify missing fields, and return the next practical action.',
    inputSchema:{type:'object',properties:{objective:{type:'string'},requestedAmount:{type:'number',exclusiveMinimum:0},useOfFunds:{type:'string'},fundingPurpose:{type:'string'},vertical:{type:'string'},urgency:{type:'string'},location:{type:'string'},businessProfile:{type:'object'},assetContext:{type:'object'},receivableContext:{type:'object'},contractContext:{type:'object'},acquisitionContext:{type:'object'},realEstateContext:{type:'object'},currentDebtContext:{type:'object'}}}
  },
  {
    name:'find_funding_options',
    description:'FIND CAPITAL: return deterministic capital-category paths and only verified provider candidates when canonical provider provenance exists. Never implies approval or eligibility.',
    inputSchema:{type:'object',properties:{objective:{type:'string'},requestedAmount:{type:'number'},useOfFunds:{type:'string'},fundingPurpose:{type:'string'},vertical:{type:'string'},businessProfile:{type:'object'},assetContext:{type:'object'},receivableContext:{type:'object'},contractContext:{type:'object'},acquisitionContext:{type:'object'},realEstateContext:{type:'object'}}}
  },
  {
    name:'find_capital_providers',
    description:'FIND CAPITAL: search only ACTIVE_VERIFIED canonical provider records mapped to supplied productPathIds. Returns no fabricated providers.',
    inputSchema:{type:'object',required:['productPathIds'],properties:{productPathIds:{type:'array',items:{type:'string'},minItems:1}}}
  },
  {
    name:'check_funding_readiness',
    description:'PREPARE: identify missing information, document preparation items, capital-case readiness, and routing readiness. This is not a funding probability score.',
    inputSchema:{type:'object',properties:{objective:{type:'string'},requestedAmount:{type:'number'},useOfFunds:{type:'string'},fundingPurpose:{type:'string'},vertical:{type:'string'},businessProfile:{type:'object'},assetContext:{type:'object'},receivableContext:{type:'object'},contractContext:{type:'object'},acquisitionContext:{type:'object'},realEstateContext:{type:'object'}}}
  },
  {
    name:'build_capital_case',
    description:'PREPARE: build a structured, source-traceable capital case from supplied facts and deterministic metrics. Missing facts are never invented.',
    inputSchema:{type:'object',properties:{objective:{type:'string'},requestedAmount:{type:'number'},useOfFunds:{type:'string'},fundingPurpose:{type:'string'},vertical:{type:'string'},businessProfile:{type:'object'},assetContext:{type:'object'},receivableContext:{type:'object'},contractContext:{type:'object'},acquisitionContext:{type:'object'},realEstateContext:{type:'object'}}}
  },
  {
    name:'get_funding_document_checklist',
    description:'PREPARE: return a purpose/vertical-specific preparation checklist and distinguish canonical preparation guidance from provider-specific requirements.',
    inputSchema:{type:'object',properties:{objective:{type:'string'},requestedAmount:{type:'number'},useOfFunds:{type:'string'},fundingPurpose:{type:'string'},vertical:{type:'string'},businessProfile:{type:'object'},assetContext:{type:'object'},receivableContext:{type:'object'},contractContext:{type:'object'},acquisitionContext:{type:'object'},realEstateContext:{type:'object'}}}
  },
  {
    name:'recommend_funding_support_tools',
    description:'OPERATE: recommend canonical Capital Operator support tools that can move the current request forward without making a capital decision.',
    inputSchema:{type:'object',properties:{stage:{type:'integer',minimum:1,maximum:8},tag:{type:'string'},limit:{type:'integer',minimum:1,maximum:10}}}
  },

  { name:'generate_capital_blueprint', description:'Generate a deterministic Capital Operator blueprint from canonical assessment answers.', inputSchema:{type:'object',required:['answers'],properties:{answers:{type:'object'}}} },
  { name:'calculate_commercial_dscr', description:'Calculate DSCR deterministically as NOI divided by annual debt service.', inputSchema:{type:'object',required:['netOperatingIncome','annualDebtService'],properties:{netOperatingIncome:{type:'number'},annualDebtService:{type:'number',exclusiveMinimum:0}}} },
  { name:'recommend_capital_stack', description:'Generate non-binding capital-structure planning categories for human review.', inputSchema:{type:'object',required:['requestedAmount'],properties:{requestedAmount:{type:'number',exclusiveMinimum:0},useOfFunds:{type:'string'},collateralAvailable:{type:'boolean'},recurringWorkingCapitalNeed:{type:'boolean'},receivablesDriven:{type:'boolean'},realEstateRelated:{type:'boolean'},preserveLiquidity:{type:'boolean'}}} },
  { name:'query_capital_tools', description:'Query the canonical source-controlled Capital Operator tools registry.', inputSchema:{type:'object',properties:{workflowStage:{type:'integer',minimum:1,maximum:8},category:{type:'string'},tag:{type:'string'},limit:{type:'integer',minimum:1,maximum:25}}} },
  { name:'explain_operating_stage', description:'Return the canonical definition for one of the eight Capital Operator workflow stages.', inputSchema:{type:'object',required:['stage'],properties:{stage:{type:'integer',minimum:1,maximum:8}}} },
  { name:'match_capital_routes', description:'SANDBOX informational capital-route classification. Never represents lender eligibility, approval, pricing, or availability.', inputSchema:{type:'object',required:['annual_revenue','avg_monthly_deposits','time_in_business_months','requested_amount'],properties:{annual_revenue:{type:'number',minimum:0},avg_monthly_deposits:{type:'number',minimum:0},time_in_business_months:{type:'integer',minimum:0},requested_amount:{type:'number',exclusiveMinimum:0},credit_score:{type:'number'},industry:{type:'string'},collateral_available:{type:'boolean'},use_of_funds:{type:'string'},has_tax_liens:{type:'boolean'},has_bankruptcy:{type:'boolean'}}} }
];

function result(data: Record<string, unknown>): McpToolResult {
  return { content:[{type:'text',text:JSON.stringify(data)}], structuredContent:data };
}

function intentFrom(args: Record<string, any>) {
  return normalizeFundingIntent(args as FundingIntentInput);
}

export async function callMcpTool(name: string, args: Record<string, any>): Promise<McpToolResult> {
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
      case 'find_funding_options': {
        const intent=intentFrom(args);
        return result({capability_group:'FIND CAPITAL',...findFundingOptions(intent)});
      }
      case 'find_capital_providers': {
        const ids=Array.isArray(args.productPathIds)?args.productPathIds.map(String):[];
        if(!ids.length) throw new Error('productPathIds must contain at least one product path ID.');
        const providers=findVerifiedProviderCandidates(ids);
        return result({
          status:providers.length?'BETA':'SPECIFIED',
          capability_group:'FIND CAPITAL',
          provider_discovery_status:providers.length?'VERIFIED_RESULTS':'NO_VERIFIED_PROVIDER_DATA',
          providers,
          disclaimer:'Only provider records with verified criteria provenance are returned. No provider availability or eligibility is implied.',
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
      case 'recommend_funding_support_tools': {
        const limit=Math.min(Number(args.limit)||5,10);
        const stage=Number(args.stage)||undefined;
        const tag=String(args.tag||'').toLowerCase();
        const tools=TOOLS_CATALOG.filter(tool =>
          (!stage || tool.workflowStage===stage) &&
          (!tag || tool.tags.some(item=>item.toLowerCase().includes(tag)) || tool.category.toLowerCase().includes(tag))
        ).slice(0,limit);
        return result({status:'LIVE',capability_group:'OPERATE',tools,human_review_required:true});
      }
      case 'generate_capital_blueprint':
        if (!args.answers || typeof args.answers !== 'object') throw new Error('answers object is required.');
        return result({status:'LIVE', blueprint: generateBlueprint(args.answers as AssessmentAnswers), human_review_required:true});
      case 'calculate_commercial_dscr':
        return result({status:'LIVE', ...calculateCommercialDscr({netOperatingIncome:Number(args.netOperatingIncome),annualDebtService:Number(args.annualDebtService)})});
      case 'recommend_capital_stack':
        return result({ ...recommendCapitalStack({ requestedAmount:Number(args.requestedAmount), useOfFunds:args.useOfFunds, collateralAvailable:args.collateralAvailable, recurringWorkingCapitalNeed:args.recurringWorkingCapitalNeed, receivablesDriven:args.receivablesDriven, realEstateRelated:args.realEstateRelated, preserveLiquidity:args.preserveLiquidity }), human_review_required:true });
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
  } catch (error:any) {
    return {content:[{type:'text',text:error?.message||'MCP tool execution failed.'}],isError:true};
  }
}
