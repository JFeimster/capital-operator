/**
 * Capital Operator — Integration Dispatch Coordinator
 * server/integrations/dispatch.ts
 */

import { UnifiedLeadInput, DispatchSummary, IntegrationAdapterResult } from './types';
import { integrationRegistry } from './registry';

/**
 * Dispatches unified lead payloads across all configured server adapters.
 * Guarantees fault isolation: one adapter failing never prevents other adapters from executing.
 * This function does not claim persistence unless an adapter reports SUCCESS.
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
      return await adapter.dispatch(payload, context);
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
    } else if (result.status === 'FAILED' && result.error) {
      errors.push(`${result.provider}: ${result.error}`);
    }
  }

  const persistedExternally = dispatchedTo.length > 0;
  const degraded = !persistedExternally;

  if (degraded && errors.length === 0) {
    errors.push('No external integration accepted or persisted this payload. Core intake completed, but durable external persistence is unavailable.');
  }

  return {
    dispatchedTo,
    results,
    hasFailures: results.some(result => result.status === 'FAILED'),
    degraded,
    persistedExternally,
    errors: errors.length > 0 ? errors : undefined
  };
}
