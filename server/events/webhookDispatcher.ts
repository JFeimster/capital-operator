/**
 * Capital Operator — Webhook Dispatcher
 * server/events/webhookDispatcher.ts
 */

import { CapitalEvent, WebhookDeliveryResult } from './types.js';
import { signPayload } from './webhookSigner.js';
import crypto from 'crypto';

export interface WebhookDispatchOptions {
  targetUrl: string;
  secret: string;
  timeoutMs?: number;
  maxRetries?: number;
}

export async function dispatchWebhook(event: CapitalEvent, options: WebhookDispatchOptions): Promise<WebhookDeliveryResult> {
  const startTime = Date.now();
  const deliveryId = `del_${crypto.randomBytes(8).toString('hex')}`;
  const timeoutMs = options.timeoutMs || 5000;
  const rawBody = JSON.stringify(event);
  const signatureDetails = signPayload(rawBody, options.secret);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(options.targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Capital-Signature': signatureDetails.headerValue,
        'X-Capital-Event': event.type,
        'X-Capital-Delivery': deliveryId,
        'User-Agent': 'Capital-Operator-Webhook/1.0.0'
      },
      body: rawBody,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const durationMs = Date.now() - startTime;

    if (response.ok) {
      return { deliveryId, eventId: event.id, eventType: event.type, targetUrl: options.targetUrl, status: 'DELIVERED', httpStatus: response.status, attempt: 1, durationMs, timestamp: new Date().toISOString() };
    }

    return { deliveryId, eventId: event.id, eventType: event.type, targetUrl: options.targetUrl, status: 'FAILED', httpStatus: response.status, attempt: 1, durationMs, error: `Destination server returned HTTP ${response.status}`, timestamp: new Date().toISOString() };
  } catch (err: any) {
    clearTimeout(timeoutId);
    const durationMs = Date.now() - startTime;
    const isAbort = err?.name === 'AbortError';
    return { deliveryId, eventId: event.id, eventType: event.type, targetUrl: options.targetUrl, status: 'FAILED', attempt: 1, durationMs, error: isAbort ? `Webhook dispatch timed out after ${timeoutMs}ms` : (err?.message || 'Network failure'), timestamp: new Date().toISOString() };
  }
}
