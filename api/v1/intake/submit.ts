/**
 * Capital Operator — Programmatic Intake Submission API Endpoint
 * api/v1/intake/submit.ts
 */

import crypto from 'crypto';
import { IntakeSubmitRequest, IntakeSubmitResponse, IntakePrequalification, ApiErrorResponse } from '../../../src/types/api';
import { serverEventBus } from '../../../server/events/eventBus';
import { dispatchToIntegrations } from '../../../server/integrations/dispatch';

function calculateDeterministicTriage(req: IntakeSubmitRequest): { score: number; prequal: IntakePrequalification } {
  let score = 50; // Baseline
  const rationale: string[] = [];

  const annualRev = Number(req.annual_revenue) || 0;
  const monthlyDeposits = Number(req.avg_monthly_deposits) || 0;
  const tibMonths = Number(req.time_in_business_months) || 0;
  const creditScore = req.credit_score ? Number(req.credit_score) : 680;

  // 1. Revenue Scale & Stability
  if (annualRev >= 1000000) {
    score += 15;
    rationale.push('Annual revenue >= $1.0M qualifies for middle-market debt funds.');
  } else if (annualRev >= 250000) {
    score += 10;
    rationale.push('Annual revenue >= $250k meets standard commercial lending baseline.');
  } else {
    score -= 10;
    rationale.push('Annual revenue under $250k restricts options to micro-credit or revenue advances.');
  }

  // 2. Operational History
  if (tibMonths >= 36) {
    score += 15;
    rationale.push('3+ years operating history unlocks bank and SBA 7(a) senior lines.');
  } else if (tibMonths >= 12) {
    score += 8;
    rationale.push('1+ year history meets non-bank fintech and asset-based revolver criteria.');
  } else {
    score -= 15;
    rationale.push('Under 12 months operating history requires credit enhancements or collateral.');
  }

  // 3. Deposit Consistency
  const impliedAnnualRunRate = monthlyDeposits * 12;
  if (impliedAnnualRunRate >= annualRev * 0.9) {
    score += 10;
    rationale.push('Deposit run-rate indicates strong, stable cash flow velocity.');
  } else {
    score -= 5;
    rationale.push('Monthly deposit variance suggests seasonal or decelerating revenue.');
  }

  // 4. Principal Credit Profile
  if (creditScore >= 700) {
    score += 10;
    rationale.push('FICO >= 700 allows prime single-digit interest rate pricing.');
  } else if (creditScore >= 620) {
    score += 5;
    rationale.push('FICO >= 620 satisfies standard non-bank asset-based requirements.');
  } else {
    score -= 10;
    rationale.push('Sub-620 FICO requires revenue-based structure or hard collateral.');
  }

  // Clamp score between 10 and 98
  score = Math.max(10, Math.min(98, score));

  // Determine borrowing capacity (typical rule of thumb: 1.0x to 1.5x monthly revenue or 10-15% of annual revenue)
  let maxCreditLimit = Math.round((monthlyDeposits * 1.25) / 5000) * 5000;
  if (annualRev >= 1000000 && tibMonths >= 24) {
    maxCreditLimit = Math.max(maxCreditLimit, Math.round((annualRev * 0.15) / 10000) * 10000);
  }

  let recommendedProgram = 'REVOLVING_CREDIT_LINE';
  let triageTier: IntakePrequalification['triage_tier'] = 'TIER_2_EXPEDITE';

  if (score >= 80) {
    triageTier = 'TIER_1_PRIME';
    recommendedProgram = tibMonths >= 24 && creditScore >= 680 ? 'SBA_7A_SENIOR_LINE' : 'ASSET_BASED_REVOLVER';
  } else if (score >= 60) {
    triageTier = 'TIER_2_EXPEDITE';
    recommendedProgram = 'COMMERCIAL_WORKING_CAPITAL';
  } else if (score >= 40) {
    triageTier = 'TIER_3_STRUCTURED';
    recommendedProgram = 'REVENUE_BASED_FINANCING';
  } else {
    triageTier = 'TIER_4_DECLINED';
    recommendedProgram = 'CREDIT_REPAIR_OR_COLLATERAL_ONLY';
  }

  return {
    score,
    prequal: {
      eligible: score >= 40,
      max_credit_limit: maxCreditLimit,
      recommended_program: recommendedProgram,
      matched_lenders_count: score >= 80 ? 6 : score >= 60 ? 4 : score >= 40 ? 2 : 0,
      triage_tier: triageTier,
      rationale
    }
  };
}

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, X-Partner-ID'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
    const body: IntakeSubmitRequest = rawBody || {};

    // 1. Validation
    const errors: string[] = [];
    if (!body.business_name || body.business_name.trim().length < 2) {
      errors.push('business_name is required (min 2 characters).');
    }
    if (!body.email || !body.email.includes('@')) {
      errors.push('A valid email address is required.');
    }
    if (typeof body.annual_revenue !== 'number' || body.annual_revenue < 0) {
      errors.push('annual_revenue must be a non-negative number.');
    }
    if (typeof body.avg_monthly_deposits !== 'number' || body.avg_monthly_deposits < 0) {
      errors.push('avg_monthly_deposits must be a non-negative number.');
    }
    if (typeof body.time_in_business_months !== 'number' || body.time_in_business_months < 0) {
      errors.push('time_in_business_months must be a non-negative integer.');
    }

    if (errors.length > 0) {
      const errorResponse: ApiErrorResponse = {
        status: 'error',
        code: 'VALIDATION_FAILED',
        message: 'Invalid intake submission parameters.',
        details: errors,
        timestamp: new Date().toISOString()
      };
      return res.status(400).json(errorResponse);
    }

    // 2. Generate Deal Identity & Triage Assessment
    const dealId = `deal_${crypto.randomBytes(6).toString('hex')}`;
    const { score, prequal } = calculateDeterministicTriage(body);

    // 3. Emit Lifecycle Events
    await serverEventBus.emit('deal.submitted', {
      deal_id: dealId,
      business_name: body.business_name,
      email: body.email,
      annual_revenue: body.annual_revenue,
      avg_monthly_deposits: body.avg_monthly_deposits,
      triage_score: score,
      prequalification: prequal,
      partner_id: body.partner_id || req.headers['x-partner-id'] || ''
    });

    await serverEventBus.emit('deal.qualified', {
      deal_id: dealId,
      triage_score: score,
      eligible: prequal.eligible,
      max_credit_limit: prequal.max_credit_limit,
      recommended_program: prequal.recommended_program
    });

    // 4. Server Integration Dispatch
    const dispatchSummary = await dispatchToIntegrations(body, {
      deal_id: dealId,
      triage_score: score,
      partner_id: body.partner_id || req.headers['x-partner-id'] || '',
      utm_source: body.attribution?.utm_source || ''
    });

    const response: IntakeSubmitResponse = {
      status: 'success',
      deal_id: dealId,
      triage_score: score,
      prequalification: prequal,
      dispatched_to: dispatchSummary.dispatchedTo,
      warnings: dispatchSummary.errors,
      timestamp: new Date().toISOString()
    };

    return res.status(200).json(response);
  } catch (err: any) {
    console.error('[API:IntakeSubmit] Internal Error:', err);
    const errorResponse: ApiErrorResponse = {
      status: 'error',
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred while processing the intake request.',
      details: [err?.message || 'Unknown processing failure'],
      timestamp: new Date().toISOString()
    };
    return res.status(500).json(errorResponse);
  }
}
