import { applyCors } from '../../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../../server/auth/authService.js';
import { sendOperationalError } from '../../../../server/http/operationalErrors.js';
import { compareOffers, listOffers } from '../../../../server/transactions/service.js';

function routeId(req:any):string{
  const value=req.query?.id;
  return Array.isArray(value)?String(value[0]||''):String(value||'');
}

export default async function handler(req:any,res:any){
  applyCors(req,res,['GET','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='GET') return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET.',timestamp:new Date().toISOString()});
  try{
    const session=authenticateHeaders(headersFromRequest(req));
    const dealId=routeId(req);
    if(!dealId) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'Deal id is required.',timestamp:new Date().toISOString()});
    const compare=String(req.query?.compare||'').toLowerCase()==='true';
    if(compare){
      const comparison=await compareOffers(session,dealId);
      return res.status(200).json({status:'success',comparison,timestamp:new Date().toISOString()});
    }
    const offers=await listOffers(session,dealId);
    return res.status(200).json({status:'success',offers,missing_terms_are_not_inferred:true,timestamp:new Date().toISOString()});
  }catch(error){return sendOperationalError(res,error,'Unable to read deal offers.');}
}
