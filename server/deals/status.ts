import type { Deal, DealStatus } from '../../src/types/deals.js';

export interface NextFundingAction {
  currentLifecycleState: DealStatus;
  blockingItem: string | null;
  nextRequiredAction: string;
  responsibleParty: 'APPLICANT' | 'OPERATOR' | 'CAPITAL_PARTNER' | 'SYSTEM';
  humanCheckpoint: string;
  capabilityStatus: 'LIVE' | 'SPECIFIED';
}

const NEXT_ACTIONS: Record<DealStatus, Omit<NextFundingAction,'currentLifecycleState'>> = {
  DRAFT: {
    blockingItem: 'Funding request has not completed intake.',
    nextRequiredAction: 'Complete intake and confirm the funding objective.',
    responsibleParty: 'OPERATOR',
    humanCheckpoint: 'Confirm requested amount, use of funds, and applicant context.',
    capabilityStatus: 'LIVE'
  },
  INTAKE: {
    blockingItem: 'Intake information may still be incomplete.',
    nextRequiredAction: 'Collect required business and transaction information.',
    responsibleParty: 'APPLICANT',
    humanCheckpoint: 'Operator verifies supplied facts before case preparation.',
    capabilityStatus: 'LIVE'
  },
  INFORMATION_REQUIRED: {
    blockingItem: 'Required information is outstanding.',
    nextRequiredAction: 'Resolve the missing-information list.',
    responsibleParty: 'APPLICANT',
    humanCheckpoint: 'Operator confirms the new information is sufficient.',
    capabilityStatus: 'LIVE'
  },
  READY_FOR_CASE: {
    blockingItem: null,
    nextRequiredAction: 'Build the capital case from verified facts and deterministic metrics.',
    responsibleParty: 'OPERATOR',
    humanCheckpoint: 'Human review of strengths, risks, assumptions, and source trace.',
    capabilityStatus: 'LIVE'
  },
  CASE_REVIEW: {
    blockingItem: 'Capital case requires human review.',
    nextRequiredAction: 'Approve the case for routing or return it for missing information.',
    responsibleParty: 'OPERATOR',
    humanCheckpoint: 'Human decides whether the case is ready to route.',
    capabilityStatus: 'LIVE'
  },
  READY_FOR_ROUTING: {
    blockingItem: null,
    nextRequiredAction: 'Run capital-category routing and review verified provider data where available.',
    responsibleParty: 'OPERATOR',
    humanCheckpoint: 'Human approves the routing path.',
    capabilityStatus: 'LIVE'
  },
  ROUTING_REVIEW: {
    blockingItem: 'Routing recommendation is awaiting human approval.',
    nextRequiredAction: 'Approve, revise, or reject the proposed route.',
    responsibleParty: 'OPERATOR',
    humanCheckpoint: 'Route recommendation is not provider eligibility.',
    capabilityStatus: 'LIVE'
  },
  READY_FOR_SUBMISSION: {
    blockingItem: 'No external submission is authorized yet.',
    nextRequiredAction: 'Create a submission package and obtain explicit human authorization.',
    responsibleParty: 'OPERATOR',
    humanCheckpoint: 'External transmission requires explicit authorization and audit.',
    capabilityStatus: 'SPECIFIED'
  },
  SUBMITTED: {
    blockingItem: 'Capital partner review is pending.',
    nextRequiredAction: 'Track acknowledgement and information requests.',
    responsibleParty: 'CAPITAL_PARTNER',
    humanCheckpoint: 'Do not infer approval from submission state.',
    capabilityStatus: 'SPECIFIED'
  },
  TERMS_RECEIVED: {
    blockingItem: null,
    nextRequiredAction: 'Normalize actual received terms for human review.',
    responsibleParty: 'OPERATOR',
    humanCheckpoint: 'Compare terms without selecting a winner.',
    capabilityStatus: 'SPECIFIED'
  },
  OFFER_REVIEW: {
    blockingItem: 'Received terms require human decision.',
    nextRequiredAction: 'Review actual terms, fees, conditions, and expiration.',
    responsibleParty: 'OPERATOR',
    humanCheckpoint: 'Human decides whether and how to proceed.',
    capabilityStatus: 'SPECIFIED'
  },
  CONDITIONS: {
    blockingItem: 'Outstanding conditions must be resolved.',
    nextRequiredAction: 'Complete and verify outstanding conditions.',
    responsibleParty: 'APPLICANT',
    humanCheckpoint: 'Operator verifies conditions before representing completion.',
    capabilityStatus: 'SPECIFIED'
  },
  FUNDED: {
    blockingItem: null,
    nextRequiredAction: 'Record funding outcome and schedule relationship follow-up.',
    responsibleParty: 'OPERATOR',
    humanCheckpoint: 'Confirm actual funding event before marking funded.',
    capabilityStatus: 'SPECIFIED'
  },
  DECLINED_BY_PARTNER: {
    blockingItem: 'A capital partner declined the submission.',
    nextRequiredAction: 'Record the documented reason and decide whether another route is appropriate.',
    responsibleParty: 'OPERATOR',
    humanCheckpoint: 'Human determines any rerouting or client communication.',
    capabilityStatus: 'SPECIFIED'
  },
  WITHDRAWN: {
    blockingItem: 'Funding request was withdrawn.',
    nextRequiredAction: 'Close the request or schedule a future follow-up.',
    responsibleParty: 'OPERATOR',
    humanCheckpoint: 'Confirm withdrawal reason and relationship next step.',
    capabilityStatus: 'LIVE'
  },
  FOLLOW_UP: {
    blockingItem: null,
    nextRequiredAction: 'Execute the scheduled relationship follow-up.',
    responsibleParty: 'OPERATOR',
    humanCheckpoint: 'Human owns relationship and renewal strategy.',
    capabilityStatus: 'LIVE'
  },
  CLOSED: {
    blockingItem: null,
    nextRequiredAction: 'No operational action is required unless the relationship is reopened.',
    responsibleParty: 'SYSTEM',
    humanCheckpoint: 'Closed records remain auditable.',
    capabilityStatus: 'LIVE'
  }
};

