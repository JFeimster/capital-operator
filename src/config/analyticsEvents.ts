/**
 * Capital Operator — Analytics Event Definitions
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
  LEAD_SUBMITTED: 'lead_submitted',
  TOOL_CLICKED: 'tool_clicked',
  PARTNER_CTA_CLICKED: 'partner_cta_clicked',
  FUNDING_CTA_CLICKED: 'funding_cta_clicked',
  DEAL_CTA_CLICKED: 'deal_cta_clicked',
  ECOSYSTEM_PRODUCT_CLICKED: 'ecosystem_product_clicked',
  ARCHITECTURE_MAP_NODE_CLICKED: 'architecture_map_node_clicked',
  SITUATION_SELECTED: 'situation_selected',
  ASSESSMENT_RESTARTED: 'assessment_restarted'
} as const;

export type AnalyticsEventName = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS];
