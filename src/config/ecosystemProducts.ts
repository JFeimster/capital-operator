/**
 * Capital Operator — Ecosystem Products Configuration
 * src/config/ecosystemProducts.ts
 */

export interface EcosystemProduct {
  id: string;
  name: string;
  category: 'Origination' | 'Execution' | 'Infrastructure' | 'Advisory';
  tagline: string;
  description: string;
  url: string;
  badge: string;
  iconName: string;
  status: 'Live' | 'Preview' | 'Enterprise';
}

export const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  {
    id: 'distilled-funding',
    name: 'Distilled Funding',
    category: 'Origination',
    tagline: 'Direct-to-Business Commercial Lending Gateway',
    description: 'Direct financing destination connecting high-performing SMBs with fast equipment, working capital, and expansion financing.',
    url: 'https://www.distilledfunding.com',
    badge: 'DIRECT GATEWAY',
    iconName: 'ArrowUpRight',
    status: 'Live'
  },
  {
    id: 'distilled-funding-tools',
    name: 'Distilled Funding Tools',
    category: 'Infrastructure',
    tagline: 'Interactive Debt Calculators & DSCR Underwriting Suite',
    description: 'Specialized underwriting calculators for commercial operators to stress-test borrower serviceability and evaluate capital costs.',
    url: 'https://tools.distilledfunding.com',
    badge: 'OPERATOR SUITE',
    iconName: 'Calculator',
    status: 'Live'
  },
  {
    id: 'partner-intake-os',
    name: 'Partner Intake OS',
    category: 'Execution',
    tagline: 'Institutional Partner Onboarding & Deal Intake System',
    description: 'Structured qualification system for referral desks, B2B brokers, and equity consultants submitting commercial deals.',
    url: 'https://partner-intake-t5e7p3fnv-jason-feimsters-projects.vercel.app',
    badge: 'DESK SYSTEM',
    iconName: 'Building',
    status: 'Live'
  },
  {
    id: 'funding-operator-os',
    name: 'Funding Operator OS',
    category: 'Infrastructure',
    tagline: 'Multi-Lender Triage, Pipeline Stage Manager & Deal Room',
    description: 'Internal operating system orchestrating multi-party deal rooms, document scrubbing, and lender syndication stages.',
    url: 'https://funding-operator-nzehpctxq-jason-feimsters-projects.vercel.app',
    badge: 'CORE ENGINE',
    iconName: 'Terminal',
    status: 'Live'
  },
  {
    id: 'funding-partners-os',
    name: 'Funding Partners OS',
    category: 'Advisory',
    tagline: 'Lender Buy-Box Matcher & Syndicate Portal',
    description: 'Institutional lender portal organizing capital providers by asset class, credit minimums, and current deployment appetites.',
    url: 'https://funding-partners-os-dashboard-afpy26axy.vercel.app',
    badge: 'CAPITAL DESK',
    iconName: 'Layers',
    status: 'Live'
  }
];
