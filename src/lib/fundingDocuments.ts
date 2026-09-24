import type { FundingDocumentChecklist, FundingIntent, FundingPurpose } from '../types/funding.js';

type ChecklistRow = [string, string, boolean, string];

const BASE: ChecklistRow[] = [
  ['business_identity', 'Business entity / ownership information', true, 'Establishes the applicant business and ownership context.'],
  ['bank_statements', 'Recent business bank statements', true, 'Supports cash-flow and deposit review.'],
  ['government_id', 'Owner government-issued identification', true, 'Common identity-verification requirement.']
];

const PROFILES: Partial<Record<FundingPurpose, ChecklistRow[]>> = {
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
