import crypto from 'crypto';
import { CTAS_CONFIG } from '../../src/config/ctas.js';
import { buildCapitalCase } from '../../src/lib/capitalCase.js';
import { findFundingOptions } from '../../src/lib/fundingOptions.js';
import type { AuditRecord, Deal, DealStatus } from '../../src/types/deals.js';
import type {
  CapitalCaseRecord,
  ConditionStatus,
  FundingCondition,
  FundingDocument,
  Offer,
  RelationshipLifecycle,
  RoutingDecision,
  Submission,
  SubmissionStatus
} from '../../src/types/transactions.js';
import type { WorkspacePermission } from '../../src/types/workspace.js';
import type { SessionContext } from '../auth/types.js';
import { getDeal, transitionDeal, updateDeal } from '../deals/service.js';
import { workflowStageForStatus } from '../deals/lifecycle.js';
import { serverEventBus } from '../events/eventBus.js';
import { getCapitalRepository } from '../persistence/index.js';

export class TransactionDomainError extends Error {
  constructor(
    public readonly code:
      | 'FORBIDDEN'
      | 'NOT_FOUND'
      | 'VALIDATION_FAILED'
      | 'INVALID_STATUS_TRANSITION'
      | 'EXPLICIT_AUTHORIZATION_REQUIRED'
      | 'EXTERNAL_CONFIRMATION_REQUIRED',
    message:string,
    public readonly statusCode:400|403|404|409
  ){
    super(message);
    this.name='TransactionDomainError';
  }
}

function requirePermission(session:SessionContext,permission:WorkspacePermission){
  if(!session.permissions.includes(permission)){
    throw new TransactionDomainError('FORBIDDEN',`Missing permission: ${permission}`,403);
  }
}

function corr(session:SessionContext,supplied?:string){
  return supplied||session.requestId||`corr_${crypto.randomBytes(8).toString('hex')}`;
}

async function audit(
  session:SessionContext,
  entityType:AuditRecord['entityType'],
  entityId:string,
  action:string,
  eventId:string,
  correlationId:string,
  previousState?:string,
  newState?:string,
  metadata?:Record<string,unknown>
){
  await getCapitalRepository().appendAudit({
    eventId,
    workspaceId:session.workspaceId,
    entityType,
    entityId,
    action,
    previousState,
    newState,
    actorType:'USER',
    actorId:session.userId,
    source:'capital-operator',
    timestamp:new Date().toISOString(),
    metadata,
    correlationId
  });
}

export async function createDocumentMetadata(
  session:SessionContext,
  dealId:string,
  input:{type:string;filename:string;mimeType?:string;storageReference?:string;source?:string},
  suppliedCorrelationId?:string
):Promise<FundingDocument>{
  requirePermission(session,'document.manage');
  await getDeal(session,dealId);
  if(!String(input.type||'').trim()||!String(input.filename||'').trim()){
    throw new TransactionDomainError('VALIDATION_FAILED','Document type and filename are required.',400);
  }
  const now=new Date().toISOString();
  const record:FundingDocument={
    id:`doc_${crypto.randomBytes(8).toString('hex')}`,
    workspaceId:session.workspaceId,
    dealId,
    type:String(input.type).trim(),
    filename:String(input.filename).trim(),
    mimeType:input.mimeType,
    storageReference:input.storageReference,
    receivedAt:now,
    source:input.source||'operator',
    status:'RECEIVED',
    extractionStatus:'NOT_STARTED',
    verificationStatus:'UNVERIFIED',
    reviewFlags:[],
    createdBy:session.userId,
    updatedAt:now,
    updatedBy:session.userId
  };
  await getCapitalRepository().createDocument(record);
  const correlation=corr(session,suppliedCorrelationId);
  const event=await serverEventBus.emit('document.received',{document_id:record.id,deal_id:dealId,type:record.type},{
    workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId
  });
  await audit(session,'document',record.id,'document.received',event.id,correlation,undefined,record.status);
  return record;
}

