import { normalizeFundingIntent, getFundingIntentMissingFields } from '../src/lib/fundingIntent.js';
import { checkFundingReadiness } from '../src/lib/fundingReadiness.js';
import { findFundingOptions } from '../src/lib/fundingOptions.js';
import { getFundingDocumentChecklist } from '../src/lib/fundingDocuments.js';
import { buildCapitalCase } from '../src/lib/capitalCase.js';
import { VERIFIED_FUNDING_PROVIDERS } from '../src/config/fundingProviders.js';

export async function runFundingOutcomeTests() {
  const equipment = normalizeFundingIntent({
    objective:'I need $250,000 to buy equipment for my construction company.',
    businessProfile:{timeInBusinessMonths:48,annualRevenue:1800000},
    assetContext:{equipmentType:'construction equipment',equipmentCost:250000}
  });
  if(equipment.requestedAmount!==250000) throw new Error('Funding intent amount normalization failed');
  if(equipment.vertical!=='equipment' || equipment.fundingPurpose!=='equipment_financing') {
    throw new Error('Equipment intent classification failed');
  }
  if(equipment.persistence!=='NON_PERSISTENT') throw new Error('Intent must truthfully identify non-persistent state');

  const govcon=normalizeFundingIntent({
    objective:'I need working capital for an awarded government contract.',
    requestedAmount:175000,
    businessProfile:{timeInBusinessMonths:36,avgMonthlyDeposits:90000},
    contractContext:{status:'awarded',contractAmount:800000}
  });
  if(govcon.vertical!=='government_contract') throw new Error('Government contract classification failed');

  const missing=getFundingIntentMissingFields(normalizeFundingIntent({objective:'I need working capital'}));
  if(!missing.some(item=>item.field==='requestedAmount')) throw new Error('Missing amount should be detected');

  const readiness=checkFundingReadiness(equipment);
  if(!Array.isArray(readiness.sections) || readiness.humanReviewRequired!==true) {
    throw new Error('Readiness contract malformed');
  }

  const options=findFundingOptions(equipment);
  if(!options.categoryFits.some(item=>item.productPathId==='equipment-financing')) {
    throw new Error('Equipment product path missing');
  }
  if(options.providerCandidates.length!==0 || VERIFIED_FUNDING_PROVIDERS.length!==0) {
    throw new Error('Unverified provider data must not be promoted');
  }
  if(options.providerDiscoveryStatus!=='NO_VERIFIED_PROVIDER_DATA') {
    throw new Error('Provider discovery status must remain truthful');
  }

  const checklist=getFundingDocumentChecklist(equipment);
  if(!checklist.items.some(item=>item.id==='equipment_quote')) {
    throw new Error('Equipment checklist missing quote');
  }

  const realEstate=normalizeFundingIntent({
    objective:'I need a DSCR loan for an investment property.',
    requestedAmount:600000,
    realEstateContext:{propertyValue:800000,annualNetOperatingIncome:100000,annualDebtService:80000},
    businessProfile:{timeInBusinessMonths:24,annualRevenue:500000}
  });
  const capitalCase=buildCapitalCase(realEstate);
  if(capitalCase.deterministicMetrics.dscr!==1.25) {
    throw new Error('Capital case must reuse deterministic DSCR math');
  }

  return {passed:true,testName:'runFundingOutcomeTests'};
}
