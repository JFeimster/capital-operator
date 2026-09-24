import type { FundingAttribution } from './funding.js';
import type { CapitalCase } from './funding.js';

export type DocumentStatus = 'RECEIVED' | 'PROCESSING' | 'READY' | 'NEEDS_REVIEW' | 'VERIFIED' | 'REJECTED';
export type VerificationStatus = 'UNVERIFIED' | 'HUMAN_VERIFIED' | 'REJECTED';

export interface FundingDocument {
  id: string;
  workspaceId: string;
  dealId: string;
  type: string;
  filename: string;
  mimeType?: string;
  storageReference?: string;
  receivedAt: string;
  source: string;
  status: DocumentStatus;
  extractionStatus: 'NOT_STARTED' | 'PROCESSING' | 'COMPLETE' | 'FAILED';
  verificationStatus: VerificationStatus;
  reviewFlags: string[];
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface CapitalCaseRecord {
  id: string;
  workspaceId: string;
  dealId: string;
  fundingIntentId: string;
  case: CapitalCase;
  preparedBy: string;
  reviewedBy?: string;
  approvedForExternalUseBy?: string;
  status: 'DRAFT' | 'REVIEW_REQUIRED' | 'REVIEWED' | 'APPROVED_FOR_EXTERNAL_USE';
  createdAt: string;
  updatedAt: string;
}

export type RoutingDecisionStatus = 'SYSTEM_SUGGESTED' | 'HUMAN_APPROVED' | 'CAPITAL_PARTNER_DECISION';

export interface RoutingDecision {
  id: string;
  workspaceId: string;
  dealId: string;
  status: RoutingDecisionStatus;
  productPathIds: string[];
  providerIds: string[];
  rationale: string[];
  source: string;
  createdAt: string;
  createdBy: string;
  approvedAt?: string;
  approvedBy?: string;
}

export type SubmissionStatus =
  | 'DRAFT'
  | 'READY'
  | 'AUTHORIZED'
  | 'SUBMITTED'
  | 'ACKNOWLEDGED'
  | 'INFORMATION_REQUESTED'
  | 'UNDER_REVIEW'
  | 'DECISION_RECEIVED'
  | 'WITHDRAWN'
  | 'CLOSED';

export interface Submission {
  id: string;
  workspaceId: string;
  dealId: string;
  destinationType: 'CAPITAL_PARTNER' | 'INTAKE_WORKFLOW' | 'APPLICANT_WORKFLOW' | 'OTHER';
  destinationId?: string;
  destinationUrl?: string;
  status: SubmissionStatus;
  source: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  authorizedAt?: string;
  authorizedBy?: string;
  authorizationReason?: string;
  submittedAt?: string;
  externalReference?: string;
  externalEvidence?: string;
}

export interface OfferPricing {
  apr?: number;
  rate?: number;
  factor?: number;
  raw?: string;
}

export interface Offer {
  id: string;
  workspaceId: string;
  dealId: string;
  submissionId?: string;
  providerId?: string;
  providerName?: string;
  amount?: number;
  pricing?: OfferPricing;
  termMonths?: number;
  paymentAmount?: number;
  paymentFrequency?: string;
  fees?: number;
  collateral?: string;
  guarantees?: string;
  conditions?: string[];
  expiration?: string;
  source: string;
  sourceDocument?: string;
  verificationStatus: VerificationStatus;
  receivedAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export type ConditionStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'WAIVED';

export interface FundingCondition {
  id: string;
  workspaceId: string;
  dealId: string;
  submissionId?: string;
  offerId?: string;
  requestedItem: string;
  responsibleParty: 'APPLICANT' | 'OPERATOR' | 'CAPITAL_PARTNER' | 'OTHER';
  dueDate?: string;
  status: ConditionStatus;
  source: string;
  notes?: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  completedAt?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface RelationshipLifecycle {
  id: string;
  workspaceId: string;
  dealId: string;
  ownerId: string;
  nextAction?: string;
  nextActionDate?: string;
  relationshipStatus: 'ACTIVE' | 'FOLLOW_UP' | 'DORMANT' | 'CLOSED';
  renewalTrigger?: string;
  followUpTrigger?: string;
  notes?: string;
  updatedAt: string;
  updatedBy: string;
}

export type CompensationStatus = 'UNKNOWN' | 'EXPECTED' | 'EARNED' | 'PAID' | 'DISPUTED' | 'NOT_APPLICABLE';

export interface CompensationMetadata {
  status: CompensationStatus;
  model?: 'FLAT_FEE' | 'PERCENT_OF_FUNDED_AMOUNT' | 'BPS' | 'REVENUE_SHARE' | 'OTHER';
  rate?: number;
  amount?: number;
  currency?: string;
  payor?: string;
  recipient?: string;
  source: string;
  sourceReference?: string;
  earnedAt?: string;
  paidAt?: string;
  notes?: string;
}

export interface DealAttributionRecord {
  id: string;
  workspaceId: string;
  dealId: string;
  attribution: FundingAttribution;
  compensation?: CompensationMetadata;
  source: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface FundingOutcomeRecord {
  dealId: string;
  outcome: 'FUNDED' | 'CLOSED';
  externalConfirmation?: boolean;
  externalEvidence?: string;
  fundedAmount?: number;
  fundingDate?: string;
  reason: string;
}
