import { CTAS_CONFIG } from '../config/ctas.js';
import { FUNDING_PRODUCT_FAMILIES, FUNDING_PRODUCTS, FUNDING_PRODUCT_PATHS } from '../config/fundingProducts.js';
import { FUNDING_TAXONOMY } from '../config/fundingTaxonomy.js';
import { PROVIDER_CRITERIA, VERIFIED_FUNDING_PROVIDERS, VERIFIED_PROVIDER_CRITERIA } from '../config/fundingProviders.js';
import { LIVE_FUNDING_RESOURCE_ASSETS } from '../config/resourceAssets.js';
import { getFundingDocumentChecklist } from './fundingDocuments.js';
import { getFundingIntentMissingFields } from './fundingIntent.js';
import type {
  FundingFamilyMatch,
  FundingIntent,
  FundingOptionsResult,
  FundingProductMatch,
  FundingProductRecord,
  FundingSupportResourceMatch,
  MissingFundingField,
  ProviderCandidate,
  ProviderCriteriaRecord
} from '../types/funding.js';

const RANKING_VERSION='batch2-deterministic-v1';

function normalizedMonthlyRevenue(intent: FundingIntent): number | undefined {
  if(typeof intent.businessProfile?.avgMonthlyDeposits==='number') return intent.businessProfile.avgMonthlyDeposits;
  if(typeof intent.businessProfile?.annualRevenue==='number') return intent.businessProfile.annualRevenue/12;
  return undefined;
}

function gap(field:string,reason:string):MissingFundingField {
  return {field,reason,requiredFor:'PROVIDER_REVIEW'};
}

function evaluateCriteria(criteria: ProviderCriteriaRecord | undefined,intent: FundingIntent) {
  const reasons:string[]=[];
  const gaps:MissingFundingField[]=[];
  let outside=false;
  if(!criteria) return {reasons,gaps,outside};
  const c=criteria.criteria||{};
  const amount=intent.requestedAmount;
  const credit=intent.businessProfile?.creditScore;
  const revenue=normalizedMonthlyRevenue(intent);
  const tib=intent.businessProfile?.timeInBusinessMonths;

  const minAmount=typeof c.minAmount==='number'?c.minAmount:undefined;
  const maxAmount=typeof c.maxAmount==='number'?c.maxAmount:undefined;
  if(typeof amount==='number'){
    if(typeof minAmount==='number'&&amount<minAmount){outside=true;gaps.push(gap('requestedAmount',`Requested amount is below the recorded product minimum of $${minAmount.toLocaleString()}.`));}
    else if(typeof maxAmount==='number'&&amount>maxAmount){outside=true;gaps.push(gap('requestedAmount',`Requested amount is above the recorded product maximum of $${maxAmount.toLocaleString()}.`));}
    else if(minAmount!==undefined||maxAmount!==undefined) reasons.push('Requested amount is within the recorded product amount range.');
  } else if(minAmount!==undefined||maxAmount!==undefined) gaps.push(gap('requestedAmount','Requested amount is needed to compare against product amount criteria.'));

  const minCredit=typeof c.minCreditScore==='number'?c.minCreditScore:undefined;
  if(typeof minCredit==='number'){
    if(typeof credit==='number'){
      if(credit<minCredit){outside=true;gaps.push(gap('businessProfile.creditScore',`Reported credit score is below the recorded minimum of ${minCredit}.`));}
      else reasons.push(`Reported credit score meets the recorded ${minCredit}+ criterion.`);
    } else gaps.push(gap('businessProfile.creditScore',`Credit score is needed to compare against the recorded ${minCredit}+ criterion.`));
  }

  const minRevenue=typeof c.minMonthlyRevenue==='number'?c.minMonthlyRevenue:undefined;
  if(typeof minRevenue==='number'){
    if(typeof revenue==='number'){
      if(revenue<minRevenue){outside=true;gaps.push(gap('businessProfile.avgMonthlyDeposits',`Reported monthly revenue/deposits are below the recorded $ ${minRevenue.toLocaleString()} monthly criterion.`));}
      else reasons.push('Reported monthly revenue/deposits meet the recorded product criterion.');
    } else gaps.push(gap('businessProfile.avgMonthlyDeposits',`Monthly revenue/deposits are needed to compare against the recorded $ ${minRevenue.toLocaleString()} criterion.`));
  }

  const minTib=typeof c.minTimeInBusinessMonths==='number'?c.minTimeInBusinessMonths:undefined;
  if(typeof minTib==='number'){
    if(typeof tib==='number'){
      if(tib<minTib){outside=true;gaps.push(gap('businessProfile.timeInBusinessMonths',`Reported operating history is below the recorded ${minTib}-month criterion.`));}
      else reasons.push('Reported time in business meets the recorded product criterion.');
    } else gaps.push(gap('businessProfile.timeInBusinessMonths',`Time in business is needed to compare against the recorded ${minTib}-month criterion.`));
  }

  if(c.startupEligible===false && typeof tib==='number' && tib<12){
    outside=true;
    gaps.push(gap('businessProfile.timeInBusinessMonths','The source record does not mark this product as startup eligible.'));
  }
  return {reasons,gaps,outside};
}

