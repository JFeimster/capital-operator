/**
 * Capital Operator — Operating Model Entity Specifications (C2)
 * src/data/operatingModelEntities.ts
 */

import { OPERATING_MODELS_DATA } from '../config/operatingModels.js';

export interface OperatingModelEntityDef {
  slug: string;
  route: string;
  id: string;
  name: string;
  tagline: string;
  definition: string;
  whoOperatesThisWay: string[];
  strengths: string[];
  limitations: string[];
  workflowCharacteristics: string[];
  systemsPresent: string[];
  manualWorkRequired: string[];
  aiRole: string;
  humanRole: string;
  maturitySignals: string[];
  typicalTechStackCost: string;
  capacityPerOperator: string;
  nextEvolutionSlug?: string;
  recommendedToolSlugs: string[];
  relevantStageSlugs: string[];
}

export const OPERATING_MODEL_ENTITIES: Record<string, OperatingModelEntityDef> = {
  'relationship-led': {
    slug: 'relationship-led',
    route: '/models/relationship-led',
    id: 'Relationship-Led',
    name: OPERATING_MODELS_DATA['Relationship-Led'].name,
    tagline: OPERATING_MODELS_DATA['Relationship-Led'].tagline,
    definition: 'The Relationship-Led model relies on personal networks, email threads, memory, and ad-hoc spreadsheets to manage commercial debt opportunities.',
    whoOperatesThisWay: [
      'Solo commercial loan brokers',
      'Traditional boutique financial advisors',
      'Early-stage commercial debt originators'
    ],
    strengths: [
      'High personal rapport and borrower intimacy.',
      'Zero software overhead costs.',
      'Flexible, unstructured deal handling.'
    ],
    limitations: [
      'Extreme capacity bottleneck (3-7 active deals maximum per operator).',
      'High risk of dropped follow-ups and lost documentation.',
      'Zero enterprise value; business depends entirely on individual memory.'
    ],
    workflowCharacteristics: [
      'Deal intake via unformatted email or phone conversations.',
      'Manual PDF statement collection and attachment management.',
      'Lender selection based on personal memory of 1-2 favorite reps.'
    ],
    systemsPresent: [
      'Personal email inbox (Gmail / Outlook)',
      'Basic spreadsheets (Excel / Google Sheets)',
      'Manual PDF viewers'
    ],
    manualWorkRequired: [
      'Manual email reminders for missing documents',
      'Manual spreading of financial statements',
      'Manual formatting of credit memo emails to lenders'
    ],
    aiRole: 'None or minimal ad-hoc ChatGPT prompt usage.',
    humanRole: 'Handles 100% of administration, data entry, follow-up, and relationship management.',
    maturitySignals: [
      'Level 1 Maturity',
      'Pipeline breaks whenever volume surges',
      'Frequent client complaints about forgotten documents'
    ],
    typicalTechStackCost: OPERATING_MODELS_DATA['Relationship-Led'].typicalTechStackCost,
    capacityPerOperator: OPERATING_MODELS_DATA['Relationship-Led'].capacityPerOperator,
    nextEvolutionSlug: 'systemized',
    recommendedToolSlugs: ['capital-ops-calculator', 'capital-workflow-builder'],
    relevantStageSlugs: ['create-demand', 'know-the-business']
  },
  'systemized': {
    slug: 'systemized',
    route: '/models/systemized',
    id: 'Systemized',
    name: OPERATING_MODELS_DATA['Systemized'].name,
    tagline: OPERATING_MODELS_DATA['Systemized'].tagline,
    definition: 'The Systemized model introduces structured CRMs, cloud data rooms, and stage-gate checklists to standardise deal flow.',
    whoOperatesThisWay: [
      'Growing commercial brokerage firms',
      'Fractional CFO practices with dedicated debt desks',
      'Established regional financing advisors'
    ],
    strengths: [
      'Clear pipeline visibility across team members.',
      'Automated document checklists and reminder emails.',
      'Predictable stage progression and auditability.'
    ],
    limitations: [
      'Senior team members still spend significant time per deal spreading financials manually.',
      'Static lender databases quickly become stale.'
    ],
    workflowCharacteristics: [
      'Standardized web forms for initial intake.',
      'Cloud storage upload portals (Dropbox / Box / Drive).',
      'CRM stage tracking (HubSpot / Salesforce / Pipefy).'
    ],
    systemsPresent: [
      'Commercial CRM engine',
      'Cloud data room / submission portal',
      'Automated email sequence software'
    ],
    manualWorkRequired: [
      'Manual bank statement financial extraction',
      'Manual debt schedule assembly',
      'Manual matching against lender spreadsheets'
    ],
    aiRole: 'Basic document OCR or static template generation.',
    humanRole: 'Manages process flow, verifies documents, manually spreads financials, and conducts lender outreach.',
    maturitySignals: [
      'Level 2 Maturity',
      'Pipeline structured but human bandwidth throttled by underwriting packaging'
    ],
    typicalTechStackCost: OPERATING_MODELS_DATA['Systemized'].typicalTechStackCost,
    capacityPerOperator: OPERATING_MODELS_DATA['Systemized'].capacityPerOperator,
    nextEvolutionSlug: 'ai-augmented',
    recommendedToolSlugs: ['capital-readiness-audit', 'capital-tech-stack'],
    relevantStageSlugs: ['know-the-business', 'build-the-capital-case']
  },
  'ai-augmented': {
    slug: 'ai-augmented',
    route: '/models/ai-augmented',
    id: 'AI-Augmented',
    name: OPERATING_MODELS_DATA['AI-Augmented'].name,
    tagline: OPERATING_MODELS_DATA['AI-Augmented'].tagline,
    definition: 'The AI-Augmented model deploys financial OCR, automated credit memo synthesis, and algorithmic lender filtering while enforcing strict human sign-off checkpoints.',
    whoOperatesThisWay: [
      'Modern tech-forward commercial brokerages',
      'Institutional syndication desks',
      'High-volume advisory practices'
    ],
    strengths: [
      'Dramatically reduced credit packaging time (from hours to minutes).',
      'Higher underwriter acceptance rates due to verified, clean submissions.',
      'Expanded operator capacity (25-60 active deals).'
    ],
    limitations: [
      'Requires active governance of lender buy-box rules.',
      'Lender follow-up tracking can still encounter communication lag.'
    ],
    workflowCharacteristics: [
      'Instant OCR extraction of bank statement cash flows.',
      'AI-generated executive summary credit memos.',
      'Algorithmic match matrix ranking candidate capital providers.'
    ],
    systemsPresent: [
      'Financial OCR engines (Heron Data / Ocrolus)',
      'AI credit memo generator (Claude / GPT-4)',
      'Governed lender match matrix'
    ],
    manualWorkRequired: [
      'Reviewing flagged OCR anomalies',
      'Final sign-off on credit memo narrative',
      'Negotiating terms with underwriters'
    ],
    aiRole: 'Performs extraction, debt detection, ratio calculation, and draft memo writing.',
    humanRole: 'Enforces quality control, verifies edge-case assumptions, and manages high-stakes client/lender relationships.',
    maturitySignals: [
      'Level 3 Maturity',
      'Fast packaging and accurate matching; continuous growth in deal velocity'
    ],
    typicalTechStackCost: OPERATING_MODELS_DATA['AI-Augmented'].typicalTechStackCost,
    capacityPerOperator: OPERATING_MODELS_DATA['AI-Augmented'].capacityPerOperator,
    nextEvolutionSlug: 'capital-operator',
    recommendedToolSlugs: ['capital-stack-builder', 'capital-readiness-audit'],
    relevantStageSlugs: ['build-the-capital-case', 'route-to-the-right-capital', 'move-the-deal']
  },
  'capital-operator': {
    slug: 'capital-operator',
    route: '/models/capital-operator',
    id: 'Capital Operator',
    name: OPERATING_MODELS_DATA['Capital Operator'].name,
    tagline: OPERATING_MODELS_DATA['Capital Operator'].tagline,
    definition: 'The Capital Operator model is the highest operational maturity level, featuring programmatic multi-channel intake, automated extraction, sandbox routing, embedded partner portals, and lifetime renewal loops.',
    whoOperatesThisWay: [
      'Enterprise debt platforms',
      'Embedded fintech platforms',
      'Top-decile commercial syndication networks'
    ],
    strengths: [
      'Maximum throughput per operator (75+ active deals).',
      'Complete client lifetime equity capture via automated renewal and refinance triggers.',
      'Robust API/MCP integration with partner systems.'
    ],
    limitations: [
      'Requires continuous compliance monitoring across multi-state licensing regimes.'
    ],
    workflowCharacteristics: [
      'Zero-touch intake and automated eligibility screening.',
      'Instant data room assembly and credit memo generation.',
      'Decision-support lender routing with multi-party partner attribution.'
    ],
    systemsPresent: [
      'Full-stack Capital Operator API / MCP layer',
      'White-label partner portals',
      'Automated renewal & refinance countdown triggers'
    ],
    manualWorkRequired: [
      'High-conviction relationship advisory',
      'Complex structural deal negotiations',
      'Partner network expansion'
    ],
    aiRole: 'Synthesizes intelligence across all 8 stages, monitors pipeline health, and alerts operators to high-leverage actions.',
    humanRole: 'Strategic leadership, institutional relationship equity, and final deal approval.',
    maturitySignals: [
      'Level 4 Maturity — Industry Benchmark',
      'Fully systemized, AI-augmented, human-governed capital infrastructure'
    ],
    typicalTechStackCost: OPERATING_MODELS_DATA['Capital Operator'].typicalTechStackCost,
    capacityPerOperator: OPERATING_MODELS_DATA['Capital Operator'].capacityPerOperator,
    recommendedToolSlugs: ['embedded-capital-calculator', 'referral-revenue-calculator', 'capital-tech-stack'],
    relevantStageSlugs: ['create-demand', 'find-real-opportunities', 'know-the-business', 'build-the-capital-case', 'route-to-the-right-capital', 'move-the-deal', 'keep-momentum', 'own-the-relationship']
  }
};
