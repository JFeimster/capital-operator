/**
 * Capital Operator — API Contracts & Types
 * src/types/api.ts
 */

export type CapabilityStatus = 'LIVE' | 'BETA' | 'SANDBOX' | 'SPECIFIED' | 'PLANNED';

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'error';
  version: string;
  service: string;
  environment: string;
  timestamp: string;
  uptimeSeconds: number;
  capabilities: {
    diagnostic: CapabilityStatus;
    blueprint: CapabilityStatus;
    intake: CapabilityStatus;
    routing: CapabilityStatus;
    webhooks: CapabilityStatus;
    integrations: {
      hubspot: CapabilityStatus;
      notion: CapabilityStatus;
      n8n: CapabilityStatus;
      genericWebhook: CapabilityStatus;
    };
  };
}

export interface IntakeSubmitRequest {
  business_name: string;
  contact_name?: string;
  email: string;
  phone?: string;
  ein?: string;
  annual_revenue: number;
  avg_monthly_deposits: number;
  time_in_business_months: number;
  credit_score?: number;
  requested_facility?: string;
  target_amount?: number;
  industry?: string;
  use_of_funds?: string;
  partner_id?: string;
  notes?: string;
  attribution?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    partner_id?: string;
    ref?: string;
    source_url?: string;
  };
}

export type IntakeWorkflowPriority = 'STANDARD' | 'EXPEDITE' | 'HUMAN_REVIEW';

export interface IntakeWorkflowClassification {
  priority: IntakeWorkflowPriority;
  flags: string[];
  rationale: string[];
  human_review_required: true;
}

export interface IntakeSubmitResponse {
  status: 'success';
  submission_id: string;
  workflow: IntakeWorkflowClassification;
  dispatched_to: string[];
  persisted_externally: boolean;
  degraded: boolean;
  warnings?: string[];
  timestamp: string;
}

export interface BuyBoxMatchRequest {
  annual_revenue: number;
  avg_monthly_deposits: number;
  time_in_business_months: number;
  credit_score?: number;
  industry?: string;
  collateral_available?: boolean;
  requested_amount: number;
  use_of_funds?: string;
  has_tax_liens?: boolean;
  has_bankruptcy?: boolean;
}

export type BuyBoxMatchTier = 'POTENTIAL_FIT' | 'REVIEW' | 'NOT_INDICATED';

export interface BuyBoxMatchResult {
  route_id: string;
  program_type: string;
  match_tier: BuyBoxMatchTier;
  fit_signals: string[];
  review_flags: string[];
  human_review_required: true;
}

export interface BuyBoxMatchResponse {
  status: 'success';
  capability_status: 'SANDBOX';
  disclaimer: string;
  query_summary: {
    requested_amount: number;
    annual_revenue: number;
    potential_routes_count: number;
  };
  matches: BuyBoxMatchResult[];
  timestamp: string;
}

export interface WebhookTestRequest {
  target_url: string;
  secret: string;
  event_type?: string;
  sample_payload?: Record<string, unknown>;
}

export interface WebhookTestResponse {
  status: 'success' | 'failed';
  delivery_id: string;
  target_url: string;
  event_type: string;
  http_status?: number;
  signature_header: string;
  duration_ms: number;
  response_body?: string;
  error?: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  status: 'error';
  code: string;
  message: string;
  details?: Record<string, unknown> | string[];
  timestamp: string;
}