function productCriteria(product: FundingProductRecord): ProviderCriteriaRecord | undefined {
  return PROVIDER_CRITERIA.find(item=>item.productId===product.id);
}

function scoreProduct(product: FundingProductRecord,intent: FundingIntent,pathIds:Set<string>) {
  let score=0;
  const reasons:string[]=[];
  if(product.productPathId&&pathIds.has(product.productPathId)){score+=50;reasons.push('Maps to a matched canonical funding path.');}
  const family=FUNDING_PRODUCT_FAMILIES.find(item=>item.id===product.productFamily);
  if(family?.qualificationSignals?.repaymentSource){
    const source=family.qualificationSignals.repaymentSource;
    if(intent.vertical==='real_estate'&&source==='property_income_or_sale'){score+=10;reasons.push('Family repayment source matches the real-estate context.');}
    if(intent.vertical==='ecommerce'&&source==='platform_sales'){score+=10;reasons.push('Family repayment source matches marketplace/e-commerce sales.');}
    if(intent.vertical==='government_contract'&&intent.contractContext?.status){score+=10;reasons.push('Contract context is present for transaction-oriented funding review.');}
  }
  const criteria=productCriteria(product);
  const evaluation=evaluateCriteria(criteria,intent);
  reasons.push(...evaluation.reasons);
  score += evaluation.reasons.length*6;
  score -= evaluation.gaps.length*3;
  if(evaluation.outside) score-=35;
  if(product.status==='ACTIVE_VERIFIED'){score+=15;reasons.push('Product criteria are explicitly source-verified.');}
  else reasons.push('Product is canonical but its source criteria require human review.');
  if(product.provenance.verifiedAt){
    const ageDays=Math.max(0,(Date.now()-Date.parse(product.provenance.verifiedAt))/86400000);
    if(ageDays<180) score+=4;
  }
  return {score,reasons,evaluation,criteria};
}

function rankSupportResources(intent: FundingIntent): FundingSupportResourceMatch[] {
  const terms=[
    intent.fundingPurpose.replace(/_/g,' '),
    intent.vertical.replace(/_/g,' '),
    intent.useOfFunds||'',
    intent.assetContext?.equipmentType||'',
    intent.contractContext?.status?'contract':'',
    intent.acquisitionContext?'acquisition':'',
    intent.realEstateContext?'real estate':'',
    intent.receivableContext?'invoice receivable':'',
    intent.vertical==='ecommerce'?'amazon ecommerce inventory':''
  ].filter(Boolean).map(x=>String(x).toLowerCase());

  return LIVE_FUNDING_RESOURCE_ASSETS.map(asset=>{
    const hay=[asset.name,asset.problem,asset.painSolved,asset.assetType,asset.partnerChannel].filter(Boolean).join(' ').toLowerCase();
    let score=0; const reasons:string[]=[];
    for(const term of terms){
      const tokens=term.split(/\s+/).filter(t=>t.length>3);
      const matches=tokens.filter(t=>hay.includes(t));
      if(matches.length){score+=matches.length*8;reasons.push(`Relevant to ${matches.slice(0,3).join(', ')}.`);}
    }
    return {resourceId:asset.id,name:asset.name,assetType:asset.assetType,score,reasons,liveUrl:asset.liveUrl!,status:'LIVE' as const};
  }).filter(item=>item.score>0).sort((a,b)=>b.score-a.score).slice(0,5);
}

