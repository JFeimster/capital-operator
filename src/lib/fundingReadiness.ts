import { getFundingDocumentChecklist } from './fundingDocuments.js';
import { getFundingIntentMissingFields } from './fundingIntent.js';
import { findFundingOptions } from './fundingOptions.js';
import type { FundingIntent, FundingReadinessResult, MissingFundingField } from '../types/funding.js';

export function checkFundingReadiness(intent: FundingIntent): FundingReadinessResult {
  const baseMissing=getFundingIntentMissingFields(intent);
  const options=findFundingOptions(intent);
  const providerGaps=options.providerCandidates.slice(0,3).flatMap(item=>item.qualificationGaps||[]);
  const seen=new Set<string>();
  const missing=[...baseMissing,...providerGaps].filter(item=>{
    const key=`${item.field}:${item.reason}`; if(seen.has(key)) return false; seen.add(key); return true;
  });
  const checklist=getFundingDocumentChecklist(intent);
  const routingMissing=missing.filter(item=>item.requiredFor==='INTENT'||item.requiredFor==='ROUTING');
  const caseMissing=missing.filter(item=>item.requiredFor!=='PROVIDER_REVIEW');

  const documentPlaceholders:MissingFundingField[]=checklist.items.filter(item=>item.required).map(item=>({
    field:`document:${item.id}`,reason:`Required preparation item: ${item.label}`,requiredFor:'CAPITAL_CASE'
  }));

  const sections=[
    {id:'required_information' as const,status:missing.filter(item=>item.requiredFor==='INTENT').length?'NEEDS_INFORMATION' as const:'READY' as const,missing:missing.filter(item=>item.requiredFor==='INTENT')},
    {id:'documents' as const,status:'REVIEW' as const,missing:documentPlaceholders},
    {id:'capital_case' as const,status:caseMissing.length?'NEEDS_INFORMATION' as const:'REVIEW' as const,missing:caseMissing},
    {id:'routing' as const,status:routingMissing.length?'NEEDS_INFORMATION' as const:'REVIEW' as const,missing:routingMissing}
  ];

  const nextActions:string[]=[];
  if(missing.length) nextActions.push(`Collect missing information: ${missing.slice(0,4).map(item=>item.field).join(', ')}.`);
  if(documentPlaceholders.length) nextActions.push('Confirm required preparation documents and record what has been received.');
  if(options.productMatches.length) nextActions.push(`Review the top product path: ${options.productMatches[0].productName}.`);
  if(options.providerCandidates.length) nextActions.push(`Human-review verified provider candidate: ${options.providerCandidates[0].providerName}.`);
  else if(!routingMissing.length) nextActions.push('Continue category/product routing; no verified provider candidate is established for this request yet.');

  return {
    status:'LIVE',intentId:intent.id,sections,missingInformation:missing,
    readyForCapitalCase:caseMissing.length===0,readyForRouting:routingMissing.length===0,nextActions,humanReviewRequired:true
  };
}
