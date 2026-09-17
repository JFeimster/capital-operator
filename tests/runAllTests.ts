/**
 * Capital Operator — Master Test Runner
 * tests/runAllTests.ts
 */

import { runAssessmentEngineTests } from './assessmentEngine.test';
import { runRecommendationEngineTests } from './recommendationEngine.test';
import { runComplianceGuardTests } from './complianceGuard.test';
import { runCtaRouterTests } from './ctaRouter.test';
import { runToolMatcherTests } from './toolMatcher.test';
import { runApiHealthTests } from './apiHealth.test';
import { runIntakeApiTests } from './intakeApi.test';
import { runRoutingApiTests } from './routingApi.test';
import { runWebhookSigningTests } from './webhookSigning.test';
import { runIntegrationDispatchTests } from './integrationDispatch.test';

async function main() {
  console.log('\n======================================================');
  console.log('🚀 Running Capital Operator Automated Test Suite');
  console.log('======================================================\n');

  const testSuites = [
    { name: 'Assessment Engine', fn: runAssessmentEngineTests },
    { name: 'Recommendation Engine', fn: runRecommendationEngineTests },
    { name: 'Compliance Guard', fn: runComplianceGuardTests },
    { name: 'CTA Router', fn: runCtaRouterTests },
    { name: 'Tool Matcher', fn: runToolMatcherTests },
    { name: 'API Health Check', fn: runApiHealthTests },
    { name: 'Intake API & Triage', fn: runIntakeApiTests },
    { name: 'Buy-Box Routing Engine', fn: runRoutingApiTests },
    { name: 'Webhook HMAC Signing & Verification', fn: runWebhookSigningTests },
    { name: 'Integration Dispatch & Fallbacks', fn: runIntegrationDispatchTests }
  ];

  let passed = 0;
  let failed = 0;

  for (const suite of testSuites) {
    try {
      const result = await suite.fn();
      console.log(`  ✅ [PASS] ${suite.name}`);
      passed++;
    } catch (err: any) {
      console.error(`  ❌ [FAIL] ${suite.name}: ${err?.message || err}`);
      failed++;
    }
  }

  console.log('\n------------------------------------------------------');
  console.log(`Summary: ${passed} passed, ${failed} failed (${testSuites.length} total)`);
  console.log('------------------------------------------------------\n');

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
