import { FUNDING_PRODUCT_PATHS } from '../config/fundingProducts.js';
import { findVerifiedProviderCandidates } from '../config/fundingProviders.js';
import type { FundingIntent, FundingOptionsResult } from '../types/funding.js';

export function findFundingOptions(intent: FundingIntent): FundingOptionsResult {
  const matches = FUNDING_PRODUCT_PATHS.filter(path =>
    path.vertical === intent.vertical || path.purposes.includes(intent.fundingPurpose)
  );

  const categoryFits = matches.map((path, index) => ({
    productPathId: path.id,
    productName: path.name,
    fit: index === 0 ? 'POTENTIAL_PATH' as const : 'REVIEW' as const,
    reasons: [
      ...(path.vertical === intent.vertical ? [`Matches ${intent.vertical.replace(/_/g, ' ')} funding vertical.`] : []),
      ...(path.purposes.includes(intent.fundingPurpose) ? [`Supports ${intent.fundingPurpose.replace(/_/g, ' ')} use case.`] : [])
    ],
    humanReviewRequired: true as const
  }));

  const providerCandidates = findVerifiedProviderCandidates(categoryFits.map(item => item.productPathId));

  return {
    status: 'BETA',
    intent,
    categoryFits,
    providerCandidates,
    providerDiscoveryStatus: providerCandidates.length ? 'VERIFIED_RESULTS' : 'NO_VERIFIED_PROVIDER_DATA',
    disclaimer: 'Capital-category matching is not lender approval or eligibility. Provider-specific candidates appear only when the canonical registry contains current verified provenance.',
    nextAction: providerCandidates.length
      ? 'Review verified provider criteria and choose a submission path with a human operator.'
      : 'Complete readiness and route the request by product category; provider-specific selection requires verified provider data and human review.',
    humanReviewRequired: true
  };
}
