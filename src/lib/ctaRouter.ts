/**
 * Capital Operator — Contextual CTA Router
 * src/lib/ctaRouter.ts
 */

import { SegmentType, OperatingModelType } from '../types';
import { PARTNER_FUNNEL, BUSINESS_FUNDING_FUNNEL, OPERATOR_TOOLS_PORTAL } from '../config/ctas';

export interface RoutedCTA {
  primaryUrl: string;
  primaryLabel: string;
  primarySubtext: string;
  secondaryUrl: string;
  secondaryLabel: string;
  funnelType: 'partner' | 'direct_funding' | 'tools_directory';
}

export function routeUserCTA(segment: SegmentType, model: OperatingModelType): RoutedCTA {
  // If user wants to refer or wants new revenue with low friction, route to partner infrastructure
  if (segment === 'affiliate' || segment === 'new_revenue') {
    return {
      primaryUrl: PARTNER_FUNNEL.url,
      primaryLabel: PARTNER_FUNNEL.primaryAction,
      primarySubtext: PARTNER_FUNNEL.subheadline,
      secondaryUrl: OPERATOR_TOOLS_PORTAL.url,
      secondaryLabel: OPERATOR_TOOLS_PORTAL.primaryAction,
      funnelType: 'partner'
    };
  }

  // If user is building an active operator desk
  if (segment === 'operator' || model === 'Capital Operator' || model === 'AI-Augmented') {
    return {
      primaryUrl: PARTNER_FUNNEL.url,
      primaryLabel: 'Deploy Partner Capital Infrastructure',
      primarySubtext: 'Syndicate loans, unlock wholesale underwriting capacity, and keep full client ownership.',
      secondaryUrl: OPERATOR_TOOLS_PORTAL.url,
      secondaryLabel: 'Browse All 20+ Vetted Lending Tools',
      funnelType: 'partner'
    };
  }

  // Default Advisor flow
  return {
    primaryUrl: PARTNER_FUNNEL.url,
    primaryLabel: PARTNER_FUNNEL.primaryAction,
    primarySubtext: 'Monetize existing client demand without becoming a licensed debt broker.',
    secondaryUrl: BUSINESS_FUNDING_FUNNEL.url,
    secondaryLabel: 'Submit a Live Deal for Instant Review',
    funnelType: 'partner'
  };
}
