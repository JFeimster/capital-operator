import { calculateCommercialDscr } from './capitalMath.js';
import { getFundingIntentMissingFields } from './fundingIntent.js';
import type { CapitalCase, CapitalCaseFact, FundingIntent } from '../types/funding.js';

function addFact(facts: CapitalCaseFact[], key: string, value: unknown) {
  if (value === undefined || value === null || value === '') return;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    facts.push({ key, value, provenance: 'USER_PROVIDED' });
  }
}

export function buildCapitalCase(intent: FundingIntent): CapitalCase {
  const facts: CapitalCaseFact[] = [];
  addFact(facts, 'requestedAmount', intent.requestedAmount);
  addFact(facts, 'useOfFunds', intent.useOfFunds);
  addFact(facts, 'fundingPurpose', intent.fundingPurpose);
  addFact(facts, 'vertical', intent.vertical);
  addFact(facts, 'businessName', intent.businessProfile?.businessName);
  addFact(facts, 'industry', intent.businessProfile?.industry);
  addFact(facts, 'timeInBusinessMonths', intent.businessProfile?.timeInBusinessMonths);
  addFact(facts, 'annualRevenue', intent.businessProfile?.annualRevenue);
  addFact(facts, 'avgMonthlyDeposits', intent.businessProfile?.avgMonthlyDeposits);
  addFact(facts, 'contractStatus', intent.contractContext?.status);
  addFact(facts, 'contractAmount', intent.contractContext?.contractAmount);
  addFact(facts, 'purchasePrice', intent.acquisitionContext?.purchasePrice);
  addFact(facts, 'equipmentType', intent.assetContext?.equipmentType);
  addFact(facts, 'equipmentCost', intent.assetContext?.equipmentCost);
  addFact(facts, 'outstandingReceivables', intent.receivableContext?.outstandingReceivables);

  const strengths: string[] = [];
  const risks: string[] = [];
  const deterministicMetrics: Record<string, number> = {};

  if ((intent.businessProfile?.timeInBusinessMonths || 0) >= 24) {
    strengths.push('At least 24 months of operating history was reported.');
  }
  if ((intent.businessProfile?.annualRevenue || 0) > 0) {
    strengths.push('Business revenue context was supplied.');
  }
  if (
    intent.vertical === 'government_contract' &&
    ['awarded', 'executed', 'currently_invoicing'].includes(intent.contractContext?.status || '')
  ) {
    strengths.push('Government contract status indicates an awarded or executable opportunity.');
  }
  if (
    typeof intent.businessProfile?.timeInBusinessMonths === 'number' &&
    intent.businessProfile.timeInBusinessMonths < 12
  ) {
    risks.push('Operating history is under 12 months and may narrow available capital paths.');
  }

  const noi = intent.realEstateContext?.annualNetOperatingIncome;
  const debtService = intent.realEstateContext?.annualDebtService;
  if (typeof noi === 'number' && typeof debtService === 'number' && debtService > 0) {
    const dscrResult = calculateCommercialDscr({
      netOperatingIncome: noi,
      annualDebtService: debtService
    });
    if (dscrResult.dscr !== null) {
      deterministicMetrics.dscr = dscrResult.dscr;
    }
  }

  const missingInformation = getFundingIntentMissingFields(intent);
  return {
    status: 'BETA',
    intentId: intent.id,
    facts,
    strengths,
    risks,
    missingInformation,
    deterministicMetrics,
    assumptions: [],
    sourceTrace: ['FundingIntent normalized from user-provided input.'],
    reviewFlags: missingInformation.length ? ['MISSING_INFORMATION'] : [],
    humanReviewRequired: true
  };
}
