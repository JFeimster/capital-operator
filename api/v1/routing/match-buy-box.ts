/**
 * Capital Operator — Buy-Box Matching API Endpoint
 * api/v1/routing/match-buy-box.ts
 */

import { BuyBoxMatchRequest, BuyBoxMatchResponse, BuyBoxMatchResult, ApiErrorResponse } from '../../../src/types/api';
import { serverEventBus } from '../../../server/events/eventBus';

interface CreditFundDefinition {
  fund_id: string;
  fund_name: string;
  program_type: string;
  min_annual_revenue: number;
  min_monthly_deposits: number;
  min_tib_months: number;
  min_credit_score: number;
  requires_collateral: boolean;
  disallows_tax_liens: boolean;
  disallows_bankruptcy: boolean;
  max_facility_multiplier: number; // multiplier of monthly deposits or annual revenue
  rate_range: string;
  term_range: string;
  requirements: string[];
}

const CREDIT_FUNDS_CATALOG: CreditFundDefinition[] = [
  {
    fund_id: 'fund_sba_preferred_desk',
    fund_name: 'Moonshine Preferred SBA 7(a) & Senior Bank Desk',
    program_type: 'SBA_7A_SENIOR_FACILITY',
    min_annual_revenue: 350000,
    min_monthly_deposits: 30000,
    min_tib_months: 24,
    min_credit_score: 680,
    requires_collateral: false,
    disallows_tax_liens: true,
    disallows_bankruptcy: true,
    max_facility_multiplier: 1.5, // 15% of annual revenue
    rate_range: 'Prime + 2.75% to Prime + 4.50%',
    term_range: '5 to 10 Years',
    requirements: [
      '2 Years Business Tax Returns (1120/1065)',
      'Interim P&L and Balance Sheet',
      'Personal Financial Statement (SBA Form 413)',
      'Debt Schedule (Form 108)'
    ]
  },
  {
    fund_id: 'fund_fintech_abl_revolver',
    fund_name: 'Institutional Asset-Based Revolver Network',
    program_type: 'ASSET_BASED_REVOLVER',
    min_annual_revenue: 250000,
    min_monthly_deposits: 20000,
    min_tib_months: 12,
    min_credit_score: 600,
    requires_collateral: true,
    disallows_tax_liens: false,
    disallows_bankruptcy: true,
    max_facility_multiplier: 1.8,
    rate_range: '8.5% to 15.0% APR',
    term_range: '12 to 24 Months Revolving',
    requirements: [
      '6 Months Business Bank Statements',
      'Accounts Receivable Aging Report (>90 days)',
      'Current Balance Sheet'
    ]
  },
  {
    fund_id: 'fund_growth_rbf_desk',
    fund_name: 'Working Capital & Revenue-Based Financing Desk',
    program_type: 'REVENUE_BASED_FINANCING',
    min_annual_revenue: 120000,
    min_monthly_deposits: 10000,
    min_tib_months: 6,
    min_credit_score: 550,
    requires_collateral: false,
    disallows_tax_liens: false,
    disallows_bankruptcy: false,
    max_facility_multiplier: 1.25,
    rate_range: '1.14 - 1.28 Factor Rate (16% - 30% APR Equiv)',
    term_range: '6 to 18 Months',
    requirements: [
      '3-6 Months Business Bank Statements (PDF or Plaid)',
      'Government Issued Photo ID',
      'Voided Business Check'
    ]
  },
  {
    fund_id: 'fund_equipment_capital_fund',
    fund_name: 'Commercial Equipment & Machinery Leasing Desk',
    program_type: 'EQUIPMENT_FINANCING',
    min_annual_revenue: 180000,
    min_monthly_deposits: 15000,
    min_tib_months: 12,
    min_credit_score: 620,
    requires_collateral: true,
    disallows_tax_liens: true,
    disallows_bankruptcy: true,
    max_facility_multiplier: 2.0,
    rate_range: '7.9% to 14.5% APR',
    term_range: '24 to 60 Months',
    requirements: [
      'Equipment Vendor Invoice or Quote',
      '6 Months Business Bank Statements',
      'Corporate Entity Verification'
    ]
  },
  {
    fund_id: 'fund_invoice_factoring_line',
    fund_name: 'B2B Invoice Factoring & AR Line Facility',
    program_type: 'INVOICE_FACTORING',
    min_annual_revenue: 150000,
    min_monthly_deposits: 12000,
    min_tib_months: 3,
    min_credit_score: 520,
    requires_collateral: true,
    disallows_tax_liens: false,
    disallows_bankruptcy: false,
    max_facility_multiplier: 2.5,
    rate_range: '1.25% to 3.25% per 30 Days',
    term_range: 'Ongoing Month-to-Month',
    requirements: [
      'Sample B2B Invoices with Proof of Delivery',
      'Customer Master List & Debtor Credit Check',
      '3 Months Bank Statements'
    ]
  }
];

