import crypto from 'crypto';
import { serverEventBus } from '../events/eventBus.js';
import { getCapitalRepository } from '../persistence/index.js';
import type { CapitalRepository } from '../persistence/types.js';
import type { SessionContext } from '../auth/types.js';
import type { WorkspacePermission } from '../../src/types/workspace.js';
import type { AuditRecord, Deal, DealStatus } from '../../src/types/deals.js';
import type { FundingIntent } from '../../src/types/funding.js';
import { canTransitionDeal, externalSubmissionGuardRequired, routingPermissionRequired, workflowStageForStatus } from './lifecycle.js';

export class DealDomainError extends Error {
  constructor(
    public readonly code: 'FORBIDDEN' | 'DEAL_NOT_FOUND' | 'INVALID_TRANSITION' | 'EXTERNAL_SUBMISSION_GUARD' | 'VALIDATION_FAILED',
    message: string,
    public readonly statusCode: 400 | 403 | 404 | 409
  ) {
    super(message);
    this.name = 'DealDomainError';
  }
}

function requirePermission(session: SessionContext, permission: WorkspacePermission) {
  if (!session.permissions.includes(permission)) {
    throw new DealDomainError('FORBIDDEN', `Missing permission: ${permission}`, 403);
  }
}

function correlationId(session: SessionContext, supplied?: string): string {
  return supplied || session.requestId || `corr_${crypto.randomBytes(8).toString('hex')}`;
}

async function ensureWorkspaceContext(repo: CapitalRepository, session: SessionContext) {
  const now = new Date().toISOString();
  if (!(await repo.getWorkspace(session.workspaceId))) {
    await repo.putWorkspace({
      id: session.workspaceId,
      name: session.workspaceId,
      status: 'ACTIVE',
      createdAt: now,
      createdBy: session.userId
    });
  }

  if (!(await repo.getMembership(session.workspaceId, session.userId))) {
    await repo.putMembership({
      id: session.membershipId,
      workspaceId: session.workspaceId,
      userId: session.userId,
      role: session.role,
      status: 'ACTIVE',
      createdAt: now,
      createdBy: session.userId
    });
  }
}

async function appendDealAudit(
  repo: CapitalRepository,
  deal: Deal,
  session: SessionContext,
  action: string,
  eventId: string,
  correlation: string,
  previousState?: string,
  newState?: string,
  metadata?: Record<string, unknown>
) {
  const record: AuditRecord = {
    eventId,
    workspaceId: deal.workspaceId,
    entityType: 'deal',
    entityId: deal.id,
    action,
    previousState,
    newState,
    actorType: 'USER',
    actorId: session.userId,
    source: 'capital-operator',
    timestamp: new Date().toISOString(),
    metadata,
    correlationId: correlation
  };
  await repo.appendAudit(record);
}

export async function createDealFromIntent(
  session: SessionContext,
  intent: FundingIntent,
  suppliedCorrelationId?: string
): Promise<Deal> {
  requirePermission(session, 'deal.create');
  const repo = getCapitalRepository();
  await ensureWorkspaceContext(repo, session);

  const now = new Date().toISOString();
  const deal: Deal = {
    id: `deal_${crypto.randomBytes(8).toString('hex')}`,
    workspaceId: session.workspaceId,
    fundingIntentId: intent.id,
    ownerId: session.userId,
    source: intent.source,
    attribution: intent.attribution,
    status: 'DRAFT',
    workflowStage: workflowStageForStatus('DRAFT'),
    requestedAmount: intent.requestedAmount,
    useOfFunds: intent.useOfFunds,
    fundingPurpose: intent.fundingPurpose,
    vertical: intent.vertical,
    routingStatus: 'NOT_STARTED',
    createdAt: now,
    updatedAt: now,
    createdBy: session.userId,
    updatedBy: session.userId
  };

  await repo.createDeal(deal);
  const correlation = correlationId(session, suppliedCorrelationId);
  const event = await serverEventBus.emit('deal.created', {
    deal_id: deal.id,
    funding_intent_id: intent.id,
    status: deal.status,
    requested_amount: deal.requestedAmount
  }, {
    workspaceId: session.workspaceId,
    userId: session.userId,
    correlationId: correlation,
    requestId: session.requestId
  });
  await appendDealAudit(repo, deal, session, 'deal.created', event.id, correlation, undefined, deal.status);
  return deal;
}

export async function listDeals(session: SessionContext): Promise<Deal[]> {
  requirePermission(session, 'deal.read');
  return getCapitalRepository().listDeals(session.workspaceId);
}

