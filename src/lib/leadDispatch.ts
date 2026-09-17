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
 * Dispatches lead payload to the secure serverless backend when available,
 * with transparent fallback to client-side storage when it is not.
 */
export async function submitLead(payload: LeadCapturePayload): Promise<LeadDispatchResponse> {
  const attribution = getAttribution();

  const enrichedPayload: EnrichedLeadPayload = {
    ...payload,
    attribution,
    submittedAt: new Date().toISOString(),
    source: 'capital-operator'
  };

  trackEvent(ANALYTICS_EVENTS.LEAD_SUBMITTED, {
    email: payload.email,
    role: payload.role,
    company: payload.company,
    operatingModel: payload.operatingModel
  });

  try {
    localStorage.setItem('capital_operator_lead_captured', JSON.stringify(enrichedPayload));
  } catch {
    // Non-blocking fallback.
  }

  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enrichedPayload)
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      return {
        success: true,
        message: data.message || 'Blueprint registered successfully. Your full specification and roadmap are ready.',
        destination: 'serverless_api',
        dispatchedTo: data.dispatchedTo || ['serverless_pipeline']
      };
    }
  } catch {
    console.info('Serverless endpoint unavailable; using local fallback.');
  }

  return {
    success: true,
    message: 'Your Capital Blueprint has been registered. You may now export or print your roadmap.',
    destination: 'local_storage'
  };
}
