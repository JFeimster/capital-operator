import { applyCors } from '../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../server/auth/authService.js';
import { sendOperationalError } from '../../../server/http/operationalErrors.js';
import { getSubmission, transitionSubmission } from '../../../server/transactions/service.js';

function routeId(req:any):string{
  const value=req.query?.id;
  return Array.isArray(value)?String(value[0]||''):String(value||'');
}

export default async function handler(req:any,res:any){
  applyCors(req,res,['GET','PATCH','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  try{
    const session=authenticateHeaders(headersFromRequest(req));
    const id=routeId(req);
    if(!id) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'Submission id is required.',timestamp:new Date().toISOString()});
    if(req.method==='GET'){
      const submission=await getSubmission(session,id);
      return res.status(200).json({status:'success',submission,timestamp:new Date().toISOString()});
    }
    if(req.method==='PATCH'){
      const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
      if(!body.status) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'Target status is required.',timestamp:new Date().toISOString()});
      const submission=await transitionSubmission(session,id,body.status,{
        authorizationReason:body.authorizationReason,
        explicitAuthorization:body.explicitAuthorization,
        externalConfirmation:body.externalConfirmation,
        externalEvidence:body.externalEvidence,
        externalReference:body.externalReference
      },req.headers?.['x-correlation-id']);
      return res.status(200).json({
        status:'success',
        submission,
        external_transmission_performed:false,
        submitted_state_requires_prior_external_confirmation:true,
        timestamp:new Date().toISOString()
      });
    }
    return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET or PATCH.',timestamp:new Date().toISOString()});
  }catch(error){return sendOperationalError(res,error,'Unable to process submission.');}
}
