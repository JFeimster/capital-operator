import type { ResourceRelationship } from '../types/funding.js';
import { FUNDING_PRODUCT_FAMILIES, FUNDING_PRODUCTS, FUNDING_PRODUCT_PATHS } from './fundingProducts.js';
import { FUNDING_PROVIDERS } from './fundingProviders.js';

export const RESOURCE_RELATIONSHIPS: ResourceRelationship[] = [
  ...FUNDING_PROVIDERS.flatMap(provider => provider.productIds.map(productId => ({
    id:`provider:${provider.id}:offers:${productId}`, fromId:provider.id, type:'offers' as const, toId:productId, provenance:'CANONICAL_RESOURCE_LAYER' as const
  }))),
  ...FUNDING_PRODUCTS.map(product => ({
    id:`product:${product.id}:belongsTo:${product.productFamily}`, fromId:product.id, type:'belongsTo' as const, toId:product.productFamily, provenance:'CANONICAL_RESOURCE_LAYER' as const
  })),
  ...FUNDING_PRODUCTS.filter(product => product.productPathId).map(product => ({
    id:`product:${product.id}:mapsTo:${product.productPathId}`, fromId:product.id, type:'mapsTo' as const, toId:product.productPathId as string, provenance:'CANONICAL_RESOURCE_LAYER' as const
  })),
  ...FUNDING_PRODUCT_FAMILIES.flatMap(family => family.mergedInto.map(targetId => ({
    id:`family:${family.id}:mergedInto:${targetId}`, fromId:family.id, type:'mergedInto' as const, toId:targetId, provenance:'CANONICAL_RESOURCE_LAYER' as const
  })))
];

export const RESOURCE_RELATIONSHIP_STATUS = {
  status:'BETA' as const,
  count:RESOURCE_RELATIONSHIPS.length,
  graphDatabaseRequired:false,
  productPathIds:FUNDING_PRODUCT_PATHS.map(path=>path.id)
};

export function findResourceRelationships(entityId: string) {
  return RESOURCE_RELATIONSHIPS.filter(item => item.fromId===entityId || item.toId===entityId);
}
