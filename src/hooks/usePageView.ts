/**
 * Capital Operator — Page View Analytics Hook
 * src/hooks/usePageView.ts
 */

import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';

export function usePageView(pageName: string) {
  useEffect(() => {
    trackEvent('page_view', { page: pageName, timestamp: new Date().toISOString() });
    try {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pageName]);
}
