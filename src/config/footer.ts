/**
 * Capital Operator — Footer Links & Legal Disclosures
 * src/config/footer.ts
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
    title: 'Framework & Engine',
    links: [
      { label: 'Run Diagnostic', href: '#assessment' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Capital Stack Architecture', href: '#capital-stack' },
      { label: 'Diagnostic Methodology', href: '#methodology' },
      { label: 'Operating Blueprint', href: '#blueprint' }
    ]
  },
  {
    title: 'Audience Pathways',
    links: [
      { label: 'For Fractional CFOs & Advisors', href: '#for-advisors' },
      { label: 'For Loan Brokers & Operators', href: '#for-operators' },
      { label: 'For Fintech Platforms', href: '#for-platforms' },
      { label: 'For Lender Partners', href: '#for-partners' }
    ]
  },
  {
    title: 'Ecosystem & Tools',
    links: [
      { label: 'Underwriting Tools Directory', href: '#tools' },
      { label: 'Operator Playbooks & Resources', href: '#resources' },
      { label: 'Developer Docs & REST API', href: '#docs', badge: 'API' },
      { label: 'Distilled Funding', href: 'https://www.distilledfunding.com', isExternal: true },
      { label: 'Operator Underwriting Suite', href: 'https://tools.distilledfunding.com', isExternal: true }
    ]
  },
  {
    title: 'Governance & Privacy',
    links: [
      { label: 'About Moonshine Capital', href: '#about' },
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'GitHub Source Repository', href: 'https://github.com/JFeimster/capital-operator', isExternal: true }
    ]
  }
];

export const FOOTER_DISCLAIMER =
  'Capital Operator is an operational diagnostics software system provided by Moonshine Capital. Diagnostic blueprints and operational findings do not constitute a credit decision, loan commitment, or legal advice. Capital availability depends on verified borrower documentation, market liquidity, and independent underwriting criteria.';
