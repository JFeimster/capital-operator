import { generateBlueprint } from '../../src/lib/recommendationEngine.js';
import { calculateCommercialDscr } from '../../src/lib/capitalMath.js';
import { recommendCapitalStack } from '../../src/lib/capitalStack.js';
import { evaluateCapitalRoutes } from '../../src/lib/capitalRouting.js';
import { TOOLS_CATALOG } from '../../src/config/tools.js';
import { WORKFLOW_STAGES } from '../../src/config/workflowStages.js';
import type { AssessmentAnswers } from '../../src/types.js';
import type { BuyBoxMatchRequest } from '../../src/types/api.js';
import type { McpToolDefinition, McpToolResult } from './types.js';

export const MCP_TOOLS: McpToolDefinition[] = [
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

export async function callMcpTool(name: string, args: Record<string, any>): Promise<McpToolResult> {
  try {
    switch(name) {
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
        if (![request.annual_revenue,request.avg_monthly_deposits,request.time_in_business_months,request.requested_amount].every(Number.isFinite)) throw new Error('Required numeric routing fields are missing or invalid.');
        return result({status:'SANDBOX',human_review_required:true,disclaimer:'Informational route classification only; not lender eligibility, approval, pricing, or availability.',matches:evaluateCapitalRoutes(request)});
      }
      default:
        return {content:[{type:'text',text:`Unknown MCP tool: ${name}`}],isError:true};
    }
  } catch (error:any) {
    return {content:[{type:'text',text:error?.message||'MCP tool execution failed.'}],isError:true};
  }
}