export async function verifyDocument(
  session:SessionContext,
  documentId:string,
  verified:boolean,
  notes?:string,
  suppliedCorrelationId?:string
):Promise<FundingDocument>{
  requirePermission(session,'document.manage');
  const repo=getCapitalRepository();
  const existing=await repo.getDocument(session.workspaceId,documentId);
  if(!existing) throw new TransactionDomainError('NOT_FOUND','Document was not found in this workspace.',404);
  const updated:FundingDocument={
    ...existing,
    status:verified?'VERIFIED':'REJECTED',
    verificationStatus:verified?'HUMAN_VERIFIED':'REJECTED',
    reviewFlags:notes?[...existing.reviewFlags,notes]:existing.reviewFlags,
    updatedAt:new Date().toISOString(),
    updatedBy:session.userId
  };
  await repo.updateDocument(updated);
  const correlation=corr(session,suppliedCorrelationId);
  const event=await serverEventBus.emit('document.verified',{
    document_id:updated.id,deal_id:updated.dealId,verified
  },{workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId});
  await audit(session,'document',updated.id,'document.verified',event.id,correlation,existing.status,updated.status,{verified});
  return updated;
}

export async function listDocuments(session:SessionContext,dealId:string):Promise<FundingDocument[]>{
  requirePermission(session,'document.read');
  await getDeal(session,dealId);
  return getCapitalRepository().listDocuments(session.workspaceId,dealId);
}

export async function generatePersistentCapitalCase(
  session:SessionContext,
  dealId:string,
  suppliedCorrelationId?:string
):Promise<CapitalCaseRecord>{
  requirePermission(session,'deal.update');
  const repo=getCapitalRepository();
  const deal=await getDeal(session,dealId);
  const intent=await repo.getFundingIntent(session.workspaceId,deal.fundingIntentId);
  if(!intent) throw new TransactionDomainError('NOT_FOUND','FundingIntent for this deal was not found.',404);

  const generated=buildCapitalCase(intent);
  const now=new Date().toISOString();
  const existing=await repo.getCapitalCase(session.workspaceId,dealId);
  const record:CapitalCaseRecord={
    id:existing?.id||`capital_case_${crypto.randomBytes(8).toString('hex')}`,
    workspaceId:session.workspaceId,
    dealId,
    fundingIntentId:intent.id,
    case:generated,
    preparedBy:session.userId,
    reviewedBy:existing?.reviewedBy,
    approvedForExternalUseBy:existing?.approvedForExternalUseBy,
    status:'REVIEW_REQUIRED',
    createdAt:existing?.createdAt||now,
    updatedAt:now
  };
  await repo.putCapitalCase(record);
  await updateDeal(session,dealId,{capitalCaseId:record.id},suppliedCorrelationId);
  const correlation=corr(session,suppliedCorrelationId);
  const event=await serverEventBus.emit('capital_case.generated',{
    capital_case_id:record.id,deal_id:dealId,status:record.status
  },{workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId});
  await audit(session,'capital_case',record.id,'capital_case.generated',event.id,correlation,existing?.status,record.status);
  return record;
}

export async function reviewCapitalCase(
  session:SessionContext,
  dealId:string,
  approveForExternalUse:boolean,
  suppliedCorrelationId?:string
):Promise<CapitalCaseRecord>{
  requirePermission(session,'deal.update');
  const repo=getCapitalRepository();
  await getDeal(session,dealId);
  const existing=await repo.getCapitalCase(session.workspaceId,dealId);
  if(!existing) throw new TransactionDomainError('NOT_FOUND','Capital case was not found.',404);
  const updated:CapitalCaseRecord={
    ...existing,
    status:approveForExternalUse?'APPROVED_FOR_EXTERNAL_USE':'REVIEWED',
    reviewedBy:session.userId,
    approvedForExternalUseBy:approveForExternalUse?session.userId:existing.approvedForExternalUseBy,
    updatedAt:new Date().toISOString()
  };
  await repo.putCapitalCase(updated);
  const correlation=corr(session,suppliedCorrelationId);
  const event=await serverEventBus.emit('capital_case.reviewed',{
    capital_case_id:updated.id,deal_id:dealId,status:updated.status
  },{workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId});
  await audit(session,'capital_case',updated.id,'capital_case.reviewed',event.id,correlation,existing.status,updated.status);
  return updated;
}

