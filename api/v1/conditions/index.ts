import { applyCors } from '../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../server/auth/authService.js';
import { sendOperationalError } from '../../../server/http/operationalErrors.js';
import { createCondition, listConditions } from '../../../server/transactions/service.js';

export default async function handler(req:any,res:any){
  applyCors(req,res,['GET','POST','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  try{
    const session=authenticateHeaders(headersFromRequest(req));
    if(req.method==='GET'){
      const dealId=Array.isArray(req.query?.dealId)?req.query.dealId[0]:req.query?.dealId;
      if(!dealId) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'dealId query parameter is required.',timestamp:new Date().toISOString()});
      const conditions=await listConditions(session,String(dealId));
      return res.status(200).json({status:'success',conditions,timestamp:new Date().toISOString()});
    }
    if(req.method==='POST'){
      const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
      if(!body.dealId||!body.requestedItem||!body.responsibleParty||!body.source){
        return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'dealId, requestedItem, responsibleParty, and source are required.',timestamp:new Date().toISOString()});
      }
      const condition=await createCondition(session,{
        dealId:String(body.dealId),submissionId:body.submissionId,offerId:body.offerId,
        requestedItem:String(body.requestedItem),responsibleParty:body.responsibleParty,dueDate:body.dueDate,
        source:String(body.source),notes:body.notes
      },req.headers?.['x-correlation-id']);
      return res.status(201).json({status:'success',condition,timestamp:new Date().toISOString()});
    }
    return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET or POST.',timestamp:new Date().toISOString()});
  }catch(error){return sendOperationalError(res,error,'Unable to process funding condition.');}
}
