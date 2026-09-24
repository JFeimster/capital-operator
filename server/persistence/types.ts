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

  putCapitalCase(record: CapitalCaseRecord): Promise<CapitalCaseRecord>;
  getCapitalCase(workspaceId: string, dealId: string): Promise<CapitalCaseRecord | null>;

  createDocument(record: FundingDocument): Promise<FundingDocument>;
  getDocument(workspaceId: string, documentId: string): Promise<FundingDocument | null>;
  listDocuments(workspaceId: string, dealId: string): Promise<FundingDocument[]>;
  updateDocument(record: FundingDocument): Promise<FundingDocument>;

  createRoutingDecision(record: RoutingDecision): Promise<RoutingDecision>;
  listRoutingDecisions(workspaceId: string, dealId: string): Promise<RoutingDecision[]>;
  updateRoutingDecision(record: RoutingDecision): Promise<RoutingDecision>;

  createSubmission(record: Submission): Promise<Submission>;
  getSubmission(workspaceId: string, submissionId: string): Promise<Submission | null>;
  listSubmissions(workspaceId: string, dealId: string): Promise<Submission[]>;
  updateSubmission(record: Submission): Promise<Submission>;

  createOffer(record: Offer): Promise<Offer>;
  getOffer(workspaceId: string, offerId: string): Promise<Offer | null>;
  listOffers(workspaceId: string, dealId: string): Promise<Offer[]>;
  updateOffer(record: Offer): Promise<Offer>;

  createCondition(record: FundingCondition): Promise<FundingCondition>;
  getCondition(workspaceId: string, conditionId: string): Promise<FundingCondition | null>;
  listConditions(workspaceId: string, dealId: string): Promise<FundingCondition[]>;
  updateCondition(record: FundingCondition): Promise<FundingCondition>;

  putRelationship(record: RelationshipLifecycle): Promise<RelationshipLifecycle>;
  getRelationship(workspaceId: string, dealId: string): Promise<RelationshipLifecycle | null>;

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