export async function createRoutingSuggestion(
  session:SessionContext,
  dealId:string,
  suppliedCorrelationId?:string
):Promise<RoutingDecision>{
  requirePermission(session,'deal.route');
  const repo=getCapitalRepository();
  const deal=await getDeal(session,dealId);
  const intent=await repo.getFundingIntent(session.workspaceId,deal.fundingIntentId);
  if(!intent) throw new TransactionDomainError('NOT_FOUND','FundingIntent for this deal was not found.',404);
  const options=findFundingOptions(intent);
  const record:RoutingDecision={
    id:`route_${crypto.randomBytes(8).toString('hex')}`,
    workspaceId:session.workspaceId,
    dealId,
    status:'SYSTEM_SUGGESTED',
    productPathIds:options.categoryFits.map(item=>item.productPathId),
    providerIds:options.providerCandidates.map(item=>item.providerId),
    rationale:options.categoryFits.flatMap(item=>item.reasons),
    source:'deterministic-funding-options',
    createdAt:new Date().toISOString(),
    createdBy:session.userId
  };
  await repo.createRoutingDecision(record);
  await updateDeal(session,dealId,{routingStatus:'SYSTEM_SUGGESTED'},suppliedCorrelationId);
  const correlation=corr(session,suppliedCorrelationId);
  const event=await serverEventBus.emit('routing.completed',{
    routing_decision_id:record.id,deal_id:dealId,provider_count:record.providerIds.length
  },{workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId});
  await audit(session,'deal',dealId,'routing.completed',event.id,correlation,deal.routingStatus,'SYSTEM_SUGGESTED',{routingDecisionId:record.id});
  return record;
}

export async function approveRoutingDecision(
  session:SessionContext,
  routingDecisionId:string,
  suppliedCorrelationId?:string
):Promise<RoutingDecision>{
  requirePermission(session,'deal.route');
  const repo=getCapitalRepository();
  const allDeals=await repo.listDeals(session.workspaceId);
  let existing:RoutingDecision|undefined;
  for(const deal of allDeals){
    const decisions=await repo.listRoutingDecisions(session.workspaceId,deal.id);
    existing=decisions.find(item=>item.id===routingDecisionId);
    if(existing) break;
  }
  if(!existing) throw new TransactionDomainError('NOT_FOUND','Routing decision was not found.',404);
  const updated:RoutingDecision={
    ...existing,
    status:'HUMAN_APPROVED',
    approvedAt:new Date().toISOString(),
    approvedBy:session.userId
  };
  await repo.updateRoutingDecision(updated);
  await updateDeal(session,updated.dealId,{routingStatus:'HUMAN_APPROVED'},suppliedCorrelationId);
  const correlation=corr(session,suppliedCorrelationId);
  const event=await serverEventBus.emit('route.approved',{
    routing_decision_id:updated.id,deal_id:updated.dealId
  },{workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId});
  await audit(session,'deal',updated.dealId,'route.approved',event.id,correlation,'SYSTEM_SUGGESTED','HUMAN_APPROVED',{routingDecisionId:updated.id});
  return updated;
}

const SUBMISSION_TRANSITIONS:Record<SubmissionStatus,readonly SubmissionStatus[]>={
  DRAFT:['READY','WITHDRAWN'],
  READY:['AUTHORIZED','WITHDRAWN'],
  AUTHORIZED:['SUBMITTED','WITHDRAWN'],
  SUBMITTED:['ACKNOWLEDGED','INFORMATION_REQUESTED','UNDER_REVIEW','DECISION_RECEIVED','WITHDRAWN'],
  ACKNOWLEDGED:['INFORMATION_REQUESTED','UNDER_REVIEW','DECISION_RECEIVED','WITHDRAWN'],
  INFORMATION_REQUESTED:['UNDER_REVIEW','DECISION_RECEIVED','WITHDRAWN'],
  UNDER_REVIEW:['INFORMATION_REQUESTED','DECISION_RECEIVED','WITHDRAWN'],
  DECISION_RECEIVED:['CLOSED'],
  WITHDRAWN:['CLOSED'],
  CLOSED:[]
};

