/**
 * Capital Operator — Integration Dispatch Coordinator
 * server/integrations/dispatch.ts
 */

import { UnifiedLeadInput, DispatchSummary, IntegrationAdapterResult } from './types';
import { integrationRegistry } from './registry';

/**
 * Dispatches unified lead payloads across all configured server adapters.
 * Guarantees fault isolation: one adapter failing never prevents other adapters from executing.
 */
export async function dispatchToIntegrations(
  payload: UnifiedLeadInput,
  context?: Record<string, unknown>
): Promise<DispatchSummary> {
  const adapters = integrationRegistry.getAll();
  const results: IntegrationAdapterResult[] = [];
  const dispatchedTo: string[] = [];
  const errors: string[] = [];

  const executionPromises = adapters.map(async (adapter) => {
    try {
      const result = await adapter.dispatch(payload, context);
      return result;
    } catch (err: any) {
      return {
        provider: adapter.id,
        status: 'FAILED' as const,
        error: `Unhandled adapter error: ${err?.message || 'Unknown error'}`,
        durationMs: 0
      };
    }
  });

  const settledResults = await Promise.all(executionPromises);

  for (const result of settledResults) {
    results.push(result);
    if (result.status === 'SUCCESS') {
      dispatchedTo.push(result.provider);
    } else if (result.status === 'FAILED') {
      if (result.error) {
        errors.push(`${result.provider}: ${result.error}`);
      }
    }
  }

  // If no external providers were active, record buffer fallback
  if (dispatchedTo.length === 0) {
    dispatchedTo.push('serverless_buffer');
  }

  return {
    dispatchedTo,
    results,
    hasFailures: errors.length > 0,
    errors: errors.length > 0 ? errors : undefined
  };
}
