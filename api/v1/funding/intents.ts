import { applyCors } from '../../../server/http/cors.js';
import { normalizeFundingIntent, getFundingIntentMissingFields } from '../../../src/lib/fundingIntent.js';
import { findFundingOptions } from '../../../src/lib/fundingOptions.js';
import { serverEventBus } from '../../../server/events/eventBus.js';

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
    if (!body.objective && !body.useOfFunds && !body.fundingPurpose) {
      return res.status(400).json({
        status: 'error',
        code: 'VALIDATION_FAILED',
        message: 'Provide objective, useOfFunds, or fundingPurpose.',
        timestamp: new Date().toISOString()
      });
    }

    const intent = normalizeFundingIntent(body);
    const missingFields = getFundingIntentMissingFields(intent);
    const options = findFundingOptions(intent);

    await serverEventBus.emit('funding_intent.created', {
      intent_id: intent.id,
      vertical: intent.vertical,
      funding_purpose: intent.fundingPurpose,
      requested_amount: intent.requestedAmount,
      persistence: intent.persistence
    });

    return res.status(200).json({
      status: 'success',
      capability_status: 'LIVE',
      intent,
      missing_fields: missingFields,
      relevant_capital_categories: options.categoryFits,
      persistence: 'NON_PERSISTENT',
      recommended_next_action: missingFields.length
        ? 'Collect missing information.'
        : 'Run funding readiness and human-reviewed routing.',
      human_review_required: true,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return res.status(500).json({
      status: 'error',
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to normalize funding intent.',
      details: [err?.message || 'Unknown error'],
      timestamp: new Date().toISOString()
    });
  }
}
