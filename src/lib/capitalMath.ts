/**
 * Capital Operator — Deterministic Capital Math
 *
 * Pure calculations only. These functions do not make credit decisions,
 * predict approval, or represent lender eligibility.
 */

export interface DscrInput {
  netOperatingIncome: number;
  annualDebtService: number;
}

export interface DscrResult {
  dscr: number | null;
  coverageBand: 'UNDEFINED' | 'BELOW_1_00' | 'ONE_TO_1_24' | 'ONE_25_PLUS';
  formula: 'netOperatingIncome / annualDebtService';
  humanReviewRequired: true;
  disclaimer: string;
}

export function calculateCommercialDscr(input: DscrInput): DscrResult {
  if (!Number.isFinite(input.netOperatingIncome)) {
    throw new Error('netOperatingIncome must be a finite number.');
  }
  if (!Number.isFinite(input.annualDebtService) || input.annualDebtService <= 0) {
    throw new Error('annualDebtService must be a finite number greater than 0.');
  }

  const dscr = Number((input.netOperatingIncome / input.annualDebtService).toFixed(4));
  const coverageBand: DscrResult['coverageBand'] =
    dscr < 1 ? 'BELOW_1_00' : dscr < 1.25 ? 'ONE_TO_1_24' : 'ONE_25_PLUS';

  return {
    dscr,
    coverageBand,
    formula: 'netOperatingIncome / annualDebtService',
    humanReviewRequired: true,
    disclaimer:
      'DSCR is a deterministic ratio only. It is not an approval, eligibility determination, lender quote, or substitute for human underwriting review.'
  };
}
