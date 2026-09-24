import { applyCors } from '../../../server/http/cors.js';
import { normalizeFundingIntent } from '../../../src/lib/fundingIntent.js';
import { findFundingOptions } from '../../../src/lib/fundingOptions.js';

export default async function handler(req: any, res: any) {
  applyCors(req, res, ['POST', 'OPTIONS']);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      code: 'METHOD_NOT_ALLOWED',
      message: 'Expected POST.',
      timestamp: new Date().toISOString()
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const intent = normalizeFundingIntent(body.intent || body);
    return res.status(200).json({
      status: 'success',
      ...findFundingOptions(intent),
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return res.status(500).json({
      status: 'error',
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to find funding options.',
      details: [err?.message || 'Unknown error'],
      timestamp: new Date().toISOString()
    });
  }
}
