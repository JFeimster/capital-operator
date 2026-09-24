import type { FundingProviderRecord, ProviderCandidate, ProviderCriteriaRecord } from '../types/funding.js';
import { GENERATED_FUNDING_PROVIDERS, GENERATED_PROVIDER_CRITERIA } from '../data/fundingResources.generated.js';

export const FUNDING_PROVIDERS: FundingProviderRecord[] = GENERATED_FUNDING_PROVIDERS;
export const PROVIDER_CRITERIA: ProviderCriteriaRecord[] = GENERATED_PROVIDER_CRITERIA;
export const VERIFIED_FUNDING_PROVIDERS = FUNDING_PROVIDERS.filter(provider => provider.status === 'ACTIVE_VERIFIED');
export const VERIFIED_PROVIDER_CRITERIA = PROVIDER_CRITERIA.filter(item => item.confidence === 'VERIFIED');

export const PROVIDER_REGISTRY_STATUS = {
  status: 'BETA' as const,
  canonicalConsumptionBoundary: 'src/config/fundingProviders.ts',
  sourcePackage: 'Registries.zip',
  importedAt: '2026-09-24',
  providerCount: FUNDING_PROVIDERS.length,
  verifiedProviderCount: VERIFIED_FUNDING_PROVIDERS.length,
  criteriaCount: PROVIDER_CRITERIA.length,
  verifiedCriteriaCount: VERIFIED_PROVIDER_CRITERIA.length,
  reviewedSources: ['Registries.zip','JFeimster/moonshine-ai-directory','JFeimster/funding-partners-os-dashboard','JFeimster/funding-partners-os','JFeimster/FundStack-AI'],
  reason: 'Provider candidates require source-verified provider identity plus product-level VERIFIED criteria. Imported criteria remain available for human review only.'
};

export function findVerifiedProviderCandidates(productPathIds: string[]): ProviderCandidate[] {
  const requested = new Set(productPathIds);
  const candidates: ProviderCandidate[] = [];
  for (const provider of VERIFIED_FUNDING_PROVIDERS) {
    for (const criteria of VERIFIED_PROVIDER_CRITERIA) {
      if (criteria.providerId !== provider.id || !requested.has(criteria.productPathId)) continue;
      candidates.push({
        providerId: provider.id,
        providerName: provider.name,
        productId: criteria.productId,
        productName: criteria.productName,
        productPathId: criteria.productPathId,
        whyRelevant: [
          'Provider identity is source-verified in the canonical registry.',
          'Product-level qualification criteria are explicitly marked VERIFIED in the source registry.'
        ],
        criteriaSource: criteria.source,
        lastVerifiedAt: criteria.verifiedAt,
        applicationUrl: provider.applicationUrl,
        humanReviewRequired: true
      });
    }
  }
  const seen = new Set<string>();
  return candidates.filter(candidate => {
    const key = `${candidate.providerId}:${candidate.productId || candidate.productPathId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
