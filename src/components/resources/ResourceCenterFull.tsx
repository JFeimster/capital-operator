/**
 * Capital Operator — Comprehensive Resource Center & Interactive Calculators
 * src/components/resources/ResourceCenterFull.tsx
 */

import React, { useState } from 'react';
import {
  FileText,
  Calculator,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Layers,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Percent,
  DollarSign
} from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  category: 'Templates' | 'Underwriting' | 'Calculators' | 'Syndication' | 'Compliance';
  description: string;
  format: string;
  tag: string;
  contentMarkdown: string;
}

const EXTENDED_RESOURCES: ResourceItem[] = [
  {
    id: 'commercial-intake-checklist',
    title: 'Standardized Commercial Debt Intake Checklist',
    category: 'Templates',
    description: '1-page borrower document intake protocol that prevents 90% of back-and-forth document chasing.',
    format: 'Markdown / PDF',
    tag: 'Foundational',
    contentMarkdown: `# Commercial Debt Intake Checklist (1-Page Fast-Track)

## Required Core Financial Package
1. **Last 6 Months Complete Business Bank Statements** (All operational accounts, PDF only with electronic transaction pages).
2. **Year-to-Date (YTD) Profit & Loss Statement + Balance Sheet** (Within 60 days of current month, accrual or cash basis).
3. **Prior 2 Years Business Federal Tax Returns** (Including all schedules and Form 1120/1065 K-1s).
4. **Prior 2 Years Personal Tax Returns** (All 20%+ equity owners with Form 1040 Schedule C/E).
5. **Debt Schedule (Form 108 / Schedule of Indebtedness)** (List all active MCAs, SBA loans, equipment leases, UCC liens, and monthly payments).
6. **Government Photo ID & Voided Check** (Driver's license or passport for all signers + operating account voided check).

## Trigger-Specific Add-Ons
- If Requesting Real Estate / SBA 504: Current rent roll, commercial lease agreements, and purchase agreement.
- If Requesting Accounts Receivable / ABL: Accounts Receivable Aging Report (summarized & detailed by 30/60/90 days).
- If Requesting Equipment Financing: Equipment vendor invoice / formal purchase quotation.`
  },
  {
    id: 'credit-memo-framework',
    title: 'Institutional Credit Memorandum Specification',
    category: 'Underwriting',
    description: 'The exact 2-page executive format debt funds and bank credit committees look for before issuing term sheets.',
    format: 'Credit Specification',
    tag: 'Executive',
    contentMarkdown: `# Institutional Credit Memorandum Framework

## 1. Executive Transaction Summary
- **Borrower Name & Legal Entity**: [Entity Name, LLC/Corp] | State of Inc: [State] | EIN: [XX-XXXXXXX]
- **Target Facility**: [Asset-Based Revolver / Term Debt / SBA 7a]
- **Requested Amount**: $[Amount, e.g. $750,000] | Target Use of Funds: [Inventory / Refinancing / Working Capital]
- **Collateral Base**: [1st Lien All Business Assets / AR Aging $1.2M / Unencumbered Equipment $400k]

## 2. Company Overview & Business Model
- **Business Description**: 3-sentence summary of customer base, margin profile, and core unit economics.
- **Ownership & Management**: Breakdown of equity holders >20% and operator track record.
- **Historical Performance**:
  - Year N-2: Revenue: $[X.X]M | EBITDA: $[XX]k
  - Year N-1: Revenue: $[X.X]M | EBITDA: $[XX]k
  - YTD Annualized: Revenue: $[X.X]M | EBITDA: $[XX]k

## 3. Financial Analysis & Repayment Capacity
- **Global Debt Service Coverage Ratio (DSCR)**: [1.38x] (Calculated on normalized EBITDA less unfinanced capex).
- **Monthly Cash Flow Regularity**: Average monthly bank deposits of $[XXX,000] across [YY] transactions.
- **Existing Debt Structure**: Refinancing 2 high-rate MCA positions to reduce monthly debt service by $[X,XXX]/mo.

## 4. Mitigants & Recommendation
- **Identified Risk**: Customer concentration (top client is 28% of revenue).
- **Key Mitigant**: 7-year continuous MSA with automated ACH invoicing and 0 bad-debt write-offs in 36 months.
- **Desk Recommendation**: APPROVE for $[XXX,000] with quarterly covenant monitoring.`
  },
  {
    id: 'lender-buy-box-template',
    title: '50+ Lender Buy-Box Mapping Matrix',
    category: 'Syndication',
    description: 'Data structure for cataloging non-bank credit funds, SBA desks, and specialty finance lenders.',
    format: 'JSON / Spreadsheet Schema',
    tag: 'Syndication',
    contentMarkdown: `# Multi-Lender Buy-Box Matrix Schema

Field definitions for syndication routing tables:

\`\`\`json
{
  "lender_id": "fund_atlas_credit",
  "program_name": "Senior Secured Cash-Flow Term Facility",
  "min_revenue_annual": 1500000,
  "min_time_in_business_months": 24,
  "min_fico_principal": 650,
  "min_dscr": 1.20,
  "max_ltv_ar": 0.85,
  "prohibited_industries": ["Gambling", "Adult", "Cannabis", "Speculative Real Estate"],
  "allowed_positions": ["1st Lien", "2nd Lien behind Senior Bank"],
  "max_facility_size": 2500000,
  "turnaround_sla_hours": 24,
  "syndicate_commission_split_bps": 200
}
\`\`\``
  },
  {
    id: 'refinance-retention-playbook',
    title: 'Borrower Retention & Renewal SOP',
    category: 'Templates',
    description: 'Automated 90-day post-funding check-in sequence to capture refinancing and follow-on facilities.',
    format: 'Workflow SOP',
    tag: 'Retention',
    contentMarkdown: `# Post-Closing Borrower Retention Protocol

## Day 1 - Funding Verification & Welcome
- Confirm wire receipt with borrower CFO / principal.
- Provide portal link for amortization schedule and lien release conditions.

## Day 30 - Operational Health Touchpoint
- Automated check-in: Verify deployment of working capital.
- Update CRM with first monthly performance milestone.

## Day 90 - Financial Performance Refresh
- Request updated 90-day P&L and bank statements.
- Benchmark actual revenue against underwriting forecast.

## Day 150 - Rate Reduction / Upsize Pre-Screen
- If DSCR improved >0.2x: Offer facility upsize or interest rate reduction term sheet before competing brokers intercept.`
  }
];

