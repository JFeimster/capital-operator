/**
 * Capital Operator — Structured Data (JSON-LD) Schemas
 * src/lib/schema.ts
 */

import { SITE_CONFIG } from '../config/site';

export function getSoftwareAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_CONFIG.name,
    operatingSystem: 'All Modern Browsers',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD'
    },
    description: SITE_CONFIG.description,
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.company,
      url: SITE_CONFIG.distilledFundingUrl
    }
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.company,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo-mark.svg`,
    sameAs: [
      SITE_CONFIG.distilledFundingUrl,
      SITE_CONFIG.githubUrl
    ]
  };
}
