import { normalizeFundingIntent } from './fundingIntent.js';
import { checkFundingReadiness } from './fundingReadiness.js';
import { buildCapitalCase } from './capitalCase.js';
import { findFundingOptions } from './fundingOptions.js';
import { getFundingDocumentChecklist } from './fundingDocuments.js';
import type { FundingIntentInput, FundingJourneyResult } from '../types/funding.js';

export function runFundingJourney(input: FundingIntentInput): FundingJourneyResult {
  const intent = normalizeFundingIntent(input);
  const readiness = checkFundingReadiness(intent);
  const capitalCase = buildCapitalCase(intent);
  const options = findFundingOptions(intent);
  const documentChecklist = getFundingDocumentChecklist(intent);

  const nextAction = readiness.missingInformation.length
    ? 'Collect missing information before provider-specific review.'
    : options.providerCandidates.length
      ? 'Human-review verified provider candidates and prepare an authorized submission.'
      : 'Human-review capital categories and continue through the canonical funding intake path.';

  return { intent, readiness, capitalCase, options, documentChecklist, nextAction };
}
