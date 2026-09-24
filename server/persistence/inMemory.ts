import type { AuditRecord, Deal } from '../../src/types/deals.js';
import type { FundingIntent } from '../../src/types/funding.js';
import type {
  CapitalCaseRecord,
  FundingCondition,
  FundingDocument,
  Offer,
  RelationshipLifecycle,
  RoutingDecision,
  Submission
} from '../../src/types/transactions.js';
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
  private intents = new Map<string, FundingIntent>();
  private deals = new Map<string, Deal>();
  private capitalCases = new Map<string, CapitalCaseRecord>();
  private documents = new Map<string, FundingDocument>();
  private routingDecisions = new Map<string, RoutingDecision>();
  private submissions = new Map<string, Submission>();
  private offers = new Map<string, Offer>();
  private conditions = new Map<string, FundingCondition>();
  private relationships = new Map<string, RelationshipLifecycle>();
  private audits: AuditRecord[] = [];

  private membershipKey(workspaceId: string, userId: string) { return `${workspaceId}:${userId}`; }
  private intentKey(workspaceId: string, intentId: string) { return `${workspaceId}:${intentId}`; }
  private dealKey(workspaceId: string, dealId: string) { return `${workspaceId}:${dealId}`; }
  private entityKey(workspaceId: string, id: string) { return `${workspaceId}:${id}`; }
  private dealEntityKey(workspaceId: string, dealId: string) { return `${workspaceId}:${dealId}`; }

  async getWorkspace(id: string) { const v=this.workspaces.get(id); return v?structuredClone(v):null; }
  async putWorkspace(v: Workspace) { this.workspaces.set(v.id,structuredClone(v)); return structuredClone(v); }
  async getMembership(workspaceId: string,userId: string) { const v=this.memberships.get(this.membershipKey(workspaceId,userId)); return v?structuredClone(v):null; }
  async putMembership(v: Membership) { this.memberships.set(this.membershipKey(v.workspaceId,v.userId),structuredClone(v)); return structuredClone(v); }

  async createFundingIntent(v: FundingIntent) {
    if(!v.workspaceId) throw new Error('Persisted FundingIntent requires workspaceId.');
    const k=this.intentKey(v.workspaceId,v.id);
    if(this.intents.has(k)) throw new Error(`FundingIntent already exists: ${v.id}`);
    this.intents.set(k,structuredClone(v));
    return structuredClone(v);
  }
  async getFundingIntent(workspaceId:string,intentId:string) { const v=this.intents.get(this.intentKey(workspaceId,intentId)); return v?structuredClone(v):null; }

  async createDeal(v: Deal) {
    const k=this.dealKey(v.workspaceId,v.id);
    if(this.deals.has(k)) throw new Error(`Deal already exists: ${v.id}`);
    this.deals.set(k,structuredClone(v));
    return structuredClone(v);
  }
  async getDeal(workspaceId:string,dealId:string) { const v=this.deals.get(this.dealKey(workspaceId,dealId)); return v?structuredClone(v):null; }
  async listDeals(workspaceId:string) { return [...this.deals.values()].filter(v=>v.workspaceId===workspaceId).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)).map(v=>structuredClone(v)); }
  async updateDeal(v:Deal) {
    const k=this.dealKey(v.workspaceId,v.id);
    if(!this.deals.has(k)) throw new Error(`Deal not found: ${v.id}`);
    this.deals.set(k,structuredClone(v));
    return structuredClone(v);
  }

  async putCapitalCase(v:CapitalCaseRecord) { this.capitalCases.set(this.dealEntityKey(v.workspaceId,v.dealId),structuredClone(v)); return structuredClone(v); }
  async getCapitalCase(workspaceId:string,dealId:string) { const v=this.capitalCases.get(this.dealEntityKey(workspaceId,dealId)); return v?structuredClone(v):null; }

  async createDocument(v:FundingDocument) {
    const k=this.entityKey(v.workspaceId,v.id);
    if(this.documents.has(k)) throw new Error(`Document already exists: ${v.id}`);
    this.documents.set(k,structuredClone(v)); return structuredClone(v);
  }
  async getDocument(workspaceId:string,id:string) { const v=this.documents.get(this.entityKey(workspaceId,id)); return v?structuredClone(v):null; }
  async listDocuments(workspaceId:string,dealId:string) { return [...this.documents.values()].filter(v=>v.workspaceId===workspaceId&&v.dealId===dealId).map(v=>structuredClone(v)); }
  async updateDocument(v:FundingDocument) { const k=this.entityKey(v.workspaceId,v.id); if(!this.documents.has(k)) throw new Error(`Document not found: ${v.id}`); this.documents.set(k,structuredClone(v)); return structuredClone(v); }

  async createRoutingDecision(v:RoutingDecision) { const k=this.entityKey(v.workspaceId,v.id); this.routingDecisions.set(k,structuredClone(v)); return structuredClone(v); }
  async listRoutingDecisions(workspaceId:string,dealId:string) { return [...this.routingDecisions.values()].filter(v=>v.workspaceId===workspaceId&&v.dealId===dealId).map(v=>structuredClone(v)); }
  async updateRoutingDecision(v:RoutingDecision) { const k=this.entityKey(v.workspaceId,v.id); if(!this.routingDecisions.has(k)) throw new Error(`Routing decision not found: ${v.id}`); this.routingDecisions.set(k,structuredClone(v)); return structuredClone(v); }

  async createSubmission(v:Submission) { const k=this.entityKey(v.workspaceId,v.id); if(this.submissions.has(k)) throw new Error(`Submission already exists: ${v.id}`); this.submissions.set(k,structuredClone(v)); return structuredClone(v); }
  async getSubmission(workspaceId:string,id:string) { const v=this.submissions.get(this.entityKey(workspaceId,id)); return v?structuredClone(v):null; }
  async listSubmissions(workspaceId:string,dealId:string) { return [...this.submissions.values()].filter(v=>v.workspaceId===workspaceId&&v.dealId===dealId).map(v=>structuredClone(v)); }
  async updateSubmission(v:Submission) { const k=this.entityKey(v.workspaceId,v.id); if(!this.submissions.has(k)) throw new Error(`Submission not found: ${v.id}`); this.submissions.set(k,structuredClone(v)); return structuredClone(v); }

  async createOffer(v:Offer) { const k=this.entityKey(v.workspaceId,v.id); if(this.offers.has(k)) throw new Error(`Offer already exists: ${v.id}`); this.offers.set(k,structuredClone(v)); return structuredClone(v); }
  async getOffer(workspaceId:string,id:string) { const v=this.offers.get(this.entityKey(workspaceId,id)); return v?structuredClone(v):null; }
  async listOffers(workspaceId:string,dealId:string) { return [...this.offers.values()].filter(v=>v.workspaceId===workspaceId&&v.dealId===dealId).map(v=>structuredClone(v)); }
  async updateOffer(v:Offer) { const k=this.entityKey(v.workspaceId,v.id); if(!this.offers.has(k)) throw new Error(`Offer not found: ${v.id}`); this.offers.set(k,structuredClone(v)); return structuredClone(v); }

  async createCondition(v:FundingCondition) { const k=this.entityKey(v.workspaceId,v.id); if(this.conditions.has(k)) throw new Error(`Condition already exists: ${v.id}`); this.conditions.set(k,structuredClone(v)); return structuredClone(v); }
  async getCondition(workspaceId:string,id:string) { const v=this.conditions.get(this.entityKey(workspaceId,id)); return v?structuredClone(v):null; }
  async listConditions(workspaceId:string,dealId:string) { return [...this.conditions.values()].filter(v=>v.workspaceId===workspaceId&&v.dealId===dealId).map(v=>structuredClone(v)); }
  async updateCondition(v:FundingCondition) { const k=this.entityKey(v.workspaceId,v.id); if(!this.conditions.has(k)) throw new Error(`Condition not found: ${v.id}`); this.conditions.set(k,structuredClone(v)); return structuredClone(v); }

  async putRelationship(v:RelationshipLifecycle) { this.relationships.set(this.dealEntityKey(v.workspaceId,v.dealId),structuredClone(v)); return structuredClone(v); }
  async getRelationship(workspaceId:string,dealId:string) { const v=this.relationships.get(this.dealEntityKey(workspaceId,dealId)); return v?structuredClone(v):null; }

  async appendAudit(v:AuditRecord) { this.audits.push(structuredClone(v)); return structuredClone(v); }
  async listAudit(workspaceId:string,entityType:string,entityId:string) {
    return this.audits.filter(v=>v.workspaceId===workspaceId&&v.entityType===entityType&&v.entityId===entityId).map(v=>structuredClone(v));
  }

  clearForTests() {
    this.workspaces.clear(); this.memberships.clear(); this.intents.clear(); this.deals.clear();
    this.capitalCases.clear(); this.documents.clear(); this.routingDecisions.clear(); this.submissions.clear();
    this.offers.clear(); this.conditions.clear(); this.relationships.clear(); this.audits=[];
  }
}
