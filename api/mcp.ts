import { handleMcpRequest } from '../server/mcp/handler.js';
import { headersFromRequest, getAuthCapability } from '../server/auth/authService.js';
import { getPersistenceCapability } from '../server/persistence/index.js';
import { applyCors } from '../server/http/cors.js';

export default async function handler(req:any,res:any) {
  applyCors(req,res,['GET','POST','OPTIONS']);
  res.setHeader('Access-Control-Allow-Headers',
    'Content-Type, Accept, Authorization, MCP-Protocol-Version, X-Capital-User-ID, X-Capital-Workspace-ID, X-Capital-Role, X-Request-ID, X-Correlation-ID'
  );

  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method==='GET') {
    return res.status(200).json({
      status:'LIVE',
      service:'capital-operator-mcp',
      transport:'stateless-http-json-rpc',
      endpoint:'/api/mcp',
      auth:getAuthCapability(),
      persistence:getPersistenceCapability(),
      human_review_required:true
    });
  }
  if(req.method!=='POST') return res.status(405).json({error:'Method Not Allowed'});

  const body=typeof req.body==='string'?JSON.parse(req.body):req.body;
  const response=await handleMcpRequest(body,{headers:headersFromRequest(req)});
  if(response===null) return res.status(202).end();
  return res.status(200).json(response);
}
