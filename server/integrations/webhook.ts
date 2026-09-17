/**
 * Capital Operator — Generic Outbound Webhook Server Adapter
 * server/integrations/webhook.ts
 */

import { IntegrationAdapter, IntegrationAdapterResult, UnifiedLeadInput } from './types';

export class GenericWebhookAdapter implements IntegrationAdapter {
  id = 'genericWebhook';
  name = 'Generic Outbound Webhook';

  isEnabled(): boolean {
    return process.env.ENABLE_GENERIC_WEBHOOK !== 'false';
  }

  isConfigured(): boolean {
    return Boolean(process.env.LEAD_DISPATCH_WEBHOOK_URL || process.env.OUTBOUND_WEBHOOK_URL);
  }

  async dispatch(payload: UnifiedLeadInput, context?: Record<string, unknown>): Promise<IntegrationAdapterResult> {
    const startTime = Date.now();
    const webhookUrl = process.env.LEAD_DISPATCH_WEBHOOK_URL || process.env.OUTBOUND_WEBHOOK_URL;
    const webhookSecret = process.env.WEBHOOK_SECRET || process.env.LEAD_DISPATCH_SECRET;

    if (!this.isEnabled()) {
      return {
        provider: this.id,
        status: 'DISABLED',
        message: 'Generic webhook is disabled.',
        durationMs: Date.now() - startTime
      };
    }

    if (!webhookUrl) {
      return {
        provider: this.id,
        status: 'DEGRADED',
        message: 'Outbound webhook URL not configured.',
        durationMs: Date.now() - startTime
      };
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (webhookSecret) {
        headers['X-Capital-Secret'] = webhookSecret;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          payload,
          context,
          dispatchedAt: new Date().toISOString()
        })
      });

      const durationMs = Date.now() - startTime;

      if (response.ok) {
        return {
          provider: this.id,
          status: 'SUCCESS',
          statusCode: response.status,
          message: 'Generic outbound webhook delivered successfully.',
          durationMs
        };
      }

      return {
        provider: this.id,
        status: 'FAILED',
        statusCode: response.status,
        error: `Webhook returned HTTP ${response.status}`,
        durationMs
      };
    } catch (err: any) {
      return {
        provider: this.id,
        status: 'FAILED',
        error: `Webhook dispatch failed: ${err?.message || 'Unknown error'}`,
        durationMs: Date.now() - startTime
      };
    }
  }
}
