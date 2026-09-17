/**
 * Capital Operator — Programmatic Intake Submission API Endpoint
 * api/v1/intake/submit.ts
 */

import crypto from 'crypto';
import { IntakeSubmitRequest, IntakeSubmitResponse, IntakeWorkflowClassification, ApiErrorResponse } from '../../../src/types/api';
import { serverEventBus } from '../../../server/events/eventBus';
import { dispatchToIntegrations } from '../../../server/integrations/dispatch';
import { applyCors } from '../../../server/http/cors';

function classifyWorkflow(req: IntakeSubmitRequest): IntakeWorkflowClassification {
  const flags: string[] = [];
  const rationale: string[] = [];

  if (req.target_amount && req.target_amount >= 250000) {
    flags.push('LARGE_REQUEST');
    rationale.push('Requested amount merits structured human review.');
  }
  if (req.time_in_business_months < 12) {
    flags.push('EARLY_STAGE_BUSINESS');
    rationale.push('Operating history is under 12 months.');
  }
  if (req.hasOwnProperty('credit_score') && typeof req.credit_score === 'number' && req.credit_score < 620) {
    flags.push('CREDIT_REVIEW');
    rationale.push('Credit profile should be reviewed before any capital representation is made.');
  }
  if (req.annual_revenue > 0 && req.avg_monthly_deposits > 0) {
    const impliedRunRate = req.avg_monthly_deposits * 12;
    const variance = Math.abs(impliedRunRate - req.annual_revenue) / req.annual_revenue;
    if (variance >= 0.35) {
      flags.push('REVENUE_DEPOSIT_VARIANCE');
      rationale.push('Reported annual revenue and deposit run-rate differ materially.');
    }
  }

  let priority: IntakeWorkflowClassification['priority'] = 'STANDARD';
  if (flags.includes('LARGE_REQUEST')) priority = 'EXPEDITE';
  if (flags.includes('CREDIT_REVIEW') || flags.includes('EARLY_STAGE_BUSINESS') || flags.includes('REVENUE_DEPOSIT_VARIANCE')) {
    priority = 'HUMAN_REVIEW';
  }

  if (rationale.length === 0) rationale.push('Submission passed basic intake validation and is ready for human review.');

  return { priority, flags, rationale, human_review_required: true };
}

export default async function handler(req: any, res: any) {
  applyCors(req, res, ['POST', 'OPTIONS']);

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    const errorResponse: ApiErrorResponse = {
      status: 'error',
      code: 'METHOD_NOT_ALLOWED',
      message: 'Method Not Allowed. Expected POST.',
      timestamp: new Date().toISOString()
    };
    return res.status(405).json(errorResponse);
  }

  try {
    const rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const body: IntakeSubmitRequest = rawBody || {};

    const errors: string[] = [];
    if (!body.business_name || body.business_name.trim().length < 2) errors.push('business_name is required (min 2 characters).');
    if (!body.email || !body.email.includes('@')) errors.push('A valid email address is required.');
    if (typeof body.annual_revenue !== 'number' || body.annual_revenue < 0) errors.push('annual_revenue must be a non-negative number.');
    if (typeof body.avg_monthly_deposits !== 'number' || body.avg_monthly_deposits < 0) errors.push('avg_monthly_deposits must be a non-negative number.');
    if (typeof body.time_in_business_months !== 'number' || body.time_in_business_months < 0) errors.push('time_in_business_months must be a non-negative integer.');

    if (errors.length > 0) {
      const errorResponse: ApiErrorResponse = {
        status: 'error',
        code: 'VALIDATION_FAILED',
        message: 'Invalid intake submission parameters.',
        details: errors,
        timestamp: new Date().toISOString()
      };
      return res.status(400).json(errorResponse);
    }

    const submissionId = `intake_${crypto.randomBytes(6).toString('hex')}`;
    const workflow = classifyWorkflow(body);

    await serverEventBus.emit('lead.submitted', {
      submission_id: submissionId,
      business_name: body.business_name,
      annual_revenue: body.annual_revenue,
      requested_amount: body.target_amount,
      workflow_priority: workflow.priority,
      partner_id: body.partner_id || req.headers['x-partner-id'] || ''
    });

    const dispatchSummary = await dispatchToIntegrations(body, {
      submission_id: submissionId,
      workflow_priority: workflow.priority,
      partner_id: body.partner_id || req.headers['x-partner-id'] || '',
      utm_source: body.attribution?.utm_source || ''
    });

    if (dispatchSummary.dispatchedTo.length > 0) {
      await serverEventBus.emit('lead.routed', {
        submission_id: submissionId,
        destinations: dispatchSummary.dispatchedTo
      });
    }

    const response: IntakeSubmitResponse = {
      status: 'success',
      submission_id: submissionId,
      workflow,
      dispatched_to: dispatchSummary.dispatchedTo,
      persisted_externally: dispatchSummary.persistedExternally,
      degraded: dispatchSummary.degraded,
      warnings: dispatchSummary.errors,
      timestamp: new Date().toISOString()
    };

    return res.status(200).json(response);
  } catch (err: any) {
    console.error('[API:IntakeSubmit] Internal Error:', err);
    const errorResponse: ApiErrorResponse = {
      status: 'error',
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred while processing the intake request.',
      details: [err?.message || 'Unknown processing failure'],
      timestamp: new Date().toISOString()
    };
    return res.status(500).json(errorResponse);
  }
}
