import type { FundingIntentInput, FundingPurpose, FundingVertical } from '../types/funding.js';

export interface FundingDiscoveryPreset {
  id: string;
  slug: string;
  label: string;
  vertical: FundingVertical;
  fundingPurpose: FundingPurpose;
  objective: string;
  description: string;
  contextFields: string[];
}

export const FUNDING_DISCOVERY_PRESETS: FundingDiscoveryPreset[] = [
  {id:'working-capital',slug:'working-capital',label:'Working Capital',vertical:'business_funding',fundingPurpose:'working_capital',objective:'I need working capital for my business.',description:'Operating liquidity for payroll, inventory, materials, and cash-flow timing.',contextFields:['businessProfile.avgMonthlyDeposits','businessProfile.timeInBusinessMonths','businessProfile.creditScore']},
  {id:'business-line-of-credit',slug:'line-of-credit',label:'Business Line of Credit',vertical:'business_funding',fundingPurpose:'business_line_of_credit',objective:'I need a business line of credit.',description:'Revolving capital for recurring or unpredictable operating needs.',contextFields:['businessProfile.avgMonthlyDeposits','businessProfile.timeInBusinessMonths','businessProfile.creditScore']},
  {id:'equipment-financing',slug:'equipment',label:'Equipment Financing',vertical:'equipment',fundingPurpose:'equipment_financing',objective:'I need financing to buy equipment.',description:'Equipment, machinery, vehicles, and fleet assets.',contextFields:['assetContext.equipmentType','assetContext.equipmentCost','assetContext.vendor']},
  {id:'business-acquisition',slug:'business-acquisition',label:'Business Acquisition / SBA',vertical:'business_acquisition',fundingPurpose:'business_acquisition',objective:'I want to buy a business with acquisition financing.',description:'SBA-oriented and conventional acquisition capital paths.',contextFields:['acquisitionContext.purchasePrice','acquisitionContext.sellerDiscretionaryEarnings','acquisitionContext.equityAvailable']},
  {id:'commercial-real-estate',slug:'commercial-real-estate',label:'Commercial Real Estate / DSCR',vertical:'real_estate',fundingPurpose:'commercial_mortgage',objective:'I need commercial real estate financing.',description:'Commercial mortgages, DSCR, and bridge-oriented property financing.',contextFields:['realEstateContext.propertyValue','realEstateContext.purchasePrice','realEstateContext.annualNetOperatingIncome','realEstateContext.annualDebtService']},
  {id:'factoring',slug:'factoring',label:'Factoring / Receivables',vertical:'receivables',fundingPurpose:'factoring',objective:'I need invoice factoring or receivables financing.',description:'Funding against eligible commercial receivables.',contextFields:['receivableContext.outstandingReceivables','receivableContext.invoiceType','receivableContext.averageDaysToPay']},
  {id:'government-contract',slug:'government-contract',label:'Government Contract',vertical:'government_contract',fundingPurpose:'government_contract_working_capital',objective:'I need working capital for a government contract.',description:'Mobilization, payroll, materials, and equipment tied to government-contract execution.',contextFields:['contractContext.status','contractContext.contractAmount','contractContext.expectedStartDate']},
  {id:'ecommerce',slug:'ecommerce',label:'eCommerce Working Capital',vertical:'ecommerce',fundingPurpose:'ecommerce_working_capital',objective:'I need ecommerce working capital for inventory or advertising.',description:'Marketplace and e-commerce inventory, advertising, and operating-cycle capital.',contextFields:['businessProfile.avgMonthlyDeposits','businessProfile.timeInBusinessMonths']},
  {id:'startup',slug:'startup',label:'Startup Capital',vertical:'business_funding',fundingPurpose:'startup_capital',objective:'I need startup funding for a new business.',description:'Preparation and credit-leverage paths for newer businesses.',contextFields:['businessProfile.creditScore','businessProfile.timeInBusinessMonths']},
  {id:'business-credit',slug:'business-credit',label:'Business Credit',vertical:'business_credit',fundingPurpose:'business_credit_building',objective:'I want to build business credit and access revolving capital.',description:'Business-credit readiness, cards, and credit-line preparation.',contextFields:['businessProfile.creditScore','businessProfile.timeInBusinessMonths']},
  {id:'debt-refinance',slug:'debt-refinance',label:'Debt Refinance',vertical:'business_funding',fundingPurpose:'debt_refinance',objective:'I need to refinance or consolidate business debt.',description:'Replace or consolidate existing business obligations.',contextFields:['currentDebtContext.refinanceAmount','currentDebtContext.currentMonthlyDebtService']}
];

export function getFundingPreset(slug?: string): FundingDiscoveryPreset | undefined {
  if(!slug) return undefined;
  return FUNDING_DISCOVERY_PRESETS.find(item=>item.slug===slug || item.id===slug);
}

export function applyFundingPreset(input: FundingIntentInput, slug?: string): FundingIntentInput {
  const preset=getFundingPreset(slug);
  if(!preset) return input;
  return {
    ...input,
    objective: input.objective || preset.objective,
    vertical: input.vertical || preset.vertical,
    fundingPurpose: input.fundingPurpose || preset.fundingPurpose
  };
}
