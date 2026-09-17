/**
 * Capital Operator — Navigation Structure & Routes
 * src/config/navigation.ts
 */

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
  description?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const MAIN_NAV: NavItem[] = [
  { title: 'How It Works', href: '#how-it-works' },
  { title: 'Capital Stack', href: '#capital-stack' },
  { title: 'Tools & Infra', href: '#tools' },
  { title: 'Ecosystem', href: '#ecosystem' },
  { title: 'Resources', href: '#resources' },
  { title: 'Methodology', href: '#methodology' }
];

export const AUDIENCE_NAV: NavItem[] = [
  { title: 'For Advisors', href: '#for-advisors', description: 'Fractional CFOs & Debt Consultants' },
  { title: 'For Operators', href: '#for-operators', description: 'Commercial Loan Brokers & Syndicate Leads' },
  { title: 'For Platforms', href: '#for-platforms', description: 'Fintech Portals & Aggregators' },
  { title: 'For Partners', href: '#for-partners', description: 'Lender Networks & Referral Desks' }
];

export const HEADER_ACTIONS = {
  primaryCTA: {
    title: 'Run Diagnostic',
    href: '#assessment'
  },
  secondaryCTA: {
    title: 'Docs & API',
    href: '#docs'
  }
};
