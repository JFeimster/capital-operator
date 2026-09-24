/**
 * Capital Operator — Canonical Event Types & Envelopes
 * src/types/events.ts
 */

export type CapitalEventType =
  | 'assessment.completed'
  | 'blueprint.generated'
  | 'lead.submitted'
  | 'lead.routed'
  | 'funding_intent.created'
  | 'funding_readiness.completed'
  | 'capital_case.ready'
  | 'deal.created'
  | 'deal.updated'
  | 'deal.status_changed'
  | 'deal.submitted'
  | 'deal.qualified'
  | 'documents.received'
  | 'documents.extracted'
  | 'document.received'
  | 'document.verified'
  | 'capital_case.generated'
  | 'capital_case.reviewed'
  | 'routing.completed'
  | 'route.approved'
  | 'lender.matched'
  | 'submission.created'
  | 'submission.authorized'
  | 'submission.submitted'
  | 'submission.status_changed'
  | 'termsheet.issued'
  | 'offer.received'
  | 'offer.reviewed'
  | 'condition.created'
  | 'condition.completed'
  | 'deal.funded'
  | 'deal.closed'
  | 'facility.funded'
  | 'relationship.followup_due'
  | 'integration.dispatched'
  | 'integration.failed'
  | 'webhook.dispatched'
  | 'webhook.failed';

export interface CapitalEventContext {
  source?: string;
  environment?: string;
  requestId?: string;
  correlationId?: string;
  workspaceId?: string;
  partnerId?: string;
  userId?: string;
  userAgent?: string;
  ipHash?: string;
}

export interface CapitalEvent<T = any> {
  id: string;
  type: CapitalEventType;
  version: string;
  timestamp: string;
  payload: T;
  context?: CapitalEventContext;
}

export interface WebhookDeliveryResult {
  deliveryId: string;
  eventId: string;
  eventType: CapitalEventType;
  targetUrl: string;
  status: 'DELIVERED' | 'FAILED' | 'RETRYING' | 'SKIPPED';
  httpStatus?: number;
  attempt: number;
  durationMs: number;
  error?: string;
  timestamp: string;
}
