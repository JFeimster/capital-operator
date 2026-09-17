/**
 * Capital Operator — Webhook Signing & HMAC Verification Test Suite
 * tests/webhookSigning.test.ts
 */

import { signPayload, verifySignature } from '../server/events/webhookSigner';

export function runWebhookSigningTests() {
  const secret = 'whsec_test_secret_key_849204918234';
  const rawBody = JSON.stringify({
    id: 'evt_test_123',
    type: 'deal.submitted',
    timestamp: new Date().toISOString(),
    payload: { deal_id: 'deal_98412a', business_name: 'Alpha Capital Corp' }
  });

  // Test 1: Sign payload and verify successfully
  const signatureDetails = signPayload(rawBody, secret);
  const verifyResult = verifySignature(rawBody, signatureDetails.headerValue, secret);

  if (!verifyResult.valid) {
    throw new Error(`Webhook signing failed: Expected valid verification, got: ${verifyResult.reason}`);
  }

  // Test 2: Tampered payload fails verification
  const tamperedBody = JSON.stringify({
    id: 'evt_test_123',
    type: 'deal.submitted',
    timestamp: new Date().toISOString(),
    payload: { deal_id: 'deal_98412a', business_name: 'Tampered Hacker Corp' }
  });
  const tamperedResult = verifySignature(tamperedBody, signatureDetails.headerValue, secret);

  if (tamperedResult.valid) {
    throw new Error('Webhook signing failed: Tampered payload should NOT be valid');
  }

  // Test 3: Wrong secret fails verification
  const wrongSecretResult = verifySignature(rawBody, signatureDetails.headerValue, 'whsec_wrong_secret_123456');

  if (wrongSecretResult.valid) {
    throw new Error('Webhook signing failed: Verification with wrong secret should fail');
  }

  // Test 4: Expired timestamp fails tolerance check
  const oldTimestamp = Math.floor(Date.now() / 1000) - 600; // 10 mins ago
  const expiredSignDetails = signPayload(rawBody, secret, oldTimestamp);
  const expiredResult = verifySignature(rawBody, expiredSignDetails.headerValue, secret, 300); // 5 min tolerance

  if (expiredResult.valid) {
    throw new Error('Webhook signing failed: Expired signature should fail tolerance check');
  }

  return { passed: true, testName: 'runWebhookSigningTests' };
}
