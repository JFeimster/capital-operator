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

export interface IntakePrequalification {
  eligible: boolean;
  max_credit_limit: number;
  recommended_program: string;
  matched_lenders_count: number;
  triage_tier: 'TIER_1_PRIME' | 'TIER_2_EXPEDITE' | 'TIER_3_STRUCTURED' | 'TIER_4_DECLINED';
  rationale: string[];
}

export interface IntakeSubmitResponse {
  status: 'success';
  deal_id: string;
  triage_score: number;
  prequalification: IntakePrequalification;
  dispatched_to: string[];
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

export type BuyBoxMatchTier = 'HIGH_CONVICTION' | 'QUALIFIED' | 'STRETCH' | 'DISQUALIFIED';

export interface BuyBoxMatchResult {
  fund_id: string;
  fund_name: string;
  program_type: string;
  match_score: number; // 0 - 100
  match_tier: BuyBoxMatchTier;
  max_facility_amount: number;
  estimated_rate_range: string;
  estimated_term: string;
  key_requirements: string[];
  disqualification_reasons?: string[];
}

export interface BuyBoxMatchResponse {
  status: 'success';
  query_summary: {
    requested_amount: number;
    annual_revenue: number;
    qualified_matches_count: number;
    top_recommended_program: string;
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
