/**
 * Capital Operator — Centralized Tally Configuration
 * src/config/tally.ts
 */

import { PUBLIC_ENV } from './publicEnv';

export interface TallyRoute {
  id: string;
  url: string;
  label: string;
  purpose: string;
  segment: 'advisor' | 'business_owner' | 'operator' | 'new_operator' | 'agency_builder' | 'general';
  defaultCtaText: string;
}

export const TALLY_ROUTES: Record<string, TallyRoute> = {
  partner: {
    id: PUBLIC_ENV.tally.partnerFormId,
    url: PUBLIC_ENV.tally.partnerFormUrl,
    label: 'Moonshine Capital Funding Partner Application',
    purpose: 'Onboard advisors, consultants, fractional CFOs, and referrers to monetize client funding demand.',
    segment: 'advisor',
    defaultCtaText: 'ADD CAPITAL TO MY BUSINESS'
  },
  funding: {
    id: PUBLIC_ENV.tally.fundingFormId,
    url: PUBLIC_ENV.tally.fundingFormUrl,
    label: 'Personalized Business Funding Quote',
    purpose: 'Direct intake for operating business owners seeking lines of credit, term debt, or SBA financing.',
    segment: 'business_owner',
    defaultCtaText: 'GET A PERSONALIZED FUNDING QUOTE'
  },
  agentProfile: {
    id: PUBLIC_ENV.tally.agentProfileFormId,
    url: PUBLIC_ENV.tally.agentProfileFormUrl,
    label: 'Build Your Funding Agent Profile',
    purpose: 'Profile registration for new and emerging capital agents seeking syndication and deal support.',
    segment: 'new_operator',
    defaultCtaText: 'BUILD YOUR FUNDING AGENT PROFILE'
  },
  joinAgent: {
    id: PUBLIC_ENV.tally.joinAgentFormId,
    url: PUBLIC_ENV.tally.joinAgentFormUrl,
    label: 'Join Funding Agent Network',
    purpose: 'Application to join the Moonshine Capital distributed agent network.',
    segment: 'new_operator',
    defaultCtaText: 'JOIN FUNDING AGENT NETWORK'
  },
  submitDeal: {
    id: PUBLIC_ENV.tally.submitDealFormId,
    url: PUBLIC_ENV.tally.submitDealFormUrl,
    label: 'Submit a Live Deal',
    purpose: 'Direct submission of live commercial loan files for instant review and lender packaging.',
    segment: 'operator',
    defaultCtaText: 'SUBMIT A DEAL'
  },
  launchAgency: {
    id: PUBLIC_ENV.tally.launchAgencyFormId,
    url: PUBLIC_ENV.tally.launchAgencyFormUrl,
    label: 'Launch Your Capital Agency',
    purpose: 'Comprehensive agency-in-a-box program for operators launching their own turnkey commercial lending firm.',
    segment: 'agency_builder',
    defaultCtaText: 'LAUNCH YOUR CAPITAL BUSINESS'
  },
  personalizedIntake: {
    id: PUBLIC_ENV.tally.personalizedIntakeFormId,
    url: PUBLIC_ENV.tally.personalizedIntakeFormUrl,
    label: 'Personalized Capital Intake',
    purpose: 'Custom borrower triage and readiness assessment intake form.',
    segment: 'general',
    defaultCtaText: 'START PERSONALIZED INTAKE'
  }
};

/**
 * Returns a Tally route by key with fallback to partner form
 */
export function getTallyRoute(routeKey: keyof typeof TALLY_ROUTES): TallyRoute {
  return TALLY_ROUTES[routeKey] || TALLY_ROUTES.partner;
}
