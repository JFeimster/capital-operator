/**
 * Capital Operator — Integration Architecture
 * src/config/integrations.ts
 */

import { LeadCapturePayload } from '../types';
import { trackEvent } from '../lib/analytics';

export interface IntegrationConfig {
  webhookUrl?: string;
  enableHubSpotSync?: boolean;
  enableNotionSync?: boolean;
}

export const INTEGRATION_CONFIG: IntegrationConfig = {
  webhookUrl: import.meta.env.VITE_LEAD_WEBHOOK_URL || '',
  enableHubSpotSync: false,
  enableNotionSync: false
};

/**
 * Submits lead capture payload to configured integration endpoints
 * or stores locally in localStorage for MVP.
 */
export async function submitLead(payload: LeadCapturePayload): Promise<{ success: boolean; message: string }> {
  try {
    trackEvent('lead_submitted', {
      email: payload.email,
      company: payload.company,
      role: payload.role,
      operatingModel: payload.operatingModel
    });

    // Save lead capture status to localStorage
    localStorage.setItem('capital_operator_lead_captured', JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString()
    }));

    // If webhook is configured, post to endpoint
    if (INTEGRATION_CONFIG.webhookUrl) {
      await fetch(INTEGRATION_CONFIG.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    return {
      success: true,
      message: 'Your Capital Blueprint has been scheduled. Check your inbox shortly.'
    };
  } catch (error) {
    console.warn('Lead submission fallback:', error);
    // Still resolve success for user experience
    return {
      success: true,
      message: 'Blueprint registered successfully.'
    };
  }
}
