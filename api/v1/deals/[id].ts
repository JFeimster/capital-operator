import { applyCors } from '../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../server/auth/authService.js';
import { getDeal, updateDeal } from '../../../server/deals/service.js';
import { getPersistenceCapability } from '../../../server/persistence/index.js';
import { sendOperationalError } from '../../../server/http/operationalErrors.js';

function routeId(req:any): string {
  const value = req.query?.id;
  return Array.isArray(value) ? String(value[0] || '') : String(value || '');
}

export default async function handler(req:any,res:any) {
  applyCors(req,res,['GET','PATCH','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();

  try {
    const session=authenticateHeaders(headersFromRequest(req));
    const id=routeId(req);
    if(!id) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'Deal id is required.',timestamp:new Date().toISOString()});

    if(req.method==='GET') {
      const deal=await getDeal(session,id);
      return res.status(200).json({
        status:'success',
        capability_status:getPersistenceCapability().status,
        deal,
        human_review_required:true,
        timestamp:new Date().toISOString()
      });
    }

    if(req.method==='PATCH') {
      const body=typeof req.body==='string'?JSON.parse(req.body):req.body || {};
      const allowed = {
        externalReference: body.externalReference,
        businessId: body.businessId,
        ownerId: body.ownerId,
        requestedAmount: body.requestedAmount,
        useOfFunds: body.useOfFunds,
        capitalCaseId: body.capitalCaseId,
        routingStatus: body.routingStatus
      };
      const patch = Object.fromEntries(Object.entries(allowed).filter(([,value])=>value!==undefined));
      const deal=await updateDeal(session,id,patch,req.headers?.['x-correlation-id']);
      return res.status(200).json({
        status:'success',
        capability_status:getPersistenceCapability().status,
        deal,
        human_review_required:true,
        timestamp:new Date().toISOString()
      });
    }

    return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET or PATCH.',timestamp:new Date().toISOString()});
  } catch(error) {
    return sendOperationalError(res,error,'Unable to process deal request.');
  }
}
