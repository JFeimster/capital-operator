/**
 * Capital Operator — Health Check API Endpoint
 * api/v1/health.ts
 *
 * Provides real-time operational status, environment details, and capability availability.
 */

import { HealthCheckResponse } from '../../src/types/api';
import { integrationRegistry } from '../../server/integrations/registry';

const START_TIME = Date.now();

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
      routing: 'LIVE',
      webhooks: Boolean(process.env.WEBHOOK_SECRET) ? 'LIVE' : 'BETA',
      integrations: {
        hubspot: integrationStatuses.hubspot?.configured ? 'LIVE' : 'BETA',
        notion: integrationStatuses.notion?.configured ? 'LIVE' : 'BETA',
        n8n: integrationStatuses.n8n?.configured ? 'LIVE' : 'BETA',
        genericWebhook: integrationStatuses.genericWebhook?.configured ? 'LIVE' : 'BETA'
      }
    }
  };

  return res.status(200).json(response);
}
