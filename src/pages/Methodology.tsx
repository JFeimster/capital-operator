/**
 * Capital Operator — Methodology View
 * src/pages/Methodology.tsx
 */

import React from 'react';
import { ArrowLeft, Cpu, Layers, GitFork, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { WORKFLOW_STAGES } from '../config/workflowStages';

interface MethodologyProps {
  onBack?: () => void;
}

export const Methodology: React.FC<MethodologyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#07090d] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <button
            onClick={onBack ? onBack : () => (window.location.hash = '')}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Command Center
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5" /> DIAGNOSTIC FRAMEWORK & SCORING METHODOLOGY
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-50">
            How Capital Operator Evaluates Infrastructure
          </h1>
          <p className="text-slate-400 text-base mt-2 max-w-2xl">
            Our 12-question evaluation measures operational maturity across 8 discrete commercial lending stages,
            mapping friction points directly to modern tools, automation levers, and human checkpoints.
          </p>
        </div>

        {/* Operating Models Grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" /> The 4 Operating Model Tiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">Tier 1 // 0–18 Pts</div>
              <h3 className="text-lg font-bold text-slate-100">Relationship-Led</h3>
              <p className="text-xs text-slate-400 mt-2">
                Characterized by personal email inboxes, informal phone notes, and manual back-and-forth bank statement collection. High trust, but prone to bottlenecking at low deal volumes.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">Tier 2 // 19–32 Pts</div>
              <h3 className="text-lg font-bold text-slate-100">Systemized</h3>
              <p className="text-xs text-slate-400 mt-2">
                Standard CRM pipelines and secure document portals operational. Operators spend significant time manually reading PDFs and hand-typing credit summaries.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">Tier 3 // 33–44 Pts</div>
              <h3 className="text-lg font-bold text-slate-100">AI-Augmented</h3>
              <p className="text-xs text-slate-400 mt-2">
                Automated OCR statement parsing and AI-generated credit memorandums live. Deal packaging completes in minutes with strict human sign-off checkpoints.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-mono text-emerald-300 uppercase tracking-widest mb-1">Tier 4 // 45+ Pts</div>
              <h3 className="text-lg font-bold text-slate-100">Capital Operator</h3>
              <p className="text-xs text-slate-400 mt-2">
                Institutional-grade capital engine with programmatic borrower routing, multi-lender syndication, and autonomous refinance alerts.
              </p>
            </div>
          </div>
        </section>

        {/* 8 Stages Breakdown */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <GitFork className="w-5 h-5 text-cyan-400" /> The 8-Stage Operating Architecture
          </h2>
          <div className="space-y-3">
            {WORKFLOW_STAGES.map((s) => (
              <div key={s.number} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-emerald-400">STAGE 0{s.number}</span>
                    <span className="text-slate-500">//</span>
                    <span className="font-mono text-xs text-slate-400 uppercase">{s.internalLabel}</span>
                  </div>
                  <h4 className="text-base font-semibold text-slate-100 mt-1">{s.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{s.job}</p>
                </div>
                <div className="text-xs sm:text-right shrink-0">
                  <div className="text-slate-500 font-mono">CAPABILITY REQUIREMENT</div>
                  <div className="text-slate-300 font-medium mt-0.5">{s.capabilityNeeded}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
