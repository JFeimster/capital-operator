/**
 * Capital Operator — Notion Server Integration Adapter
 * server/integrations/notion.ts
 */

import { IntegrationAdapter, IntegrationAdapterResult, UnifiedLeadInput } from './types.js';

export class NotionAdapter implements IntegrationAdapter {
  id = 'notion';
  name = 'Notion Database';

  isEnabled(): boolean {
    return process.env.ENABLE_NOTION_INTEGRATION !== 'false';
  }

  isConfigured(): boolean {
    return Boolean(process.env.NOTION_TOKEN && (process.env.NOTION_FUNDING_LEADS_DATABASE_ID || process.env.NOTION_DATABASE_ID));
  }

  async dispatch(payload: UnifiedLeadInput, context?: Record<string, unknown>): Promise<IntegrationAdapterResult> {
    const startTime = Date.now();
    const token = process.env.NOTION_TOKEN;
    const databaseId = process.env.NOTION_FUNDING_LEADS_DATABASE_ID || process.env.NOTION_DATABASE_ID || '62e717f6-e619-41d4-99bc-f81a41daacfe';

    if (!this.isEnabled()) {
      return { provider: this.id, status: 'DISABLED', message: 'Notion integration is disabled via environment configuration.', durationMs: Date.now() - startTime };
    }

    if (!token) {
      return { provider: this.id, status: 'DEGRADED', message: 'NOTION_TOKEN not configured in server environment. Skipping sync.', durationMs: Date.now() - startTime };
    }

    const email = ('email' in payload ? payload.email : '')?.trim();
    const firstName = 'firstName' in payload ? payload.firstName : ('contact_name' in payload ? payload.contact_name : '');
    const company = 'company' in payload ? payload.company : ('business_name' in payload ? payload.business_name : '');
    const role = 'role' in payload ? payload.role : 'Borrower / Advisor';
    const operatingModel = 'operatingModel' in payload ? payload.operatingModel : 'Relationship-Led';

    try {
      const response = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28' },
        body: JSON.stringify({
          parent: { database_id: databaseId },
          properties: {
            Name: { title: [{ text: { content: `${firstName || 'Lead'} (${company || 'Company'})` } }] },
            Email: { email: email || undefined },
            Company: { rich_text: [{ text: { content: company || '' } }] },
            Role: { select: { name: role || 'Advisor' } },
            'Operating Model': { select: { name: operatingModel || 'Relationship-Led' } }
          }
        })
      });

      const durationMs = Date.now() - startTime;
      if (response.ok) {
        const data = await response.json();
        return { provider: this.id, status: 'SUCCESS', recordId: data?.id, statusCode: response.status, message: 'Notion lead page created successfully.', durationMs };
      }

      const errorText = await response.text();
      return { provider: this.id, status: 'FAILED', statusCode: response.status, error: `Notion API error: ${errorText}`, durationMs };
    } catch (err: any) {
      return { provider: this.id, status: 'FAILED', error: `Notion network exception: ${err?.message || 'Unknown error'}`, durationMs: Date.now() - startTime };
    }
  }
}
