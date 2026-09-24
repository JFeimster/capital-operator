import { applyCors } from '../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../server/auth/authService.js';
import { sendOperationalError } from '../../../server/http/operationalErrors.js';
import { createSubmission, listSubmissions } from '../../../server/transactions/service.js';

export default async function handler(req:any,res:any){
  applyCors(req,res,['GET','POST','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  try{
    const session=authenticateHeaders(headersFromRequest(req));
    if(req.method==='GET'){
      const dealId=Array.isArray(req.query?.dealId)?req.query.dealId[0]:req.query?.dealId;
      if(!dealId) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'dealId query parameter is required.',timestamp:new Date().toISOString()});
      const submissions=await listSubmissions(session,String(dealId));
      return res.status(200).json({status:'success',submissions,timestamp:new Date().toISOString()});
    }
    if(req.method==='POST'){
      const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
      if(!body.dealId||!body.destinationType) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'dealId and destinationType are required.',timestamp:new Date().toISOString()});
      const submission=await createSubmission(session,{
        dealId:String(body.dealId),
        destinationType:body.destinationType,
        destinationId:body.destinationId,
        destinationUrl:body.destinationUrl,
        source:body.source
      },req.headers?.['x-correlation-id']);
      return res.status(201).json({status:'success',submission,external_transmission_performed:false,timestamp:new Date().toISOString()});
    }
    return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET or POST.',timestamp:new Date().toISOString()});
  }catch(error){return sendOperationalError(res,error,'Unable to process submission.');}
}
