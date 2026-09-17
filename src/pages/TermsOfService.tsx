/**
 * Capital Operator — Terms of Service View
 * src/pages/TermsOfService.tsx
 */

import React from 'react';
import { ArrowLeft, Scale, AlertTriangle } from 'lucide-react';

interface TermsOfServiceProps {
  onBack?: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#07090d] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack ? onBack : () => (window.location.hash = '')}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Command Center
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
              Commercial Terms of Service
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              REVISED: SEPTEMBER 2026 // MOONSHINE CAPITAL
            </p>
          </div>
        </div>

        <div className="prose prose-invert prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-300">
          <section className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-semibold text-slate-100 mb-2">
                  Not a Direct Commitment to Lend
                </h2>
                <p>
                  Capital Operator is an operational diagnostics software application. Blueprints, capability
                  scores, and roadmap recommendations generated through this tool do NOT constitute a loan commitment,
                  term sheet, interest rate lock, or binding underwriting decision.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-slate-100">1. Commercial Purpose Only</h3>
            <p>
              This application and the Moonshine Capital partner ecosystem are designed strictly for commercial
              business lending and corporate capital advisory. No personal consumer lending, student loans, or residential
              mortgages are offered or evaluated.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-slate-100">2. Software Tool Disclosures</h3>
            <p>
              External tools, CRM platforms, and underwriting utilities displayed in blueprints are curated third-party
              technologies. We make no warranty regarding software uptime or third-party feature changes. Certain links
              contain affiliate tracking that supports our continuous research.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-slate-100">3. Independent Legal & Financial Advice</h3>
            <p>
              Users should consult with qualified legal and regulatory counsel regarding loan brokerage licensing,
              disclosures, fee agreements, and usury laws applicable within their specific operating jurisdictions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
