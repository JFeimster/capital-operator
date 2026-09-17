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
  | 'blueprint_printed'
  | 'blueprint_copied'
  | 'assessment_restarted';

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