export function findFundingOptions(intent: FundingIntent): FundingOptionsResult {
  const requestText=[intent.objective,intent.useOfFunds].filter(Boolean).join(' ').toLowerCase();
  const secondaryPurposes=new Set(
    FUNDING_TAXONOMY.filter(entry=>entry.keywords.some(keyword=>requestText.includes(keyword.toLowerCase()))).map(entry=>entry.purpose)
  );
  const categoryFits=FUNDING_PRODUCT_PATHS.map(path=>{
    let score=0; const reasons:string[]=[];
    if(path.purposes.includes(intent.fundingPurpose)){score+=100;reasons.push(`Directly supports ${intent.fundingPurpose.replace(/_/g,' ')}.`);}
    if(path.vertical===intent.vertical){score+=55;reasons.push(`Matches ${intent.vertical.replace(/_/g,' ')} funding vertical.`);}
    const secondary=path.purposes.filter(purpose=>secondaryPurposes.has(purpose)&&purpose!==intent.fundingPurpose);
    if(secondary.length){score+=85;reasons.push(`Also matches stated need: ${secondary.map(item=>item.replace(/_/g,' ')).join(', ')}.`);}
    const nameTokens=path.name.toLowerCase().split(/\s+/).filter(token=>token.length>4);
    if(nameTokens.some(token=>requestText.includes(token))){score+=8;reasons.push('Path terminology appears in the funding request.');}
    return {productPathId:path.id,productName:path.name,fit:score>=85?'POTENTIAL_PATH' as const:'REVIEW' as const,score,reasons,humanReviewRequired:true as const};
  }).filter(item=>item.score>0).sort((a,b)=>(b.score||0)-(a.score||0));

  const pathIds=new Set(categoryFits.map(item=>item.productPathId));
  const productMatches:FundingProductMatch[]=FUNDING_PRODUCTS
    .filter(product=>product.productPathId&&pathIds.has(product.productPathId))
    .map(product=>{
      const ranked=scoreProduct(product,intent,pathIds);
      return {
        productId:product.id,productName:product.name,providerId:product.providerId,providerName:product.providerName,
        productFamilyId:product.productFamily,productPathId:product.productPathId,fundingType:product.fundingType,
        score:ranked.score,
        matchStatus:(ranked.evaluation.outside?'OUTSIDE_KNOWN_CRITERIA':product.status==='ACTIVE_VERIFIED'?'POTENTIAL_MATCH':'REVIEW_REQUIRED') as FundingProductMatch['matchStatus'],
        reasons:ranked.reasons,qualificationCriteria:ranked.criteria?.criteria||{},qualificationGaps:ranked.evaluation.gaps,
        verificationStatus:product.provenance.verificationStatus,lastVerifiedAt:product.provenance.verifiedAt,humanReviewRequired:true as const
      };
    }).sort((a,b)=>b.score-a.score);

  const familyMap=new Map<string,FundingFamilyMatch>();
  for(const product of productMatches){
    const family=FUNDING_PRODUCT_FAMILIES.find(item=>item.id===product.productFamilyId);
    if(!family) continue;
    const existing=familyMap.get(family.id);
    const reason=`Contains canonical product match: ${product.productName}.`;
    if(existing){
      existing.score=Math.max(existing.score,product.score);
      if(!existing.productIds.includes(product.productId)) existing.productIds.push(product.productId);
      if(!existing.reasons.includes(reason)) existing.reasons.push(reason);
    } else familyMap.set(family.id,{familyId:family.id,familyName:family.publicName||family.name,score:product.score,reasons:[reason],productIds:[product.productId],status:family.status});
  }
  const productFamilyMatches=[...familyMap.values()].sort((a,b)=>b.score-a.score);

  const verifiedProvidersById=new Map(VERIFIED_FUNDING_PROVIDERS.map(item=>[item.id,item]));
  const providerCandidates:ProviderCandidate[]=[];
  for(const criteria of VERIFIED_PROVIDER_CRITERIA){
    if(!pathIds.has(criteria.productPathId)) continue;
    const provider=verifiedProvidersById.get(criteria.providerId);
    if(!provider) continue;
    const industry=String(intent.businessProfile?.industry||'').trim().toLowerCase();
    const restricted=(provider.restrictedIndustries||[]).map(value=>String(value).toLowerCase());
    if(industry && restricted.some(value=>value&&industry.includes(value))) continue;
    const geography=(provider.geography||[]).map(value=>String(value).toLowerCase());
    const state=String(intent.businessProfile?.state||intent.location||'').trim().toLowerCase();
    if(state && geography.length && !geography.some(value=>value==='us'||value==='usa'||value===state)) continue;
    const evaluation=evaluateCriteria(criteria,intent);
    if(evaluation.outside) continue;
    const product=FUNDING_PRODUCTS.find(item=>item.id===criteria.productId);
    providerCandidates.push({
      providerId:provider.id,providerName:provider.name,productId:criteria.productId,productName:criteria.productName,
      productPathId:criteria.productPathId,score:100+evaluation.reasons.length*8-evaluation.gaps.length*3+
        ((provider.industryAppetite||[]).some(value=>industry&&String(value).toLowerCase().includes(industry))?8:0),
      whyRelevant:['Provider identity is source-verified.','Product-level qualification criteria are explicitly verified.',
        ...((provider.industryAppetite||[]).some(value=>industry&&String(value).toLowerCase().includes(industry))?['Reported industry appears in provider appetite metadata.']:[]),
        ...evaluation.reasons],
      qualificationCriteria:criteria.criteria,qualificationGaps:evaluation.gaps,criteriaSource:criteria.source,lastVerifiedAt:criteria.verifiedAt,
      verificationStatus:'VERIFIED',applicationUrl:provider.applicationUrl,handoffUrl:provider.applicationUrl,humanReviewRequired:true
    });
  }
  providerCandidates.sort((a,b)=>(b.score||0)-(a.score||0));

  const baseMissing=getFundingIntentMissingFields(intent);
  const providerMissing=providerCandidates.slice(0,3).flatMap(item=>item.qualificationGaps||[]);
  const seenMissing=new Set<string>();
  const missingInformation=[...baseMissing,...providerMissing].filter(item=>{
    const key=`${item.field}:${item.reason}`; if(seenMissing.has(key)) return false; seenMissing.add(key); return true;
  });
  const documentChecklist=getFundingDocumentChecklist(intent);
  const supportResources=rankSupportResources(intent);
  const topProvider=providerCandidates.find(item=>item.handoffUrl);

  const nextAction=missingInformation.length
    ? `Provide ${missingInformation[0].field.replace(/^businessProfile\./,'')} so Capital Operator can narrow the funding path.`
    : topProvider
      ? `Human-review ${topProvider.providerName} / ${topProvider.productName||topProvider.productPathId} and prepare the funding handoff.`
      : 'Review the ranked product paths, complete the document checklist, and continue through the canonical funding intake workflow.';

  return {
    status:'BETA',
    intent,
    categoryFits,
    outcomeMatches:categoryFits,
    productFamilyMatches,
    productMatches,
    providerCandidates,
    providerDiscoveryStatus:providerCandidates.length?'VERIFIED_RESULTS':'NO_VERIFIED_PROVIDER_DATA',
    missingInformation,
    documentChecklist,
    supportResources,
    handoff:{
      destinationType:topProvider?'PROVIDER_APPLICATION':'CANONICAL_INTAKE',
      providerId:topProvider?.providerId,
      productId:topProvider?.productId,
      url:topProvider?.handoffUrl||CTAS_CONFIG.businessFunding.url,
      preservesAttribution:true
    },
    disclaimer:`Deterministic discovery (${RANKING_VERSION}) is preparation guidance, not lender approval, pricing, eligibility, or capital availability. Imported product criteria remain review-required; provider candidates require verified provider identity and verified product-level criteria.`,
    nextAction,
    humanReviewRequired:true
  };
}
