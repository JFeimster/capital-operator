/**
 * Capital Operator — Capital Route Matching API Endpoint
 * api/v1/routing/match-buy-box.ts
 *
 * SANDBOX capability routing only. This endpoint does not represent lender
 * eligibility, pricing, approval, or a live lender network.
 */

import { BuyBoxMatchRequest, BuyBoxMatchResponse, BuyBoxMatchResult, ApiErrorResponse } from '../../../src/types/api.js';
import { serverEventBus } from '../../../server/events/eventBus.js';
import { applyCors } from '../../../server/http/cors.js';

import { evaluateCapitalRoutes } from '../../../src/lib/capitalRouting.js';

export default async function handler(req: any, res: any) {
  applyCors(req, res, ['POST', 'OPTIONS']);

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    const errorResponse: ApiErrorResponse = {
      status: 'error',
      code: 'METHOD_NOT_ALLOWED',
      message: 'Method Not Allowed. Expected POST.',
      timestamp: new Date().toISOString()
    };
    return res.status(405).json(errorResponse);
  }

  try {
    const rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const body: BuyBoxMatchRequest = rawBody || {};

    const errors: string[] = [];
    if (typeof body.annual_revenue !== 'number' || body.annual_revenue < 0) errors.push('annual_revenue must be a non-negative number.');
    if (typeof body.avg_monthly_deposits !== 'number' || body.avg_monthly_deposits < 0) errors.push('avg_monthly_deposits must be a non-negative number.');
    if (typeof body.time_in_business_months !== 'number' || body.time_in_business_months < 0) errors.push('time_in_business_months must be a non-negative integer.');
    if (typeof body.requested_amount !== 'number' || body.requested_amount <= 0) errors.push('requested_amount must be greater than 0.');

    if (errors.length > 0) {
      const errorResponse: ApiErrorResponse = {
        status: 'error',
        code: 'VALIDATION_FAILED',
        message: 'Invalid routing query attributes.',
        details: errors,
        timestamp: new Date().toISOString()
      };
      return res.status(400).json(errorResponse);
    }

    const matches = evaluateCapitalRoutes(body);
    const potentialRoutes = matches.filter(match => match.match_tier !== 'NOT_INDICATED');

    await serverEventBus.emit('routing.completed', {
      requested_amount: body.requested_amount,
      potential_routes_count: potentialRoutes.length,
      top_route: matches[0]?.program_type || 'NONE',
      capability_status: 'SANDBOX',
      human_review_required: true
    });

    const response: BuyBoxMatchResponse = {
      status: 'success',
      capability_status: 'SANDBOX',
      disclaimer: 'Capability routing is informational and requires human review. It does not represent lender eligibility, approval, pricing, or live lender availability.',
      query_summary: {
        requested_amount: body.requested_amount,
        annual_revenue: body.annual_revenue,
        potential_routes_count: potentialRoutes.length
      },
      matches,
      timestamp: new Date().toISOString()
    };

    return res.status(200).json(response);
  } catch (err: any) {
    console.error('[API:RoutingMatch] Internal Error:', err);
    const errorResponse: ApiErrorResponse = {
      status: 'error',
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to evaluate capital routes.',
      details: [err?.message || 'Unknown routing error'],
      timestamp: new Date().toISOString()
    };
    return res.status(500).json(errorResponse);
  }
}
