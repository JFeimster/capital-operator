import type { FundingDocumentChecklist, FundingIntent, FundingPurpose } from '../types/funding.js';

type ChecklistRow = [string, string, boolean, string];

const BASE: ChecklistRow[] = [
  ['business_identity', 'Business entity / ownership information', true, 'Establishes the applicant business and ownership context.'],
  ['bank_statements', 'Recent business bank statements', true, 'Supports cash-flow and deposit review.'],
  ['government_id', 'Owner government-issued identification', true, 'Common identity-verification requirement.']
];

export const FUNDING_VERIFICATION_PATHS = [
  {id:'plaid-verification',name:'Plaid Verification (Same-Day Funding)',criteria:'Monthly revenue $3,000-$15,000 and 3+ months in business; also used above $15,000 when banking is in a personal name.',requiredItems:['Plaid Connected'],workflowNote:'Connected-bank verification path from the source registry; human review remains required.',provenance:'Registries.zip#intake-verification-paths.registry.json'},
  {id:'document-upload',name:'Document Upload',criteria:'Monthly revenue above $15,000, 3+ months in business, and business banking.',requiredItems:['Bank Statements Uploaded (3 months)','Drivers License Uploaded','Voided Check Uploaded','Application Signed'],workflowNote:'Document-received state is complete only after all required items are present.',provenance:'Registries.zip#intake-verification-paths.registry.json'},
  {id:'does-not-qualify',name:'Does Not Qualify',criteria:'Monthly revenue below $3,000 or time in business below 3 months.',requiredItems:[],workflowNote:'Historical source rule only; Capital Operator does not convert this into a universal lender decline rule.',provenance:'Registries.zip#intake-verification-paths.registry.json'}
] as const;

