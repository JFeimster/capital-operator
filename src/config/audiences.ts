/**
 * Capital Operator — Audience Persona Paths
 * src/config/audiences.ts
 */

export interface AudiencePath {
  id: string;
  slug: string;
  role: string;
  title: string;
  subtitle: string;
  coreChallenge: string;
  solution: string;
  href: string;
  badge: string;
  iconName: string;
  outcomes: string[];
}

export const AUDIENCE_PATHS: AudiencePath[] = [
  {
    id: 'advisors',
    slug: 'for-advisors',
    role: 'Fractional CFOs & Debt Advisors',
    title: 'Institutionalize Debt Placement',
    subtitle: 'Provide enterprise debt advisory to your portfolio without drowning in manual underwriting.',
    coreChallenge: 'Clients urgently ask for bank lines or growth capital, pulling your billable hours into messy document collation.',
    solution: 'Deploy standardized borrower intake portals, automated debt-service analysis, and curated lender routing.',
    href: '#for-advisors',
    badge: 'FOR ADVISORS',
    iconName: 'Building2',
    outcomes: ['Zero manual bank statement scrubbing', 'Higher close rates on bank lines & SBA', 'Retain client advisory trust']
  },
  {
    id: 'operators',
    slug: 'for-operators',
    role: 'Commercial Loan Brokers & Syndicate Leads',
    title: 'Scale Pipeline Velocity & Placement Yield',
    subtitle: 'Transform a scattered email-driven desk into an automated deal syndication engine.',
    coreChallenge: 'Brokers spend 60% of their day following up on missing tax returns and guessing which lender will review the file.',
    solution: 'Rule-based deal qualification, automated packet generation, and direct lender API distribution.',
    href: '#for-operators',
    badge: 'FOR OPERATORS',
    iconName: 'Cpu',
    outcomes: ['Cut intake-to-submission time to under 4 hours', 'Eliminate lender turnaround friction', 'Scale deal volume 3x per broker']
  },
  {
    id: 'platforms',
    slug: 'for-platforms',
    role: 'Fintechs & SaaS Marketplaces',
    title: 'Embed Verified Capital Facilities',
    subtitle: 'Monetize high-intent transaction flow with turnkey commercial lending infrastructure.',
    coreChallenge: 'Building customized debt underwriting and managing 50+ lender relationships requires heavy engineering and regulatory overhead.',
    solution: 'Turnkey webhook ingestion, programmatic financial triage, and automated routing to institutional debt providers.',
    href: '#for-platforms',
    badge: 'FOR PLATFORMS',
    iconName: 'Network',
    outcomes: ['Launch embedded financing in under 14 days', 'Zero balance-sheet or credit risk', 'Drive net-new revenue share per closed deal']
  },
  {
    id: 'partners',
    slug: 'for-partners',
    role: 'Lender Networks & Syndication Desks',
    title: 'Receive Pre-Packaged, Underwritten Submissions',
    subtitle: 'Partner with the Moonshine Capital ecosystem to receive pre-screened deal flow matched to your credit parameters.',
    coreChallenge: 'Underwriters waste hundreds of hours screening incomplete, out-of-box applications from disorganized originators.',
    solution: 'Receive structured data packages with verified DSCR, clean tax returns, and standardized executive summaries.',
    href: '#for-partners',
    badge: 'FOR PARTNERS',
    iconName: 'Layers',
    outcomes: ['Pre-scrubbed files meeting buy-box criteria', 'Standardized borrower financial profiles', 'Substantially reduced origination CAC']
  }
];