export async function createSubmission(
  session:SessionContext,
  input:{
    dealId:string;
    destinationType:Submission['destinationType'];
    destinationId?:string;
    destinationUrl?:string;
    source?:string;
  },
  suppliedCorrelationId?:string
):Promise<Submission>{
  requirePermission(session,'submission.create');
  const deal=await getDeal(session,input.dealId);
  if(deal.status!=='READY_FOR_SUBMISSION'){
    throw new TransactionDomainError('VALIDATION_FAILED','Deal must be READY_FOR_SUBMISSION before creating a submission.',400);
  }
  const now=new Date().toISOString();
  const record:Submission={
    id:`submission_${crypto.randomBytes(8).toString('hex')}`,
    workspaceId:session.workspaceId,
    dealId:input.dealId,
    destinationType:input.destinationType,
    destinationId:input.destinationId,
    destinationUrl:input.destinationUrl,
    status:'DRAFT',
    source:input.source||'operator',
    createdAt:now,
    createdBy:session.userId,
    updatedAt:now,
    updatedBy:session.userId
  };
  await getCapitalRepository().createSubmission(record);
  const correlation=corr(session,suppliedCorrelationId);
  const event=await serverEventBus.emit('submission.created',{
    submission_id:record.id,deal_id:record.dealId,destination_type:record.destinationType
  },{workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId});
  await audit(session,'submission',record.id,'submission.created',event.id,correlation,undefined,record.status);
  return record;
}

export async function transitionSubmission(
  session:SessionContext,
  submissionId:string,
  to:SubmissionStatus,
  input:{authorizationReason?:string;explicitAuthorization?:boolean;externalConfirmation?:boolean;externalEvidence?:string;externalReference?:string}={},
  suppliedCorrelationId?:string
):Promise<Submission>{
  requirePermission(session,'submission.create');
  const repo=getCapitalRepository();
  const existing=await repo.getSubmission(session.workspaceId,submissionId);
  if(!existing) throw new TransactionDomainError('NOT_FOUND','Submission was not found in this workspace.',404);
  if(!SUBMISSION_TRANSITIONS[existing.status].includes(to)){
    throw new TransactionDomainError('INVALID_STATUS_TRANSITION',`Cannot transition submission from ${existing.status} to ${to}.`,409);
  }

  if(to==='AUTHORIZED'){
    requirePermission(session,'submission.authorize');
    if(input.explicitAuthorization!==true||!String(input.authorizationReason||'').trim()){
      throw new TransactionDomainError('EXPLICIT_AUTHORIZATION_REQUIRED','Explicit authorization and a reason are required.',409);
    }
  }
  if(to==='SUBMITTED'){
    requirePermission(session,'submission.authorize');
    if(input.externalConfirmation!==true||!String(input.externalEvidence||'').trim()){
      throw new TransactionDomainError(
        'EXTERNAL_CONFIRMATION_REQUIRED',
        'Capital Operator does not transmit automatically. Recording SUBMITTED requires confirmation that external transmission already occurred plus evidence.',
        409
      );
    }
  }

  const now=new Date().toISOString();
  const updated:Submission={
    ...existing,
    status:to,
    updatedAt:now,
    updatedBy:session.userId,
    authorizedAt:to==='AUTHORIZED'?now:existing.authorizedAt,
    authorizedBy:to==='AUTHORIZED'?session.userId:existing.authorizedBy,
    authorizationReason:to==='AUTHORIZED'?String(input.authorizationReason):existing.authorizationReason,
    submittedAt:to==='SUBMITTED'?now:existing.submittedAt,
    externalEvidence:to==='SUBMITTED'?input.externalEvidence:existing.externalEvidence,
    externalReference:input.externalReference||existing.externalReference
  };
  await repo.updateSubmission(updated);
  const correlation=corr(session,suppliedCorrelationId);
  const eventType=to==='AUTHORIZED'?'submission.authorized':to==='SUBMITTED'?'submission.submitted':'submission.status_changed';
  const event=await serverEventBus.emit(eventType,{
    submission_id:updated.id,deal_id:updated.dealId,previous_status:existing.status,new_status:to
  },{workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId});
  await audit(session,'submission',updated.id,eventType,event.id,correlation,existing.status,to);

  if(to==='SUBMITTED'){
    const deal=await getDeal(session,updated.dealId);
    if(deal.status==='READY_FOR_SUBMISSION'){
      const transitioned:Deal={...deal,status:'SUBMITTED',workflowStage:workflowStageForStatus('SUBMITTED'),updatedAt:now,updatedBy:session.userId,lastTransitionReason:'Authorized submission externally confirmed'};
      await repo.updateDeal(transitioned);
      const dealEvent=await serverEventBus.emit('deal.status_changed',{
        deal_id:deal.id,previous_status:deal.status,new_status:'SUBMITTED',reason:'Authorized submission externally confirmed'
      },{workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId});
      await audit(session,'deal',deal.id,'deal.status_changed',dealEvent.id,correlation,deal.status,'SUBMITTED',{submissionId:updated.id});
    }
  }
  return updated;
}

