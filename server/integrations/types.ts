/**
 * Capital Operator — Server Integration Adapter Contracts
 * server/integrations/types.ts
 */

import { LeadCapturePayload } from '../../src/types';
import { IntakeSubmitRequest } from '../../src/types/api';

export type UnifiedLeadInput = LeadCapturePayload | IntakeSubmitRequest;

export interface IntegrationAdapterResult {
  provider: string;
  status: 'SUCCESS' | 'DEGRADED' | 'DISABLED' | 'FAILED' | 'SKIPPED';
  recordId?: string;
  statusCode?: number;
  message?: string;
  error?: string;
  durationMs: number;
}

export interface IntegrationAdapter {
  id: string;
  name: string;
  isEnabled(): boolean;
  isConfigured(): boolean;
  dispatch(payload: UnifiedLeadInput, context?: Record<string, unknown>): Promise<IntegrationAdapterResult>;
}

export interface DispatchSummary {
  dispatchedTo: string[];
  results: IntegrationAdapterResult[];
  hasFailures: boolean;
  errors?: string[];
}
