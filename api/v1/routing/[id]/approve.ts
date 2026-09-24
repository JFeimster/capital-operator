import { applyCors } from '../../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../../server/auth/authService.js';
import { sendOperationalError } from '../../../../server/http/operationalErrors.js';
import { approveRoutingDecision } from '../../../../server/transactions/service.js';

function routeId(req:any):string{
  const value=req.query?.id;
  return Array.isArray(value)?String(value[0]||''):String(value||'');
}

export default async function handler(req:any,res:any){
  applyCors(req,res,['POST','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='POST') return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected POST.',timestamp:new Date().toISOString()});
  try{
    const session=authenticateHeaders(headersFromRequest(req));
    const id=routeId(req);
    if(!id) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'Routing decision id is required.',timestamp:new Date().toISOString()});
    const routing=await approveRoutingDecision(session,id,req.headers?.['x-correlation-id']);
    return res.status(200).json({status:'success',routing,human_approved:true,eligibility_claimed:false,timestamp:new Date().toISOString()});
  }catch(error){return sendOperationalError(res,error,'Unable to approve routing decision.');}
}
