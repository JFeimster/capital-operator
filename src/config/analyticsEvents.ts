/**
 * Capital Operator — Canonical Analytics Event Definitions
 * src/config/analyticsEvents.ts
 */

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  ASSESSMENT_STARTED: 'capital_operator_started',
  ASSESSMENT_STEP_COMPLETED: 'assessment_step_completed',
  ASSESSMENT_COMPLETED: 'assessment_completed',
  BLUEPRINT_GENERATED: 'blueprint_generated',
  BLUEPRINT_COPIED: 'blueprint_copied',
  BLUEPRINT_PRINTED: 'blueprint_printed',
  CAPABILITY_VIEWED: 'capability_viewed',
  TOOL_CLICKED: 'tool_clicked',
  AFFILIATE_CLICKED: 'affiliate_clicked',
  MOONSHINE_ASSET_CLICKED: 'moonshine_asset_clicked',
  LEAD_SUBMITTED: 'lead_submitted',
  PARTNER_CTA_CLICKED: 'partner_cta_clicked',
  FUNDING_CTA_CLICKED: 'funding_cta_clicked',
  DEAL_CTA_CLICKED: 'deal_cta_clicked',
  CTA_ACTION: 'cta_action',
  MARKETING_CTA_CLICK: 'marketing_cta_click',
  SECTION_VIEW: 'section_view',
  INTEGRATION_VIEWED: 'integration_viewed',
  EMBED_COPIED: 'embed_copied',
  ECOSYSTEM_PRODUCT_CLICKED: 'ecosystem_product_clicked',
  ARCHITECTURE_MAP_NODE_CLICKED: 'architecture_map_node_clicked',
  SITUATION_SELECTED: 'situation_selected',
  ASSESSMENT_RESTARTED: 'assessment_restarted',
  API_REQUEST: 'api_request',
  API_SUCCESS: 'api_success',
  API_FAILURE: 'api_failure',
  ROUTING_COMPLETED: 'routing_completed',
  INTEGRATION_DISPATCHED: 'integration_dispatched',
  INTEGRATION_FAILED: 'integration_failed',
  WEBHOOK_DISPATCHED: 'webhook_dispatched',
  WEBHOOK_FAILED: 'webhook_failed'
} as const;

export type AnalyticsEventName = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS];
