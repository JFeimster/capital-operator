import crypto from 'crypto';
import { FUNDING_TAXONOMY, defaultPurposeForVertical, taxonomyEntryFor } from '../config/fundingTaxonomy.js';
import type {
  FundingIntent,
  FundingIntentInput,
  FundingPurpose,
  FundingVertical,
  MissingFundingField
} from '../types/funding.js';

function parseAmount(text: string): number | undefined {
  const normalized = text.replace(/,/g, '');
  const match = normalized.match(/\$?\s*(\d+(?:\.\d+)?)\s*(m|million|k|thousand)?\b/i);
  if (!match) return undefined;
  const value = Number(match[1]);
  if (!Number.isFinite(value)) return undefined;
  const unit = (match[2] || '').toLowerCase();
  if (unit === 'm' || unit === 'million') return value * 1_000_000;
  if (unit === 'k' || unit === 'thousand') return value * 1_000;
  return value;
}

function classifyText(text: string): { vertical: FundingVertical; fundingPurpose: FundingPurpose } {
  const normalized = ` ${text.toLowerCase()} `;
  for (const entry of FUNDING_TAXONOMY) {
    if (entry.keywords.some(keyword => normalized.includes(keyword.toLowerCase()))) {
      return { vertical: entry.vertical, fundingPurpose: entry.purpose };
    }
  }
  return { vertical: 'business_funding', fundingPurpose: 'general_business_funding' };
}

function humanizePurpose(purpose: FundingPurpose): string {
  return taxonomyEntryFor(purpose)?.label || purpose.replace(/_/g, ' ');
}

export function normalizeFundingIntent(input: FundingIntentInput): FundingIntent {
  const objective = String(input.objective || '').trim();
  const useOfFunds = String(input.useOfFunds || objective || '').trim() || undefined;
  const classified = classifyText([objective, useOfFunds].filter(Boolean).join(' '));
  const vertical = input.vertical || classified.vertical;
  const fundingPurpose = input.fundingPurpose ||
    (input.vertical ? defaultPurposeForVertical(vertical) : classified.fundingPurpose);
  const requestedAmount = typeof input.requestedAmount === 'number' && input.requestedAmount > 0
    ? input.requestedAmount
    : parseAmount(objective);

  return {
    id: `funding_intent_${crypto.randomBytes(6).toString('hex')}`,
    objective: objective || undefined,
    requestedAmount,
    useOfFunds,
    fundingPurpose,
    vertical,
    urgency: input.urgency || 'PLANNING',
    location: input.location,
    source: input.source || 'capital-operator',
    attribution: input.attribution,
    businessProfile: input.businessProfile,
    assetContext: input.assetContext,
    receivableContext: input.receivableContext,
    contractContext: input.contractContext,
    acquisitionContext: input.acquisitionContext,
    realEstateContext: input.realEstateContext,
    currentDebtContext: input.currentDebtContext,
    createdAt: new Date().toISOString(),
    persistence: 'NON_PERSISTENT'
  };
}

export function getFundingIntentMissingFields(intent: FundingIntent): MissingFundingField[] {
  const missing: MissingFundingField[] = [];
  const add = (
    field: string,
    reason: string,
    requiredFor: MissingFundingField['requiredFor'] = 'INTENT'
  ) => missing.push({ field, reason, requiredFor });

  if (!intent.requestedAmount || intent.requestedAmount <= 0) {
    add('requestedAmount', 'A target amount is needed to narrow realistic capital paths.');
  }
  if (!intent.useOfFunds) {
    add('useOfFunds', 'Use of funds is needed to identify the relevant capital category.');
  }

  const profile = intent.businessProfile || {};
  if (typeof profile.timeInBusinessMonths !== 'number') {
    add('businessProfile.timeInBusinessMonths', 'Operating history is commonly required for routing.', 'ROUTING');
  }
  if (typeof profile.annualRevenue !== 'number' && typeof profile.avgMonthlyDeposits !== 'number') {
    add('businessProfile.annualRevenue_or_avgMonthlyDeposits', 'Revenue or deposit context is needed for meaningful capital routing.', 'ROUTING');
  }

  if (intent.vertical === 'equipment') {
    if (!intent.assetContext?.equipmentType) {
      add('assetContext.equipmentType', 'Equipment type is needed to structure an equipment request.');
    }
    if (!intent.assetContext?.equipmentCost && !intent.requestedAmount) {
      add('assetContext.equipmentCost', 'Equipment cost or requested amount is needed.');
    }
  }

  if (intent.vertical === 'government_contract') {
    if (!intent.contractContext?.status) {
      add('contractContext.status', 'Contract status determines whether the request is anticipatory or tied to an executable award.');
    }
    if (!intent.contractContext?.contractAmount) {
      add('contractContext.contractAmount', 'Contract amount helps size execution capital needs.', 'CAPITAL_CASE');
    }
  }

  if (intent.vertical === 'business_acquisition' && !intent.acquisitionContext?.purchasePrice) {
    add('acquisitionContext.purchasePrice', 'Purchase price is needed to structure an acquisition capital stack.');
  }

  if (intent.vertical === 'receivables' && !intent.receivableContext?.outstandingReceivables) {
    add('receivableContext.outstandingReceivables', 'Outstanding eligible receivables are needed for receivables financing review.');
  }

  if (
    intent.vertical === 'real_estate' &&
    !intent.realEstateContext?.propertyValue &&
    !intent.realEstateContext?.purchasePrice
  ) {
    add('realEstateContext.propertyValue_or_purchasePrice', 'Property value or purchase price is needed for real-estate financing review.');
  }

  return missing;
}

export function describeFundingIntent(intent: FundingIntent): string {
  const amount = intent.requestedAmount
    ? `$${intent.requestedAmount.toLocaleString('en-US')}`
    : 'an unspecified amount';
  return `${amount} for ${intent.useOfFunds || humanizePurpose(intent.fundingPurpose)}`;
}
