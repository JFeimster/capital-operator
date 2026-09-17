/**
 * Capital Operator — Tool Matcher Tests
 * tests/toolMatcher.test.ts
 */

import { matchToolsForStage } from '../src/lib/toolMatcher';

export function runToolMatcherTests() {
  const stage1Result = matchToolsForStage(1, '$0 — using free tools');
  if (!stage1Result.primary) {
    throw new Error('Test Failed: Stage 1 should yield a primary tool');
  }

  const stage3Result = matchToolsForStage(3, '$750–$2,000/mo');
  if (!stage3Result.primary.name) {
    throw new Error('Test Failed: Stage 3 tool should have a name');
  }

  return { passed: true, testName: 'runToolMatcherTests' };
}
