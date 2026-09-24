import { applyCors } from '../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../server/auth/authService.js';
import { sendOperationalError } from '../../../server/http/operationalErrors.js';
import { updateCondition } from '../../../server/transactions/service.js';

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
    if(!id) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'Condition id is required.',timestamp:new Date().toISOString()});
    const condition=await updateCondition(session,id,{
      status:body.status,notes:body.notes,dueDate:body.dueDate,verifyCompletion:body.verifyCompletion
    },req.headers?.['x-correlation-id']);
    return res.status(200).json({status:'success',condition,timestamp:new Date().toISOString()});
  }catch(error){return sendOperationalError(res,error,'Unable to update funding condition.');}
}
