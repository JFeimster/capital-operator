/**
 * Capital Operator — Marketing Analytics Tracking
 * src/lib/marketingAnalytics.ts
 */

import { trackEvent } from './analytics';

export function trackMarketingClick(ctaName: string, destination: string, location: string) {
  trackEvent('marketing_cta_click', {
    cta_name: ctaName,
    destination,
    location,
    timestamp: new Date().toISOString()
  });
}

export function trackSectionView(sectionId: string) {
  trackEvent('section_view', {
    section_id: sectionId,
    timestamp: new Date().toISOString()
  });
}
