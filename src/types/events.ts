/**
 * Capital Operator — Canonical Event Types & Envelopes
 * src/types/events.ts
 */

export type CapitalEventType =
  // Diagnostic & Assessment Lifecycle
  | 'assessment.completed'
  | 'blueprint.generated'
  // Lead & Intake Lifecycle
  | 'lead.submitted'
  | 'lead.routed'
  // Pipeline & Underwriting Lifecycle
  | 'deal.created'
  | 'deal.submitted'
  | 'deal.qualified'
  | 'documents.received'
  | 'documents.extracted'
  | 'capital_case.generated'
  // Routing & Submission Lifecycle
  | 'routing.completed'
  | 'lender.matched'
  | 'submission.created'
  | 'termsheet.issued'
  | 'offer.received'
  // Closing & Post-Funding Lifecycle
  | 'deal.funded'
  | 'facility.funded'
  | 'relationship.followup_due'
  // Integration & Infrastructure Lifecycle
  | 'integration.dispatched'
  | 'integration.failed'
  | 'webhook.dispatched'
  | 'webhook.failed';

export interface CapitalEventContext {
  source?: string;
  environment?: string;
  requestId?: string;
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
