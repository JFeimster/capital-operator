import { applyCors } from '../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../server/auth/authService.js';
import { createDealFromIntent, listDeals } from '../../../server/deals/service.js';
import { getPersistenceCapability } from '../../../server/persistence/index.js';
import { sendOperationalError } from '../../../server/http/operationalErrors.js';
import { normalizeFundingIntent } from '../../../src/lib/fundingIntent.js';

export default async function handler(req: any, res: any) {
  applyCors(req, res, ['GET','POST','OPTIONS']);
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const session = authenticateHeaders(headersFromRequest(req));

    if (req.method === 'GET') {
      const deals = await listDeals(session);
      return res.status(200).json({
        status:'success',
        capability_status:getPersistenceCapability().status,
        workspace_id:session.workspaceId,
        deals,
        timestamp:new Date().toISOString()
      });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      if (!body.intent && !body.objective && !body.useOfFunds && !body.fundingPurpose) {
        return res.status(400).json({
          status:'error',
          code:'VALIDATION_FAILED',
          message:'Provide intent or funding objective fields.',
          timestamp:new Date().toISOString()
        });
      }

      const intent = normalizeFundingIntent(body.intent || body);
      const deal = await createDealFromIntent(session, intent, req.headers?.['x-correlation-id']);
      return res.status(201).json({
        status:'success',
        capability_status:getPersistenceCapability().status,
        deal,
        funding_intent_persistence:'PERSISTED',
        workspace_id:session.workspaceId,
        human_review_required:true,
        timestamp:new Date().toISOString()
      });
    }

    return res.status(405).json({
      status:'error',
      code:'METHOD_NOT_ALLOWED',
      message:'Expected GET or POST.',
      timestamp:new Date().toISOString()
    });
  } catch (error) {
    return sendOperationalError(res, error, 'Unable to process deal request.');
  }
}
