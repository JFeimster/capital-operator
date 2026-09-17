import { MCP_TOOLS, callMcpTool } from './tools.js';

const SERVER_INFO={name:'capital-operator',version:'1.0.0'};

export async function handleMcpRequest(body:any) {
  const id=body?.id ?? null;
  const ok=(result:any)=>({jsonrpc:'2.0',id,result});
  const fail=(code:number,message:string,data?:unknown)=>({jsonrpc:'2.0',id,error:{code,message,...(data?{data}: {})}});

  if (!body || body.jsonrpc!=='2.0' || typeof body.method!=='string') return fail(-32600,'Invalid Request');

  switch(body.method) {
    case 'initialize':
      return ok({protocolVersion:typeof body.params?.protocolVersion==='string'?body.params.protocolVersion:'2025-06-18',capabilities:{tools:{}},serverInfo:SERVER_INFO,instructions:'Capital Operator MCP exposes deterministic planning and informational tooling. Consequential capital decisions require human review.'});
    case 'notifications/initialized':
      return null;
    case 'ping':
      return ok({});
    case 'tools/list':
      return ok({tools:MCP_TOOLS});
    case 'tools/call': {
      const name=body.params?.name;
      if (typeof name!=='string') return fail(-32602,'Tool name is required.');
      const tool=MCP_TOOLS.find(item=>item.name===name);
      if (!tool) return fail(-32602,`Unknown tool: ${name}`);
      return ok(await callMcpTool(name,body.params?.arguments||{}));
    }
    default:
      return fail(-32601,`Method not found: ${body.method}`);
  }
}
