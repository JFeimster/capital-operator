/**
 * Capital Operator — Call-to-Action Click Tracker
 * src/lib/ctaTracking.ts
 */

import { trackEvent } from './analytics';

export function trackCtaAction(label: string, url: string, category: 'primary' | 'secondary' | 'external') {
  trackEvent('cta_action', {
    label,
    url,
    category,
    timestamp: new Date().toISOString()
  });
}
