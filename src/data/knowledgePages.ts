/**
 * Capital Operator — Core Knowledge Pages Definition (C2)
 * src/data/knowledgePages.ts
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ResponsibilityMatrixRow {
  area: string;
  systemHandles: string;
  aiHandles: string;
  humanHandles: string;
  partnerHandles: string;
}

export interface KnowledgePageDef {
  slug: string;
  route: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  keywords: string[];
  headline: string;
  subheadline: string;
  definition: string;
  whyItMatters: string[];
  howItWorks: string[];
  responsibilityMatrix: ResponsibilityMatrixRow[];
  whatBreaksWithoutIt: string[];
  nextSteps: {
    recommendedAction: string;
    primaryToolSlug: string;
    relatedStageSlug?: string;
    relatedModelSlug?: string;
  };
  faqs: FAQItem[];
  relatedKnowledgeSlugs: string[];
  relatedToolSlugs: string[];
  relatedModelSlugs: string[];
  relatedStageSlugs: string[];
}

export const KNOWLEDGE_PAGES: Record<string, KnowledgePageDef> = {
  'capital-operating-system': {
    slug: 'capital-operating-system',
    route: '/learn/capital-operating-system',
    title: 'What is a Capital Operating System? — Capital Operator',
    shortTitle: 'Capital Operating System',
    metaDescription: 'Define a capital operating system, its core principles, system vs AI vs human responsibilities, and how the eight-stage framework turns capital demand into scale.',
    keywords: ['capital operating system', 'capital operator framework', 'commercial debt OS', 'capital infrastructure'],
    headline: 'Turn Capital Demand Into An Operating System',
    subheadline: 'Systems handle repetition. AI handles synthesis. Humans handle judgment. Capital partners handle capital.',
    definition: 'A Capital Operating System is an end-to-end operational architecture that standardizes how commercial borrower demand is captured, qualified, enriched, packaged into a capital case, routed to lender criteria, and managed through funding and post-closing renewal.',
    whyItMatters: [
      'Eliminates manual deal chasing and spreadsheet chaos across commercial pipelines.',
      'Enables non-lending businesses, advisors, and SaaS platforms to offer high-conviction capital capabilities.',
      'Prevents client leakage and retains lifetime customer equity through structured renewal tracking.',
      'Establishes explicit boundaries between machine automation, AI synthesis, and operator judgment.'
    ],
    howItWorks: [
      'Demand Ingestion: Standardized forms and API hooks capture structured applicant signals.',
      'Qualification & Enrichment: Rule-based screening flags disqualifiers while AI pulls company intelligence.',
      'Capital Case Assembly: Document extraction turns unstructured financial files into normalized credit metrics.',
      'Decision Support Routing: Sanity-checked lender matrices match deal parameters to candidate credit boxes.',
      'Execution & Renewal: Submissions move through tracked stages with automated renewal triggers.'
    ],
    responsibilityMatrix: [
      {
        area: 'Inquiry Capture & Intake',
        systemHandles: 'Form delivery, deduplication, contact enrichment, CRM stage creation.',
        aiHandles: 'Initial intent classification and incomplete data flagging.',
        humanHandles: 'Client engagement strategy and relationship positioning.',
        partnerHandles: 'Brand alignment and channel partnership agreement.'
      },
      {
        area: 'Financial Document Processing',
        systemHandles: 'File upload routing, OCR document categorization, bank statement parsing.',
        aiHandles: 'Credit memo summarization and debt payment detection.',
        humanHandles: 'Verifying anomalous entries and signing off on credit narrative.',
        partnerHandles: 'Lender-specific stipulation guidance.'
      },
      {
        area: 'Lender Selection & Routing',
        systemHandles: 'Comparing credit metrics against governed buy-box criteria.',
        aiHandles: 'Highlighting product trade-offs and positioning options.',
        humanHandles: 'Selecting final lender sequence and managing underwriter dialogue.',
        partnerHandles: 'Underwriting decision and term sheet issuance.'
      }
    ],
    whatBreaksWithoutIt: [
      'Operators burn 3-5 hours per deal on manual data entry and paper chasing.',
      'Inconsistent intake leads to premature lender rejections and wasted underwriter goodwill.',
      'Funded clients are forgotten, causing 80%+ lifetime referral and renewal leakage.'
    ],
    nextSteps: {
      recommendedAction: 'Map your current deal flow against the canonical 8-stage framework using the Capital Workflow Builder.',
      primaryToolSlug: 'capital-workflow-builder',
      relatedStageSlug: 'create-demand',
      relatedModelSlug: 'capital-operator'
    },
    faqs: [
      {
        question: 'What is a Capital Operating System?',
        answer: 'A Capital Operating System is a structured technology and process architecture that standardizes how commercial debt demand is captured, packaged, routed, and managed from intake through post-closing.'
      },
      {
        question: 'How does a Capital Operating System differ from a loan broker CRM?',
        answer: 'A traditional CRM merely stores contacts and notes. A Capital Operating System orchestrates the entire eight-stage capital lifecycle—including automated financial extraction, decision-support routing, and post-closing relationship loops.'
      },
      {
        question: 'Does a Capital Operating System replace human underwriters or brokers?',
        answer: 'No. The operating philosophy explicitly keeps humans in control of relationship management, high-conviction judgment, and exception handling while automation handles repetition.'
      }
    ],
    relatedKnowledgeSlugs: ['capital-infrastructure', 'capital-routing', 'capital-case'],
    relatedToolSlugs: ['capital-workflow-builder', 'capital-ops-calculator', 'capital-readiness-audit'],
    relatedModelSlugs: ['systemized', 'ai-augmented', 'capital-operator'],
    relatedStageSlugs: ['create-demand', 'know-the-business', 'route-to-the-right-capital']
  },
  'capital-infrastructure': {
    slug: 'capital-infrastructure',
    route: '/learn/capital-infrastructure',
    title: 'Capital Infrastructure Architecture — Capital Operator',
    shortTitle: 'Capital Infrastructure',
    metaDescription: 'Explore the underlying software, data pipelines, API layers, and MCP interfaces required to build a repeatable capital operational capability.',
    keywords: ['capital infrastructure', 'commercial lending tech stack', 'capital API', 'MCP capital tools'],
    headline: 'The Software & Data Layer for Commercial Capital',
    subheadline: 'Connect intake, intelligence, data rooms, routing logic, and CRM engines into a unified pipeline.',
    definition: 'Capital Infrastructure comprises the software, APIs, database schemes, document extraction services, and decision engines that enable an organization to process commercial financing demand with institutional speed and reliability.',
    whyItMatters: [
      'Replaces fragmented point solutions with an integrated, capability-led stack.',
      'Reduces technical debt and prevents vendor lock-in through standardized data schemas.',
      'Enables rapid deployment of white-labeled embedded capital experiences.'
    ],
    howItWorks: [
      'Capture Layer: Universal intake webhooks and embeddable widgets.',
      'Intelligence Layer: Financial OCR, secretary of state enrichment, and web signals.',
      'Data Layer: Secure deal data rooms and structured credit schemas.',
      'Routing Layer: Sandbox rule engines comparing borrower metrics against lender buy boxes.'
    ],
    responsibilityMatrix: [
      {
        area: 'Data Pipeline & Storage',
        systemHandles: 'Encrypted document storage, schema validation, and API webhooks.',
        aiHandles: 'Unstructured data parsing into JSON credit models.',
        humanHandles: 'Data retention policy enforcement and privacy oversight.',
        partnerHandles: 'Secure endpoint ingestion.'
      }
    ],
    whatBreaksWithoutIt: [
      'Fragile Zapier chains break without error logging, leading to dropped applicant files.',
      'Siloed document storage forces duplicate borrower uploads and friction.'
    ],
    nextSteps: {
      recommendedAction: 'Build and cost your ideal capital technology stack with the Capital Tech Stack builder.',
      primaryToolSlug: 'capital-tech-stack',
      relatedStageSlug: 'know-the-business'
    },
    faqs: [
      {
        question: 'What software is required for modern capital infrastructure?',
        answer: 'Essential components include a structured CRM, secure data room, OCR extraction engine (e.g. Heron Data), lender fit copilot, and automated communications workflows.'
      }
    ],
    relatedKnowledgeSlugs: ['capital-operating-system', 'capital-demand', 'embedded-capital'],
    relatedToolSlugs: ['capital-tech-stack', 'capital-ops-calculator'],
    relatedModelSlugs: ['systemized', 'capital-operator'],
    relatedStageSlugs: ['know-the-business', 'build-the-capital-case']
  },
  'capital-demand': {
    slug: 'capital-demand',
    route: '/learn/capital-demand',
    title: 'Capital Demand as an Operational Input — Capital Operator',
    shortTitle: 'Capital Demand',
    metaDescription: 'Learn why capital demand must be treated as a structured operational input rather than unstructured lead noise.',
    keywords: ['capital demand', 'commercial loan leads', 'partner demand capture', 'embedded demand'],
    headline: 'Treat Borrower Demand as a High-Value Operational Input',
    subheadline: 'Move from chaotic lead forms to structured, intent-rich capital opportunities.',
    definition: 'Capital Demand is the raw flow of commercial financing inquiries generated across organic channels, partner networks, advisor referrals, and embedded software platforms.',
    whyItMatters: [
      'Raw leads without operational structure waste deal-desk time and burn underwriter relationships.',
      'Structured demand capture establishes immediate clarity on intent, urgency, and capability requirements.'
    ],
    howItWorks: [
      'Multi-channel capture from advisors, SaaS embeds, and direct organic inquiry.',
      'Instant pre-qualification screening against minimum eligibility thresholds.',
      'Source attribution tagging to track partner economics and channel efficiency.'
    ],
    responsibilityMatrix: [
      {
        area: 'Demand Capture & Attribution',
        systemHandles: 'UTM tagging, referral source logging, pre-qual check.',
        aiHandles: 'Summarizing inquiry intent and business description.',
        humanHandles: 'First discovery call and advisory posture.',
        partnerHandles: 'Co-marketing and referral link distribution.'
      }
    ],
    whatBreaksWithoutIt: [
      'Unqualified inquiries overload operators, causing slow response times for high-value deals.'
    ],
    nextSteps: {
      recommendedAction: 'Evaluate partner and referral demand economics using the Referral Revenue Calculator.',
      primaryToolSlug: 'referral-revenue-calculator',
      relatedStageSlug: 'create-demand'
    },
    faqs: [
      {
        question: 'How does capital demand differ from traditional sales leads?',
        answer: 'Capital demand contains strict time, financial metric, and documentation constraints that require immediate eligibility screening before engaging underwriter resources.'
      }
    ],
    relatedKnowledgeSlugs: ['capital-operating-system', 'embedded-capital'],
    relatedToolSlugs: ['referral-revenue-calculator', 'embedded-capital-calculator'],
    relatedModelSlugs: ['relationship-led', 'capital-operator'],
    relatedStageSlugs: ['create-demand', 'find-real-opportunities']
  },
  'capital-routing': {
    slug: 'capital-routing',
    route: '/learn/capital-routing',
    title: 'Structured Capital Routing & Decision Support — Capital Operator',
    shortTitle: 'Capital Routing',
    metaDescription: 'Understand capital routing as sandbox decision support. Routing is not automated underwriting or lender approval.',
    keywords: ['capital routing', 'lender match matrix', 'debt decision support', 'commercial loan routing'],
    headline: 'Decision Support Routing Without Fake Underwriting',
    subheadline: 'Compare borrower metrics against lender guidelines while keeping operators in control.',
    definition: 'Capital Routing is the algorithmic classification and decision-support process that filters borrower metrics against governed lender eligibility rules to recommend optimal capital stack options.',
    whyItMatters: [
      'Prevents blind submissions to lenders whose buy boxes don’t match borrower parameters.',
      'Explicitly remains SANDBOX decision support rather than making fake automated approval claims.'
    ],
    howItWorks: [
      'Normalize borrower financial metrics (DSCR, revenue, time in business, asset backing).',
      'Filter against updated lender matrix criteria.',
      'Highlight product trade-offs (rate vs speed vs documentation requirements).',
      'Human operator selects final submission sequence.'
    ],
    responsibilityMatrix: [
      {
        area: 'Lender Fit Evaluation',
        systemHandles: 'Rule-based filtering against documented lender criteria.',
        aiHandles: 'Synthesizing match trade-offs and credit memo positioning.',
        humanHandles: 'Selecting lender submission order and underwriter dialogue.',
        partnerHandles: 'Final credit evaluation, term sheet issuance, and funding.'
      }
    ],
    whatBreaksWithoutIt: [
      'Shotgunning applications to multiple lenders hurts borrower credit and destroys broker reputation.'
    ],
    nextSteps: {
      recommendedAction: 'Build a multi-category debt structure using the Capital Stack Builder.',
      primaryToolSlug: 'capital-stack-builder',
      relatedStageSlug: 'route-to-the-right-capital'
    },
    faqs: [
      {
        question: 'Does Capital Operator perform automated lender approvals?',
        answer: 'No. Capital Operator routing operates strictly in SANDBOX decision-support mode. Final underwriting decisions remain entirely with capital partners and human operators.'
      }
    ],
    relatedKnowledgeSlugs: ['capital-case', 'capital-operating-system'],
    relatedToolSlugs: ['capital-stack-builder', 'capital-readiness-audit'],
    relatedModelSlugs: ['ai-augmented', 'capital-operator'],
    relatedStageSlugs: ['route-to-the-right-capital', 'move-the-deal']
  },
  'capital-case': {
    slug: 'capital-case',
    route: '/learn/capital-case',
    title: 'Building an Operator-Ready Capital Case — Capital Operator',
    shortTitle: 'Capital Case Construction',
    metaDescription: 'Learn how raw financial documents are transformed into a verified, operator-ready capital case with complete credit narrative clarity.',
    keywords: ['capital case', 'credit memo packaging', 'financial OCR', 'debt verification'],
    headline: 'Transform Financial Files into a Verified Capital Case',
    subheadline: 'Move from unstructured PDFs to a normalized, decision-useful credit package.',
    definition: 'A Capital Case is the verified compilation of a borrower’s financial metrics, debt schedule, cash flow trends, ownership background, and use-of-funds narrative structured for rapid lender review.',
    whyItMatters: [
      'Underwriters judge deals in the first 3 minutes; a messy file leads to instant rejection or low priority.',
      'Combines automated OCR extractions with human verification to guarantee zero-error representations.'
    ],
    howItWorks: [
      'Upload bank statements, tax returns, and P&L into a secure deal data room.',
      'OCR engines extract monthly revenue, average daily balances, and existing debt obligations.',
      'AI generates a structured credit memo draft highlighting key ratios (DSCR, leverage).',
      'Human operator reviews anomalies, signs off, and attaches supporting verification documents.'
    ],
    responsibilityMatrix: [
      {
        area: 'Document Assembly & Memo Packaging',
        systemHandles: 'Secure collection, automated OCR parsing, metric calculation.',
        aiHandles: 'Drafting initial credit memo narrative and risk overview.',
        humanHandles: 'Verifying tax/bank discrepancies and confirming business context.',
        partnerHandles: 'Underwriting verification and formal credit approval.'
      }
    ],
    whatBreaksWithoutIt: [
      'Unchecked OCR errors erode underwriter trust and result in costly deal delays.'
    ],
    nextSteps: {
      recommendedAction: 'Audit your borrower packaging completeness with the Capital Readiness Audit.',
      primaryToolSlug: 'capital-readiness-audit',
      relatedStageSlug: 'build-the-capital-case'
    },
    faqs: [
      {
        question: 'What is a Capital Case?',
        answer: 'A Capital Case is a standardized credit presentation containing extracted financial metrics, verified documents, and a clear narrative on use of funds and repayment capability.'
      }
    ],
    relatedKnowledgeSlugs: ['capital-routing', 'capital-operating-system'],
    relatedToolSlugs: ['capital-readiness-audit', 'capital-ops-calculator'],
    relatedModelSlugs: ['systemized', 'ai-augmented'],
    relatedStageSlugs: ['know-the-business', 'build-the-capital-case']
  },
  'embedded-capital': {
    slug: 'embedded-capital',
    route: '/learn/embedded-capital',
    title: 'Embedded Capital Infrastructure for Platforms & Advisors — Capital Operator',
    shortTitle: 'Embedded Capital',
    metaDescription: 'Learn how SaaS platforms, fractional CFOs, and industry associations can embed high-conviction capital capabilities without building internal lending operations.',
    keywords: ['embedded capital', 'embedded lending', 'platform capital API', 'fractional CFO financing'],
    headline: 'Add Capital Capability Without Building a Lender Desk',
    subheadline: 'Monetize platform demand and deliver native capital access to your client base.',
    definition: 'Embedded Capital is the integration of commercial financing discovery, pre-qualification, and routing directly into third-party software products, advisor workflows, or industry networks.',
    whyItMatters: [
      'Unlocks high-margin secondary revenue for B2B platforms and advisory firms.',
      'Increases customer retention by providing timely capital when growth signals are detected.'
    ],
    howItWorks: [
      'Embed lightweight intake tools or white-label portals into client software.',
      'Trigger automated capital availability notifications based on platform accounting/transaction data.',
      'Route qualified demand through standard Capital Operator infrastructure.'
    ],
    responsibilityMatrix: [
      {
        area: 'Embedded Experience & Lifecycle',
        systemHandles: 'SDK/iFrame rendering, pre-fill from platform context, event hooks.',
        aiHandles: 'Identifying potential capital triggers from platform usage data.',
        humanHandles: 'Strategic client advisory and partner relationship oversight.',
        partnerHandles: 'Fulfillment, funding, and servicing.'
      }
    ],
    whatBreaksWithoutIt: [
      'Platforms attempt to build internal lending teams from scratch, burning millions in overhead.'
    ],
    nextSteps: {
      recommendedAction: 'Model your embedded program economics with the Embedded Capital Calculator.',
      primaryToolSlug: 'embedded-capital-calculator',
      relatedStageSlug: 'create-demand'
    },
    faqs: [
      {
        question: 'What is embedded capital?',
        answer: 'Embedded capital enables non-lending platforms and advisors to offer seamless commercial debt access directly inside their software or service delivery workflows.'
      }
    ],
    relatedKnowledgeSlugs: ['capital-demand', 'capital-infrastructure'],
    relatedToolSlugs: ['embedded-capital-calculator', 'referral-revenue-calculator'],
    relatedModelSlugs: ['capital-operator'],
    relatedStageSlugs: ['create-demand', 'own-the-relationship']
  },
  'capital-operator-model': {
    slug: 'capital-operator-model',
    route: '/learn/capital-operator-model',
    title: 'The Capital Operator Model — Maturity & Transformation',
    shortTitle: 'Capital Operator Model',
    metaDescription: 'Explore the highest-maturity operating model progression: from relationship-led spreadsheets to fully automated Capital Operator infrastructure.',
    keywords: ['capital operator model', 'lending operating model', 'debt desk maturity', 'commercial lending transformation'],
    headline: 'The Highest Maturity Operating Model for Commercial Capital',
    subheadline: 'Progression across Relationship-Led, Systemized, AI-Augmented, and Capital Operator stages.',
    definition: 'The Capital Operator Model represents Level 4 operational maturity in commercial debt placement, characterized by programmatic intake, zero-touch extraction, decision-support routing, and continuous client lifetime equity loops.',
    whyItMatters: [
      'Dramatically increases operator capacity from 3-5 active deals to 75+ active deals per team member.',
      'Protects brand value through deterministic quality control across every deal stage.'
    ],
    howItWorks: [
      'Stage 1: Relationship-Led (Manual, inbox-driven).',
      'Stage 2: Systemized (CRM + cloud uploads).',
      'Stage 3: AI-Augmented (OCR + AI credit memos + human sign-off).',
      'Stage 4: Capital Operator (Full-stack automated infrastructure + renewal loops).'
    ],
    responsibilityMatrix: [
      {
        area: 'End-to-End Pipeline Scaling',
        systemHandles: 'Programmatic orchestration across all 8 stages.',
        aiHandles: 'Real-time synthesis, extraction, and drafting.',
        humanHandles: 'Relationship trust, complex negotiation, and final sign-off.',
        partnerHandles: 'Institutional capital availability and funding.'
      }
    ],
    whatBreaksWithoutIt: [
      'Firms plateau at 5-10 deals per month due to human administrative bottlenecks.'
    ],
    nextSteps: {
      recommendedAction: 'Audit your current operating model maturity using the Capital Readiness Audit.',
      primaryToolSlug: 'capital-readiness-audit',
      relatedStageSlug: 'know-the-business',
      relatedModelSlug: 'capital-operator'
    },
    faqs: [
      {
        question: 'What defines a Level 4 Capital Operator?',
        answer: 'A Level 4 Capital Operator utilizes full-stack automated infrastructure across intake, extraction, decision support, and renewal tracking—enabling massive volume scaling while maintaining human judgment standards.'
      }
    ],
    relatedKnowledgeSlugs: ['capital-operating-system', 'capital-infrastructure'],
    relatedToolSlugs: ['capital-readiness-audit', 'capital-workflow-builder'],
    relatedModelSlugs: ['relationship-led', 'systemized', 'ai-augmented', 'capital-operator'],
    relatedStageSlugs: ['create-demand', 'build-the-capital-case', 'own-the-relationship']
  }
};
