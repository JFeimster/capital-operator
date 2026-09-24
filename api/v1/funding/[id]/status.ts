import { applyCors } from '../../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../../server/auth/authService.js';
import { getDeal } from '../../../../server/deals/service.js';
import { getNextFundingActionForDeal } from '../../../../server/deals/status.js';
import { getPersistenceCapability } from '../../../../server/persistence/index.js';
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

    const deal=await getDeal(session,id);
    const nextAction=getNextFundingActionForDeal(deal);
    return res.status(200).json({
      status:'success',
      capability_status:getPersistenceCapability().status,
      deal_stage:deal.status,
      workflow_stage:deal.workflowStage,
      capital_case_status:deal.capitalCaseId?'LINKED':'NOT_LINKED',
      routing_review_status:deal.routingStatus,
      documents:{capability_status:'SPECIFIED',records:[]},
      submissions:{capability_status:'SPECIFIED',records:[]},
      outstanding_conditions:{capability_status:'SPECIFIED',records:[]},
      offers_received:{capability_status:'SPECIFIED',records:[]},
      next_action:nextAction,
      human_review_required:true,
      timestamp:new Date().toISOString()
    });
  } catch(error) {
    return sendOperationalError(res,error,'Unable to read funding status.');
  }
}
