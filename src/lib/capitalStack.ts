/**
 * Capital Operator — Deterministic Capital Stack Planning
 *
 * Produces planning categories, not lender offers or eligibility decisions.
 */

export type CapitalStackComponent =
  | 'OPERATING_CASH'
  | 'REVOLVING_LIQUIDITY'
  | 'TERM_DEBT'
  | 'EQUIPMENT_FINANCE'
  | 'RECEIVABLES_FINANCE'
  | 'REAL_ESTATE_DEBT'
  | 'EQUITY_OR_SUBORDINATED_CAPITAL';

export interface CapitalStackInput {
  requestedAmount: number;
  useOfFunds?: string;
  collateralAvailable?: boolean;
  recurringWorkingCapitalNeed?: boolean;
  receivablesDriven?: boolean;
  realEstateRelated?: boolean;
  preserveLiquidity?: boolean;
}

export interface CapitalStackRecommendation {
  components: Array<{
    component: CapitalStackComponent;
    reason: string;
    priority: 'PRIMARY' | 'SECONDARY' | 'CONSIDER';
  }>;
  humanReviewRequired: true;
  status: 'BETA';
  disclaimer: string;
}

export function recommendCapitalStack(input: CapitalStackInput): CapitalStackRecommendation {
  if (!Number.isFinite(input.requestedAmount) || input.requestedAmount <= 0) {
    throw new Error('requestedAmount must be a finite number greater than 0.');
  }

  const use = (input.useOfFunds || '').toLowerCase();
  const components: CapitalStackRecommendation['components'] = [];

  const add = (component: CapitalStackComponent, reason: string, priority: 'PRIMARY' | 'SECONDARY' | 'CONSIDER') => {
    if (!components.some(item => item.component === component)) components.push({ component, reason, priority });
  };

  if (/equipment|machinery|vehicle|fleet/.test(use)) {
    add('EQUIPMENT_FINANCE', 'Use of funds indicates financeable equipment or machinery.', 'PRIMARY');
  }
  if (input.receivablesDriven || /invoice|receivable|accounts receivable/.test(use)) {
    add('RECEIVABLES_FINANCE', 'Working-capital need appears linked to receivables timing.', 'PRIMARY');
  }
  if (input.realEstateRelated || /real estate|property|building|acquisition of property/.test(use)) {
    add('REAL_ESTATE_DEBT', 'Use of funds indicates a real-estate-related capital need.', 'PRIMARY');
  }
  if (input.recurringWorkingCapitalNeed || /working capital|payroll|inventory|hiring/.test(use)) {
    add('REVOLVING_LIQUIDITY', 'Need may recur, so a reusable liquidity facility should be evaluated.', 'PRIMARY');
  }
  if (components.length === 0 || /expansion|acquisition|refinance|consolidation/.test(use)) {
    add('TERM_DEBT', 'A defined multi-period use of funds may be suited to amortizing term capital.', components.length === 0 ? 'PRIMARY' : 'SECONDARY');
  }
  if (input.preserveLiquidity) {
    add('OPERATING_CASH', 'Preserve a deliberate operating-cash reserve rather than deploying all liquidity.', 'CONSIDER');
  }
  if (input.requestedAmount >= 1_000_000 && !input.collateralAvailable) {
    add('EQUITY_OR_SUBORDINATED_CAPITAL', 'Larger uncollateralized requirements may warrant evaluating non-senior capital alongside debt.', 'CONSIDER');
  }

  return {
    components,
    humanReviewRequired: true,
    status: 'BETA',
    disclaimer:
      'This is a capital-structure planning aid. It does not represent lender availability, approval, pricing, eligibility, or a binding recommendation.'
  };
}