export async function getSubmission(session:SessionContext,id:string):Promise<Submission>{
  requirePermission(session,'submission.read');
  const record=await getCapitalRepository().getSubmission(session.workspaceId,id);
  if(!record) throw new TransactionDomainError('NOT_FOUND','Submission was not found in this workspace.',404);
  return record;
}

export async function listSubmissions(session:SessionContext,dealId:string):Promise<Submission[]>{
  requirePermission(session,'submission.read');
  await getDeal(session,dealId);
  return getCapitalRepository().listSubmissions(session.workspaceId,dealId);
}

function hasActualOfferTerm(input:Partial<Offer>){
  return [input.amount,input.pricing,input.termMonths,input.paymentAmount,input.fees,input.collateral,input.guarantees,input.conditions,input.expiration]
    .some(value=>value!==undefined&&value!==null);
}

export async function createOffer(
  session:SessionContext,
  input:Partial<Offer>&{dealId:string;source:string},
  suppliedCorrelationId?:string
):Promise<Offer>{
  requirePermission(session,'offer.manage');
  const deal=await getDeal(session,input.dealId);
  if(!String(input.source||'').trim()||!hasActualOfferTerm(input)){
    throw new TransactionDomainError('VALIDATION_FAILED','Offer source and at least one actual received term are required.',400);
  }
  const now=new Date().toISOString();
  const record:Offer={
    id:`offer_${crypto.randomBytes(8).toString('hex')}`,
    workspaceId:session.workspaceId,
    dealId:input.dealId,
    submissionId:input.submissionId,
    providerId:input.providerId,
    providerName:input.providerName,
    amount:input.amount,
    pricing:input.pricing,
    termMonths:input.termMonths,
    paymentAmount:input.paymentAmount,
    paymentFrequency:input.paymentFrequency,
    fees:input.fees,
    collateral:input.collateral,
    guarantees:input.guarantees,
    conditions:input.conditions,
    expiration:input.expiration,
    source:String(input.source),
    sourceDocument:input.sourceDocument,
    verificationStatus:input.verificationStatus||'UNVERIFIED',
    receivedAt:input.receivedAt||now,
    createdBy:session.userId,
    updatedAt:now,
    updatedBy:session.userId
  };
  await getCapitalRepository().createOffer(record);
  const correlation=corr(session,suppliedCorrelationId);
  const event=await serverEventBus.emit('offer.received',{
    offer_id:record.id,deal_id:record.dealId,submission_id:record.submissionId
  },{workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId});
  await audit(session,'offer',record.id,'offer.received',event.id,correlation,undefined,'RECEIVED');

  if(deal.status==='SUBMITTED'){
    await transitionDeal(session,deal.id,'TERMS_RECEIVED','Actual received offer terms were recorded',correlation);
  }
  return record;
}

export async function listOffers(session:SessionContext,dealId:string):Promise<Offer[]>{
  requirePermission(session,'offer.read');
  await getDeal(session,dealId);
  return getCapitalRepository().listOffers(session.workspaceId,dealId);
}

export async function updateOffer(
  session:SessionContext,
  offerId:string,
  patch:Partial<Pick<Offer,'providerId'|'providerName'|'amount'|'pricing'|'termMonths'|'paymentAmount'|'paymentFrequency'|'fees'|'collateral'|'guarantees'|'conditions'|'expiration'|'source'|'sourceDocument'|'verificationStatus'>>,
  suppliedCorrelationId?:string
):Promise<Offer>{
  requirePermission(session,'offer.manage');
  const repo=getCapitalRepository();
  const existing=await repo.getOffer(session.workspaceId,offerId);
  if(!existing) throw new TransactionDomainError('NOT_FOUND','Offer was not found in this workspace.',404);

  const updated:Offer={
    ...existing,
    ...Object.fromEntries(Object.entries(patch).filter(([,value])=>value!==undefined)),
    id:existing.id,
    workspaceId:existing.workspaceId,
    dealId:existing.dealId,
    receivedAt:existing.receivedAt,
    createdBy:existing.createdBy,
    updatedAt:new Date().toISOString(),
    updatedBy:session.userId
  };
  if(!String(updated.source||'').trim()||!hasActualOfferTerm(updated)){
    throw new TransactionDomainError('VALIDATION_FAILED','Offer source and at least one actual received term are required.',400);
  }
  await repo.updateOffer(updated);
  const correlation=corr(session,suppliedCorrelationId);
  const event=await serverEventBus.emit('offer.reviewed',{
    offer_id:updated.id,deal_id:updated.dealId,verification_status:updated.verificationStatus
  },{workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId});
  await audit(session,'offer',updated.id,'offer.reviewed',event.id,correlation,existing.verificationStatus,updated.verificationStatus);
  return updated;
}

