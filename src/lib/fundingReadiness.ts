import { getFundingDocumentChecklist } from './fundingDocuments.js';
import { getFundingIntentMissingFields } from './fundingIntent.js';
import type { FundingIntent, FundingReadinessResult, MissingFundingField } from '../types/funding.js';

export function checkFundingReadiness(intent: FundingIntent): FundingReadinessResult {
  const missing = getFundingIntentMissingFields(intent);
  const checklist = getFundingDocumentChecklist(intent);
  const routingMissing = missing.filter(item => item.requiredFor === 'INTENT' || item.requiredFor === 'ROUTING');
  const caseMissing = missing.filter(item => item.requiredFor !== 'PROVIDER_REVIEW');

  const documentPlaceholders: MissingFundingField[] = checklist.items
    .filter(item => item.required)
    .map(item => ({
      field: `document:${item.id}`,
      reason: `Required preparation item: ${item.label}`,
      requiredFor: 'CAPITAL_CASE'
    }));

  const sections = [
    {
      id: 'required_information' as const,
      status: missing.filter(item => item.requiredFor === 'INTENT').length ? 'NEEDS_INFORMATION' as const : 'READY' as const,
      missing: missing.filter(item => item.requiredFor === 'INTENT')
    },
    {
      id: 'documents' as const,
      status: 'REVIEW' as const,
      missing: documentPlaceholders
    },
    {
      id: 'capital_case' as const,
      status: caseMissing.length ? 'NEEDS_INFORMATION' as const : 'REVIEW' as const,
      missing: caseMissing
    },
    {
      id: 'routing' as const,
      status: routingMissing.length ? 'NEEDS_INFORMATION' as const : 'REVIEW' as const,
      missing: routingMissing
    }
  ];

  const nextActions: string[] = [];
  if (missing.length) nextActions.push('Collect the missing business and transaction information.');
  nextActions.push('Confirm the document checklist and mark received documents in the operational system.');
  if (!routingMissing.length) nextActions.push('Run capital-category routing and human review.');

  return {
    status: 'LIVE',
    intentId: intent.id,
    sections,
    missingInformation: missing,
    readyForCapitalCase: caseMissing.length === 0,
    readyForRouting: routingMissing.length === 0,
    nextActions,
    humanReviewRequired: true
  };
}
