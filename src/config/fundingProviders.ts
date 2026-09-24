import type { FundingProviderRecord, ProviderCandidate, ProviderCriteriaRecord } from '../types/funding.js';

/**
 * Verified provider registry.
 *
 * Related JFeimster repositories contain useful product taxonomy and illustrative
 * provider-desk records, but Phase 5 does not promote those records to verified
 * lender availability without explicit source provenance and freshness metadata.
 */
export const VERIFIED_FUNDING_PROVIDERS: FundingProviderRecord[] = [];
export const VERIFIED_PROVIDER_CRITERIA: ProviderCriteriaRecord[] = [];

export const PROVIDER_REGISTRY_STATUS = {
  status: 'SPECIFIED' as const,
  canonicalConsumptionBoundary: 'src/config/fundingProviders.ts',
  reviewedSources: [
    'JFeimster/funding-partners-os-dashboard',
    'JFeimster/funding-partners-os',
    'JFeimster/FundStack-AI'
  ],
  reason: 'No provider records are promoted to ACTIVE_VERIFIED without source provenance and freshness metadata.'
};

export function findVerifiedProviderCandidates(productPathIds: string[]): ProviderCandidate[] {
  const candidates: ProviderCandidate[] = [];
  for (const provider of VERIFIED_FUNDING_PROVIDERS) {
    if (provider.status !== 'ACTIVE_VERIFIED') continue;
    for (const productPathId of provider.productPathIds) {
      if (!productPathIds.includes(productPathId)) continue;
      const criteria = VERIFIED_PROVIDER_CRITERIA.find(item =>
        item.providerId === provider.id &&
        item.productPathId === productPathId &&
        item.confidence === 'VERIFIED'
      );
      if (!criteria) continue;
      candidates.push({
        providerId: provider.id,
        providerName: provider.name,
        productPathId,
        whyRelevant: ['Verified provider product mapping exists in the canonical registry.'],
        criteriaSource: criteria.source,
        lastVerifiedAt: criteria.verifiedAt,
        applicationUrl: provider.applicationUrl,
        humanReviewRequired: true
      });
    }
  }
  return candidates;
}
