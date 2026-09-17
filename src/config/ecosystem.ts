/**
 * Capital Operator — Canonical Moonshine / Distilled Ecosystem Registry
 *
 * Product URLs and operational status live here. Other UI/config layers should
 * derive from this registry rather than duplicate ecosystem metadata.
 */

import { PUBLIC_ENV } from './publicEnv.js';
import type { CapabilityStatus } from '../types/api.js';

export type EcosystemCategory = 'intake' | 'operations' | 'tools' | 'capital' | 'crm' | 'automation';

export interface EcosystemProduct {
  id: string;
  name: string;
  url?: string;
  description: string;
  category: EcosystemCategory;
  recommendedFor: string;
  workflowStages: number[];
  ctaText: string;
  capabilityHighlight: string;
  capabilityIds: string[];
  status: CapabilityStatus;
  responsibility: 'SYSTEM' | 'AI' | 'HUMAN' | 'CAPITAL_PARTNER';
}

export const ECOSYSTEM_PRODUCTS: Record<string, EcosystemProduct> = {
  distilledFunding: {
    id: 'distilled-funding',
    name: 'Distilled Funding',
    url: PUBLIC_ENV.distilledFundingUrl,
    description: 'Borrower-facing education and funding intake destination.',
    category: 'capital',
    recommendedFor: 'Businesses that need a direct funding intake path after operator review.',
    workflowStages: [2, 5],
    ctaText: 'OPEN DISTILLED FUNDING',
    capabilityHighlight: 'Borrower education and structured funding intake.',
    capabilityIds: ['funding-intake'],
    status: 'LIVE',
    responsibility: 'CAPITAL_PARTNER'
  },
  partnerIntakeOs: {
    id: 'partner-intake-os',
    name: 'Partner Intake OS',
    url: PUBLIC_ENV.ecosystem.partnerIntakeOsUrl,
    description: 'Partner-facing intake and attribution workflow for structured opportunity capture.',
    category: 'intake',
    recommendedFor: 'Advisors, referral partners, agencies, and platforms that need a governed capital front door.',
    workflowStages: [1, 2, 8],
    ctaText: 'OPEN PARTNER INTAKE OS',
    capabilityHighlight: 'Partner onboarding, attribution, and opportunity intake.',
    capabilityIds: ['partner-intake', 'attribution'],
    status: 'BETA',
    responsibility: 'SYSTEM'
  },
  amIFundable: {
    id: 'am-i-fundable',
    name: 'Am I Fundable',
    description: 'Capital-readiness assessment capability for identifying missing information and readiness gaps.',
    category: 'intake',
    recommendedFor: 'Applicants who need structured readiness guidance before a human capital review.',
    workflowStages: [2, 3],
    ctaText: 'ASSESS CAPITAL READINESS',
    capabilityHighlight: 'Readiness assessment without autonomous credit decisioning.',
    capabilityIds: ['funding-intake', 'capital-readiness'],
    status: 'SPECIFIED',
    responsibility: 'SYSTEM'
  },
  fundingApplicantOs: {
    id: 'funding-applicant-os',
    name: 'Funding Applicant OS',
    description: 'Applicant operations layer for information requests, document readiness, and next-action coordination.',
    category: 'operations',
    recommendedFor: 'Applicant files that need structured collection and operator-ready preparation.',
    workflowStages: [3, 4, 6, 7],
    ctaText: 'OPEN APPLICANT WORKFLOW',
    capabilityHighlight: 'Applicant coordination, document readiness, and status follow-up.',
    capabilityIds: ['applicant-operations', 'document-collection', 'capital-case'],
    status: 'SPECIFIED',
    responsibility: 'SYSTEM'
  },
  fundingOperatorOs: {
    id: 'funding-operator-os',
    name: 'Funding Operator OS',
    url: PUBLIC_ENV.ecosystem.fundingOperatorOsUrl,
    description: 'Operator command center for coordinating funding workflow and deal progression.',
    category: 'operations',
    recommendedFor: 'Operators managing active funding opportunities across multiple workflow stages.',
    workflowStages: [2, 4, 5, 6, 7, 8],
    ctaText: 'OPEN FUNDING OPERATOR OS',
    capabilityHighlight: 'Pipeline orchestration, operator workflow, and deal progression.',
    capabilityIds: ['funding-operations', 'capital-case'],
    status: 'BETA',
    responsibility: 'SYSTEM'
  },
  fundingPartnersOs: {
    id: 'funding-partners-os',
    name: 'Funding Partners OS',
    url: PUBLIC_ENV.ecosystem.fundingPartnersOsUrl,
    description: 'Partner operations and capital-source management capability. Capital decisions remain with external capital partners.',
    category: 'capital',
    recommendedFor: 'Operators managing partner relationships and verified capital-source criteria.',
    workflowStages: [5, 6, 8],
    ctaText: 'OPEN FUNDING PARTNERS OS',
    capabilityHighlight: 'Partner operations and reviewed capital-source coordination.',
    capabilityIds: ['partner-operations', 'routing'],
    status: 'BETA',
    responsibility: 'HUMAN'
  },
  distilledFundingTools: {
    id: 'distilled-funding-tools',
    name: 'Distilled Funding Tools',
    url: PUBLIC_ENV.ecosystem.distilledFundingToolsUrl,
    description: 'Operator utility suite and source-controlled tool discovery layer.',
    category: 'tools',
    recommendedFor: 'Operators who need calculators, planning utilities, and workflow-specific tools.',
    workflowStages: [2, 4, 5],
    ctaText: 'OPEN OPERATOR TOOLS',
    capabilityHighlight: 'Calculators, planning utilities, and operator tooling.',
    capabilityIds: ['capital-stack-planning', 'tools-directory'],
    status: 'LIVE',
    responsibility: 'SYSTEM'
  },
  hubspot: {
    id: 'hubspot',
    name: 'HubSpot CRM',
    description: 'Optional server-side CRM integration and lifecycle system.',
    category: 'crm',
    recommendedFor: 'Operators who need durable pipeline ownership, follow-up, and relationship tracking.',
    workflowStages: [2, 6, 7, 8],
    ctaText: 'CONFIGURE CRM',
    capabilityHighlight: 'CRM lifecycle and operator follow-up.',
    capabilityIds: ['crm-lifecycle'],
    status: 'SPECIFIED',
    responsibility: 'SYSTEM'
  },
  n8n: {
    id: 'n8n',
    name: 'n8n Automation',
    description: 'Optional workflow automation integration for API and event orchestration.',
    category: 'automation',
    recommendedFor: 'Teams that need governed multi-step automation between systems.',
    workflowStages: [1, 2, 4, 6, 7, 8],
    ctaText: 'CONFIGURE AUTOMATION',
    capabilityHighlight: 'Workflow orchestration and system handoffs.',
    capabilityIds: ['automation'],
    status: 'SPECIFIED',
    responsibility: 'SYSTEM'
  }
};

export const ECOSYSTEM_CATALOG: EcosystemProduct[] = Object.values(ECOSYSTEM_PRODUCTS);

export function getContextualEcosystemProducts(stageNumber?: number): EcosystemProduct[] {
  return stageNumber
    ? ECOSYSTEM_CATALOG.filter(product => product.workflowStages.includes(stageNumber))
    : ECOSYSTEM_CATALOG;
}

export function getEcosystemProduct(id: string): EcosystemProduct | undefined {
  return ECOSYSTEM_CATALOG.find(product => product.id === id);
}
