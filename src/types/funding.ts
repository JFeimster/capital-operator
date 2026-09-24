/**
 * Capital Operator — Funding Outcome Domain
 *
 * Outcome-oriented contracts used by REST, MCP, and operator surfaces.
 * These contracts describe preparation and orchestration. They never represent
 * lender approval, pricing, eligibility, or capital availability.
 */

export type FundingVertical =
  | 'business_funding'
  | 'equipment'
  | 'business_acquisition'
  | 'real_estate'
  | 'receivables'
  | 'government_contract'
  | 'ecommerce'
  | 'business_credit';

export type FundingPurpose =
  | 'working_capital'
  | 'business_line_of_credit'
  | 'term_loan'
  | 'revenue_based_financing'
  | 'merchant_cash_advance'
  | 'startup_capital'
  | 'debt_refinance'
  | 'equipment_financing'
  | 'equipment_lease'
  | 'vehicle_fleet'
  | 'business_acquisition'
  | 'acquisition_working_capital'
  | 'dscr_real_estate'
  | 'commercial_mortgage'
  | 'bridge_real_estate'
  | 'investment_property'
  | 'factoring'
  | 'invoice_financing'
  | 'accounts_receivable_line'
  | 'purchase_order_finance'
  | 'government_contract_working_capital'
  | 'contract_mobilization'
  | 'contract_payroll'
  | 'contract_equipment'
  | 'ecommerce_working_capital'
  | 'ecommerce_inventory'
  | 'ecommerce_advertising'
  | 'business_credit_building'
  | 'business_cards_or_loc'
  | 'general_business_funding';

export type FundingUrgency = 'ASAP' | '30_DAYS' | '60_90_DAYS' | 'PLANNING';
export type FactProvenance = 'USER_PROVIDED' | 'AI_EXTRACTED' | 'SYSTEM_CALCULATED' | 'HUMAN_VERIFIED';

