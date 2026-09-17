/**
 * Capital Operator — Cryptographic Webhook Signing & Verification
 * server/events/webhookSigner.ts
 */

import crypto from 'crypto';

export interface SignatureDetails {
  timestamp: number;
  signature: string;
  headerValue: string;
}

/**
 * Computes an HMAC-SHA256 signature for a raw JSON payload string and secret.
 * Format: t=<timestamp>,v1=<hex_hmac>
 */
export function signPayload(payloadString: string, secret: string, timestamp: number = Math.floor(Date.now() / 1000)): SignatureDetails {
  const signedPayload = `${timestamp}.${payloadString}`;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(signedPayload);
  const signature = hmac.digest('hex');
  const headerValue = `t=${timestamp},v1=${signature}`;

  return {
    timestamp,
    signature,
    headerValue
  };
}

/**
 * Verifies an incoming webhook signature in constant time against replay and tampering.
 * Tolerates clock drift up to toleranceSeconds (default 300s / 5 minutes).
 */
export function verifySignature(
  rawBody: string,
  signatureHeader: string,
  secret: string,
  toleranceSeconds: number = 300
): { valid: boolean; reason?: string } {
  if (!signatureHeader || !secret) {
    return { valid: false, reason: 'Missing signature header or secret' };
  }

  // Parse header: t=1690000000,v1=abcdef...
  const parts = signatureHeader.split(',');
  let timestampStr: string | undefined;
  let signatureV1: string | undefined;

  for (const part of parts) {
    const [key, value] = part.trim().split('=');
    if (key === 't') timestampStr = value;
    if (key === 'v1') signatureV1 = value;
  }

  if (!timestampStr || !signatureV1) {
    return { valid: false, reason: 'Malformed signature header format' };
  }

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) {
    return { valid: false, reason: 'Invalid timestamp in header' };
  }

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > toleranceSeconds) {
    return { valid: false, reason: `Timestamp out of tolerance window (${toleranceSeconds}s)` };
  }

  const signedPayload = `${timestamp}.${rawBody}`;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(signedPayload);
  const expectedSignature = hmac.digest('hex');

  try {
    const signatureBuffer = Buffer.from(signatureV1, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (signatureBuffer.length !== expectedBuffer.length) {
      return { valid: false, reason: 'Signature length mismatch' };
    }

    const match = crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
    return match ? { valid: true } : { valid: false, reason: 'HMAC signature mismatch' };
  } catch (err: any) {
    return { valid: false, reason: `Verification exception: ${err?.message || 'Invalid format'}` };
  }
}
