/**
 * Capital Operator — Analytics Event Emitter
 * src/lib/analytics.ts
 */

import type { AnalyticsEventName } from '../config/analyticsEvents';

export type AnalyticsEventType = AnalyticsEventName;

export function trackEvent(eventType: AnalyticsEventType, properties?: Record<string, unknown>): void {
  if (import.meta.env.DEV) {
    console.debug(`[Analytics: ${eventType}]`, properties);
  }

  // Preserve existing GTM / dataLayer compatibility. Analytics must remain non-blocking.
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
  } catch {
    // Non-blocking by design.
  }
}
