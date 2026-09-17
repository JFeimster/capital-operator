/**
 * Capital Operator — Application Routes Specification
 * src/config/routes.ts
 */

export interface AppRoute {
  path: string;
  name: string;
  description: string;
  isExternal?: boolean;
}

export const PUBLIC_TOOL_ROUTES: AppRoute[] = [
  { path: '/capital-stack-builder', name: 'Capital Stack Builder', description: 'Plan potential capital-structure categories with explicit human review.' },
  { path: '/capital-ops-calculator', name: 'Capital Ops Calculator', description: 'Model operational leakage and capacity scenarios.' },
  { path: '/capital-workflow-builder', name: 'Capital Workflow Builder', description: 'Map a current workflow against eight canonical operating stages.' },
  { path: '/capital-tech-stack', name: 'Capital Tech Stack', description: 'Build a capability-led capital operations stack.' },
  { path: '/capital-readiness-audit', name: 'Capital Readiness Audit', description: 'Assess operational readiness without credit or approval semantics.' },
  { path: '/embedded-capital-calculator', name: 'Embedded Capital Calculator', description: 'Model a capital capability for a partner or platform audience.' },
  { path: '/referral-revenue-calculator', name: 'Referral Revenue Calculator', description: 'Model referral scenarios with explicit assumptions.' }
];

export const APP_ROUTES: Record<string, AppRoute> = {
  home: {
    path: '/',
    name: 'Command Center',
    description: 'Capital infrastructure diagnostic, interactive modern capital stack preview, and blueprint engine.'
  },
  assessment: {
    path: '/#diagnostic',
    name: '12-Step Diagnostic',
    description: 'Multi-step capital pipeline operational maturity audit.'
  },
  methodology: {
    path: '/#methodology',
    name: 'Methodology',
    description: 'Scoring algorithm, 8-stage operating model specifications, and capability benchmarks.'
  },
  about: {
    path: '/#about',
    name: 'About Capital Operator',
    description: 'The background and operational philosophy of Moonshine Capital infrastructure.'
  },
  privacy: {
    path: '/privacy',
    name: 'Privacy Policy',
    description: 'Data privacy standards, client lead protection, and telemetry policies.'
  },
  terms: {
    path: '/terms',
    name: 'Terms of Service',
    description: 'Operational advisory disclaimer, compliance requirements, and commercial terms.'
  },
  partnerPortal: {
    path: 'https://tally.so/r/mOe658',
    name: 'Partner Infrastructure',
    description: 'Apply to join Moonshine Capital’s funding partner network.',
    isExternal: true
  },
  businessFunding: {
    path: 'https://tally.so/r/mDEJB5',
    name: 'Business Funding',
    description: 'Direct financing application for small-to-medium businesses.',
    isExternal: true
  },
  toolsHub: {
    path: 'https://tools.distilledfunding.com',
    name: 'Operator Tools',
    description: 'Curated directory of commercial debt and capital workflow software.',
    isExternal: true
  }
};
