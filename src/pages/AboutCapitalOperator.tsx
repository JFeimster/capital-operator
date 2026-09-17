/**
 * Capital Operator — About Page View
 * src/pages/AboutCapitalOperator.tsx
 */

import React from 'react';
import { ArrowLeft, Landmark, Zap, Shield, Sparkles } from 'lucide-react';
import { PARTNER_FUNNEL } from '../config/ctas';

interface AboutCapitalOperatorProps {
  onBack?: () => void;
}

export const AboutCapitalOperator: React.FC<AboutCapitalOperatorProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#07090d] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <div>
          <button
            onClick={onBack ? onBack : () => (window.location.hash = '')}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Command Center
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Landmark className="w-3.5 h-3.5" /> MOONSHINE CAPITAL DOCTRINE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-50">
            About Capital Operator
          </h1>
          <p className="text-slate-400 text-base mt-2">
            Built by operators, for advisors and commercial dealmakers who recognize that capital demand without infrastructure is an exhausting treadmill.
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <p>
            Across financial advisory, accounting, commercial brokerage, and fintech, trusted relationships bring deal flow. Clients ask for term loans, credit lines, equipment financing, and expansion capital every week.
          </p>

          <p>
            Yet most firms struggle to monetize this demand cleanly. Deal intake occurs over messy email threads, junior analysts spend hours re-typing numbers into Excel, and applications are emailed blindly to 1 or 2 broker contacts without clear tracking.
          </p>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" /> The Core Thesis
            </h3>
            <p className="text-xs text-slate-400 leading-normal">
              Capital should be an operating system inside your business, not a chaotic side hustle. By pairing modern automated intake, AI document parsing, and institutional lending syndication, firms can monetize capital demand reliably without ever compromising their core advisory focus.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <a
              href={PARTNER_FUNNEL.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-950/50"
            >
              Explore Partner Infrastructure <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
