import { handleMcpRequest } from '../server/mcp/handler';
import { MCP_TOOLS } from '../server/mcp/tools';
import { getDevelopmentMemoryRepository } from '../server/persistence/index.js';

export async function runMcpContractTests() {
  const required=[
    'start_funding_request','create_deal',
    'find_funding_options','find_capital_providers','check_funding_readiness',
    'build_capital_case','get_funding_document_checklist',
    'get_next_funding_action','get_funding_status',
    'recommend_funding_support_tools',
    'generate_capital_blueprint','calculate_commercial_dscr','recommend_capital_stack',
    'query_capital_tools','explain_operating_stage','match_capital_routes'
  ];
  for(const name of required) {
    if(!MCP_TOOLS.some(tool=>tool.name===name)) throw new Error(`Missing MCP tool: ${name}`);
  }

  const init:any=await handleMcpRequest({
    jsonrpc:'2.0',
    id:1,
    method:'initialize',
    params:{protocolVersion:'2025-06-18'}
  });
  if(init?.result?.serverInfo?.name!=='capital-operator') throw new Error('MCP initialize failed');

  const dscr:any=await handleMcpRequest({
    jsonrpc:'2.0',id:2,method:'tools/call',
    params:{name:'calculate_commercial_dscr',arguments:{netOperatingIncome:125000,annualDebtService:100000}}
  });
  if(dscr?.result?.structuredContent?.dscr!==1.25) {
    throw new Error('MCP DSCR tool must call canonical calculation');
  }

  const routing:any=await handleMcpRequest({
    jsonrpc:'2.0',id:3,method:'tools/call',
    params:{name:'match_capital_routes',arguments:{
      annual_revenue:500000,
      avg_monthly_deposits:42000,
      time_in_business_months:36,
      requested_amount:150000,
      use_of_funds:'equipment'
    }}
  });
  if(routing?.result?.structuredContent?.status!=='SANDBOX') throw new Error('MCP routing must remain SANDBOX');
  if(routing?.result?.structuredContent?.human_review_required!==true) throw new Error('MCP routing must require human review');

  const start:any=await handleMcpRequest({
    jsonrpc:'2.0',id:4,method:'tools/call',
    params:{name:'start_funding_request',arguments:{
      objective:'I need $250,000 to buy equipment.',
      businessProfile:{timeInBusinessMonths:36,annualRevenue:1200000},
      assetContext:{equipmentType:'excavator',equipmentCost:250000}
    }}
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

  const original={
    nodeEnv:process.env.NODE_ENV,
    authMode:process.env.CAPITAL_AUTH_MODE,
    persistenceMode:process.env.CAPITAL_PERSISTENCE_MODE
  };
  try {
    process.env.NODE_ENV='test';
    process.env.CAPITAL_AUTH_MODE='development';
    process.env.CAPITAL_PERSISTENCE_MODE='memory';
    getDevelopmentMemoryRepository().clearForTests();

    const context={
      headers:{
        'x-capital-user-id':'mcp-user',
        'x-capital-workspace-id':'mcp-workspace',
        'x-capital-role':'operator'
      }
    };
    const create:any=await handleMcpRequest({
      jsonrpc:'2.0',id:6,method:'tools/call',
      params:{name:'create_deal',arguments:{
        objective:'I need $100,000 for working capital.',
        workspaceId:'untrusted-workspace',
        userId:'untrusted-user',
        businessProfile:{timeInBusinessMonths:30,annualRevenue:750000}
      }}
    },context);

    if(create?.result?.isError) throw new Error('Authenticated MCP create_deal failed');
    const deal=create?.result?.structuredContent?.deal;
    if(!deal?.id || deal.workspaceId!=='mcp-workspace') {
      throw new Error('MCP create_deal must derive workspace from auth context');
    }

    const next:any=await handleMcpRequest({
      jsonrpc:'2.0',id:7,method:'tools/call',
      params:{name:'get_next_funding_action',arguments:{dealId:deal.id}}
    },context);
    if(next?.result?.structuredContent?.next_action?.currentLifecycleState!=='DRAFT') {
      throw new Error('MCP next-action tool failed');
    }

    const status:any=await handleMcpRequest({
      jsonrpc:'2.0',id:8,method:'tools/call',
      params:{name:'get_funding_status',arguments:{dealId:deal.id}}
    },context);
    if(status?.result?.structuredContent?.deal_stage!=='DRAFT') {
      throw new Error('MCP funding status tool failed');
    }

    const cross:any=await handleMcpRequest({
      jsonrpc:'2.0',id:9,method:'tools/call',
      params:{name:'get_funding_status',arguments:{dealId:deal.id}}
    },{
      headers:{
        'x-capital-user-id':'other-user',
        'x-capital-workspace-id':'other-workspace',
        'x-capital-role':'operator'
      }
    });
    if(!cross?.result?.isError || cross?.result?.structuredContent?.code!=='DEAL_NOT_FOUND') {
      throw new Error('MCP must prevent cross-workspace deal access');
    }
  } finally {
    if(original.nodeEnv===undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV=original.nodeEnv;
    if(original.authMode===undefined) delete process.env.CAPITAL_AUTH_MODE; else process.env.CAPITAL_AUTH_MODE=original.authMode;
    if(original.persistenceMode===undefined) delete process.env.CAPITAL_PERSISTENCE_MODE; else process.env.CAPITAL_PERSISTENCE_MODE=original.persistenceMode;
  }

  return {passed:true,testName:'runMcpContractTests'};
}