const PROFILES: Partial<Record<FundingPurpose, ChecklistRow[]>> = {
  working_capital:[['interim_financials','Current-year P&L and balance sheet',false,'Adds operating context beyond bank activity.']],
  business_line_of_credit:[['interim_financials','Current-year P&L and balance sheet',false,'Supports recurring liquidity review.'],['debt_schedule','Current business debt schedule',false,'Shows existing recurring obligations.']],
  term_loan:[['business_tax_returns','Recent business tax returns',true,'Supports historical cash-flow review.'],['interim_financials','Current-year P&L and balance sheet',true,'Shows current operating performance.'],['debt_schedule','Current business debt schedule',true,'Shows existing obligations and debt service.']],
  revenue_based_financing:[['processing_statements','Merchant processing statements when revenue is card-driven',false,'Can supplement bank deposits for revenue verification.']],
  merchant_cash_advance:[['processing_statements','Merchant processing statements when applicable',false,'Supports receivables-volume review.']],
  startup_capital:[['formation_documents','Business formation documents / EIN confirmation',true,'Establishes the new business entity.'],['business_plan','Business plan and use-of-funds budget',false,'Supports preparation for a newer business without mature revenue history.']],
  purchase_order_finance:[['purchase_order','Customer purchase order / executable contract',true,'Establishes the transaction being financed.'],['supplier_quote','Supplier quote / production cost schedule',true,'Shows fulfillment cost and capital need.'],['customer_details','Customer / account-debtor information',true,'Supports transaction and payment-source review.']],
  contract_payroll:[['contract_award','Award notice / executed contract',true,'Establishes the executable contract.'],['payroll_schedule','Payroll schedule and labor budget',true,'Shows the payroll funding requirement.']],
  contract_equipment:[['contract_award','Award notice / executed contract',true,'Connects equipment needs to the contract.'],['equipment_quote','Equipment invoice, quote, or purchase order',true,'Defines the required asset and cost.']],
  bridge_real_estate:[['property_contract','Purchase contract or payoff statement',true,'Documents transaction basis.'],['scope_budget','Renovation / repositioning scope and budget',false,'Supports bridge use-of-funds review.'],['exit_plan','Refinance, sale, or stabilization exit plan',true,'Explains the expected repayment path.']],
  ecommerce_advertising:[['platform_statements','Marketplace / store sales history',true,'Supports channel revenue and payout review.'],['ad_account_history','Recent advertising spend and performance history',false,'Connects requested capital to advertising use.']],
  business_credit_building:[['formation_documents','Business formation documents / EIN confirmation',true,'Establishes the business identity used for credit-building work.'],['business_credit_profiles','Existing business bureau profiles when available',false,'Shows current reporting and gaps without implying approval.']],
  business_cards_or_loc:[['formation_documents','Business formation documents / EIN confirmation',true,'Establishes the applicant business.'],['interim_financials','Current business financials when requested',false,'May support issuer review depending on product and profile.']],
  business_acquisition: [
    ['purchase_agreement', 'Letter of intent or purchase agreement', true, 'Documents the proposed acquisition and economics.'],
    ['seller_financials', 'Seller business tax returns and financial statements', true, 'Supports historical cash-flow review.'],
    ['interim_financials', 'Current-year P&L and balance sheet', true, 'Shows current operating performance.'],
    ['buyer_resume', 'Buyer resume / management experience', true, 'Supports operator and transition review.'],
    ['sources_uses', 'Sources-and-uses / equity contribution schedule', true, 'Shows purchase structure and buyer equity.']
  ],
  equipment_financing: [
    ['equipment_quote', 'Equipment invoice, quote, or purchase order', true, 'Defines the asset, cost, and vendor.'],
    ['equipment_details', 'Equipment year / make / model / serial details when available', false, 'Supports asset-specific review.']
  ],
  equipment_lease: [
    ['equipment_quote', 'Equipment invoice, quote, or purchase order', true, 'Defines the asset, cost, and vendor.']
  ],
  vehicle_fleet: [
    ['vehicle_quote', 'Vehicle / fleet purchase quote', true, 'Defines units and acquisition cost.']
  ],
  factoring: [
    ['ar_aging', 'Accounts receivable aging report', true, 'Shows receivable balances and aging.'],
    ['sample_invoices', 'Sample invoices and proof of performance/delivery', true, 'Supports invoice eligibility review.'],
    ['customer_list', 'Customer / account-debtor list', true, 'Supports debtor concentration review.']
  ],
  invoice_financing: [
    ['ar_aging', 'Accounts receivable aging report', true, 'Shows receivable balances and aging.'],
    ['sample_invoices', 'Sample invoices', true, 'Supports invoice eligibility review.']
  ],
  accounts_receivable_line: [
    ['ar_aging', 'Accounts receivable aging report', true, 'Supports borrowing-base style review.']
  ],
  government_contract_working_capital: [
    ['contract_award', 'Award notice / executed contract / purchase order', true, 'Establishes the contract basis for the request.'],
    ['contract_schedule', 'Contract value, start date, milestones, and payment terms', true, 'Supports mobilization and cash-cycle planning.'],
    ['execution_budget', 'Execution budget for labor, materials, equipment, and overhead', true, 'Shows use of funds.']
  ],
  contract_mobilization: [
    ['contract_award', 'Award notice / executed contract', true, 'Establishes the executable contract.'],
    ['execution_budget', 'Mobilization budget', true, 'Shows initial execution requirements.']
  ],
  dscr_real_estate: [
    ['lease_or_rent', 'Current lease or market-rent support', true, 'Supports property income assumptions.'],
    ['property_statement', 'Property operating statement / T-12 where applicable', true, 'Supports NOI calculation.'],
    ['property_contract', 'Purchase contract or payoff statement', true, 'Documents transaction basis.']
  ],
  commercial_mortgage: [
    ['rent_roll', 'Rent roll', true, 'Supports recurring property revenue.'],
    ['t12', 'Trailing-12 operating statement', true, 'Supports NOI and DSCR review.'],
    ['property_contract', 'Purchase contract / current debt statement', true, 'Documents transaction basis.']
  ],
  ecommerce_working_capital: [
    ['platform_statements', 'Marketplace / store sales history', true, 'Supports channel revenue and payout review.'],
    ['inventory_plan', 'Inventory or advertising use-of-funds plan', false, 'Supports planned deployment of capital.']
  ],
  ecommerce_inventory: [
    ['platform_statements', 'Marketplace / store sales history', true, 'Supports channel revenue review.'],
    ['inventory_po', 'Inventory purchase orders / supplier quotes', true, 'Documents inventory use of funds.']
  ],
  debt_refinance: [
    ['debt_schedule', 'Current business debt schedule', true, 'Identifies obligations to be refinanced.'],
    ['payoff_statements', 'Current payoff statements when available', true, 'Documents balances and payoff economics.']
  ]
};

export function getFundingDocumentChecklist(intent: FundingIntent): FundingDocumentChecklist {
  const specific = PROFILES[intent.fundingPurpose] || [];
  const rows = [...BASE, ...specific];
  const seen = new Set<string>();
  const items = rows
    .filter(row => {
      if (seen.has(row[0])) return false;
      seen.add(row[0]);
      return true;
    })
    .map(([id, label, required, rationale]) => ({ id, label, required, rationale }));

  return {
    status: 'LIVE',
    intentId: intent.id,
    vertical: intent.vertical,
    fundingPurpose: intent.fundingPurpose,
    sourceType: specific.length > 0 ? 'CANONICAL_PRODUCT_PREPARATION' : 'GENERIC_PREPARATION_GUIDANCE',
    items,
    disclaimer: 'Preparation checklist only. A verified capital provider may require additional or different documentation.'
  };
}
