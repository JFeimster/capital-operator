/**
 * Capital Operator — Vercel Serverless Lead Integration Endpoint
 * api/lead.ts
 *
 * Backwards-compatible lead ingestion boundary using normalized adapters.
 */

import { LeadCapturePayload } from '../src/types.js';
import { dispatchToIntegrations } from '../server/integrations/dispatch.js';
import { serverEventBus } from '../server/events/eventBus.js';
import { applyCors } from '../server/http/cors.js';

interface LeadRequestBody extends LeadCapturePayload {
  attribution?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    partner_id?: string;
    ref?: string;
    source_url?: string;
    assessment_segment?: string;
    operating_model?: string;
    captured_at?: string;
  };
  submittedAt?: string;
  source?: string;
}

export default async function handler(req: any, res: any) {
  applyCors(req, res, ['POST', 'OPTIONS']);

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Expected POST.' });
  }

  try {
    const rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const body: LeadRequestBody = rawBody || {};
    const { firstName, email, company, role, operatingModel, attribution } = body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    if (!firstName || !company) {
      return res.status(400).json({ success: false, error: 'First name and company are required.' });
    }

    await serverEventBus.emit('lead.submitted', { email, firstName, company, role, operatingModel, attribution });

    const dispatchSummary = await dispatchToIntegrations(body, {
      partner_id: attribution?.partner_id || attribution?.ref || '',
      utm_source: attribution?.utm_source || '',
      assessment_segment: attribution?.assessment_segment || ''
    });

    if (dispatchSummary.degraded || dispatchSummary.hasFailures) {
      await serverEventBus.emit('integration.failed', {
        email,
        company,
        errors: dispatchSummary.errors,
        dispatchedTo: dispatchSummary.dispatchedTo,
        persistedExternally: dispatchSummary.persistedExternally
      });
    } else {
      await serverEventBus.emit('integration.dispatched', {
        email,
        company,
        dispatchedTo: dispatchSummary.dispatchedTo
      });
      await serverEventBus.emit('lead.routed', {
        email,
        company,
        destinations: dispatchSummary.dispatchedTo
      });
    }

    return res.status(200).json({
      success: true,
      message: dispatchSummary.degraded
        ? 'Lead accepted, but no external integration confirmed durable persistence.'
        : 'Lead accepted and dispatched successfully.',
      dispatchedTo: dispatchSummary.dispatchedTo,
      persistedExternally: dispatchSummary.persistedExternally,
      degraded: dispatchSummary.degraded,
      warnings: dispatchSummary.errors,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('[API:Lead] Internal Error:', err);
    return res.status(500).json({ success: false, error: 'Internal processing error while handling lead.' });
  }
}
