import { applyCors } from '../../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../../server/auth/authService.js';
import { transitionDeal } from '../../../../server/deals/service.js';
import { DEAL_TRANSITIONS } from '../../../../server/deals/lifecycle.js';
import { getPersistenceCapability } from '../../../../server/persistence/index.js';
import { sendOperationalError } from '../../../../server/http/operationalErrors.js';
import type { DealStatus } from '../../../../src/types/deals.js';

function routeId(req:any): string {
  const value=req.query?.id;
  return Array.isArray(value)?String(value[0]||''):String(value||'');
}

export default async function handler(req:any,res:any) {
  applyCors(req,res,['POST','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='POST') return res.status(405).json({
    status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected POST.',timestamp:new Date().toISOString()
  });

  try {
    const session=authenticateHeaders(headersFromRequest(req));
    const id=routeId(req);
    const body=typeof req.body==='string'?JSON.parse(req.body):req.body || {};
    const to=String(body.to || '') as DealStatus;
    if(!id || !Object.prototype.hasOwnProperty.call(DEAL_TRANSITIONS,to)) {
      return res.status(400).json({
        status:'error',
        code:'VALIDATION_FAILED',
        message:'Valid deal id and target lifecycle state are required.',
        timestamp:new Date().toISOString()
      });
    }

    const deal=await transitionDeal(
      session,
      id,
      to,
      String(body.reason || ''),
      req.headers?.['x-correlation-id']
    );

    return res.status(200).json({
      status:'success',
      capability_status:getPersistenceCapability().status,
      deal,
      human_review_required:true,
      timestamp:new Date().toISOString()
    });
  } catch(error) {
    return sendOperationalError(res,error,'Unable to transition deal.');
  }
}