export async function getDeal(session: SessionContext, dealId: string): Promise<Deal> {
  requirePermission(session, 'deal.read');
  const deal = await getCapitalRepository().getDeal(session.workspaceId, dealId);
  if (!deal) throw new DealDomainError('DEAL_NOT_FOUND', 'Deal was not found in this workspace.', 404);
  return deal;
}

export async function updateDeal(
  session: SessionContext,
  dealId: string,
  patch: {
    externalReference?: string;
    businessId?: string;
    ownerId?: string;
    requestedAmount?: number;
    useOfFunds?: string;
    capitalCaseId?: string;
    routingStatus?: Deal['routingStatus'];
  },
  suppliedCorrelationId?: string
): Promise<Deal> {
  requirePermission(session, 'deal.update');
  const repo = getCapitalRepository();
  const existing = await getDeal(session, dealId);

  if (patch.requestedAmount !== undefined && (!Number.isFinite(patch.requestedAmount) || patch.requestedAmount <= 0)) {
    throw new DealDomainError('VALIDATION_FAILED', 'requestedAmount must be greater than zero.', 400);
  }
  if (patch.routingStatus === 'HUMAN_APPROVED') requirePermission(session, 'deal.route');
  if (patch.routingStatus === 'CAPITAL_PARTNER_DECISION') {
    throw new DealDomainError('FORBIDDEN', 'CAPITAL_PARTNER_DECISION cannot be asserted by an operator update.', 403);
  }

  const updated: Deal = {
    ...existing,
    ...patch,
    workspaceId: existing.workspaceId,
    id: existing.id,
    fundingIntentId: existing.fundingIntentId,
    createdAt: existing.createdAt,
    createdBy: existing.createdBy,
    updatedAt: new Date().toISOString(),
    updatedBy: session.userId
  };
  await repo.updateDeal(updated);

  const correlation = correlationId(session, suppliedCorrelationId);
  const event = await serverEventBus.emit('deal.updated', {
    deal_id: updated.id,
    status: updated.status
  }, {
    workspaceId: session.workspaceId,
    userId: session.userId,
    correlationId: correlation,
    requestId: session.requestId
  });
  await appendDealAudit(repo, updated, session, 'deal.updated', event.id, correlation, existing.status, updated.status, { patch });
  return updated;
}

export async function transitionDeal(
  session: SessionContext,
  dealId: string,
  to: DealStatus,
  reason: string,
  suppliedCorrelationId?: string
): Promise<Deal> {
  requirePermission(session, 'deal.update');
  const cleanReason = String(reason || '').trim();
  if (!cleanReason) throw new DealDomainError('VALIDATION_FAILED', 'A transition reason is required.', 400);

  const repo = getCapitalRepository();
  const existing = await getDeal(session, dealId);

  if (!canTransitionDeal(existing.status, to)) {
    throw new DealDomainError('INVALID_TRANSITION', `Cannot transition deal from ${existing.status} to ${to}.`, 409);
  }
  if (routingPermissionRequired(to)) requirePermission(session, 'deal.route');
  if (externalSubmissionGuardRequired(to)) {
    throw new DealDomainError(
      'EXTERNAL_SUBMISSION_GUARD',
      'READY_FOR_SUBMISSION cannot become SUBMITTED through the generic deal endpoint. An authorized Submission record is required.',
      409
    );
  }

  const updated: Deal = {
    ...existing,
    status: to,
    workflowStage: workflowStageForStatus(to),
    lastTransitionReason: cleanReason,
    updatedAt: new Date().toISOString(),
    updatedBy: session.userId
  };
  await repo.updateDeal(updated);

  const correlation = correlationId(session, suppliedCorrelationId);
  const event = await serverEventBus.emit('deal.status_changed', {
    deal_id: updated.id,
    previous_status: existing.status,
    new_status: updated.status,
    reason: cleanReason
  }, {
    workspaceId: session.workspaceId,
    userId: session.userId,
    correlationId: correlation,
    requestId: session.requestId
  });
  await appendDealAudit(
    repo,
    updated,
    session,
    'deal.status_changed',
    event.id,
    correlation,
    existing.status,
    updated.status,
    { reason: cleanReason }
  );
  return updated;
}

export async function getDealAudit(session: SessionContext, dealId: string): Promise<AuditRecord[]> {
  requirePermission(session, 'audit.read');
  await getDeal(session, dealId);
  return getCapitalRepository().listAudit(session.workspaceId, 'deal', dealId);
}
