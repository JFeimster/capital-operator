/**
 * Backward-compatible UI projection of the canonical ecosystem registry.
 * Do not add product metadata here; update src/config/ecosystem.ts instead.
 */
import { ECOSYSTEM_CATALOG } from './ecosystem.js';

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

const categoryMap = {
  intake: 'Origination',
  operations: 'Execution',
  tools: 'Infrastructure',
  capital: 'Advisory',
  crm: 'Infrastructure',
  automation: 'Infrastructure'
} as const;

export const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = ECOSYSTEM_CATALOG
  .filter(product => Boolean(product.url))
  .map(product => ({
    id: product.id,
    name: product.name,
    category: categoryMap[product.category],
    tagline: product.capabilityHighlight,
    description: product.description,
    url: product.url!,
    badge: product.status,
    iconName: 'Layers',
    status: product.status === 'LIVE' ? 'Live' : product.status === 'BETA' ? 'Preview' : 'Enterprise'
  }));
