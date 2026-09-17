/**
 * Capital Operator — n8n Workflow Server Integration Adapter
 * server/integrations/n8n.ts
 */

import { IntegrationAdapter, IntegrationAdapterResult, UnifiedLeadInput } from './types.js';

export class N8nAdapter implements IntegrationAdapter {
  id = 'n8n';
  name = 'n8n Workflow Automation';

  isEnabled(): boolean {
    return process.env.ENABLE_N8N_INTEGRATION !== 'false';
  }

  isConfigured(): boolean {
    return Boolean(process.env.N8N_WEBHOOK_URL);
  }

  async dispatch(payload: UnifiedLeadInput, context?: Record<string, unknown>): Promise<IntegrationAdapterResult> {
    const startTime = Date.now();
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

    if (!this.isEnabled()) {
      return { provider: this.id, status: 'DISABLED', message: 'n8n integration is disabled via environment configuration.', durationMs: Date.now() - startTime };
    }

    if (!webhookUrl) {
      return { provider: this.id, status: 'DEGRADED', message: 'N8N_WEBHOOK_URL not configured in server environment. Skipping sync.', durationMs: Date.now() - startTime };
    }

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (webhookSecret) headers['X-Webhook-Secret'] = webhookSecret;

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ event: 'lead.ingested', payload, context, dispatchedAt: new Date().toISOString() })
      });

      const durationMs = Date.now() - startTime;
      if (response.ok) return { provider: this.id, status: 'SUCCESS', statusCode: response.status, message: 'n8n workflow triggered successfully.', durationMs };

      const errorText = await response.text();
      return { provider: this.id, status: 'FAILED', statusCode: response.status, error: `n8n webhook error: ${response.status} ${errorText}`, durationMs };
    } catch (err: any) {
      return { provider: this.id, status: 'FAILED', error: `n8n webhook network exception: ${err?.message || 'Unknown error'}`, durationMs: Date.now() - startTime };
    }
  }
}
