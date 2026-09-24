import { applyCors } from '../../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../../server/auth/authService.js';
import { sendOperationalError } from '../../../../server/http/operationalErrors.js';
import { getDealAttribution, putDealAttribution } from '../../../../server/transactions/service.js';

function routeId(req:any):string{
  const value=req.query?.id;
  return Array.isArray(value)?String(value[0]||''):String(value||'');
}

export default async function handler(req:any,res:any){
  applyCors(req,res,['GET','PATCH','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  try{
    const session=authenticateHeaders(headersFromRequest(req));
    const dealId=routeId(req);
    if(!dealId) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'Deal id is required.',timestamp:new Date().toISOString()});
    if(req.method==='GET'){
      const attribution=await getDealAttribution(session,dealId);
      return res.status(200).json({status:'success',attribution,timestamp:new Date().toISOString()});
    }
    if(req.method==='PATCH'){
      const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
      const attribution=await putDealAttribution(session,dealId,{
        attribution:body.attribution||{},
        compensation:body.compensation,
        source:String(body.source||'operator')
      },req.headers?.['x-correlation-id']);
      return res.status(200).json({
        status:'success',
        attribution,
        compensation_terms_inferred:false,
        timestamp:new Date().toISOString()
      });
    }
    return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET or PATCH.',timestamp:new Date().toISOString()});
  }catch(error){return sendOperationalError(res,error,'Unable to process attribution metadata.');}
}
