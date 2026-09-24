/**
 * Capital Operator — Navigation Structure & Routes
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
  { title: 'Get Funded', href: '/get-funded', badge: 'ACTION' },
  { title: 'Funding OS', href: '/funding', badge: 'BETA' },
  { title: 'Capital', href: '/capital' },
  { title: 'Tools', href: '/tools' }
];

export const MORE_NAV: NavItem[] = [
  { title: 'Resources', href: '/resources', description: 'Checklists, calculators, playbooks, and operating resources' },
  { title: 'How It Works', href: '/how-it-works', description: 'How Capital Operator moves demand through the capital workflow' },
  { title: 'Ecosystem', href: '/ecosystem', description: 'Connected capabilities, systems, and handoff paths' },
  { title: 'Methodology', href: '/methodology', description: 'Operating model and workflow methodology' },
  { title: 'Docs & API', href: '/docs', description: 'MCP, APIs, webhooks, and developer documentation' },
  { title: 'Run Diagnostic', href: '/assessment', description: 'Assess your current capital operating capability' }
];

export const AUDIENCE_NAV: NavItem[] = [
  { title: 'For Advisors', href: '/for-advisors', description: 'Fractional CFOs & capital advisors' },
  { title: 'For Operators', href: '/for-operators', description: 'Funding teams, brokers & deal desks' },
  { title: 'For Platforms', href: '/for-platforms', description: 'SaaS, fintech & embedded-capital platforms' },
  { title: 'For Partners', href: '/for-partners', description: 'Referral, affiliate & capital partner ecosystems' }
];

export const HEADER_ACTIONS = {
  primaryCTA: {
    title: 'Start Funding Request',
    href: '/get-funded'
  },
  secondaryCTA: {
    title: 'Run Diagnostic',
    href: '/assessment'
  }
};