export async function compareOffers(session:SessionContext,dealId:string){
  const offers=await listOffers(session,dealId);
  return {
    status:'LIVE' as const,
    dealId,
    offers:offers.map(offer=>({
      id:offer.id,
      providerName:offer.providerName,
      amount:offer.amount,
      pricing:offer.pricing,
      termMonths:offer.termMonths,
      paymentAmount:offer.paymentAmount,
      paymentFrequency:offer.paymentFrequency,
      fees:offer.fees,
      collateral:offer.collateral,
      guarantees:offer.guarantees,
      conditions:offer.conditions,
      expiration:offer.expiration,
      source:offer.source,
      verificationStatus:offer.verificationStatus,
      missingFields:[
        ...(!offer.amount?['amount']:[]),
        ...(!offer.pricing?['pricing']:[]),
        ...(!offer.termMonths?['termMonths']:[])
      ]
    })),
    winner:null,
    disclaimer:'Normalized comparison of actual stored terms only. Capital Operator does not declare a winner or invent missing terms.',
    humanReviewRequired:true
  };
}

export async function createCondition(
  session:SessionContext,
  input:{dealId:string;submissionId?:string;offerId?:string;requestedItem:string;responsibleParty:FundingCondition['responsibleParty'];dueDate?:string;source:string;notes?:string},
  suppliedCorrelationId?:string
):Promise<FundingCondition>{
  requirePermission(session,'condition.manage');
  await getDeal(session,input.dealId);
  if(!String(input.requestedItem||'').trim()||!String(input.source||'').trim()){
    throw new TransactionDomainError('VALIDATION_FAILED','Condition requestedItem and source are required.',400);
  }
  const now=new Date().toISOString();
  const record:FundingCondition={
    id:`condition_${crypto.randomBytes(8).toString('hex')}`,
    workspaceId:session.workspaceId,
    dealId:input.dealId,
    submissionId:input.submissionId,
    offerId:input.offerId,
    requestedItem:String(input.requestedItem).trim(),
    responsibleParty:input.responsibleParty,
    dueDate:input.dueDate,
    status:'OPEN',
    source:String(input.source),
    notes:input.notes,
    createdAt:now,
    createdBy:session.userId,
    updatedAt:now,
    updatedBy:session.userId
  };
  await getCapitalRepository().createCondition(record);
  const correlation=corr(session,suppliedCorrelationId);
  const event=await serverEventBus.emit('condition.created',{
    condition_id:record.id,deal_id:record.dealId
  },{workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId});
  await audit(session,'condition',record.id,'condition.created',event.id,correlation,undefined,record.status);
  return record;
}

