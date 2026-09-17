/**
 * Capital Operator — Positioning Section
 * src/components/PositioningSection.tsx
 */

import React from 'react';
import { Brain, Cpu, Server, Users, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export const PositioningSection: React.FC<{ onStartAssessment: () => void }> = ({ onStartAssessment }) => {
  return (
    <section className="relative py-16 lg:py-24 bg-[#0a0e14] border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase font-mono-code">
            OPERATING THESIS
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            The Best Operator Shouldn't Be the Operating System.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            If the business only works because one person knows which opportunity is worth pursuing, which lender to call, what documents to chase, and when to follow up, the business does not have infrastructure. It has <strong className="text-emerald-400 font-semibold">tribal knowledge</strong>.
          </p>
          <p className="mt-3 text-base sm:text-lg text-slate-400 leading-relaxed">
            Capital Operator maps the workflows, systems, tools, and checkpoints required to turn that knowledge into a repeatable operating layer.
          </p>
        </div>

        {/* Tribal Knowledge vs Capital Infrastructure Comparison */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Tribal Knowledge Panel */}
          <div className="rounded-2xl border border-red-900/40 bg-gradient-to-b from-red-950/20 to-slate-950 p-6 sm:p-8 card-glow">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Tribal Knowledge (Fragile)</h3>
                <span className="text-xs text-red-400 font-mono-code">Operator is the bottleneck</span>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span>Leads arrive in scattered emails and phone texts with no central audit trail.</span>
              </li>
              <li className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span>Qualification relies on the senior operator's memory and subjective gut feeling.</span>
              </li>
              <li className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span>Documents are chased by manually typing follow-up emails one-by-one.</span>
              </li>
              <li className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span>Lender selection depends on who the broker remembers to call that afternoon.</span>
              </li>
              <li className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span>Once a deal closes or gets referred away, relationship equity is lost forever.</span>
              </li>
            </ul>
          </div>

          {/* Capital Operator Panel */}
          <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-slate-950 p-6 sm:p-8 card-glow">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Capital Operator (Scalable)</h3>
                <span className="text-xs text-emerald-400 font-mono-code">System handles repetition; human handles judgment</span>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Structured intake captures verified facts with instant CRM dedupe and source tagging.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Automated pre-qualification screens out non-viable inquiries before human review.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Secure deal data room extracts bank metrics and automates reminder cadences.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Governed lender matrix matches credit boxes, leaving operator to interpret strategy.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Client stays in your ecosystem with automated 6-month renewal countdowns.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 4 Core Pillars Strip */}
        <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h4 className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono-code text-center mb-6">
            THE ARCHITECTURAL DOCTRINE
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="text-xs font-mono-code text-emerald-400 font-bold mb-1">SYSTEMS</div>
              <div className="text-sm font-semibold text-white">Handle Repetition</div>
              <p className="mt-1 text-xs text-slate-400">Intake, reminders, file renaming, timestamps & CRM stage moves.</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="text-xs font-mono-code text-cyan-400 font-bold mb-1">AI AGENTS</div>
              <div className="text-sm font-semibold text-white">Handle Synthesis</div>
              <p className="mt-1 text-xs text-slate-400">Call summaries, cash-flow extraction, company research & credit memos.</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="text-xs font-mono-code text-amber-400 font-bold mb-1">HUMANS</div>
              <div className="text-sm font-semibold text-white">Handle Judgment</div>
              <p className="mt-1 text-xs text-slate-400">Deal structuring, lender exceptions, negotiation, advisory & client trust.</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="text-xs font-mono-code text-blue-400 font-bold mb-1">CAPITAL PARTNERS</div>
              <div className="text-sm font-semibold text-white">Handle Capital</div>
              <p className="mt-1 text-xs text-slate-400">Balance sheet risk, compliance licenses, underwriting & fulfillment rails.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
