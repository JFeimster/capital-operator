import { handleMcpRequest } from '../server/mcp/handler';
import { MCP_TOOLS } from '../server/mcp/tools';

export async function runMcpContractTests() {
  const required=[
    'start_funding_request','find_funding_options','find_capital_providers','check_funding_readiness',
    'build_capital_case','get_funding_document_checklist','recommend_funding_support_tools',
    'generate_capital_blueprint','calculate_commercial_dscr','recommend_capital_stack',
    'query_capital_tools','explain_operating_stage','match_capital_routes'
  ];
  for(const name of required) {
    if(!MCP_TOOLS.some(tool=>tool.name===name)) throw new Error(`Missing MCP tool: ${name}`);
  }

  const init:any=await handleMcpRequest({jsonrpc:'2.0',id:1,method:'initialize',params:{protocolVersion:'2025-06-18'}});
  if(init?.result?.serverInfo?.name!=='capital-operator') throw new Error('MCP initialize failed');

  const dscr:any=await handleMcpRequest({
    jsonrpc:'2.0',id:2,method:'tools/call',
    params:{name:'calculate_commercial_dscr',arguments:{netOperatingIncome:125000,annualDebtService:100000}}
  });
  if(dscr?.result?.structuredContent?.dscr!==1.25) throw new Error('MCP DSCR tool must call canonical calculation');

  const routing:any=await handleMcpRequest({
    jsonrpc:'2.0',id:3,method:'tools/call',
    params:{name:'match_capital_routes',arguments:{annual_revenue:500000,avg_monthly_deposits:42000,time_in_business_months:36,requested_amount:150000,use_of_funds:'equipment'}}
  });
  if(routing?.result?.structuredContent?.status!=='SANDBOX') throw new Error('MCP routing must remain SANDBOX');
  if(routing?.result?.structuredContent?.human_review_required!==true) throw new Error('MCP routing must require human review');

  const start:any=await handleMcpRequest({
    jsonrpc:'2.0',id:4,method:'tools/call',
    params:{name:'start_funding_request',arguments:{objective:'I need $250,000 to buy equipment.',businessProfile:{timeInBusinessMonths:36,annualRevenue:1200000},assetContext:{equipmentType:'excavator',equipmentCost:250000}}}
  });
  if(start?.result?.structuredContent?.intent?.vertical!=='equipment') {
    throw new Error('Outcome-driven MCP must normalize funding intent');
  }
  if(start?.result?.structuredContent?.persistence!=='NON_PERSISTENT') {
    throw new Error('MCP must truthfully report non-persistent funding request');
  }

  const providers:any=await handleMcpRequest({
    jsonrpc:'2.0',id:5,method:'tools/call',
    params:{name:'find_capital_providers',arguments:{productPathIds:['equipment-financing']}}
  });
  if(providers?.result?.structuredContent?.provider_discovery_status!=='NO_VERIFIED_PROVIDER_DATA') {
    throw new Error('MCP must not fabricate provider candidates');
  }

  return {passed:true,testName:'runMcpContractTests'};
}
