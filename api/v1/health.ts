/**
 * Capital Operator — Health Check API Endpoint
 * api/v1/health.ts
 */

import { HealthCheckResponse } from '../../src/types/api';
import { integrationRegistry } from '../../server/integrations/registry';
import { applyCors } from '../../server/http/cors';

const START_TIME = Date.now();

export default async function handler(req: any, res: any) {
  applyCors(req, res, ['GET', 'OPTIONS']);

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'error',
      code: 'METHOD_NOT_ALLOWED',
      message: 'Method Not Allowed. Expected GET.',
      timestamp: new Date().toISOString()
    });
  }

  const integrationStatuses = integrationRegistry.getStatusMap();

  const response: HealthCheckResponse = {
    status: 'ok',
    version: '1.0.0',
    service: 'capital-operator-api',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor((Date.now() - START_TIME) / 1000),
    capabilities: {
      diagnostic: 'LIVE',
      blueprint: 'LIVE',
      intake: 'LIVE',
      routing: 'SANDBOX',
      webhooks: Boolean(process.env.WEBHOOK_SECRET) ? 'LIVE' : 'BETA',
      integrations: {
        hubspot: integrationStatuses.hubspot?.configured ? 'BETA' : 'SPECIFIED',
        notion: integrationStatuses.notion?.configured ? 'BETA' : 'SPECIFIED',
        n8n: integrationStatuses.n8n?.configured ? 'BETA' : 'SPECIFIED',
        genericWebhook: integrationStatuses.genericWebhook?.configured ? 'BETA' : 'SPECIFIED'
      }
    }
  };

  return res.status(200).json(response);
}
