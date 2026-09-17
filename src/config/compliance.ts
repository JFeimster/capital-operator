/**
 * Capital Operator — Compliance & Regulatory Guardrails
 * src/config/compliance.ts
 */

export const COMPLIANCE_CONFIG = {
  version: '2.4.0',
  jurisdiction: 'United States',
  commercialLendingOnly: true,
  disclaimers: {
    general: 'Capital Operator is an operational diagnostics software tool for financial advisors, brokers, and operators. Diagnostic findings and blueprints do not constitute a credit decision, term sheet, loan commitment, or legal advice.',
    affiliateDisclosure: 'Certain tools, platforms, or services referenced in this blueprint may provide referral attribution, partner commissions, or ecosystem benefits to Moonshine Capital at no extra cost to you.',
    underwritingDisclaimer: 'All lending approvals, interest rates, loan terms, and stipulations are determined solely by participating funding partners and independent institutional lenders.'
  },
  prohibitedTerms: [
    'guaranteed loan',
    'instant cash',
    '100% approval',
    'no credit check required',
    'risk-free capital'
  ],
  requiredDisclosures: [
    'For commercial borrowing purposes only.',
    'Subject to final lender due diligence and underwriting verification.'
  ]
};
