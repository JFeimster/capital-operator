import type { DocumentExtractionResult, ExtractedField } from './types.js';

export function normalizeConfidence(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, Number(value.toFixed(4))));
}

export function normalizeExtractedField(field: ExtractedField): ExtractedField {
  const confidence = normalizeConfidence(field.confidence);
  return {
    ...field,
    confidence,
    reviewRequired: field.reviewRequired || confidence < 0.9
  };
}

export function normalizeExtractionResult(result: DocumentExtractionResult): DocumentExtractionResult {
  const classificationConfidence = normalizeConfidence(result.classificationConfidence);
  const fields = result.fields.map(normalizeExtractedField);
  const lowConfidence = fields.some(field => field.reviewRequired);
  return {
    ...result,
    classificationConfidence,
    fields,
    warnings: [...new Set(result.warnings)],
    humanReviewRequired: result.humanReviewRequired || classificationConfidence < 0.9 || lowConfidence
  };
}
