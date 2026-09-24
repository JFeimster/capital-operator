import { applyCors } from '../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../server/auth/authService.js';
import { sendOperationalError } from '../../../server/http/operationalErrors.js';
import { updateOffer } from '../../../server/transactions/service.js';

function routeId(req:any):string{
  const value=req.query?.id;
  return Array.isArray(value)?String(value[0]||''):String(value||'');
}

export default async function handler(req:any,res:any){
  applyCors(req,res,['PATCH','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='PATCH') return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected PATCH.',timestamp:new Date().toISOString()});
  try{
    const session=authenticateHeaders(headersFromRequest(req));
    const id=routeId(req);
    const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
    if(!id) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'Offer id is required.',timestamp:new Date().toISOString()});
    const offer=await updateOffer(session,id,{
      providerId:body.providerId,providerName:body.providerName,amount:body.amount,pricing:body.pricing,
      termMonths:body.termMonths,paymentAmount:body.paymentAmount,paymentFrequency:body.paymentFrequency,
      fees:body.fees,collateral:body.collateral,guarantees:body.guarantees,conditions:body.conditions,
      expiration:body.expiration,source:body.source,sourceDocument:body.sourceDocument,
      verificationStatus:body.verificationStatus
    },req.headers?.['x-correlation-id']);
    return res.status(200).json({status:'success',offer,missing_terms_are_not_inferred:true,timestamp:new Date().toISOString()});
  }catch(error){return sendOperationalError(res,error,'Unable to update offer.');}
}
