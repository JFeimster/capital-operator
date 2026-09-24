import { applyCors } from '../../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../../server/auth/authService.js';
import { getNextFundingActionForDeal } from '../../../../server/deals/status.js';
import { getPersistenceCapability } from '../../../../server/persistence/index.js';
import { getTransactionStatus } from '../../../../server/transactions/service.js';
import { sendOperationalError } from '../../../../server/http/operationalErrors.js';

function routeId(req:any): string {
  const value=req.query?.id;
  return Array.isArray(value)?String(value[0]||''):String(value||'');
}

export default async function handler(req:any,res:any) {
  applyCors(req,res,['GET','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='GET') return res.status(405).json({
    status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET.',timestamp:new Date().toISOString()
  });

  try {
    const session=authenticateHeaders(headersFromRequest(req));
    const id=routeId(req);
    if(!id) return res.status(400).json({
      status:'error',code:'VALIDATION_FAILED',message:'Deal id is required.',timestamp:new Date().toISOString()
    });

    const tx=await getTransactionStatus(session,id);
    return res.status(200).json({
      status:'success',
      capability_status:getPersistenceCapability().status,
      deal_stage:tx.deal.status,
      workflow_stage:tx.deal.workflowStage,
      capital_case:tx.capitalCase,
      documents:tx.documents,
      routing_review:tx.routing,
      submissions:tx.submissions,
      offers_received:tx.offers,
      outstanding_conditions:tx.outstandingConditions,
      conditions:tx.conditions,
      relationship:tx.relationship,
      next_action:getNextFundingActionForDeal(tx.deal),
      human_review_required:true,
      timestamp:new Date().toISOString()
    });
  } catch(error) {
    return sendOperationalError(res,error,'Unable to read funding status.');
  }
}