export function evaluateBuyBoxMatches(req: BuyBoxMatchRequest): BuyBoxMatchResult[] {
  const annualRev = Number(req.annual_revenue) || 0;
  const monthlyDeposits = Number(req.avg_monthly_deposits) || 0;
  const tibMonths = Number(req.time_in_business_months) || 0;
  const creditScore = req.credit_score ? Number(req.credit_score) : 670;
  const requestedAmount = Number(req.requested_amount) || 100000;
  const hasTaxLiens = Boolean(req.has_tax_liens);
  const hasBankruptcy = Boolean(req.has_bankruptcy);
  const hasCollateral = Boolean(req.collateral_available);

  const results: BuyBoxMatchResult[] = [];

  for (const fund of CREDIT_FUNDS_CATALOG) {
    let score = 100;
    const disqualifications: string[] = [];

    // 1. Revenue Check
    if (annualRev < fund.min_annual_revenue) {
      const revDeficit = Math.round(((fund.min_annual_revenue - annualRev) / fund.min_annual_revenue) * 100);
      score -= Math.min(40, revDeficit);
      if (annualRev < fund.min_annual_revenue * 0.7) {
        disqualifications.push(`Annual revenue ($${annualRev.toLocaleString()}) is below minimum requirement ($${fund.min_annual_revenue.toLocaleString()}).`);
      }
    }

    // 2. Deposit Velocity Check
    if (monthlyDeposits < fund.min_monthly_deposits) {
      score -= 20;
      if (monthlyDeposits < fund.min_monthly_deposits * 0.75) {
        disqualifications.push(`Average monthly deposits ($${monthlyDeposits.toLocaleString()}) below minimum ($${fund.min_monthly_deposits.toLocaleString()}).`);
      }
    }

    // 3. Time in Business Check
    if (tibMonths < fund.min_tib_months) {
      const monthDeficit = fund.min_tib_months - tibMonths;
      score -= Math.min(35, monthDeficit * 2);
      disqualifications.push(`Operating history (${tibMonths} mos) is below required ${fund.min_tib_months} months.`);
    }

    // 4. Credit Score Check
    if (creditScore < fund.min_credit_score) {
      const creditDeficit = fund.min_credit_score - creditScore;
      score -= Math.min(40, creditDeficit);
      if (creditScore < fund.min_credit_score - 40) {
        disqualifications.push(`Principal credit score (${creditScore}) is below program threshold (${fund.min_credit_score}).`);
      }
    }

    // 5. Hard Disqualifiers
    if (fund.disallows_tax_liens && hasTaxLiens) {
      score -= 30;
      disqualifications.push('Active federal/state tax liens prohibit standard approval.');
    }
    if (fund.disallows_bankruptcy && hasBankruptcy) {
      score -= 50;
      disqualifications.push('Prior bankruptcy within 3 years violates credit fund underwriting policy.');
    }
    if (fund.requires_collateral && !hasCollateral) {
      score -= 25;
      disqualifications.push('Program requires pledgeable assets or accounts receivable collateral.');
    }

    score = Math.max(0, Math.min(100, Math.round(score)));

    let matchTier: BuyBoxMatchResult['match_tier'] = 'DISQUALIFIED';
    if (disqualifications.length === 0 && score >= 85) {
      matchTier = 'HIGH_CONVICTION';
    } else if (disqualifications.length <= 1 && score >= 65) {
      matchTier = 'QUALIFIED';
    } else if (score >= 45) {
      matchTier = 'STRETCH';
    }

    const calculatedMaxFacility = Math.min(
      5000000,
      Math.max(25000, Math.round((monthlyDeposits * fund.max_facility_multiplier) / 5000) * 5000)
    );

    results.push({
      fund_id: fund.fund_id,
      fund_name: fund.fund_name,
      program_type: fund.program_type,
      match_score: score,
      match_tier: matchTier,
      max_facility_amount: calculatedMaxFacility,
      estimated_rate_range: fund.rate_range,
      estimated_term: fund.term_range,
      key_requirements: fund.requirements,
      disqualification_reasons: disqualifications.length > 0 ? disqualifications : undefined
    });
  }

  // Sort descending by match score
  return results.sort((a, b) => b.match_score - a.match_score);
}

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
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
    const body: BuyBoxMatchRequest = rawBody || {};

    const errors: string[] = [];
    if (typeof body.annual_revenue !== 'number' || body.annual_revenue < 0) {
      errors.push('annual_revenue must be a non-negative number.');
    }
    if (typeof body.avg_monthly_deposits !== 'number' || body.avg_monthly_deposits < 0) {
      errors.push('avg_monthly_deposits must be a non-negative number.');
    }
    if (typeof body.time_in_business_months !== 'number' || body.time_in_business_months < 0) {
      errors.push('time_in_business_months must be a non-negative integer.');
    }
    if (typeof body.requested_amount !== 'number' || body.requested_amount <= 0) {
      errors.push('requested_amount must be greater than 0.');
    }

    if (errors.length > 0) {
      const errorResponse: ApiErrorResponse = {
        status: 'error',
        code: 'VALIDATION_FAILED',
        message: 'Invalid buy-box query attributes.',
        details: errors,
        timestamp: new Date().toISOString()
      };
      return res.status(400).json(errorResponse);
    }

    const matches = evaluateBuyBoxMatches(body);
    const qualifiedMatches = matches.filter(m => m.match_tier === 'HIGH_CONVICTION' || m.match_tier === 'QUALIFIED');

    // Emit event
    await serverEventBus.emit('routing.completed', {
      requested_amount: body.requested_amount,
      qualified_count: qualifiedMatches.length,
      top_match: matches[0]?.program_type || 'NONE',
      top_score: matches[0]?.match_score || 0
    });

    const response: BuyBoxMatchResponse = {
      status: 'success',
      query_summary: {
        requested_amount: body.requested_amount,
        annual_revenue: body.annual_revenue,
        qualified_matches_count: qualifiedMatches.length,
        top_recommended_program: matches[0]?.program_type || 'REVOLVING_CREDIT_LINE'
      },
      matches,
      timestamp: new Date().toISOString()
    };

    return res.status(200).json(response);
  } catch (err: any) {
    console.error('[API:BuyBoxMatch] Internal Error:', err);
    const errorResponse: ApiErrorResponse = {
      status: 'error',
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to evaluate buy-box matches.',
      details: [err?.message || 'Unknown matching error'],
      timestamp: new Date().toISOString()
    };
    return res.status(500).json(errorResponse);
  }
}
