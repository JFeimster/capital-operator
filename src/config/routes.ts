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

export const CORE_KNOWLEDGE_ROUTES: AppRoute[] = [
  { path: '/learn/capital-operating-system', name: 'Capital Operating System', description: 'Define what a capital operating system is, why it exists, and how the 8-stage framework scales capital ops.' },
  { path: '/learn/capital-infrastructure', name: 'Capital Infrastructure', description: 'The software, data pipelines, and API layers required for repeatable debt operations.' },
  { path: '/learn/capital-demand', name: 'Capital Demand', description: 'Treating borrower demand as an operational input rather than raw lead noise.' },
  { path: '/learn/capital-routing', name: 'Capital Routing', description: 'Structured classification and decision-support routing without fake automated underwriting.' },
  { path: '/learn/capital-case', name: 'Capital Case Construction', description: 'Transforming unstructured financial files into an operator-ready credit presentation.' },
  { path: '/learn/embedded-capital', name: 'Embedded Capital', description: 'How advisors and platforms add high-conviction capital capabilities.' },
  { path: '/learn/capital-operator-model', name: 'Capital Operator Model', description: 'Level 4 operating model progression from relationship-led to full-stack capital infrastructure.' }
];

export const OPERATING_MODEL_ROUTES: AppRoute[] = [
  { path: '/models/relationship-led', name: 'Relationship-Led Model', description: 'High human touch, spreadsheet-driven, heavy administrative drag.' },
  { path: '/models/systemized', name: 'Systemized Model', description: 'Standardized pipelines, cloud repositories, manual evaluation.' },
  { path: '/models/ai-augmented', name: 'AI-Augmented Model', description: 'Machine extraction, AI credit synthesis, human judgment checkpointing.' },
  { path: '/models/capital-operator', name: 'Capital Operator Model', description: 'Full-stack automated capital infrastructure with continuous renewal loops.' }
];

export const WORKFLOW_STAGE_ROUTES: AppRoute[] = [
  { path: '/workflow/create-demand', name: 'Stage 1: Create Demand', description: 'Generate a reliable flow of relevant businesses and prioritize attention toward active prospects.' },
  { path: '/workflow/find-real-opportunities', name: 'Stage 2: Find Real Opportunities', description: 'Separate incomplete, unready, and unviable opportunities before wasting manual hours.' },
  { path: '/workflow/know-the-business', name: 'Stage 3: Know the Business', description: 'Gather verified company context, industry benchmarks, and operating background.' },
  { path: '/workflow/build-the-capital-case', name: 'Stage 4: Build the Capital Case', description: 'Collect and parse financial files into a decision-useful credit narrative.' },
  { path: '/workflow/route-to-the-right-capital', name: 'Stage 5: Route to the Right Capital', description: 'Compare verified business metrics against governed lender credit criteria.' },
  { path: '/workflow/move-the-deal', name: 'Stage 6: Move the Deal', description: 'Assemble and deliver accurate, complete submission packages to capital partners.' },
  { path: '/workflow/keep-momentum', name: 'Stage 7: Keep Momentum', description: 'Orchestrate underwriter stipulations, call notes, and deadline reminders.' },
  { path: '/workflow/own-the-relationship', name: 'Stage 8: Own the Relationship', description: 'Turn funded deals into recurring capital events and continuous referral flow.' }
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
