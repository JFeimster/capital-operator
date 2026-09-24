import type { AuditRecord, Deal } from '../../src/types/deals.js';
import type { Membership, Workspace } from '../../src/types/workspace.js';
import type { CapitalRepository, PersistenceCapability } from './types.js';

export class InMemoryCapitalRepository implements CapitalRepository {
  readonly capability: PersistenceCapability = {
    status: 'DEVELOPMENT_ONLY',
    mode: 'memory',
    durable: false,
    configured: true,
    description: 'Ephemeral in-memory repository for tests/development only. Never durable serverless storage.'
  };

  private workspaces = new Map<string, Workspace>();
  private memberships = new Map<string, Membership>();
  private deals = new Map<string, Deal>();
  private audits: AuditRecord[] = [];

  private membershipKey(workspaceId: string, userId: string) {
    return `${workspaceId}:${userId}`;
  }

  private dealKey(workspaceId: string, dealId: string) {
    return `${workspaceId}:${dealId}`;
  }

  async getWorkspace(id: string): Promise<Workspace | null> {
    return this.workspaces.get(id) || null;
  }

  async putWorkspace(workspace: Workspace): Promise<Workspace> {
    this.workspaces.set(workspace.id, structuredClone(workspace));
    return structuredClone(workspace);
  }

  async getMembership(workspaceId: string, userId: string): Promise<Membership | null> {
    return this.memberships.get(this.membershipKey(workspaceId, userId)) || null;
  }

  async putMembership(membership: Membership): Promise<Membership> {
    this.memberships.set(
      this.membershipKey(membership.workspaceId, membership.userId),
      structuredClone(membership)
    );
    return structuredClone(membership);
  }

  async createDeal(deal: Deal): Promise<Deal> {
    const key = this.dealKey(deal.workspaceId, deal.id);
    if (this.deals.has(key)) throw new Error(`Deal already exists: ${deal.id}`);
    this.deals.set(key, structuredClone(deal));
    return structuredClone(deal);
  }

  async getDeal(workspaceId: string, dealId: string): Promise<Deal | null> {
    const deal = this.deals.get(this.dealKey(workspaceId, dealId));
    return deal ? structuredClone(deal) : null;
  }

  async listDeals(workspaceId: string): Promise<Deal[]> {
    return [...this.deals.values()]
      .filter(deal => deal.workspaceId === workspaceId)
      .sort((a,b) => b.updatedAt.localeCompare(a.updatedAt))
      .map(deal => structuredClone(deal));
  }

  async updateDeal(deal: Deal): Promise<Deal> {
    const key = this.dealKey(deal.workspaceId, deal.id);
    if (!this.deals.has(key)) throw new Error(`Deal not found: ${deal.id}`);
    this.deals.set(key, structuredClone(deal));
    return structuredClone(deal);
  }

  async appendAudit(record: AuditRecord): Promise<AuditRecord> {
    this.audits.push(structuredClone(record));
    return structuredClone(record);
  }

  async listAudit(workspaceId: string, entityType: string, entityId: string): Promise<AuditRecord[]> {
    return this.audits
      .filter(item =>
        item.workspaceId === workspaceId &&
        item.entityType === entityType &&
        item.entityId === entityId
      )
      .map(item => structuredClone(item));
  }

  clearForTests() {
    this.workspaces.clear();
    this.memberships.clear();
    this.deals.clear();
    this.audits = [];
  }
}
