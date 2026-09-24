import { applyCors } from '../../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../../server/auth/authService.js';
import { sendOperationalError } from '../../../../server/http/operationalErrors.js';
import { generatePersistentCapitalCase, reviewCapitalCase } from '../../../../server/transactions/service.js';

function routeId(req:any):string{
  const value=req.query?.id;
  return Array.isArray(value)?String(value[0]||''):String(value||'');
}

export default async function handler(req:any,res:any){
  applyCors(req,res,['POST','PATCH','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  try{
    const session=authenticateHeaders(headersFromRequest(req));
    const dealId=routeId(req);
    if(!dealId) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'Deal id is required.',timestamp:new Date().toISOString()});
    if(req.method==='POST'){
      const record=await generatePersistentCapitalCase(session,dealId,req.headers?.['x-correlation-id']);
      return res.status(201).json({status:'success',capital_case:record,human_review_required:true,timestamp:new Date().toISOString()});
    }
    if(req.method==='PATCH'){
      const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
      const record=await reviewCapitalCase(session,dealId,body.approveForExternalUse===true,req.headers?.['x-correlation-id']);
      return res.status(200).json({status:'success',capital_case:record,human_review_required:true,timestamp:new Date().toISOString()});
    }
    return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected POST or PATCH.',timestamp:new Date().toISOString()});
  }catch(error){return sendOperationalError(res,error,'Unable to process capital case.');}
}
