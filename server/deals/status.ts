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

export function getNextFundingActionForDeal(deal: Deal): NextFundingAction {
  return {
    currentLifecycleState: deal.status,
    ...NEXT_ACTIONS[deal.status]
  };
}
