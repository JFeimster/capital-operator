import { applyCors } from '../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../server/auth/authService.js';
import { sendOperationalError } from '../../../server/http/operationalErrors.js';
import { createOffer, listOffers } from '../../../server/transactions/service.js';

export default async function handler(req:any,res:any){
  applyCors(req,res,['GET','POST','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  try{
    const session=authenticateHeaders(headersFromRequest(req));
    if(req.method==='GET'){
      const dealId=Array.isArray(req.query?.dealId)?req.query.dealId[0]:req.query?.dealId;
      if(!dealId) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'dealId query parameter is required.',timestamp:new Date().toISOString()});
      const offers=await listOffers(session,String(dealId));
      return res.status(200).json({status:'success',offers,timestamp:new Date().toISOString()});
    }
    if(req.method==='POST'){
      const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
      if(!body.dealId||!body.source) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'dealId and source are required.',timestamp:new Date().toISOString()});
      const offer=await createOffer(session,{
        dealId:String(body.dealId),
        submissionId:body.submissionId,
        providerId:body.providerId,
        providerName:body.providerName,
        amount:body.amount,
        pricing:body.pricing,
        termMonths:body.termMonths,
        paymentAmount:body.paymentAmount,
        paymentFrequency:body.paymentFrequency,
        fees:body.fees,
        collateral:body.collateral,
        guarantees:body.guarantees,
        conditions:body.conditions,
        expiration:body.expiration,
        source:String(body.source),
        sourceDocument:body.sourceDocument,
        verificationStatus:body.verificationStatus,
        receivedAt:body.receivedAt
      },req.headers?.['x-correlation-id']);
      return res.status(201).json({status:'success',offer,missing_terms_are_not_inferred:true,timestamp:new Date().toISOString()});
    }
    return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET or POST.',timestamp:new Date().toISOString()});
  }catch(error){return sendOperationalError(res,error,'Unable to process offer.');}
}
