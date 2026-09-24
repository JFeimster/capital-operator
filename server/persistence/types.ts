import type { AuditRecord, Deal } from '../../src/types/deals.js';
import type { FundingIntent } from '../../src/types/funding.js';
import type { Membership, Workspace } from '../../src/types/workspace.js';

export interface PersistenceCapability {
  status: 'LIVE' | 'BETA' | 'SPECIFIED' | 'DEVELOPMENT_ONLY';
  mode: 'unavailable' | 'memory' | 'durable';
  durable: boolean;
  configured: boolean;
  description: string;
}

export interface CapitalRepository {
  readonly capability: PersistenceCapability;

  getWorkspace(id: string): Promise<Workspace | null>;
  putWorkspace(workspace: Workspace): Promise<Workspace>;

  getMembership(workspaceId: string, userId: string): Promise<Membership | null>;
  putMembership(membership: Membership): Promise<Membership>;

  createFundingIntent(intent: FundingIntent): Promise<FundingIntent>;
  getFundingIntent(workspaceId: string, intentId: string): Promise<FundingIntent | null>;

  createDeal(deal: Deal): Promise<Deal>;
  getDeal(workspaceId: string, dealId: string): Promise<Deal | null>;
  listDeals(workspaceId: string): Promise<Deal[]>;
  updateDeal(deal: Deal): Promise<Deal>;

  appendAudit(record: AuditRecord): Promise<AuditRecord>;
  listAudit(workspaceId: string, entityType: string, entityId: string): Promise<AuditRecord[]>;
}

export class PersistenceUnavailableError extends Error {
  readonly code = 'PERSISTENCE_NOT_CONFIGURED';
  readonly statusCode = 503;

  constructor(message = 'Durable production persistence is not configured.') {
    super(message);
    this.name = 'PersistenceUnavailableError';
  }
}
