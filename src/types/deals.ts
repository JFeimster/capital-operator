/**
 * Capital Operator — Canonical Deal + Audit Contracts
 */

import type { FundingAttribution, FundingPurpose, FundingVertical } from './funding.js';

export type DealStatus =
  | 'DRAFT'
  | 'INTAKE'
  | 'INFORMATION_REQUIRED'
  | 'READY_FOR_CASE'
  | 'CASE_REVIEW'
  | 'READY_FOR_ROUTING'
  | 'ROUTING_REVIEW'
  | 'READY_FOR_SUBMISSION'
  | 'SUBMITTED'
  | 'TERMS_RECEIVED'
  | 'OFFER_REVIEW'
  | 'CONDITIONS'
  | 'FUNDED'
  | 'DECLINED_BY_PARTNER'
  | 'WITHDRAWN'
  | 'CLOSED'
  | 'FOLLOW_UP';

export interface Deal {
  id: string;
  workspaceId: string;
  fundingIntentId: string;
  externalReference?: string;
  businessId?: string;
  ownerId: string;
  source: string;
  attribution?: FundingAttribution;
  status: DealStatus;
  workflowStage: number;
  requestedAmount?: number;
  useOfFunds?: string;
  fundingPurpose: FundingPurpose;
  vertical: FundingVertical;
  capitalCaseId?: string;
  routingStatus: 'NOT_STARTED' | 'SYSTEM_SUGGESTED' | 'HUMAN_APPROVED' | 'CAPITAL_PARTNER_DECISION';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  lastTransitionReason?: string;
}

export type AuditActorType = 'USER' | 'SYSTEM' | 'AI' | 'INTEGRATION' | 'CAPITAL_PARTNER';

export interface AuditRecord {
  eventId: string;
  workspaceId: string;
  entityType:
    | 'workspace'
    | 'membership'
    | 'deal'
    | 'capital_case'
    | 'document'
    | 'submission'
    | 'offer'
    | 'condition'
    | 'relationship'
    | 'attribution';
  entityId: string;
  action: string;
  previousState?: string;
  newState?: string;
  actorType: AuditActorType;
  actorId: string;
  source: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
  correlationId: string;
}