export async function updateCondition(
  session:SessionContext,
  conditionId:string,
  input:{status?:ConditionStatus;notes?:string;dueDate?:string;verifyCompletion?:boolean},
  suppliedCorrelationId?:string
):Promise<FundingCondition>{
  requirePermission(session,'condition.manage');
  const repo=getCapitalRepository();
  const existing=await repo.getCondition(session.workspaceId,conditionId);
  if(!existing) throw new TransactionDomainError('NOT_FOUND','Condition was not found in this workspace.',404);
  const now=new Date().toISOString();
  const updated:FundingCondition={
    ...existing,
    status:input.status||existing.status,
    notes:input.notes??existing.notes,
    dueDate:input.dueDate??existing.dueDate,
    updatedAt:now,
    updatedBy:session.userId,
    completedAt:input.status==='COMPLETED'?now:existing.completedAt,
    verifiedAt:input.status==='COMPLETED'&&input.verifyCompletion?now:existing.verifiedAt,
    verifiedBy:input.status==='COMPLETED'&&input.verifyCompletion?session.userId:existing.verifiedBy
  };
  await repo.updateCondition(updated);
  const correlation=corr(session,suppliedCorrelationId);
  const eventType=input.status==='COMPLETED'?'condition.completed':'condition.updated';
  const event=await serverEventBus.emit(eventType,{
    condition_id:updated.id,deal_id:updated.dealId,previous_status:existing.status,new_status:updated.status
  },{workspaceId:session.workspaceId,userId:session.userId,correlationId:correlation,requestId:session.requestId});
  await audit(session,'condition',updated.id,input.status==='COMPLETED'?'condition.completed':'condition.updated',event.id,correlation,existing.status,updated.status);
  return updated;
}

export async function listConditions(session:SessionContext,dealId:string):Promise<FundingCondition[]>{
  requirePermission(session,'deal.read');
  await getDeal(session,dealId);
  return getCapitalRepository().listConditions(session.workspaceId,dealId);
}

export async function putRelationshipLifecycle(
  session:SessionContext,
  dealId:string,
  input:Partial<RelationshipLifecycle>
):Promise<RelationshipLifecycle>{
  requirePermission(session,'deal.update');
  const deal=await getDeal(session,dealId);
  const existing=await getCapitalRepository().getRelationship(session.workspaceId,dealId);
  const record:RelationshipLifecycle={
    id:existing?.id||`relationship_${crypto.randomBytes(8).toString('hex')}`,
    workspaceId:session.workspaceId,
    dealId,
    ownerId:input.ownerId||existing?.ownerId||deal.ownerId,
    nextAction:input.nextAction??existing?.nextAction,
    nextActionDate:input.nextActionDate??existing?.nextActionDate,
    relationshipStatus:input.relationshipStatus||existing?.relationshipStatus||'ACTIVE',
    renewalTrigger:input.renewalTrigger??existing?.renewalTrigger,
    followUpTrigger:input.followUpTrigger??existing?.followUpTrigger,
    notes:input.notes??existing?.notes,
    updatedAt:new Date().toISOString(),
    updatedBy:session.userId
  };
  return getCapitalRepository().putRelationship(record);
}

export async function prepareFundingHandoff(session:SessionContext,dealId:string){
  requirePermission(session,'deal.read');
  const repo=getCapitalRepository();
  const deal=await getDeal(session,dealId);
  const intent=await repo.getFundingIntent(session.workspaceId,deal.fundingIntentId);
  if(!intent) throw new TransactionDomainError('NOT_FOUND','FundingIntent for this deal was not found.',404);
  return {
    status:'LIVE' as const,
    dealId:deal.id,
    destination:{
      id:'distilled-funding-intake',
      name:'Distilled Funding',
      type:'INTAKE_WORKFLOW',
      url:CTAS_CONFIG.businessFunding.url
    },
    context:{
      fundingIntent:intent,
      attribution:deal.attribution,
      source:deal.source,
      dealId:deal.id
    },
    explicitAuthorizationRequired:true,
    transmissionPerformed:false,
    nextAction:'Open the canonical intake workflow or create an authorized Submission record. Capital Operator has not transmitted data externally.'
  };
}

export async function getTransactionStatus(session:SessionContext,dealId:string){
  const repo=getCapitalRepository();
  const deal=await getDeal(session,dealId);
  const [capitalCase,documents,routing,submissions,offers,conditions,relationship]=await Promise.all([
    repo.getCapitalCase(session.workspaceId,dealId),
    repo.listDocuments(session.workspaceId,dealId),
    repo.listRoutingDecisions(session.workspaceId,dealId),
    repo.listSubmissions(session.workspaceId,dealId),
    repo.listOffers(session.workspaceId,dealId),
    repo.listConditions(session.workspaceId,dealId),
    repo.getRelationship(session.workspaceId,dealId)
  ]);
  return {
    deal,
    capitalCase,
    documents,
    routing,
    submissions,
    offers,
    outstandingConditions:conditions.filter(item=>!['COMPLETED','WAIVED'].includes(item.status)),
    conditions,
    relationship
  };
}
