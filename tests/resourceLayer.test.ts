import { FUNDING_PRODUCT_FAMILIES, FUNDING_PRODUCTS, FUNDING_PRODUCT_PATHS } from '../src/config/fundingProducts.js';
import {
  FUNDING_PROVIDERS,
  PROVIDER_CRITERIA,
  VERIFIED_FUNDING_PROVIDERS,
  VERIFIED_PROVIDER_CRITERIA,
  findVerifiedProviderCandidates
} from '../src/config/fundingProviders.js';
import { FUNDING_RESOURCE_ASSETS, LIVE_FUNDING_RESOURCE_ASSETS, RESOURCE_ASSET_SOURCE_STATUS } from '../src/config/resourceAssets.js';
import { RESOURCE_RELATIONSHIPS } from '../src/config/resourceRelationships.js';
import { normalizeFundingIntent } from '../src/lib/fundingIntent.js';
import { getFundingDocumentChecklist, FUNDING_VERIFICATION_PATHS } from '../src/lib/fundingDocuments.js';
import { callMcpTool } from '../server/mcp/tools.js';

function assertUnique(label:string, ids:string[]) {
  if(new Set(ids).size!==ids.length) throw new Error(`${label} contains duplicate canonical IDs`);
}

export async function runResourceLayerTests() {
  if(FUNDING_PROVIDERS.length!==33) throw new Error(`Expected 33 providers, got ${FUNDING_PROVIDERS.length}`);
  if(VERIFIED_FUNDING_PROVIDERS.length!==31) throw new Error(`Expected 31 source-verified providers, got ${VERIFIED_FUNDING_PROVIDERS.length}`);
  if(FUNDING_PRODUCTS.length!==59) throw new Error(`Expected 59 provider products, got ${FUNDING_PRODUCTS.length}`);
  if(FUNDING_PRODUCT_FAMILIES.length!==7) throw new Error(`Expected 7 product families, got ${FUNDING_PRODUCT_FAMILIES.length}`);
  if(PROVIDER_CRITERIA.length!==59) throw new Error(`Expected 59 product criteria rows, got ${PROVIDER_CRITERIA.length}`);
  if(VERIFIED_PROVIDER_CRITERIA.length!==3) throw new Error(`Expected 3 explicitly verified product criteria rows, got ${VERIFIED_PROVIDER_CRITERIA.length}`);

  assertUnique('providers',FUNDING_PROVIDERS.map(x=>x.id));
  assertUnique('products',FUNDING_PRODUCTS.map(x=>x.id));
  assertUnique('families',FUNDING_PRODUCT_FAMILIES.map(x=>x.id));
  assertUnique('criteria',PROVIDER_CRITERIA.map(x=>x.id));
  assertUnique('resource assets',FUNDING_RESOURCE_ASSETS.map(x=>x.id));
  assertUnique('relationships',RESOURCE_RELATIONSHIPS.map(x=>x.id));

  const providerIds=new Set(FUNDING_PROVIDERS.map(x=>x.id));
  const familyIds=new Set(FUNDING_PRODUCT_FAMILIES.map(x=>x.id));
  const pathIds=new Set(FUNDING_PRODUCT_PATHS.map(x=>x.id));
  const productIds=new Set(FUNDING_PRODUCTS.map(x=>x.id));

  for(const product of FUNDING_PRODUCTS){
    if(!providerIds.has(product.providerId)) throw new Error(`Broken provider link for product ${product.id}`);
    if(!familyIds.has(product.productFamily)) throw new Error(`Broken family link for product ${product.id}`);
    if(product.productPathId && !pathIds.has(product.productPathId)) throw new Error(`Broken product-path link for ${product.id}`);
    if(!product.provenance.sourceRecordId || !product.provenance.importedAt) throw new Error(`Missing product provenance for ${product.id}`);
  }
  for(const provider of FUNDING_PROVIDERS){
    if(!provider.provenance.sourceRecordId || !provider.provenance.verificationStatus) throw new Error(`Missing provider provenance for ${provider.id}`);
    for(const productId of provider.productIds) if(!productIds.has(productId)) throw new Error(`Broken provider->product link ${provider.id} -> ${productId}`);
  }

  if(FUNDING_RESOURCE_ASSETS.length!==138) throw new Error(`Expected 138 canonical tool/calculator assets, got ${FUNDING_RESOURCE_ASSETS.length}`);
  if(LIVE_FUNDING_RESOURCE_ASSETS.length!==6) throw new Error(`Expected 6 verified live funding assets, got ${LIVE_FUNDING_RESOURCE_ASSETS.length}`);
  if(FUNDING_RESOURCE_ASSETS.filter(x=>x.status==='CONCEPT').length!==132) throw new Error('Concept asset count mismatch');
  if(RESOURCE_ASSET_SOURCE_STATUS.sourceToolRows!==125 || RESOURCE_ASSET_SOURCE_STATUS.sourceCalculatorRows!==138) {
    throw new Error('Source tool/calculator counts are not preserved');
  }
  if(FUNDING_VERIFICATION_PATHS.length!==3) throw new Error('Verification-path source rows are missing');

  const knownEntities=new Set([...providerIds,...productIds,...familyIds,...pathIds]);
  for(const relationship of RESOURCE_RELATIONSHIPS){
    if(!knownEntities.has(relationship.fromId) || !knownEntities.has(relationship.toId)) {
      throw new Error(`Broken resource relationship: ${relationship.id}`);
    }
  }

  const locCandidates=findVerifiedProviderCandidates(['business-line-of-credit']);
  if(!locCandidates.some(x=>x.providerId==='7-figures-funding' && x.productId==='7figs-bloc')) {
    throw new Error('Verified product/provider candidate was not exposed');
  }

  const termIntent=normalizeFundingIntent({
    objective:'I need a $250,000 term loan for business expansion.',
    requestedAmount:250000,
    fundingPurpose:'term_loan',
    vertical:'business_funding',
    businessProfile:{timeInBusinessMonths:48,annualRevenue:1800000}
  });
  const checklist=getFundingDocumentChecklist(termIntent);
  if(!checklist.items.some(item=>item.id==='business_tax_returns') || !checklist.items.some(item=>item.id==='debt_schedule')) {
    throw new Error('Term-loan document checklist was not enriched');
  }

  const mcpProviders=await callMcpTool('find_capital_providers',{productPathIds:['business-line-of-credit']});
  const providerRows=(mcpProviders.structuredContent as any)?.providers || [];
  if(!providerRows.some((x:any)=>x.providerId==='7-figures-funding')) throw new Error('MCP provider lookup is not using canonical verified data');

  const support=await callMcpTool('recommend_funding_support_tools',{limit:10});
  const assets=(support.structuredContent as any)?.resource_assets || [];
  if(!assets.length || assets.some((x:any)=>x.status!=='LIVE')) throw new Error('MCP support-tool lookup must return verified live resource assets by default');

  return {passed:true,testName:'runResourceLayerTests'};
}
