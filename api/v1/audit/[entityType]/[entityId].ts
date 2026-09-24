import { applyCors } from '../../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../../server/auth/authService.js';
import { getDealAudit } from '../../../../server/deals/service.js';
import { sendOperationalError } from '../../../../server/http/operationalErrors.js';

function routeValue(req:any,key:string): string {
  const value=req.query?.[key];
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
    const entityType=routeValue(req,'entityType');
    const entityId=routeValue(req,'entityId');
    if(entityType!=='deal' || !entityId) {
      return res.status(400).json({
        status:'error',
        code:'UNSUPPORTED_AUDIT_ENTITY',
        message:'Phase 5B audit API currently supports entityType=deal.',
        timestamp:new Date().toISOString()
      });
    }
    const records=await getDealAudit(session,entityId);
    return res.status(200).json({
      status:'success',
      workspace_id:session.workspaceId,
      entity_type:entityType,
      entity_id:entityId,
      records,
      append_only:true,
      timestamp:new Date().toISOString()
    });
  } catch(error) {
    return sendOperationalError(res,error,'Unable to read audit history.');
  }
}