export const ResourceCenterFull: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeModalResource, setActiveModalResource] = useState<ResourceItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive DSCR Calculator State
  const [monthlyNOI, setMonthlyNOI] = useState<number>(35000);
  const [monthlyDebtService, setMonthlyDebtService] = useState<number>(22000);

  // Interactive APR / Factor Rate Calculator State
  const [advanceAmount, setAdvanceAmount] = useState<number>(100000);
  const [paybackAmount, setPaybackAmount] = useState<number>(122000);
  const [termMonths, setTermMonths] = useState<number>(12);

  // Calculations
  const calculatedDSCR = monthlyDebtService > 0 ? (monthlyNOI / monthlyDebtService).toFixed(2) : 'N/A';
  const dscrNumber = Number(calculatedDSCR);
  const isHealthyDSCR = dscrNumber >= 1.25;
  const isBorderlineDSCR = dscrNumber >= 1.0 && dscrNumber < 1.25;

  const factorRate = (paybackAmount / advanceAmount).toFixed(3);
  const totalCost = paybackAmount - advanceAmount;
  const monthlyPayment = (paybackAmount / termMonths).toFixed(0);
  const estimatedAPR = (((paybackAmount - advanceAmount) / advanceAmount) * (12 / termMonths) * 100).toFixed(1);

  const categories = ['All', 'Calculators', 'Templates', 'Underwriting', 'Syndication'];

  const filteredResources = EXTENDED_RESOURCES.filter(
    (res) => activeCategory === 'All' || res.category.toLowerCase() === activeCategory.toLowerCase()
  );

  const handleCopyMarkdown = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* INTERACTIVE CALCULATORS SECTION */}
      {(activeCategory === 'All' || activeCategory === 'Calculators') && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Calculator className="h-5 w-5 text-emerald-400" />
            <h3>Interactive Underwriting & Term Sheet Calculators</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calculator 1: DSCR & Debt Coverage */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 card-glow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                    DEBT CAPACITY MODEL
                  </span>
                  <span className="font-mono text-xs text-slate-400">Institutional DSCR</span>
                </div>

                <h4 className="text-base font-bold text-white mb-2">Commercial Debt Service Coverage (DSCR)</h4>
                <p className="text-xs text-slate-400 mb-6">
                  Calculates whether borrower net operating income adequately services proposed annual debt burden.
                </p>

                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-slate-300 mb-1">Monthly Net Operating Income ($ / mo)</label>
                    <input
                      type="number"
                      value={monthlyNOI}
                      onChange={(e) => setMonthlyNOI(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Total Monthly Debt Service ($ / mo)</label>
                    <input
                      type="number"
                      value={monthlyDebtService}
                      onChange={(e) => setMonthlyDebtService(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Computed DSCR</span>
                  <span
                    className={`text-2xl font-black font-mono ${
                      isHealthyDSCR ? 'text-emerald-400' : isBorderlineDSCR ? 'text-amber-400' : 'text-red-400'
                    }`}
                  >
                    {calculatedDSCR}x
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-slate-400 block">Credit Health</span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded font-mono ${
                      isHealthyDSCR
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : isBorderlineDSCR
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {isHealthyDSCR ? 'PRIME APPROVAL READY' : isBorderlineDSCR ? 'TIGHT COVERAGE' : 'HIGH RISK'}
                  </span>
                </div>
              </div>
            </div>

            {/* Calculator 2: APR vs Factor Rate */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 card-glow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                    COST NORMALIZER
                  </span>
                  <span className="font-mono text-xs text-slate-400">Term Sheet Comparison</span>
                </div>

                <h4 className="text-base font-bold text-white mb-2">Factor Rate to Effective APR Normalizer</h4>
                <p className="text-xs text-slate-400 mb-6">
                  Converts revenue-based financing and merchant terms into standardized annualized percentage rates.
                </p>

                <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                  <div>
                    <label className="block text-slate-300 mb-1">Funded ($)</label>
                    <input
                      type="number"
                      value={advanceAmount}
                      onChange={(e) => setAdvanceAmount(Math.max(1000, Number(e.target.value)))}
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Payback ($)</label>
                    <input
                      type="number"
                      value={paybackAmount}
                      onChange={(e) => setPaybackAmount(Math.max(1000, Number(e.target.value)))}
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Months</label>
                    <input
                      type="number"
                      value={termMonths}
                      onChange={(e) => setTermMonths(Math.max(1, Number(e.target.value)))}
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">Factor Rate</span>
                  <span className="text-lg font-bold text-white">{factorRate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Est. APR</span>
                  <span className="text-lg font-bold text-cyan-400">{estimatedAPR}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Monthly Pmt</span>
                  <span className="text-lg font-bold text-emerald-400">${Number(monthlyPayment).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESOURCES & PLAYBOOKS GRID */}
      {activeCategory !== 'Calculators' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/80 transition-all card-glow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
                    {res.category}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{res.format}</span>
                </div>

                <h4 className="text-base font-bold text-white mb-2">{res.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">{res.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => setActiveModalResource(res)}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Inspect Template</span>
                </button>

                <button
                  onClick={() => handleCopyMarkdown(res.contentMarkdown, res.id)}
                  className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === res.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedId === res.id ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resource Inspection Modal */}
      {activeModalResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-emerald-400 uppercase">{activeModalResource.category} SPECIFICATION</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{activeModalResource.title}</h3>
              </div>
              <button
                onClick={() => setActiveModalResource(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap border border-slate-800 leading-relaxed">
              {activeModalResource.contentMarkdown}
            </pre>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => handleCopyMarkdown(activeModalResource.contentMarkdown, 'modal_copy')}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                {copiedId === 'modal_copy' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedId === 'modal_copy' ? 'Copied to Clipboard' : 'Copy Markdown'}</span>
              </button>

              <button
                onClick={() => setActiveModalResource(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
