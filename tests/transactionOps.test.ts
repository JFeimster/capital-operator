import { authenticateHeaders } from '../server/auth/authService.js';
import { createDealFromIntent, transitionDeal } from '../server/deals/service.js';
import { getDevelopmentMemoryRepository } from '../server/persistence/index.js';
import {
  approveRoutingDecision,
  compareOffers,
  createCondition,
  createDocumentMetadata,
  createOffer,
  createRoutingSuggestion,
  createSubmission,
  generatePersistentCapitalCase,
  getTransactionStatus,
  putDealAttribution,
  putRelationshipLifecycle,
  recordDealOutcome,
  reviewCapitalCase,
  TransactionDomainError,
  transitionSubmission,
  updateCondition,
  verifyDocument
} from '../server/transactions/service.js';
import { normalizeFundingIntent } from '../src/lib/fundingIntent.js';

export async function runTransactionOpsTests() {
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
      'x-capital-user-id':'tx-operator',
      'x-capital-workspace-id':'tx-workspace',
      'x-capital-role':'operator'
    });

    const intent=normalizeFundingIntent({
      objective:'I need $250,000 to buy equipment.',
      attribution:{
        source:'partner-referral',
        referralPartner:'partner-123',
        affiliateSubId:'campaign-a'
      },
      businessProfile:{timeInBusinessMonths:48,annualRevenue:1800000},
      assetContext:{equipmentType:'excavator',equipmentCost:250000}
    });
    const deal=await createDealFromIntent(operator,intent);

    const document=await createDocumentMetadata(operator,deal.id,{
      type:'equipment_quote',
      filename:'excavator-quote.pdf',
      source:'applicant'
    });
    const verifiedDocument=await verifyDocument(operator,document.id,true,'Operator reviewed quote');
    if(verifiedDocument.verificationStatus!=='HUMAN_VERIFIED') throw new Error('Document verification failed');

    await transitionDeal(operator,deal.id,'INTAKE','Intake started');
    await transitionDeal(operator,deal.id,'READY_FOR_CASE','Required facts collected');
    const capitalCase=await generatePersistentCapitalCase(operator,deal.id);
    if(capitalCase.status!=='REVIEW_REQUIRED') throw new Error('Persistent capital case was not created');
    const reviewedCase=await reviewCapitalCase(operator,deal.id,true);
    if(reviewedCase.status!=='APPROVED_FOR_EXTERNAL_USE') throw new Error('Capital case human review failed');

    await transitionDeal(operator,deal.id,'CASE_REVIEW','Capital case prepared');
    await transitionDeal(operator,deal.id,'READY_FOR_ROUTING','Capital case approved');
    const routing=await createRoutingSuggestion(operator,deal.id);
    if(routing.status!=='SYSTEM_SUGGESTED') throw new Error('Routing suggestion failed');
    await transitionDeal(operator,deal.id,'ROUTING_REVIEW','Routing requires human review');
    const approvedRoute=await approveRoutingDecision(operator,routing.id);
    if(approvedRoute.status!=='HUMAN_APPROVED') throw new Error('Human route approval failed');
    await transitionDeal(operator,deal.id,'READY_FOR_SUBMISSION','Route approved');

    const submission=await createSubmission(operator,{
      dealId:deal.id,
      destinationType:'INTAKE_WORKFLOW',
      destinationId:'distilled-funding-intake',
      source:'operator'
    });
    const ready=await transitionSubmission(operator,submission.id,'READY');

    let authorizationGuard=false;
    try {
      await transitionSubmission(operator,ready.id,'AUTHORIZED');
    } catch(error) {
      authorizationGuard=error instanceof TransactionDomainError&&error.code==='EXPLICIT_AUTHORIZATION_REQUIRED';
    }
    if(!authorizationGuard) throw new Error('Submission authorization guard failed');

    const authorized=await transitionSubmission(operator,ready.id,'AUTHORIZED',{
      explicitAuthorization:true,
      authorizationReason:'Operator approved this destination after reviewing the case'
    });

    let submittedGuard=false;
    try {
      await transitionSubmission(operator,authorized.id,'SUBMITTED');
    } catch(error) {
      submittedGuard=error instanceof TransactionDomainError&&error.code==='EXTERNAL_CONFIRMATION_REQUIRED';
    }
    if(!submittedGuard) throw new Error('External submission confirmation guard failed');

    const submitted=await transitionSubmission(operator,authorized.id,'SUBMITTED',{
      externalConfirmation:true,
      externalEvidence:'External intake confirmation #ABC-123',
      externalReference:'ABC-123'
    });
    if(submitted.status!=='SUBMITTED') throw new Error('Submission tracking failed');

    let fabricatedOfferGuard=false;
    try {
      await createOffer(operator,{dealId:deal.id,source:'operator'});
    } catch(error) {
      fabricatedOfferGuard=error instanceof TransactionDomainError&&error.code==='VALIDATION_FAILED';
    }
    if(!fabricatedOfferGuard) throw new Error('Offer must require actual received terms');

    const offer=await createOffer(operator,{
      dealId:deal.id,
      submissionId:submission.id,
      providerName:'Received Terms Source',
      amount:225000,
      pricing:{raw:'Terms as received; pricing normalization pending human review'},
      termMonths:24,
      source:'received-term-sheet',
      verificationStatus:'HUMAN_VERIFIED'
    });
    if(offer.amount!==225000) throw new Error('Actual offer storage failed');

    const comparison=await compareOffers(operator,deal.id);
    if(comparison.winner!==null||comparison.offers.length!==1) throw new Error('Offer comparison must not select a winner');

    await transitionDeal(operator,deal.id,'OFFER_REVIEW','Review actual received terms');
    await transitionDeal(operator,deal.id,'CONDITIONS','Proceed to conditions');

    const condition=await createCondition(operator,{
      dealId:deal.id,
      submissionId:submission.id,
      offerId:offer.id,
      requestedItem:'Updated bank statement',
      responsibleParty:'APPLICANT',
      source:'received-provider-condition'
    });
    const completed=await updateCondition(operator,condition.id,{status:'COMPLETED',verifyCompletion:true});
    if(!completed.verifiedAt) throw new Error('Condition verification failed');

    const attribution=await putDealAttribution(operator,deal.id,{
      attribution:{source:'partner-referral',referralPartner:'partner-123',affiliateSubId:'campaign-a'},
      compensation:{
        status:'EXPECTED',
        model:'PERCENT_OF_FUNDED_AMOUNT',
        rate:0.01,
        source:'documented-partner-agreement',
        sourceReference:'partner-agreement-2026'
      },
      source:'deal-intake'
    });
    if(attribution.compensation?.amount!==undefined) throw new Error('Compensation amount must not be inferred');

    const relationship=await putRelationshipLifecycle(operator,deal.id,{
      relationshipStatus:'ACTIVE',
      nextAction:'Review remaining funding conditions'
    });
    if(relationship.relationshipStatus!=='ACTIVE') throw new Error('Relationship lifecycle failed');

    let fundedGuard=false;
    try {
      await recordDealOutcome(operator,{dealId:deal.id,outcome:'FUNDED',reason:'Funding reported'});
    } catch(error) {
      fundedGuard=error instanceof TransactionDomainError&&error.code==='EXTERNAL_CONFIRMATION_REQUIRED';
    }
    if(!fundedGuard) throw new Error('Funded state must require external evidence');

    const funded=await recordDealOutcome(operator,{
      dealId:deal.id,
      outcome:'FUNDED',
      externalConfirmation:true,
      externalEvidence:'Bank funding confirmation reference F-7788',
      fundedAmount:225000,
      fundingDate:'2026-09-24',
      reason:'External funding confirmation received'
    });
    if(funded.status!=='FUNDED') throw new Error('Funded outcome recording failed');

    const status=await getTransactionStatus(operator,deal.id);
    if(status.documents.length!==1||status.submissions.length!==1||status.offers.length!==1||status.conditions.length!==1) {
      throw new Error('Transaction status aggregation failed');
    }
    if(status.attribution?.compensation?.status!=='EXPECTED') throw new Error('Attribution aggregation failed');
    if(status.relationship?.relationshipStatus!=='FOLLOW_UP') throw new Error('Funded outcome should create relationship follow-up');

    const submissionAudit=await repo.listAudit(operator.workspaceId,'submission',submission.id);
    const offerAudit=await repo.listAudit(operator.workspaceId,'offer',offer.id);
    const attributionAudit=await repo.listAudit(operator.workspaceId,'attribution',attribution.id);
    if(!submissionAudit.length||!offerAudit.length||!attributionAudit.length) throw new Error('Transaction audit trail incomplete');

    return {passed:true,testName:'runTransactionOpsTests'};
  } finally {
    if(original.nodeEnv===undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV=original.nodeEnv;
    if(original.authMode===undefined) delete process.env.CAPITAL_AUTH_MODE; else process.env.CAPITAL_AUTH_MODE=original.authMode;
    if(original.persistenceMode===undefined) delete process.env.CAPITAL_PERSISTENCE_MODE; else process.env.CAPITAL_PERSISTENCE_MODE=original.persistenceMode;
  }
}
