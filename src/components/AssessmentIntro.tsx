/**
 * Capital Operator — Assessment Intro
 * src/components/AssessmentIntro.tsx
 */

import React from 'react';
import { ArrowRight, Clock, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro: React.FC<AssessmentIntroProps> = ({ onStart }) => {
  return (
    <section id="assessment-intro" className="py-20 bg-[#07090d] relative overflow-hidden border-b border-slate-800/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1 text-xs font-semibold text-emerald-400 font-mono-code mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>DIAGNOSTIC ENGINE // 12 CHECKPOINTS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Show Us How Capital Moves Through Your Business.
        </h2>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          In a few questions, we'll identify where opportunities are leaking, where manual work is slowing you down, and what your capital infrastructure should look like.
        </p>

        <div className="mt-4 text-sm font-semibold text-emerald-400 font-mono-code">
          You'll leave with a prioritized operating blueprint—not another list of AI tools.
        </div>

        {/* Benefits bullets */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs sm:text-sm text-slate-400 font-mono-code">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Deterministic Scoring</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>8-Stage Capability Map</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>30-Day Implementation Sequence</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <button
            onClick={onStart}
            className="inline-flex items-center space-x-3 rounded-xl bg-emerald-500 px-9 py-4 text-base font-bold text-slate-950 shadow-xl shadow-emerald-500/25 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>MAP MY OPERATION</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-slate-500 font-mono-code">
            <span className="flex items-center space-x-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Takes about 3 minutes</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <Shield className="h-3.5 w-3.5" />
              <span>No lender jargon required</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
