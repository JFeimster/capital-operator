/**
 * Capital Operator — Moonshine / Distilled Funding Connected Ecosystem
 * src/config/ecosystem.ts
 */

import { PUBLIC_ENV } from './publicEnv';

export interface EcosystemProduct {
  id: string;
  name: string;
  url: string;
  description: string;
  category: 'intake' | 'operations' | 'tools' | 'syndication';
  recommendedFor: string;
  workflowStage: number; // Workflow stages 1-8
  stageLabel: string;
  ctaText: string;
  capabilityHighlight: string;
}

export const ECOSYSTEM_PRODUCTS: Record<string, EcosystemProduct> = {
  partnerIntakeOs: {
    id: 'partner-intake-os',
    name: 'Partner Intake OS',
    url: PUBLIC_ENV.ecosystem.partnerIntakeOsUrl,
    description: 'Turnkey intake architecture and partner onboarding capability designed to capture and pre-screen commercial deal flow cleanly.',
    category: 'intake',
    recommendedFor: 'Advisors, CPAs, and platforms needing a structured borrower intake front-door without manual email chaos.',
    workflowStage: 1, // Demand & Intake
    stageLabel: 'Stage 1: Demand & Intake',
    ctaText: 'LAUNCH PARTNER INTAKE OS',
    capabilityHighlight: 'Automated deal capture, white-label client intake, and instant preliminary qualification.'
  },

  fundingOperatorOs: {
    id: 'funding-operator-os',
    name: 'Funding Operator OS',
    url: PUBLIC_ENV.ecosystem.fundingOperatorOsUrl,
    description: 'Centralized command center and workflow operating system for commercial lending desks, tracking files from initial intake through funding clearance.',
    category: 'operations',
    recommendedFor: 'Active operators and deal teams processing 10+ loans per month who need an end-to-end pipeline operating system.',
    workflowStage: 4, // Synthesize & Credit Memo
    stageLabel: 'Stage 4: Synthesize & Credit Memo',
    ctaText: 'OPEN FUNDING OPERATOR OS',
    capabilityHighlight: 'Full deal pipeline orchestration, condition tracking, and credit memo assembly.'
  },

  distilledFundingTools: {
    id: 'distilled-funding-tools',
    name: 'Distilled Funding Tools',
    url: PUBLIC_ENV.ecosystem.distilledFundingToolsUrl,
    description: 'Comprehensive library of vetted debt calculators, underwriting tools, lead magnets, and diagnostic software.',
    category: 'tools',
    recommendedFor: 'Loan brokers, debt advisors, and originators looking for point-solutions, cash-flow spreaders, and lending software directories.',
    workflowStage: 2, // Qualify & Triage
    stageLabel: 'Stage 2: Qualify & Triage',
    ctaText: 'ACCESS OPERATOR TOOLKIT',
    capabilityHighlight: 'Financial calculators, DSCR simulators, lender guidelines, and pre-screen rubrics.'
  },

  fundingPartnersOs: {
    id: 'funding-partners-os',
    name: 'Funding Partners OS',
    url: PUBLIC_ENV.ecosystem.fundingPartnersOsUrl,
    description: 'Institutional partner and syndication management platform connecting commercial originators directly to wholesale debt capital.',
    category: 'syndication',
    recommendedFor: 'Brokers and capital operators seeking wholesale underwriting capacity, credit box matrices, and co-syndication support.',
    workflowStage: 5, // Capital Matching & Routing
    stageLabel: 'Stage 5: Capital Matching & Routing',
    ctaText: 'CONNECT TO FUNDING PARTNERS OS',
    capabilityHighlight: 'Multi-lender credit box matching, direct underwriter desks, and syndication fee protection.'
  }
};

export const ECOSYSTEM_CATALOG: EcosystemProduct[] = Object.values(ECOSYSTEM_PRODUCTS);

/**
 * Returns contextual ecosystem products tailored to specific stages or operating needs
 */
export function getContextualEcosystemProducts(stageNumber?: number): EcosystemProduct[] {
  if (stageNumber) {
    return ECOSYSTEM_CATALOG.filter((p) => p.workflowStage === stageNumber);
  }
  return ECOSYSTEM_CATALOG;
}
