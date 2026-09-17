/**
 * Capital Operator — Vercel Serverless Lead Integration Endpoint
 * api/lead.ts
 *
 * Handles secure server-side lead ingestion, validation, and multi-destination dispatch.
 * Normalized behind the server integration adapter and event bus layer.
 */

import { LeadCapturePayload } from '../src/types';
import { dispatchToIntegrations } from '../server/integrations/dispatch';
import { serverEventBus } from '../server/events/eventBus';

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
  // CORS configuration for serverless deployment
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Expected POST.'
    });
  }

  try {
    const rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const body: LeadRequestBody = rawBody || {};

    // 1. Validation
    const { firstName, email, company, role, operatingModel, attribution } = body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'A valid email address is required.'
      });
    }

    if (!firstName || !company) {
      return res.status(400).json({
        success: false,
        error: 'First name and company are required.'
      });
    }

    // 2. Emit lifecycle event
    await serverEventBus.emit('lead.submitted', {
      email,
      firstName,
      company,
      role,
      operatingModel,
      attribution
    });

    // 3. Multi-destination normalized dispatch
    const dispatchSummary = await dispatchToIntegrations(body, {
      partner_id: attribution?.partner_id || attribution?.ref || '',
      utm_source: attribution?.utm_source || '',
      assessment_segment: attribution?.assessment_segment || ''
    });

    // 4. Emit dispatch status event
    if (dispatchSummary.hasFailures) {
      await serverEventBus.emit('integration.failed', {
        email,
        company,
        errors: dispatchSummary.errors
      });
    } else {
      await serverEventBus.emit('integration.dispatched', {
        email,
        company,
        dispatchedTo: dispatchSummary.dispatchedTo
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead registered and processed successfully.',
      dispatchedTo: dispatchSummary.dispatchedTo,
      errors: dispatchSummary.errors,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('[API:Lead] Internal Error:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal processing error while saving lead.'
    });
  }
}
