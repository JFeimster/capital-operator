/**
 * Capital Operator — Provider-agnostic document intelligence contracts
 */

export type DocumentKind =
  | 'BANK_STATEMENT'
  | 'PROFIT_AND_LOSS'
  | 'BALANCE_SHEET'
  | 'TAX_RETURN'
  | 'INVOICE'
  | 'ACCOUNTS_RECEIVABLE_AGING'
  | 'DEBT_SCHEDULE'
  | 'OTHER';

export interface DocumentMetadata {
  documentId: string;
  fileName: string;
  mimeType?: string;
  receivedAt?: string;
  periodStart?: string;
  periodEnd?: string;
  source?: string;
}

export interface ExtractedField<T = unknown> {
  field: string;
  value: T;
  confidence: number;
  sourcePage?: number;
  sourceReference?: string;
  reviewRequired: boolean;
}

export interface DocumentExtractionResult {
  document: DocumentMetadata;
  classifiedAs: DocumentKind;
  classificationConfidence: number;
  fields: ExtractedField[];
  warnings: string[];
  humanReviewRequired: boolean;
  provider?: string;
}

export interface DocumentClassifier {
  id: string;
  classify(document: DocumentMetadata, content: unknown): Promise<Pick<DocumentExtractionResult,'classifiedAs'|'classificationConfidence'|'warnings'>>;
}

export interface DocumentParser {
  id: string;
  supports(kind: DocumentKind): boolean;
  parse(document: DocumentMetadata, content: unknown): Promise<DocumentExtractionResult>;
}

export interface DocumentSynthesisInput {
  extractions: DocumentExtractionResult[];
  verifiedFacts?: Record<string, unknown>;
}

export interface DocumentSynthesisResult {
  summary: string;
  unresolvedFields: string[];
  reviewFlags: string[];
  sourceDocumentIds: string[];
  humanReviewRequired: true;
}

export interface DocumentSynthesizer {
  id: string;
  synthesize(input: DocumentSynthesisInput): Promise<DocumentSynthesisResult>;
}