export interface FundingAttribution {
  source?: string;
  campaign?: string;
  referralPartner?: string;
  affiliateSubId?: string;
  sourceTool?: string;
  sourceAsset?: string;
  intakePath?: string;
  relationshipOwner?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface BusinessFundingProfile {
  businessName?: string;
  industry?: string;
  entityType?: string;
  state?: string;
  timeInBusinessMonths?: number;
  annualRevenue?: number;
  avgMonthlyDeposits?: number;
  creditScore?: number;
  ownershipPercent?: number;
  existingDebtBalance?: number;
}

export interface FundingIntentInput {
  objective?: string;
  requestedAmount?: number;
  useOfFunds?: string;
  fundingPurpose?: FundingPurpose;
  vertical?: FundingVertical;
  urgency?: FundingUrgency;
  location?: string;
  source?: string;
  attribution?: FundingAttribution;
  businessProfile?: BusinessFundingProfile;
  assetContext?: {
    equipmentType?: string;
    equipmentCost?: number;
    vendor?: string;
  };
  receivableContext?: {
    outstandingReceivables?: number;
    invoiceType?: 'B2B' | 'B2G' | 'B2C';
    averageDaysToPay?: number;
  };
  contractContext?: {
    status?: 'anticipated' | 'bid_submitted' | 'awarded' | 'executed' | 'currently_invoicing';
    contractAmount?: number;
    expectedStartDate?: string;
    customerType?: 'federal' | 'state' | 'local' | 'commercial' | 'other';
  };
  acquisitionContext?: {
    purchasePrice?: number;
    sellerDiscretionaryEarnings?: number;
    equityAvailable?: number;
    sellerNote?: number;
  };
  realEstateContext?: {
    propertyValue?: number;
    purchasePrice?: number;
    annualNetOperatingIncome?: number;
    annualDebtService?: number;
    occupancy?: number;
  };
  currentDebtContext?: {
    refinanceAmount?: number;
    currentMonthlyDebtService?: number;
  };
}

export interface FundingIntent extends FundingIntentInput {
  id: string;
  fundingPurpose: FundingPurpose;
  vertical: FundingVertical;
  source: string;
  createdAt: string;
  workspaceId?: string;
  businessId?: string;
  persistence: 'NON_PERSISTENT' | 'PERSISTED';
}

export interface MissingFundingField {
  field: string;
  reason: string;
  requiredFor: 'INTENT' | 'READINESS' | 'ROUTING' | 'CAPITAL_CASE' | 'PROVIDER_REVIEW';
}

export interface FundingProductPath {
  id: string;
  name: string;
  vertical: FundingVertical;
  purposes: FundingPurpose[];
  description: string;
  documentProfile: string;
  provenance: {
    sourceRepository: string;
    sourcePath: string;
    sourceCommit: string;
    providerSpecific: false;
    importedAt: string;
  };
}

export interface ProviderCriteriaRecord {
  id: string;
  providerId: string;
  productPathId: string;
  source: string;
  verifiedAt: string;
  reviewDate?: string;
  confidence: 'VERIFIED' | 'REVIEW_REQUIRED';
  criteria: Record<string, string | number | boolean | string[]>;
}

export interface FundingProviderRecord {
  id: string;
  name: string;
  status: 'ACTIVE_VERIFIED' | 'INACTIVE' | 'REVIEW_REQUIRED';
  source: string;
  sourceUrl?: string;
  lastVerifiedAt: string;
  geography?: string[];
  applicationUrl?: string;
  productPathIds: string[];
  criteriaIds: string[];
}

export interface CapitalCategoryFit {
  productPathId: string;
  productName: string;
  fit: 'POTENTIAL_PATH' | 'REVIEW';
  reasons: string[];
  humanReviewRequired: true;
}

export interface ProviderCandidate {
  providerId: string;
  providerName: string;
  productPathId: string;
  whyRelevant: string[];
  criteriaSource: string;
  lastVerifiedAt: string;
  applicationUrl?: string;
  humanReviewRequired: true;
}

export interface FundingOptionsResult {
  status: 'LIVE' | 'BETA';
  intent: FundingIntent;
  categoryFits: CapitalCategoryFit[];
  providerCandidates: ProviderCandidate[];
  providerDiscoveryStatus: 'VERIFIED_RESULTS' | 'NO_VERIFIED_PROVIDER_DATA';
  disclaimer: string;
  nextAction: string;
  humanReviewRequired: true;
}

export interface FundingReadinessSection {
  id: 'required_information' | 'documents' | 'capital_case' | 'routing';
  status: 'READY' | 'NEEDS_INFORMATION' | 'REVIEW';
  missing: MissingFundingField[];
}

export interface FundingReadinessResult {
  status: 'LIVE';
  intentId: string;
  sections: FundingReadinessSection[];
  missingInformation: MissingFundingField[];
  readyForCapitalCase: boolean;
  readyForRouting: boolean;
  nextActions: string[];
  humanReviewRequired: true;
}

export interface FundingDocumentChecklist {
  status: 'LIVE';
  intentId?: string;
  vertical: FundingVertical;
  fundingPurpose: FundingPurpose;
  sourceType: 'CANONICAL_PRODUCT_PREPARATION' | 'GENERIC_PREPARATION_GUIDANCE';
  items: Array<{
    id: string;
    label: string;
    required: boolean;
    rationale: string;
  }>;
  disclaimer: string;
}

export interface CapitalCaseFact {
  key: string;
  value: string | number | boolean;
  provenance: FactProvenance;
}

export interface CapitalCase {
  status: 'BETA';
  intentId: string;
  facts: CapitalCaseFact[];
  strengths: string[];
  risks: string[];
  missingInformation: MissingFundingField[];
  deterministicMetrics: Record<string, number>;
  assumptions: string[];
  sourceTrace: string[];
  reviewFlags: string[];
  humanReviewRequired: true;
}

export interface FundingJourneyResult {
  intent: FundingIntent;
  readiness: FundingReadinessResult;
  capitalCase: CapitalCase;
  options: FundingOptionsResult;
  documentChecklist: FundingDocumentChecklist;
  nextAction: string;
}
