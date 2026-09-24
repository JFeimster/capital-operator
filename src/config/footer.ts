/**
 * Capital Operator — Footer Links & Legal Disclosures
 */

export interface FooterLinkGroup {
  title: string;
  links: {
    label: string;
    href: string;
    isExternal?: boolean;
    badge?: string;
  }[];
}

export const FOOTER_SECTIONS: FooterLinkGroup[] = [
  {
    title: 'Act',
    links: [
      { label: 'Get Funded', href: '/get-funded' },
      { label: 'Open Funding OS', href: '/funding' },
      { label: 'Explore Capital', href: '/capital' },
      { label: 'Run Diagnostic', href: '/assessment' }
    ]
  },
  {
    title: 'Platform',
    links: [
      { label: 'Tools', href: '/tools' },
      { label: 'Resources', href: '/resources' },
      { label: 'Ecosystem', href: '/ecosystem' },
      { label: 'Docs & API', href: '/docs', badge: 'API' }
    ]
  },
  {
    title: 'Playbooks',
    links: [
      { label: 'For Advisors', href: '/for-advisors' },
      { label: 'For Operators', href: '/for-operators' },
      { label: 'For Platforms', href: '/for-platforms' },
      { label: 'For Partners', href: '/for-partners' }
    ]
  },
  {
    title: 'Governance',
    links: [
      { label: 'Methodology', href: '/methodology' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'GitHub Source Repository', href: 'https://github.com/JFeimster/capital-operator', isExternal: true }
    ]
  }
];

export const FOOTER_DISCLAIMER =
  'Capital Operator provides capital discovery, workflow, and decision-support infrastructure. Outputs do not constitute a credit decision, loan commitment, or legal advice. Capital availability and final terms remain subject to independent provider review and underwriting.';
