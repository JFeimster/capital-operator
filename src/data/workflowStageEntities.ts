/**
 * Capital Operator — Workflow Stage Entity Specifications (C2)
 * src/data/workflowStageEntities.ts
 */

import { WORKFLOW_STAGES } from '../config/workflowStages.js';

export interface WorkflowStageEntityDef {
  slug: string;
  route: string;
  number: number;
  name: string;
  internalLabel: string;
  job: string;
  stagePurpose: string;
  whatEntersStage: string;
  whatShouldHappen: string[];
  systemResponsibilities: string;
  aiResponsibilities: string;
  humanResponsibilities: string;
  partnerResponsibilities: string;
  commonFailureModes: string[];
  capabilitiesRequired: string[];
  relevantEcosystemSystems: string[];
  recommendedToolSlugs: string[];
  previousStageSlug?: string;
  nextStageSlug?: string;
}

export const WORKFLOW_STAGE_ENTITIES: Record<string, WorkflowStageEntityDef> = {
  'create-demand': {
    slug: 'create-demand',
    route: '/workflow/create-demand',
    number: 1,
    name: WORKFLOW_STAGES[0].name,
    internalLabel: WORKFLOW_STAGES[0].internalLabel,
    job: WORKFLOW_STAGES[0].job,
    stagePurpose: 'Generate a reliable, measurable flow of qualified commercial financing inquiries across direct, referral, and embedded channels.',
    whatEntersStage: 'Raw market interest, referral webhooks, partner leads, inbound web inquiries, and outreach responses.',
    whatShouldHappen: [
      'Capture inquiry signals cleanly with full UTM and partner attribution.',
      'Deduplicate existing contacts and enrich company data.',
      'Log source channel and notify appropriate operator immediately.'
    ],
    systemResponsibilities: WORKFLOW_STAGES[0].systemHandles,
    aiResponsibilities: 'Intent classification and initial prospect signal categorization.',
    humanResponsibilities: WORKFLOW_STAGES[0].judgmentMatters,
    partnerResponsibilities: 'Distributing co-branded intake links and referring active client capital needs.',
    commonFailureModes: [
      'Unstructured lead collection via messy email attachments causing dropped inquiries.',
      'Missing attribution tracking leading to referral partner friction over payouts.'
    ],
    capabilitiesRequired: [WORKFLOW_STAGES[0].capabilityNeeded],
    relevantEcosystemSystems: ['Apollo', 'Clay', 'HubSpot', 'Tally'],
    recommendedToolSlugs: ['referral-revenue-calculator', 'embedded-capital-calculator'],
    nextStageSlug: 'find-real-opportunities'
  },
  'find-real-opportunities': {
    slug: 'find-real-opportunities',
    route: '/workflow/find-real-opportunities',
    number: 2,
    name: WORKFLOW_STAGES[1].name,
    internalLabel: WORKFLOW_STAGES[1].internalLabel,
    job: WORKFLOW_STAGES[1].job,
    stagePurpose: 'Filter out unready, unviable, or non-qualifying requests before wasting manual operator hours.',
    whatEntersStage: 'Raw inbound inquiries captured from Stage 1.',
    whatShouldHappen: [
      'Run rule-based eligibility screening (time in business, monthly revenue, credit score, industry).',
      'Identify immediate deal-breakers or restricted industries.',
      'Direct qualifying leads into structured discovery.'
    ],
    systemResponsibilities: WORKFLOW_STAGES[1].systemHandles,
    aiResponsibilities: 'Evaluating self-reported business descriptions against known lender restricted lists.',
    humanResponsibilities: WORKFLOW_STAGES[1].judgmentMatters,
    partnerResponsibilities: 'Providing clear buy-box guidelines and restriction criteria.',
    commonFailureModes: [
      'Accepting unviable leads into deep review, burning substantial manual time per non-starter deal.'
    ],
    capabilitiesRequired: [WORKFLOW_STAGES[1].capabilityNeeded],
    relevantEcosystemSystems: ['Tally', 'HubSpot', 'Am I Fundable'],
    recommendedToolSlugs: ['capital-readiness-audit', 'capital-ops-calculator'],
    previousStageSlug: 'create-demand',
    nextStageSlug: 'know-the-business'
  },
  'know-the-business': {
    slug: 'know-the-business',
    route: '/workflow/know-the-business',
    number: 3,
    name: WORKFLOW_STAGES[2].name,
    internalLabel: WORKFLOW_STAGES[2].internalLabel,
    job: WORKFLOW_STAGES[2].job,
    stagePurpose: 'Gather verified corporate intelligence, corporate standing, and industry context to prepare for discovery.',
    whatEntersStage: 'Qualified commercial opportunities passing Stage 2 pre-screening.',
    whatShouldHappen: [
      'Query Secretary of State databases for active business standing.',
      'Pull online reputational indicators, web presence, and industry benchmarks.',
      'Generate a consolidated business intelligence briefing for discovery.'
    ],
    systemResponsibilities: WORKFLOW_STAGES[2].systemHandles,
    aiResponsibilities: 'Summarizing corporate web footprint and flagging operational background anomalies.',
    humanResponsibilities: WORKFLOW_STAGES[2].judgmentMatters,
    partnerResponsibilities: 'Providing sector-specific underwriting nuance guidance.',
    commonFailureModes: [
      'Failing to spot inactive corporate standing or legal name mismatches early.'
    ],
    capabilitiesRequired: [WORKFLOW_STAGES[2].capabilityNeeded],
    relevantEcosystemSystems: ['Perplexity', 'Clay', 'Claude AI', 'Middesk'],
    recommendedToolSlugs: ['capital-workflow-builder', 'capital-tech-stack'],
    previousStageSlug: 'find-real-opportunities',
    nextStageSlug: 'build-the-capital-case'
  },
  'build-the-capital-case': {
    slug: 'build-the-capital-case',
    route: '/workflow/build-the-capital-case',
    number: 4,
    name: WORKFLOW_STAGES[3].name,
    internalLabel: WORKFLOW_STAGES[3].internalLabel,
    job: WORKFLOW_STAGES[3].job,
    stagePurpose: 'Assemble and parse required financial documentation into a normalized, underwriter-ready credit package.',
    whatEntersStage: 'Raw financial documents (bank statements, tax returns, P&L, debt schedule) uploaded to secure data room.',
    whatShouldHappen: [
      'Extract monthly bank statement cash flows and average daily balances via OCR.',
      'Identify existing debt obligations and daily/weekly positions.',
      'Generate a draft credit memo with key ratios (DSCR, debt-to-revenue).'
    ],
    systemResponsibilities: WORKFLOW_STAGES[3].systemHandles,
    aiResponsibilities: 'OCR parsing, debt payment detection, cash flow aggregation, draft credit memo writing.',
    humanResponsibilities: WORKFLOW_STAGES[3].judgmentMatters,
    partnerResponsibilities: 'Supplying lender-specific document requirement checklists.',
    commonFailureModes: [
      'Manual paper chasing via email; accepting unreadable or tampered bank statement scans.'
    ],
    capabilitiesRequired: [WORKFLOW_STAGES[3].capabilityNeeded],
    relevantEcosystemSystems: ['Heron Data', 'Ocrolus', 'Funding Data Room', 'Claude AI'],
    recommendedToolSlugs: ['capital-readiness-audit', 'capital-ops-calculator'],
    previousStageSlug: 'know-the-business',
    nextStageSlug: 'route-to-the-right-capital'
  },
  'route-to-the-right-capital': {
    slug: 'route-to-the-right-capital',
    route: '/workflow/route-to-the-right-capital',
    number: 5,
    name: WORKFLOW_STAGES[4].name,
    internalLabel: WORKFLOW_STAGES[4].internalLabel,
    job: WORKFLOW_STAGES[4].job,
    stagePurpose: 'Compare verified borrower credit metrics against governed lender eligibility rules to identify optimal capital options.',
    whatEntersStage: 'Verified credit memo and financial package from Stage 4.',
    whatShouldHappen: [
      'Filter borrower metrics against buy-box rules across senior debt, SBA, ABL, and revenue credit.',
      'Evaluate product trade-offs (rate, speed, collateral, personal guarantee requirements).',
      'Operator selects candidate capital partners and sequence.'
    ],
    systemResponsibilities: WORKFLOW_STAGES[4].systemHandles,
    aiResponsibilities: 'Highlighting guideline mismatches and synthesizing product comparisons.',
    humanResponsibilities: WORKFLOW_STAGES[4].judgmentMatters,
    partnerResponsibilities: 'Maintaining updated credit guidelines and buy-box parameters.',
    commonFailureModes: [
      'Shotgunning files to incompatible lenders, triggering rejections and harming credit.'
    ],
    capabilitiesRequired: [WORKFLOW_STAGES[4].capabilityNeeded],
    relevantEcosystemSystems: ['FundStack AI', 'Lender Fit Copilot', 'Airtable Ops'],
    recommendedToolSlugs: ['capital-stack-builder', 'capital-readiness-audit'],
    previousStageSlug: 'build-the-capital-case',
    nextStageSlug: 'move-the-deal'
  },
  'move-the-deal': {
    slug: 'move-the-deal',
    route: '/workflow/move-the-deal',
    number: 6,
    name: WORKFLOW_STAGES[5].name,
    internalLabel: WORKFLOW_STAGES[5].internalLabel,
    job: WORKFLOW_STAGES[5].job,
    stagePurpose: 'Transmit verified credit packages directly to selected capital partners and track active underwriter review.',
    whatEntersStage: 'Selected capital options and target lender list from Stage 5.',
    whatShouldHappen: [
      'Bundle submission package to exact lender specifications.',
      'Log transmission and update CRM stage status.',
      'Track underwriter stipulations and response timelines.'
    ],
    systemResponsibilities: WORKFLOW_STAGES[5].systemHandles,
    aiResponsibilities: 'Drafting lender cover letters and formatting submission packages.',
    humanResponsibilities: WORKFLOW_STAGES[5].judgmentMatters,
    partnerResponsibilities: 'Prompt underwriter review, issuing formal term sheets or stipulations.',
    commonFailureModes: [
      'Incomplete submissions missing required disclosures, causing underwriter delay.'
    ],
    capabilitiesRequired: [WORKFLOW_STAGES[5].capabilityNeeded],
    relevantEcosystemSystems: ['n8n', 'Make', 'HubSpot'],
    recommendedToolSlugs: ['capital-tech-stack', 'capital-ops-calculator'],
    previousStageSlug: 'route-to-the-right-capital',
    nextStageSlug: 'keep-momentum'
  },
  'keep-momentum': {
    slug: 'keep-momentum',
    route: '/workflow/keep-momentum',
    number: 7,
    name: WORKFLOW_STAGES[6].name,
    internalLabel: WORKFLOW_STAGES[6].internalLabel,
    job: WORKFLOW_STAGES[6].job,
    stagePurpose: 'Orchestrate underwriter stipulations, borrower follow-ups, and offer comparisons to drive deals toward closing.',
    whatEntersStage: 'Active lender term sheets, stipulations, and pending closing conditions.',
    whatShouldHappen: [
      'Automate borrower document reminder cadences for outstanding stipulations.',
      'Transcribe call notes and track next-action deadlines.',
      'Synthesize competing term sheets into a clear comparison for the borrower.'
    ],
    systemResponsibilities: WORKFLOW_STAGES[6].systemHandles,
    aiResponsibilities: 'Summarizing term sheet differences and transcribing underwriter calls.',
    humanResponsibilities: WORKFLOW_STAGES[6].judgmentMatters,
    partnerResponsibilities: 'Issuing loan agreements and closing closing conditions.',
    commonFailureModes: [
      'Stale deals sitting in stipulation status due to lack of automated follow-up.'
    ],
    capabilitiesRequired: [WORKFLOW_STAGES[6].capabilityNeeded],
    relevantEcosystemSystems: ['Fireflies', 'HubSpot', 'AI Agent Arsenal'],
    recommendedToolSlugs: ['capital-ops-calculator', 'capital-workflow-builder'],
    previousStageSlug: 'move-the-deal',
    nextStageSlug: 'own-the-relationship'
  },
  'own-the-relationship': {
    slug: 'own-the-relationship',
    route: '/workflow/own-the-relationship',
    number: 8,
    name: WORKFLOW_STAGES[7].name,
    internalLabel: WORKFLOW_STAGES[7].internalLabel,
    job: WORKFLOW_STAGES[7].job,
    stagePurpose: 'Turn funded deals into recurring capital events, client lifetime equity, and continuous referral flow.',
    whatEntersStage: 'Funded deals and completed closing records.',
    whatShouldHappen: [
      'Log funding outcome, fee attribution, and partner settlement.',
      'Set automated anniversary check-in and renewal countdown triggers.',
      'Request partner referral feedback and track long-term client relationship equity.'
    ],
    systemResponsibilities: WORKFLOW_STAGES[7].systemHandles,
    aiResponsibilities: 'Monitoring repayment schedules and flagging refinance opportunities.',
    humanResponsibilities: WORKFLOW_STAGES[7].judgmentMatters,
    partnerResponsibilities: 'Payout of partner commissions and ongoing debt servicing.',
    commonFailureModes: [
      'Funded clients are forgotten immediately post-close, losing lifetime renewal value.'
    ],
    capabilitiesRequired: [WORKFLOW_STAGES[7].capabilityNeeded],
    relevantEcosystemSystems: ['Partner Intake OS', 'Resource Grid', 'HubSpot'],
    recommendedToolSlugs: ['referral-revenue-calculator', 'embedded-capital-calculator'],
    previousStageSlug: 'keep-momentum'
  }
};
