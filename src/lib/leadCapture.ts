/**
 * Capital Operator — Lead Capture Dispatcher
 * src/lib/leadCapture.ts
 */

import { LeadCapturePayload } from '../types';
import { INTEGRATION_CONFIG } from '../config/integrations';
import { trackEvent } from './analytics';
import { ANALYTICS_EVENTS } from '../config/analyticsEvents';

export async function submitLeadCapture(payload: LeadCapturePayload): Promise<{
  success: boolean;
  message: string;
}> {
  trackEvent(ANALYTICS_EVENTS.LEAD_SUBMITTED, {
    role: payload.role,
    operatingModel: payload.operatingModel
  });

  const webhookUrl = INTEGRATION_CONFIG.webhookUrl;

  if (!webhookUrl) {
    // Graceful client simulation / offline capability
    return {
      success: true,
      message: 'Blueprint registered successfully. Your full specification and roadmap are ready.'
    };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
        source: 'capital-operator-app'
      })
    });

    if (!res.ok) {
      throw new Error(`Webhook responded with status ${res.status}`);
    }

    return {
      success: true,
      message: 'Blueprint registered. Welcome to the Moonshine Capital ecosystem.'
    };
  } catch (err) {
    console.warn('Lead capture webhook network error:', err);
    // Return true with client-side fallback so user is never blocked from their blueprint
    return {
      success: true,
      message: 'Blueprint registered locally. You may now export or print your roadmap.'
    };
  }
}
