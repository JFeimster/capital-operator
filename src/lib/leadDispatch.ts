/**
 * Capital Operator — Provider-Agnostic Lead Dispatch Layer
 * src/lib/leadDispatch.ts
 */

import { LeadCapturePayload } from '../types';
import { getAttribution, AttributionData } from './attribution';
import { trackEvent } from './analytics';
import { ANALYTICS_EVENTS } from '../config/analyticsEvents';

export interface EnrichedLeadPayload extends LeadCapturePayload {
  attribution: AttributionData;
  submittedAt: string;
  source: string;
}

export interface LeadDispatchResponse {
  success: boolean;
  message: string;
  destination?: string;
  dispatchedTo?: string[];
}

/**
 * Dispatches lead payload to the serverless backend (/api/lead)
 * with transparent fallback to client-side storage and direct webhooks
 * when backend services are unprovisioned or offline.
 */
export async function submitLead(payload: LeadCapturePayload): Promise<LeadDispatchResponse> {
  const attribution = getAttribution();

  const enrichedPayload: EnrichedLeadPayload = {
    ...payload,
    attribution,
    submittedAt: new Date().toISOString(),
    source: 'capital-operator'
  };

  // Track event in client analytics
  trackEvent(ANALYTICS_EVENTS.LEAD_SUBMITTED, {
    email: payload.email,
    role: payload.role,
    company: payload.company,
    operatingModel: payload.operatingModel
  });

  // 1. Save local record for resilience
  try {
    localStorage.setItem('capital_operator_lead_captured', JSON.stringify(enrichedPayload));
  } catch (e) {
    // Non-blocking
  }

  // 2. Attempt secure serverless endpoint dispatch (/api/lead)
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enrichedPayload)
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        message: data.message || 'Blueprint registered successfully. Your full specification and roadmap are ready.',
        destination: 'serverless_api',
        dispatchedTo: data.dispatchedTo || ['serverless_pipeline']
      };
    }
  } catch (err) {
    // Expected in standalone client mode or when serverless function is not active in dev
    console.info('Serverless endpoint unavailable, activating graceful client fallback.');
  }

  // 3. Fallback: Optional Direct Webhook if configured in environment
  const directWebhook = import.meta.env.VITE_LEAD_DISPATCH_WEBHOOK_URL;
  if (directWebhook) {
    try {
      await fetch(directWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrichedPayload)
      });
      return {
        success: true,
        message: 'Blueprint registered. Welcome to the Moonshine Capital ecosystem.',
        destination: 'direct_webhook'
      };
    } catch (whErr) {
      console.warn('Direct webhook fallback failed:', whErr);
    }
  }

  // 4. Default graceful completion - User is never blocked from their blueprint
  return {
    success: true,
    message: 'Your Capital Blueprint has been registered. You may now export or print your roadmap.',
    destination: 'local_storage'
  };
}
