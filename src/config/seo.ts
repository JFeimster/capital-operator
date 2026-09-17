/**
 * Capital Operator — SEO Metadata Configuration
 * src/config/seo.ts
 */

import { SITE_CONFIG } from './site';

export interface PageSEO {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
}

export const SEO_CONFIG: Record<string, PageSEO> = {
  home: {
    title: 'Capital Operator — Turn Borrower Demand Into An Operating System',
    description:
      'Evaluate your capital advisory workflow across 8 operational stages. Generate an executive blueprint with quantified automation leaks and a 30-day transformation roadmap.',
    keywords: ['capital operator', 'commercial lending OS', 'debt syndication system']
  },
  assessment: {
    title: 'Operational Diagnostic Matrix — Capital Operator',
    description: '12-question operational diagnostic evaluating deal intake, underwriting triage, document assembly, and lender routing.',
    keywords: ['lending diagnostic', 'broker audit', 'capital assessment']
  },
  blueprint: {
    title: 'Executive Capital Blueprint — Capital Operator',
    description: 'Synthesized 8-stage operational blueprint, friction hot-spots, high-leverage moves, and recommended technology stack.',
    keywords: ['capital blueprint', 'operating model specification', 'debt desk transformation']
  },
  howItWorks: {
    title: 'How It Works — Capital Operator Framework',
    description: 'Learn the 8-stage capital operating framework: from raw inquiry capture to post-closing relationship equity.',
    keywords: ['capital workflow', 'lending architecture', 'operating stages']
  },
  forAdvisors: {
    title: 'Capital Infrastructure for Financial Advisors & CFOs',
    description: 'Institutionalize business debt placement without turning your advisory practice into a chaotic broker desk.',
    keywords: ['fractional cfo debt', 'advisor capital infrastructure', 'commercial financing advisory']
  },
  forOperators: {
    title: 'Capital Infrastructure for Loan Brokers & Deal Desks',
    description: 'Automate intake, document scrubbing, lender matching, and lender syndication across high-volume pipelines.',
    keywords: ['commercial loan broker system', 'deal desk automation', 'lender syndication stack']
  },
  forPlatforms: {
    title: 'Capital Infrastructure for Fintechs & Embedded Platforms',
    description: 'Integrate verified commercial capital options into B2B software, marketplaces, and ERP ecosystems.',
    keywords: ['embedded lending infrastructure', 'fintech capital api', 'commercial lending api']
  },
  forPartners: {
    title: 'Lender & Syndicate Partner Network — Moonshine Capital',
    description: 'Partner with verified commercial borrowing demand screened by standardized financial intake protocols.',
    keywords: ['lender partner network', 'syndicate capital partners', 'pre-qualified loan flow']
  },
  capitalStack: {
    title: 'Modern Commercial Capital Stack Architecture',
    description: 'Interactive architectural breakdown of senior debt, asset-backed credit, SBA programs, revenue-based facilities, and mezzanine layers.',
    keywords: ['capital stack', 'commercial debt instruments', 'sba 7a vs asset-based']
  },
  tools: {
    title: 'Curated Capital Infrastructure & Underwriting Tools',
    description: 'Directory of enterprise CRMs, financial statement OCR extractors, lender routing platforms, and compliance suites.',
    keywords: ['lending tech stack', 'commercial underwriting tools', 'financial statement ocr']
  },
  resources: {
    title: 'Operational Playbooks & Capital Documentation',
    description: 'Downloadable templates, underwriting checklists, term sheet comparison frameworks, and diagnostic guides.',
    keywords: ['loan broker templates', 'debt checklist', 'term sheet comparison']
  },
  docs: {
    title: 'Developer Documentation, REST API & Embeds — Capital Operator',
    description: 'Technical specifications, REST API endpoints, webhooks, Tally form embeds, widget SDKs, and Model Context Protocol (MCP) integrations.',
    keywords: ['lending api', 'commercial loan webhooks', 'tally embeds', 'mcp tools', 'capital operator api']
  },
  about: {
    title: 'About Capital Operator — Moonshine Capital',
    description: 'The operator-led philosophy behind high-conviction commercial debt syndication and automated underwriting.',
    keywords: ['moonshine capital', 'commercial financing operators']
  },
  methodology: {
    title: 'Scoring Methodology & Diagnostic Engine Spec',
    description: 'Mathematical scoring logic, stage priority weightings, and friction-detection algorithms behind Capital Operator.',
    keywords: ['diagnostic methodology', 'scoring algorithm', 'friction analysis']
  },
  privacy: {
    title: 'Privacy Policy — Capital Operator',
    description: 'How Capital Operator protects client assessment data and adheres to data privacy standards.',
    keywords: ['privacy policy', 'capital operator data privacy']
  },
  terms: {
    title: 'Terms of Service — Capital Operator',
    description: 'Terms and regulatory compliance disclosures governing the use of Capital Operator software.',
    keywords: ['terms of service', 'disclaimers', 'regulatory disclosures']
  }
};
