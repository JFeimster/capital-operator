/**
 * Capital Operator — Canonical SANDBOX Capability Routing
 *
 * Informational route classification only. This is not a live lender network,
 * lender buy-box database, approval engine, or pricing service.
 */

import type { BuyBoxMatchRequest, BuyBoxMatchResult } from '../types/api.js';

type RouteDefinition = {
  route_id: string;
  program_type: string;
  fit(req: BuyBoxMatchRequest): string[];
  flags(req: BuyBoxMatchRequest): string[];
};

const ROUTE_CATALOG: RouteDefinition[] = [
  {
    route_id: 'route_sba_bank_review',
    program_type: 'SBA_OR_BANK_TERM_REVIEW',
    fit: req => [
      ...(req.time_in_business_months >= 24 ? ['Established operating history'] : []),
      ...(req.annual_revenue >= 250000 ? ['Commercial revenue scale'] : [])
    ],
    flags: req => [
      ...(req.time_in_business_months < 24 ? ['Operating history requires review'] : []),
      ...(req.has_tax_liens ? ['Tax lien requires human review'] : []),
      ...(req.has_bankruptcy ? ['Bankruptcy history requires human review'] : [])
    ]
  },
  {
    route_id: 'route_asset_based_review',
    program_type: 'ASSET_BASED_FINANCING_REVIEW',
    fit: req => [
      ...(req.collateral_available ? ['Collateral indicated'] : []),
      ...(req.requested_amount >= 100000 ? ['Structured facility request'] : [])
    ],
    flags: req => (!req.collateral_available ? ['No collateral indicated'] : [])
  },
  {
    route_id: 'route_revenue_based_review',
    program_type: 'REVENUE_BASED_FINANCING_REVIEW',
    fit: req => [
      ...(req.avg_monthly_deposits > 0 ? ['Operating deposits reported'] : []),
      ...(req.time_in_business_months >= 6 ? ['Operating history reported'] : [])
    ],
    flags: req => (req.avg_monthly_deposits <= 0 ? ['Deposit history required'] : [])
  },
  {
    route_id: 'route_equipment_review',
    program_type: 'EQUIPMENT_FINANCING_REVIEW',
    fit: req => (/equipment|machinery|vehicle/i.test(req.use_of_funds || '') ? ['Use of funds indicates equipment or machinery'] : []),
    flags: req => (/equipment|machinery|vehicle/i.test(req.use_of_funds || '') ? [] : ['Equipment use of funds not indicated'])
  },
  {
    route_id: 'route_receivables_review',
    program_type: 'RECEIVABLES_OR_FACTORING_REVIEW',
    fit: req => (/invoice|receivable|ar |accounts receivable/i.test(req.use_of_funds || '') ? ['Use of funds references receivables/invoices'] : []),
    flags: req => (/invoice|receivable|ar |accounts receivable/i.test(req.use_of_funds || '') ? [] : ['Receivables use case not indicated'])
  }
];

export function evaluateCapitalRoutes(req: BuyBoxMatchRequest): BuyBoxMatchResult[] {
  return ROUTE_CATALOG.map(route => {
    const fitSignals = route.fit(req);
    const reviewFlags = route.flags(req);
    let matchTier: BuyBoxMatchResult['match_tier'] = 'NOT_INDICATED';

    if (fitSignals.length >= 2 && reviewFlags.length === 0) matchTier = 'POTENTIAL_FIT';
    else if (fitSignals.length > 0) matchTier = 'REVIEW';

    return {
      route_id: route.route_id,
      program_type: route.program_type,
      match_tier: matchTier,
      fit_signals: fitSignals,
      review_flags: reviewFlags,
      human_review_required: true as const
    };
  }).sort((a, b) => {
    const weight: Record<BuyBoxMatchResult['match_tier'], number> = {
      POTENTIAL_FIT: 2,
      REVIEW: 1,
      NOT_INDICATED: 0
    };
    return weight[b.match_tier] - weight[a.match_tier];
  });
}
