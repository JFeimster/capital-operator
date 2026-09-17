/**
 * Capital Operator — Webhook Testing & Verification API Endpoint
 * api/v1/webhooks/test.ts
 */

import { WebhookTestRequest, WebhookTestResponse, ApiErrorResponse } from '../../../src/types/api.js';
import { dispatchWebhook } from '../../../server/events/webhookDispatcher.js';
import { serverEventBus } from '../../../server/events/eventBus.js';
import { signPayload } from '../../../server/events/webhookSigner.js';
import { applyCors } from '../../../server/http/cors.js';

export default async function handler(req: any, res: any) {
  applyCors(req, res, ['POST', 'OPTIONS']);

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    const errorResponse: ApiErrorResponse = {
      status: 'error',
      code: 'METHOD_NOT_ALLOWED',
      message: 'Method Not Allowed. Expected POST.',
      timestamp: new Date().toISOString()
    };
    return res.status(405).json(errorResponse);
  }

  try {
    const rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const body: WebhookTestRequest = rawBody || {};

    if (!body.target_url || !/^https?:\/\//i.test(body.target_url)) {
      const errorResponse: ApiErrorResponse = {
        status: 'error',
        code: 'VALIDATION_FAILED',
        message: 'A valid http/https target_url is required.',
        timestamp: new Date().toISOString()
      };
      return res.status(400).json(errorResponse);
    }

    if (!body.secret || body.secret.length < 8) {
      const errorResponse: ApiErrorResponse = {
        status: 'error',
        code: 'VALIDATION_FAILED',
        message: 'A webhook secret (min 8 chars) is required for HMAC signing.',
        timestamp: new Date().toISOString()
      };
      return res.status(400).json(errorResponse);
    }

    const eventType = (body.event_type as any) || 'lead.submitted';
    const samplePayload = body.sample_payload || {
      submission_id: 'intake_test_992a',
      business_name: 'Acme Test Corp',
      workflow_priority: 'HUMAN_REVIEW',
      is_test_event: true
    };

    const testEvent = serverEventBus.createEvent(eventType, samplePayload, {
      source: 'api-webhook-test',
      environment: 'sandbox'
    });

    const signature = signPayload(JSON.stringify(testEvent), body.secret);
    const deliveryResult = await dispatchWebhook(testEvent, {
      targetUrl: body.target_url,
      secret: body.secret,
      timeoutMs: 6000
    });

    const response: WebhookTestResponse = {
      status: deliveryResult.status === 'DELIVERED' ? 'success' : 'failed',
      delivery_id: deliveryResult.deliveryId,
      target_url: body.target_url,
      event_type: eventType,
      http_status: deliveryResult.httpStatus,
      signature_header: signature.headerValue,
      duration_ms: deliveryResult.durationMs,
      error: deliveryResult.error,
      timestamp: new Date().toISOString()
    };

    return res.status(deliveryResult.status === 'DELIVERED' ? 200 : 502).json(response);
  } catch (err: any) {
    const errorResponse: ApiErrorResponse = {
      status: 'error',
      code: 'TEST_DISPATCH_FAILED',
      message: 'Failed to execute test webhook delivery.',
      details: [err?.message || 'Unknown error'],
      timestamp: new Date().toISOString()
    };
    return res.status(500).json(errorResponse);
  }
}
