/**
 * Capital Operator — HubSpot Server Integration Adapter
 * server/integrations/hubspot.ts
 */

import { IntegrationAdapter, IntegrationAdapterResult, UnifiedLeadInput } from './types';

export class HubSpotAdapter implements IntegrationAdapter {
  id = 'hubspot';
  name = 'HubSpot CRM';

  isEnabled(): boolean {
    return process.env.ENABLE_HUBSPOT_INTEGRATION !== 'false';
  }

  isConfigured(): boolean {
    return Boolean(process.env.HUBSPOT_ACCESS_TOKEN);
  }

  async dispatch(payload: UnifiedLeadInput, context?: Record<string, unknown>): Promise<IntegrationAdapterResult> {
    const startTime = Date.now();
    const token = process.env.HUBSPOT_ACCESS_TOKEN;

    if (!this.isEnabled()) {
      return {
        provider: this.id,
        status: 'DISABLED',
        message: 'HubSpot integration is disabled via environment configuration.',
        durationMs: Date.now() - startTime
      };
    }

    if (!token) {
      return {
        provider: this.id,
        status: 'DEGRADED',
        message: 'HUBSPOT_ACCESS_TOKEN not configured in server environment. Skipping sync.',
        durationMs: Date.now() - startTime
      };
    }

    const email = ('email' in payload ? payload.email : '')?.trim().toLowerCase();
    const firstName = 'firstName' in payload ? payload.firstName : ('contact_name' in payload ? payload.contact_name : '');
    const company = 'company' in payload ? payload.company : ('business_name' in payload ? payload.business_name : '');
    const role = 'role' in payload ? payload.role : '';
    const operatingModel = 'operatingModel' in payload ? payload.operatingModel : '';

    if (!email) {
      return {
        provider: this.id,
        status: 'FAILED',
        error: 'Email address missing for HubSpot contact creation.',
        durationMs: Date.now() - startTime
      };
    }

    try {
      const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: {
            email,
            firstname: firstName?.trim() || '',
            company: company?.trim() || '',
            jobtitle: role || 'Capital Operator Contact',
            capital_operator_operating_model: operatingModel || 'Relationship-Led',
            utm_source: (context?.utm_source as string) || '',
            partner_id: (context?.partner_id as string) || ''
          }
        })
      });

      const durationMs = Date.now() - startTime;

      if (response.ok || response.status === 409) {
        return {
          provider: this.id,
          status: 'SUCCESS',
          statusCode: response.status,
          message: response.status === 409 ? 'HubSpot contact already exists (reconciled).' : 'HubSpot contact created.',
          durationMs
        };
      }

      const errorText = await response.text();
      return {
        provider: this.id,
        status: 'FAILED',
        statusCode: response.status,
        error: `HubSpot API returned ${response.status}: ${errorText}`,
        durationMs
      };
    } catch (err: any) {
      return {
        provider: this.id,
        status: 'FAILED',
        error: `HubSpot network exception: ${err?.message || 'Unknown error'}`,
        durationMs: Date.now() - startTime
      };
    }
  }
}