export interface FundingActionContext {
  missingInformationCount?: number;
  requiredDocumentCount?: number;
  receivedDocumentTypes?: string[];
  providerCandidateCount?: number;
  routingDecisionCount?: number;
  submissionCount?: number;
  offerCount?: number;
  outstandingConditionCount?: number;
}

export function getNextFundingActionForDeal(deal: Deal, context: FundingActionContext = {}): NextFundingAction {
  const base={currentLifecycleState:deal.status,...NEXT_ACTIONS[deal.status]};
  if((context.outstandingConditionCount||0)>0){
    return {...base,blockingItem:`${context.outstandingConditionCount} outstanding funding condition(s).`,nextRequiredAction:'Complete and verify the outstanding conditions.',responsibleParty:'APPLICANT',humanCheckpoint:'Operator verifies evidence before any completion claim.'};
  }
  if((context.missingInformationCount||0)>0 && ['DRAFT','INTAKE','INFORMATION_REQUIRED'].includes(deal.status)){
    return {...base,blockingItem:`${context.missingInformationCount} required funding fact(s) are missing.`,nextRequiredAction:'Collect the highest-priority missing information from the discovery/readiness result.',responsibleParty:'APPLICANT',humanCheckpoint:'Operator confirms the supplied facts before routing.'};
  }
  if(deal.status==='READY_FOR_ROUTING' && (context.providerCandidateCount||0)>0){
    return {...base,blockingItem:null,nextRequiredAction:'Review the verified provider/product candidates and approve the routing path.',responsibleParty:'OPERATOR',humanCheckpoint:'Provider relevance is not approval or availability.'};
  }
  if(deal.status==='READY_FOR_SUBMISSION' && (context.submissionCount||0)===0){
    return {...base,blockingItem:'No submission package has been created.',nextRequiredAction:'Prepare a handoff destination and create a submission package for explicit authorization.',responsibleParty:'OPERATOR',humanCheckpoint:'External transmission remains human-authorized.'};
  }
  if((context.offerCount||0)>0 && ['SUBMITTED','TERMS_RECEIVED','OFFER_REVIEW'].includes(deal.status)){
    return {...base,blockingItem:null,nextRequiredAction:'Compare the actual received offer terms and conditions.',responsibleParty:'OPERATOR',humanCheckpoint:'Capital Operator normalizes terms but does not select a winner.'};
  }
  return base;
}
