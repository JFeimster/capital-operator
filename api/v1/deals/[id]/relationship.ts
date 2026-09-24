import { applyCors } from '../../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../../server/auth/authService.js';
import { getCapitalRepository } from '../../../../server/persistence/index.js';
import { sendOperationalError } from '../../../../server/http/operationalErrors.js';
import { getDeal } from '../../../../server/deals/service.js';
import { putRelationshipLifecycle } from '../../../../server/transactions/service.js';

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
    await getDeal(session,dealId);
    if(req.method==='GET'){
      const relationship=await getCapitalRepository().getRelationship(session.workspaceId,dealId);
      return res.status(200).json({status:'success',relationship,timestamp:new Date().toISOString()});
    }
    if(req.method==='PATCH'){
      const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
      const relationship=await putRelationshipLifecycle(session,dealId,{
        ownerId:body.ownerId,nextAction:body.nextAction,nextActionDate:body.nextActionDate,
        relationshipStatus:body.relationshipStatus,renewalTrigger:body.renewalTrigger,
        followUpTrigger:body.followUpTrigger,notes:body.notes
      },req.headers?.['x-correlation-id']);
      return res.status(200).json({status:'success',relationship,timestamp:new Date().toISOString()});
    }
    return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET or PATCH.',timestamp:new Date().toISOString()});
  }catch(error){return sendOperationalError(res,error,'Unable to process relationship lifecycle.');}
}
