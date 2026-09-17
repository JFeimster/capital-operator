/**
 * Capital Operator — Analytics Event Emitter
 * src/lib/analytics.ts
 */

export type AnalyticsEventType =
  | 'capital_operator_started'
  | 'assessment_step_completed'
  | 'assessment_completed'
  | 'blueprint_generated'
  | 'capability_viewed'
  | 'tool_clicked'
  | 'affiliate_clicked'
  | 'moonshine_asset_clicked'
  | 'lead_submitted'
  | 'partner_cta_clicked'
  | 'funding_cta_clicked'
  | 'deal_cta_clicked'
  | 'ecosystem_product_clicked'
  | 'blueprint_printed'
  | 'blueprint_copied'
  | 'assessment_restarted'
  | 'page_view'
  | 'cta_action'
  | 'marketing_cta_click'
  | 'section_view'
  | 'integration_viewed'
  | 'embed_copied';

export function trackEvent(eventType: AnalyticsEventType, properties?: Record<string, unknown>): void {
  // In development, log to console
  if (import.meta.env.DEV) {
    console.debug(`[Analytics: ${eventType}]`, properties);
  }

  // Push to dataLayer if available (GTM / GA4)
  try {
    if (typeof window !== 'undefined') {
      const w = window as unknown as { dataLayer?: unknown[] };
      if (Array.isArray(w.dataLayer)) {
        w.dataLayer.push({
          event: eventType,
          ...properties,
          timestamp: new Date().toISOString()
        });
      }
    }
  } catch (e) {
    // Non-blocking
  }
}
