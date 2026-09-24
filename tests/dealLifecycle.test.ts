import { authenticateHeaders } from '../server/auth/authService.js';
import {
  createDealFromIntent,
  DealDomainError,
  getDeal,
  getDealAudit,
  transitionDeal
} from '../server/deals/service.js';
import { getDevelopmentMemoryRepository } from '../server/persistence/index.js';
import { normalizeFundingIntent } from '../src/lib/fundingIntent.js';

export async function runDealLifecycleTests() {
  const original={
    nodeEnv:process.env.NODE_ENV,
    authMode:process.env.CAPITAL_AUTH_MODE,
    persistenceMode:process.env.CAPITAL_PERSISTENCE_MODE
  };

  try {
    process.env.NODE_ENV='test';
    process.env.CAPITAL_AUTH_MODE='development';
    process.env.CAPITAL_PERSISTENCE_MODE='memory';
    const repo=getDevelopmentMemoryRepository();
    repo.clearForTests();

    const operator=authenticateHeaders({
      'x-capital-user-id':'operator-a',
      'x-capital-workspace-id':'workspace-a',
      'x-capital-role':'operator'
    });
    const intent=normalizeFundingIntent({
      objective:'I need $250,000 to buy equipment.',
      businessProfile:{timeInBusinessMonths:36,annualRevenue:1400000},
      assetContext:{equipmentType:'excavator',equipmentCost:250000}
    });

    const deal=await createDealFromIntent(operator,intent);
    if(deal.workspaceId!=='workspace-a' || deal.status!=='DRAFT') throw new Error('Deal creation failed');

    const persistedIntent=await repo.getFundingIntent('workspace-a',deal.fundingIntentId);
    if(!persistedIntent || persistedIntent.persistence!=='PERSISTED') {
      throw new Error('Deal must point to a persisted FundingIntent');
    }

    const otherWorkspace=authenticateHeaders({
      'x-capital-user-id':'operator-b',
      'x-capital-workspace-id':'workspace-b',
      'x-capital-role':'operator'
    });
    let isolated=false;
    try {
      await getDeal(otherWorkspace,deal.id);
    } catch(error) {
      isolated=error instanceof DealDomainError && error.code==='DEAL_NOT_FOUND';
    }
    if(!isolated) throw new Error('Cross-workspace deal access must be denied');

    await transitionDeal(operator,deal.id,'INTAKE','Initial intake started');
    let invalid=false;
    try {
      await transitionDeal(operator,deal.id,'READY_FOR_ROUTING','Skip ahead');
    } catch(error) {
      invalid=error instanceof DealDomainError && error.code==='INVALID_TRANSITION';
    }
    if(!invalid) throw new Error('Invalid state transition must be rejected');

    await transitionDeal(operator,deal.id,'READY_FOR_CASE','Required intake information collected');
    await transitionDeal(operator,deal.id,'CASE_REVIEW','Capital case prepared');
    await transitionDeal(operator,deal.id,'READY_FOR_ROUTING','Case approved for routing');
    await transitionDeal(operator,deal.id,'ROUTING_REVIEW','System routes ready for human review');
    await transitionDeal(operator,deal.id,'READY_FOR_SUBMISSION','Human approved the route');

    let guarded=false;
    try {
      await transitionDeal(operator,deal.id,'SUBMITTED','Submit now');
    } catch(error) {
      guarded=error instanceof DealDomainError && error.code==='EXTERNAL_SUBMISSION_GUARD';
    }
    if(!guarded) throw new Error('Generic lifecycle must not mark an external submission as sent');

    const audit=await getDealAudit(operator,deal.id);
    if(audit.length<7 || !audit.every(item=>item.workspaceId==='workspace-a')) {
      throw new Error('Deal mutations must be append-audited inside workspace');
    }

    return {passed:true,testName:'runDealLifecycleTests'};
  } finally {
    if(original.nodeEnv===undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV=original.nodeEnv;
    if(original.authMode===undefined) delete process.env.CAPITAL_AUTH_MODE; else process.env.CAPITAL_AUTH_MODE=original.authMode;
    if(original.persistenceMode===undefined) delete process.env.CAPITAL_PERSISTENCE_MODE; else process.env.CAPITAL_PERSISTENCE_MODE=original.persistenceMode;
  }
}
