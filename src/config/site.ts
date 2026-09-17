/**
 * Capital Operator — Global Site Metadata & Settings
 * src/config/site.ts
 */

export const SITE_CONFIG = {
  name: 'Capital Operator',
  shortName: 'CapitalOperator',
  title: 'Capital Operator — Commercial Capital Infrastructure & Blueprint Engine',
  tagline: 'Turn fragmented borrower demand into an institutional operating system.',
  description:
    'A high-conviction capital infrastructure diagnostic and blueprint engine for commercial loan brokers, fractional CFOs, debt advisors, and fintech operators.',
  url: 'https://capital-operator.vercel.app/',
  author: 'Moonshine Capital',
  company: 'Moonshine Capital Partners',
  distilledFundingUrl: 'https://www.distilledfunding.com',
  ecosystemToolsUrl: 'https://tools.distilledfunding.com',
  githubUrl: 'https://github.com/JFeimster/capital-operator',
  version: '2.4.0',
  license: 'MIT',
  contactEmail: 'operator@moonshinecapital.io',
  defaultOgImage: '/og-capital-operator.png',
  keywords: [
    'capital operator',
    'commercial debt infrastructure',
    'loan broker operating system',
    'fractional cfo debt syndication',
    'fintech capital stack',
    'commercial lending diagnostic',
    'capital blueprint',
    'deal triage automation',
    'moonshine capital'
  ]
} as const;

export type SiteConfig = typeof SITE_CONFIG;
