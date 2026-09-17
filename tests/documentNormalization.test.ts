import { normalizeExtractionResult } from '../server/documents/normalizer';

export function runDocumentNormalizationTests() {
  const result=normalizeExtractionResult({
    document:{documentId:'doc_1',fileName:'bank.pdf'},
    classifiedAs:'BANK_STATEMENT',
    classificationConfidence:1.2,
    fields:[{field:'monthlyDeposits',value:100000,confidence:0.72,reviewRequired:false}],
    warnings:['needs review','needs review'],
    humanReviewRequired:false
  });
  if(result.classificationConfidence!==1) throw new Error('Confidence must clamp to 1');
  if(!result.fields[0].reviewRequired) throw new Error('Low confidence field must require review');
  if(!result.humanReviewRequired) throw new Error('Extraction must require review');
  if(result.warnings.length!==1) throw new Error('Warnings should be deduplicated');
  return {passed:true,testName:'runDocumentNormalizationTests'};
}
