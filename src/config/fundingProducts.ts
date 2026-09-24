import type { FundingProductPath } from '../types/funding.js';

const provenance = {
  sourceRepository: 'JFeimster/funding-partners-os-dashboard',
  sourcePath: 'data/products.ts',
  sourceCommit: '683d0181711302b2656c63a2ea623d716bbca9be',
  providerSpecific: false as const,
  importedAt: '2026-09-23'
};

export const FUNDING_PRODUCT_PATHS: FundingProductPath[] = [
  { id:'working-capital', name:'Working Capital', vertical:'business_funding', purposes:['working_capital','general_business_funding'], description:'General operating liquidity for payroll, inventory, materials, and short-cycle cash needs.', documentProfile:'working_capital', provenance },
  { id:'business-line-of-credit', name:'Business Line of Credit', vertical:'business_funding', purposes:['business_line_of_credit','working_capital'], description:'Revolving liquidity path for recurring or unpredictable operating needs.', documentProfile:'working_capital', provenance },
  { id:'business-term-loan', name:'Business Term Loan', vertical:'business_funding', purposes:['term_loan','debt_refinance','working_capital'], description:'Structured amortizing business debt for defined uses of funds.', documentProfile:'term_loan', provenance },
  { id:'revenue-based-financing', name:'Revenue-Based Financing', vertical:'business_funding', purposes:['revenue_based_financing','working_capital'], description:'Revenue-oriented working-capital path for operating businesses.', documentProfile:'working_capital', provenance },
  { id:'merchant-cash-advance', name:'Merchant Cash Advance / Receivables Purchase', vertical:'business_funding', purposes:['merchant_cash_advance','working_capital'], description:'Short-duration commercial receivables purchase structure where applicable.', documentProfile:'working_capital', provenance },
  { id:'debt-refinance', name:'Business Debt Refinance', vertical:'business_funding', purposes:['debt_refinance'], description:'Capital path focused on replacing or consolidating existing business obligations.', documentProfile:'refinance', provenance },

  { id:'equipment-financing', name:'Equipment Financing', vertical:'equipment', purposes:['equipment_financing','vehicle_fleet'], description:'Asset-backed financing for equipment, machinery, vehicles, or fleet assets.', documentProfile:'equipment', provenance },
  { id:'equipment-lease', name:'Equipment Lease', vertical:'equipment', purposes:['equipment_lease','equipment_financing'], description:'Lease-oriented equipment acquisition path where ownership structure or cash preservation matters.', documentProfile:'equipment', provenance },

  { id:'sba-business-acquisition', name:'SBA Business Acquisition', vertical:'business_acquisition', purposes:['business_acquisition','acquisition_working_capital'], description:'SBA-oriented acquisition path for eligible business purchases with human lender review.', documentProfile:'sba_acquisition', provenance },
  { id:'conventional-business-acquisition', name:'Conventional Acquisition Financing', vertical:'business_acquisition', purposes:['business_acquisition'], description:'Non-SBA acquisition financing path where business cash flow and structure support conventional debt.', documentProfile:'sba_acquisition', provenance },

  { id:'dscr-real-estate', name:'DSCR Investment Property', vertical:'real_estate', purposes:['dscr_real_estate','investment_property'], description:'Investment-property financing path evaluated primarily around property cash flow and debt service.', documentProfile:'dscr_real_estate', provenance },
  { id:'commercial-mortgage', name:'Commercial Mortgage', vertical:'real_estate', purposes:['commercial_mortgage','investment_property'], description:'Commercial real-estate debt path for stabilized or owner/investor assets.', documentProfile:'commercial_real_estate', provenance },
  { id:'real-estate-bridge', name:'Real Estate Bridge', vertical:'real_estate', purposes:['bridge_real_estate','investment_property'], description:'Shorter-duration bridge path for acquisition, transition, or renovation situations.', documentProfile:'commercial_real_estate', provenance },

  { id:'invoice-factoring', name:'Invoice Factoring', vertical:'receivables', purposes:['factoring','invoice_financing','accounts_receivable_line'], description:'Receivables financing path based on eligible commercial invoices.', documentProfile:'receivables', provenance },
  { id:'accounts-receivable-line', name:'Accounts Receivable Line', vertical:'receivables', purposes:['accounts_receivable_line','invoice_financing'], description:'Revolving receivables-backed working-capital path.', documentProfile:'receivables', provenance },
  { id:'purchase-order-finance', name:'Purchase Order / Contract Finance', vertical:'receivables', purposes:['purchase_order_finance','government_contract_working_capital'], description:'Transaction-specific path for eligible purchase orders or contract execution costs.', documentProfile:'government_contract', provenance },

  { id:'government-contract-working-capital', name:'Government Contract Working Capital', vertical:'government_contract', purposes:['government_contract_working_capital','contract_mobilization','contract_payroll','contract_equipment'], description:'Working-capital path organized around an awarded or executable government contract.', documentProfile:'government_contract', provenance },

  { id:'ecommerce-working-capital', name:'eCommerce Working Capital', vertical:'ecommerce', purposes:['ecommerce_working_capital','ecommerce_inventory','ecommerce_advertising'], description:'Working capital for marketplace inventory, advertising, and operating cycles.', documentProfile:'ecommerce', provenance },

  { id:'business-credit-building', name:'Business Credit Building', vertical:'business_credit', purposes:['business_credit_building'], description:'Readiness and business-credit development path rather than a promise of immediate funding.', documentProfile:'business_credit', provenance },
  { id:'business-cards-or-loc', name:'Business Cards / Credit Lines', vertical:'business_credit', purposes:['business_cards_or_loc'], description:'Business revolving-credit path where supported by the applicant profile and issuing institution.', documentProfile:'business_credit', provenance }
];

export function findProductPaths(vertical: string, purpose: string): FundingProductPath[] {
  return FUNDING_PRODUCT_PATHS.filter(path =>
    path.vertical === vertical || path.purposes.some(item => item === purpose)
  );
}
