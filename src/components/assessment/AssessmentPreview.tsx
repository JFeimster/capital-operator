import React from 'react';
import { QUESTIONS } from '../AssessmentStep';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const AssessmentPreview: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 card-glow">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <span className="font-mono text-xs text-slate-400 font-semibold uppercase">
          Diagnostic Topics Evaluated
        </span>
        <span className="font-mono text-xs text-emerald-400">12 Dimensions</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
        {QUESTIONS.map((q, idx) => (
          <div
            key={q.id}
            className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80"
          >
            <span className="font-mono text-emerald-400 font-bold">
              {idx < 9 ? `0${idx + 1}` : idx + 1}.
            </span>
            <span className="truncate">{q.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
