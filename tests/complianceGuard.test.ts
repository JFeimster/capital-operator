/**
 * Capital Operator — Compliance Guard Tests
 * tests/complianceGuard.test.ts
 */

import { validateTextCompliance, sanitizeUserInput } from '../src/lib/complianceGuard';

export function runComplianceGuardTests() {
  const badPhrase = 'We promise guaranteed loan approval in minutes!';
  const result = validateTextCompliance(badPhrase);

  if (result.isCompliant) {
    throw new Error('Test Failed: Should detect prohibited term "guaranteed loan"');
  }

  const cleanPhrase = 'We review commercial debt suitability with institutional partners.';
  const cleanResult = validateTextCompliance(cleanPhrase);

  if (!cleanResult.isCompliant) {
    throw new Error('Test Failed: Valid phrase flagged incorrectly');
  }

  const injection = '<script>alert("hack")</script>Acme Capital';
  const sanitized = sanitizeUserInput(injection);
  if (sanitized.includes('<') || sanitized.includes('>')) {
    throw new Error('Test Failed: Failed to strip angle brackets from user input');
  }

  return { passed: true, testName: 'runComplianceGuardTests' };
}
