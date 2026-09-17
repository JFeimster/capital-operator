import { handleMcpRequest } from '../server/mcp/handler.js';

export default async function handler(req:any,res:any) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Accept, Authorization, MCP-Protocol-Version');

  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method==='GET') return res.status(200).json({status:'LIVE',service:'capital-operator-mcp',transport:'stateless-http-json-rpc',endpoint:'/api/mcp',human_review_required:true});
  if(req.method!=='POST') return res.status(405).json({error:'Method Not Allowed'});

  const body=typeof req.body==='string'?JSON.parse(req.body):req.body;
  const response=await handleMcpRequest(body);
  if(response===null) return res.status(202).end();
  return res.status(200).json(response);
}
