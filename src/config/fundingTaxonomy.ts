import type { FundingPurpose, FundingVertical } from '../types/funding.js';

export interface FundingTaxonomyEntry {
  vertical: FundingVertical;
  purpose: FundingPurpose;
  label: string;
  keywords: string[];
}

export const FUNDING_TAXONOMY: FundingTaxonomyEntry[] = [
  { vertical:'equipment', purpose:'vehicle_fleet', label:'Vehicle / Fleet Financing', keywords:['vehicle','truck','fleet','trailer','van'] },
  { vertical:'equipment', purpose:'equipment_lease', label:'Equipment Lease', keywords:['equipment lease','lease equipment'] },
  { vertical:'equipment', purpose:'equipment_financing', label:'Equipment Financing', keywords:['equipment','machinery','machine','yellow iron'] },

  { vertical:'business_acquisition', purpose:'acquisition_working_capital', label:'Acquisition Working Capital', keywords:['acquisition working capital'] },
  { vertical:'business_acquisition', purpose:'business_acquisition', label:'Business Acquisition Financing', keywords:['buy a business','buy business','acquire a business','business acquisition','sba acquisition','acquisition financing'] },

  { vertical:'real_estate', purpose:'dscr_real_estate', label:'DSCR Real Estate Financing', keywords:['dscr','rental property','investment rental'] },
  { vertical:'real_estate', purpose:'commercial_mortgage', label:'Commercial Mortgage', keywords:['commercial real estate','commercial mortgage','cre loan'] },
  { vertical:'real_estate', purpose:'bridge_real_estate', label:'Real Estate Bridge Financing', keywords:['bridge loan','fix and flip','fix-and-flip','bridge real estate'] },
  { vertical:'real_estate', purpose:'investment_property', label:'Investment Property Financing', keywords:['investment property','rental portfolio'] },

  { vertical:'receivables', purpose:'factoring', label:'Invoice Factoring', keywords:['factoring','factor invoices'] },
  { vertical:'receivables', purpose:'invoice_financing', label:'Invoice Financing', keywords:['invoice financing','finance invoices'] },
  { vertical:'receivables', purpose:'accounts_receivable_line', label:'Accounts Receivable Line', keywords:['accounts receivable','receivables','a/r'] },
  { vertical:'receivables', purpose:'purchase_order_finance', label:'Purchase Order Finance', keywords:['purchase order','po financing','purchase-order'] },

  { vertical:'government_contract', purpose:'government_contract_working_capital', label:'Government Contract Working Capital', keywords:['government contract','govcon','federal contract','awarded contract'] },
  { vertical:'government_contract', purpose:'contract_mobilization', label:'Contract Mobilization', keywords:['mobilization','mobilize contract'] },
  { vertical:'government_contract', purpose:'contract_payroll', label:'Contract Hiring / Payroll', keywords:['contract payroll','hire for contract','hiring for contract'] },
  { vertical:'government_contract', purpose:'contract_equipment', label:'Contract Equipment', keywords:['equipment for contract','contract equipment'] },

  { vertical:'ecommerce', purpose:'ecommerce_working_capital', label:'eCommerce Working Capital', keywords:['ecommerce working capital','e-commerce working capital','amazon working capital','shopify working capital'] },
  { vertical:'ecommerce', purpose:'ecommerce_inventory', label:'eCommerce Inventory Funding', keywords:['amazon inventory','shopify inventory','walmart inventory','ecommerce inventory','e-commerce inventory'] },
  { vertical:'ecommerce', purpose:'ecommerce_advertising', label:'eCommerce Advertising Capital', keywords:['amazon ads','shopify ads','advertising capital','ad spend'] },

  { vertical:'business_credit', purpose:'business_credit_building', label:'Business Credit Building', keywords:['build business credit','business credit building'] },
  { vertical:'business_credit', purpose:'business_cards_or_loc', label:'Business Cards / Credit Lines', keywords:['business credit card','business cards','credit line'] },

  { vertical:'business_funding', purpose:'debt_refinance', label:'Debt Refinance / Consolidation', keywords:['refinance debt','debt refinance','consolidate debt','debt consolidation'] },
  { vertical:'business_funding', purpose:'business_line_of_credit', label:'Business Line of Credit', keywords:['line of credit','business loc','revolving line'] },
  { vertical:'business_funding', purpose:'term_loan', label:'Business Term Loan', keywords:['term loan','business loan'] },
  { vertical:'business_funding', purpose:'revenue_based_financing', label:'Revenue-Based Financing', keywords:['revenue based','revenue-based'] },
  { vertical:'business_funding', purpose:'merchant_cash_advance', label:'Merchant Cash Advance', keywords:['merchant cash advance','mca'] },
  { vertical:'business_funding', purpose:'startup_capital', label:'Startup Capital', keywords:['startup capital','startup funding','new business funding'] },
  { vertical:'business_funding', purpose:'working_capital', label:'Working Capital', keywords:['working capital','payroll','cash flow gap','cashflow gap'] },
  { vertical:'business_funding', purpose:'general_business_funding', label:'General Business Funding', keywords:['funding','capital','finance','financing','money'] }
];

export function taxonomyEntryFor(purpose: FundingPurpose): FundingTaxonomyEntry | undefined {
  return FUNDING_TAXONOMY.find(entry => entry.purpose === purpose);
}

export function defaultPurposeForVertical(vertical: FundingVertical): FundingPurpose {
  const defaults: Record<FundingVertical, FundingPurpose> = {
    business_funding: 'general_business_funding',
    equipment: 'equipment_financing',
    business_acquisition: 'business_acquisition',
    real_estate: 'investment_property',
    receivables: 'accounts_receivable_line',
    government_contract: 'government_contract_working_capital',
    ecommerce: 'ecommerce_working_capital',
    business_credit: 'business_credit_building'
  };
  return defaults[vertical];
}
