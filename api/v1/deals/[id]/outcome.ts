import { applyCors } from '../../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../../server/auth/authService.js';
import { sendOperationalError } from '../../../../server/http/operationalErrors.js';
import { recordDealOutcome } from '../../../../server/transactions/service.js';

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
    const dealId=routeId(req);
    const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
    if(!dealId||!['FUNDED','CLOSED'].includes(String(body.outcome||''))){
      return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'Deal id and outcome FUNDED or CLOSED are required.',timestamp:new Date().toISOString()});
    }
    const deal=await recordDealOutcome(session,{
      dealId,
      outcome:body.outcome,
      externalConfirmation:body.externalConfirmation,
      externalEvidence:body.externalEvidence,
      fundedAmount:body.fundedAmount,
      fundingDate:body.fundingDate,
      reason:String(body.reason||'')
    },req.headers?.['x-correlation-id']);
    return res.status(200).json({
      status:'success',
      deal,
      human_confirmation_required:body.outcome==='FUNDED',
      timestamp:new Date().toISOString()
    });
  }catch(error){return sendOperationalError(res,error,'Unable to record deal outcome.');}
}
