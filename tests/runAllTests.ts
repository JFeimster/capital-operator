/**
 * Capital Operator — Master Test Runner
 * tests/runAllTests.ts
 */

import { runAssessmentEngineTests } from './assessmentEngine.test.js';
import { runRecommendationEngineTests } from './recommendationEngine.test.js';
import { runComplianceGuardTests } from './complianceGuard.test.js';
import { runCtaRouterTests } from './ctaRouter.test.js';
import { runToolMatcherTests } from './toolMatcher.test.js';
import { runApiHealthTests } from './apiHealth.test.js';
import { runIntakeApiTests } from './intakeApi.test.js';
import { runRoutingApiTests } from './routingApi.test.js';
import { runWebhookSigningTests } from './webhookSigning.test.js';
import { runIntegrationDispatchTests } from './integrationDispatch.test.js';
import { runCapitalMathTests } from './capitalMath.test.js';
import { runEcosystemRoutingTests } from './ecosystemRouting.test.js';
import { runDocumentNormalizationTests } from './documentNormalization.test.js';
import { runMcpContractTests } from './mcpContract.test.js';
import { runIntelligenceManifestTests } from './intelligenceManifests.test.js';
import { runPublicToolTests } from './publicTools.test.js';
import { runPhase4BTests } from './phase4bKnowledge.test.js';

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
    { name: 'Integration Dispatch & Fallbacks', fn: runIntegrationDispatchTests },
    { name: 'Deterministic Capital Math', fn: runCapitalMathTests },
    { name: 'Ecosystem Capability Routing', fn: runEcosystemRoutingTests },
    { name: 'Document Intelligence Normalization', fn: runDocumentNormalizationTests },
    { name: 'MCP Contract', fn: runMcpContractTests },
    { name: 'Skill & Agent Manifests', fn: runIntelligenceManifestTests },
    { name: 'Phase 4A Public Tools', fn: runPublicToolTests },
    { name: 'Phase 4B Knowledge & Entity Layer', fn: runPhase4BTests }
  ];

  let passed = 0;
  let failed = 0;

  for (const suite of testSuites) {
    try {
      await suite.fn();
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
