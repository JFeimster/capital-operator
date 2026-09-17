/**
 * Capital Operator — Integration Adapter & Dispatcher Test Suite
 * tests/integrationDispatch.test.ts
 */

import { dispatchToIntegrations } from '../server/integrations/dispatch';
import { integrationRegistry } from '../server/integrations/registry';

export async function runIntegrationDispatchTests() {
  const allAdapters = integrationRegistry.getAll();

  if (allAdapters.length < 4) {
    throw new Error(`Integration dispatch test failed: Expected at least 4 registered adapters, found ${allAdapters.length}`);
  }

  const sampleLead = {
    firstName: 'Sarah',
    email: 'sarah.connor@cyberdyne.org',
    company: 'Cyberdyne Systems',
    role: 'Managing Director',
    operatingModel: 'Hybrid-Model'
  };

  const dispatchSummary = await dispatchToIntegrations(sampleLead, {
    source: 'automated_test_suite'
  });

  if (!dispatchSummary || !Array.isArray(dispatchSummary.dispatchedTo)) {
    throw new Error('Integration dispatch test failed: Malformed dispatch summary response');
  }

  if (dispatchSummary.dispatchedTo.includes('serverless_buffer')) {
    throw new Error('Integration dispatch test failed: must not claim a non-existent serverless buffer');
  }

  if (dispatchSummary.dispatchedTo.length === 0) {
    if (!dispatchSummary.degraded) throw new Error('Integration dispatch test failed: no successful dispatch must be marked degraded');
    if (dispatchSummary.persistedExternally) throw new Error('Integration dispatch test failed: no successful dispatch cannot claim external persistence');
  }

  return { passed: true, testName: 'runIntegrationDispatchTests' };
}
