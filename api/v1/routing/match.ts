import { applyCors } from '../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../server/auth/authService.js';
import { sendOperationalError } from '../../../server/http/operationalErrors.js';
import { createRoutingSuggestion } from '../../../server/transactions/service.js';

export default async function handler(req:any,res:any){
  applyCors(req,res,['POST','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='POST') return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected POST.',timestamp:new Date().toISOString()});
  try{
    const session=authenticateHeaders(headersFromRequest(req));
    const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
    if(!body.dealId) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'dealId is required.',timestamp:new Date().toISOString()});
    const routing=await createRoutingSuggestion(session,String(body.dealId),req.headers?.['x-correlation-id']);
    return res.status(201).json({
      status:'success',
      routing,
      routing_capability:'SANDBOX_UNLESS_VERIFIED_PROVIDER_DATA',
      eligibility_claimed:false,
      human_review_required:true,
      timestamp:new Date().toISOString()
    });
  }catch(error){return sendOperationalError(res,error,'Unable to create routing suggestion.');}
}
