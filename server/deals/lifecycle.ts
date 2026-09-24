import type { DealStatus } from '../../src/types/deals.js';

export const DEAL_TRANSITIONS: Record<DealStatus, readonly DealStatus[]> = {
  DRAFT: ['INTAKE','WITHDRAWN'],
  INTAKE: ['INFORMATION_REQUIRED','READY_FOR_CASE','WITHDRAWN'],
  INFORMATION_REQUIRED: ['INTAKE','READY_FOR_CASE','WITHDRAWN'],
  READY_FOR_CASE: ['CASE_REVIEW','WITHDRAWN'],
  CASE_REVIEW: ['INFORMATION_REQUIRED','READY_FOR_ROUTING','WITHDRAWN'],
  READY_FOR_ROUTING: ['ROUTING_REVIEW','WITHDRAWN'],
  ROUTING_REVIEW: ['INFORMATION_REQUIRED','READY_FOR_SUBMISSION','WITHDRAWN'],
  READY_FOR_SUBMISSION: ['SUBMITTED','WITHDRAWN'],
  SUBMITTED: ['TERMS_RECEIVED','DECLINED_BY_PARTNER','WITHDRAWN'],
  TERMS_RECEIVED: ['OFFER_REVIEW','DECLINED_BY_PARTNER','WITHDRAWN'],
  OFFER_REVIEW: ['CONDITIONS','DECLINED_BY_PARTNER','WITHDRAWN'],
  CONDITIONS: ['FUNDED','INFORMATION_REQUIRED','DECLINED_BY_PARTNER','WITHDRAWN'],
  FUNDED: ['FOLLOW_UP','CLOSED'],
  DECLINED_BY_PARTNER: ['FOLLOW_UP','CLOSED'],
  WITHDRAWN: ['FOLLOW_UP','CLOSED'],
  FOLLOW_UP: ['CLOSED'],
  CLOSED: []
};

export function canTransitionDeal(from: DealStatus, to: DealStatus): boolean {
  return DEAL_TRANSITIONS[from].includes(to);
}

export function workflowStageForStatus(status: DealStatus): number {
  if (['DRAFT'].includes(status)) return 2;
  if (['INTAKE','INFORMATION_REQUIRED'].includes(status)) return 3;
  if (['READY_FOR_CASE','CASE_REVIEW'].includes(status)) return 4;
  if (['READY_FOR_ROUTING','ROUTING_REVIEW'].includes(status)) return 5;
  if (['READY_FOR_SUBMISSION','SUBMITTED','TERMS_RECEIVED','OFFER_REVIEW','CONDITIONS'].includes(status)) return 6;
  if (['DECLINED_BY_PARTNER','WITHDRAWN'].includes(status)) return 7;
  return 8;
}

export function routingPermissionRequired(to: DealStatus): boolean {
  return ['ROUTING_REVIEW','READY_FOR_SUBMISSION'].includes(to);
}

export function externalSubmissionGuardRequired(to: DealStatus): boolean {
  return to === 'SUBMITTED';
}
