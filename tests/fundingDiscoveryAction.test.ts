import fs from 'node:fs';
import path from 'node:path';
import { normalizeFundingIntent } from '../src/lib/fundingIntent.js';
import { findFundingOptions } from '../src/lib/fundingOptions.js';
import { checkFundingReadiness } from '../src/lib/fundingReadiness.js';
import { getFundingDocumentChecklist } from '../src/lib/fundingDocuments.js';
import { FUNDING_DISCOVERY_PRESETS, applyFundingPreset } from '../src/config/fundingPresets.js';
import { callMcpTool } from '../server/mcp/tools.js';
import providersHandler from '../api/v1/providers.js';
import productsHandler from '../api/v1/products.js';

class MockResponse {
  statusCode=200;
  headers:Record<string,string>={};
  data:any=null;
  status(code:number){this.statusCode=code;return this;}
  setHeader(name:string,value:string){this.headers[name]=value;return this;}
  json(body:any){this.data=body;return this;}
  end(){return this;}
}

export async function runFundingDiscoveryActionTests() {
  if(FUNDING_DISCOVERY_PRESETS.length<10) throw new Error('Funding discovery presets are incomplete');
  const preset=applyFundingPreset({requestedAmount:300000},'equipment');
  if(preset.vertical!=='equipment'||preset.fundingPurpose!=='equipment_financing') throw new Error('Equipment preset failed');

  const multi=normalizeFundingIntent({
    objective:'I need $300,000 for equipment and working capital.',
    requestedAmount:400000,
    businessProfile:{timeInBusinessMonths:48,annualRevenue:2400000,avgMonthlyDeposits:200000,creditScore:720,industry:'construction',state:'VA'},
    assetContext:{equipmentType:'excavator',equipmentCost:300000},
    collateralAvailable:true
  });
  const multiOptions=findFundingOptions(multi);
  const pathIds=new Set(multiOptions.categoryFits.map(item=>item.productPathId));
  if(!pathIds.has('equipment-financing')||!pathIds.has('working-capital')) throw new Error('Multi-need request must surface equipment and working-capital paths');
  if(!multiOptions.productMatches.length) throw new Error('Discovery must return canonical product matches');
  if(!multiOptions.documentChecklist.items.some(item=>item.id==='equipment_quote')) throw new Error('Discovery must include relevant document checklist');
  if(multiOptions.supportResources.some(item=>item.status!=='LIVE')) throw new Error('Discovery must never promote concept resources as live');

  const loc=normalizeFundingIntent({
    objective:'I need a $100,000 business line of credit.',
    requestedAmount:100000,
    businessProfile:{timeInBusinessMonths:36,annualRevenue:1200000,avgMonthlyDeposits:100000,creditScore:700,state:'VA'}
  });
  const locOptions=findFundingOptions(loc);
  if(!locOptions.categoryFits.some(item=>item.productPathId==='business-line-of-credit')) throw new Error('LOC path missing');
  if(!locOptions.providerCandidates.some(item=>item.providerId==='7-figures-funding')) throw new Error('Verified LOC provider candidate should be surfaced when criteria are satisfied');
  if(!locOptions.providerCandidates.every(item=>item.verificationStatus==='VERIFIED')) throw new Error('Provider candidates must remain verification-gated');

  const weakLoc=findFundingOptions(normalizeFundingIntent({
    objective:'I need a $100,000 business line of credit.',
    requestedAmount:100000,
    businessProfile:{timeInBusinessMonths:3,avgMonthlyDeposits:2000,creditScore:500}
  }));
  if(weakLoc.providerCandidates.some(item=>item.providerId==='7-figures-funding')) throw new Error('Known qualification mismatch must filter verified provider candidate');

  const acquisition=normalizeFundingIntent({
    objective:'I want to buy a business with SBA financing.',
    requestedAmount:750000,
    businessProfile:{timeInBusinessMonths:60,annualRevenue:1500000},
    acquisitionContext:{purchasePrice:900000,equityAvailable:150000,sellerDiscretionaryEarnings:300000}
  });
  const acquisitionDocs=getFundingDocumentChecklist(acquisition);
  if(!acquisitionDocs.items.some(item=>item.id==='purchase_agreement')) throw new Error('Acquisition checklist must include purchase agreement');

  const readiness=checkFundingReadiness(loc);
  if(!readiness.nextActions.length||readiness.humanReviewRequired!==true) throw new Error('Readiness must return practical next actions');

  const mcpOptions=await callMcpTool('find_funding_options',{
    objective:'I need working capital for an awarded government contract.',
    requestedAmount:250000,
    businessProfile:{timeInBusinessMonths:36,avgMonthlyDeposits:90000,creditScore:680},
    contractContext:{status:'awarded',contractAmount:1000000}
  });
  const mcpPayload:any=mcpOptions.structuredContent;
  if(!mcpPayload?.productMatches?.length||!mcpPayload?.documentChecklist?.items?.length||!mcpPayload?.nextAction) throw new Error('MCP funding options output is not action-oriented');

  const mcpProviders=await callMcpTool('find_capital_providers',{
    objective:'I need a $100,000 line of credit.',
    requestedAmount:100000,
    businessProfile:{timeInBusinessMonths:36,avgMonthlyDeposits:100000,creditScore:700}
  });
  if(!(mcpProviders.structuredContent as any)?.providers?.some((item:any)=>item.providerId==='7-figures-funding')) throw new Error('MCP provider discovery must accept funding context');

  const providerRes=new MockResponse();
  await providersHandler({method:'GET',headers:{},query:{q:'7 Figures'}},providerRes);
  if(providerRes.statusCode!==200||!providerRes.data?.providers?.some((item:any)=>item.id==='7-figures-funding')) throw new Error('Provider API search filter failed: '+JSON.stringify({statusCode:providerRes.statusCode,count:providerRes.data?.count,filters:providerRes.data?.filters,ids:providerRes.data?.providers?.map((item:any)=>item.id)}));

  const productRes=new MockResponse();
  await productsHandler({method:'GET',headers:{},query:{verification:'VERIFIED'}},productRes);
  if(productRes.statusCode!==200||productRes.data?.filtered_provider_product_count!==3) throw new Error('Product API verification filter failed');

  const page=fs.readFileSync(path.resolve('src/pages/GetFunded.tsx'),'utf8');
  const router=fs.readFileSync(path.resolve('src/lib/router.tsx'),'utf8');
  if(!page.includes('FUNDING DISCOVERY // ACTION LAYER')||!router.includes("case 'get-funded'")) throw new Error('Public Get Funded route is not wired');

  return {passed:true,testName:'runFundingDiscoveryActionTests'};
}
