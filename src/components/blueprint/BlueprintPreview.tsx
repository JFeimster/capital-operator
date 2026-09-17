import React from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Badge } from '../site/Badge';

export const BlueprintPreview: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 card-glow">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Badge variant="cyan">EXECUTIVE BLUEPRINT</Badge>
          <span className="text-xs text-slate-400 font-mono">Sample Output</span>
        </div>
        <span className="font-mono text-xs text-emerald-400">8 Operating Stages</span>
      </div>

      <div className="space-y-4 text-xs text-slate-300">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase mb-1">
            Current Operating Model
          </div>
          <div className="text-base font-bold text-white mb-1">
            Stage 2: Standardized Deal Desk
          </div>
          <p className="text-xs text-slate-400">
            Intake is organized via checklist forms, but document collation and bank statement parsing remain manual bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/20 text-rose-300 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block font-mono text-[10px] uppercase">Critical Leak:</span>
              <span>12.5 hrs/week lost to manual bank statement typing</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-300 flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block font-mono text-[10px] uppercase">Immediate Unlock:</span>
              <span>Automated OCR statement extraction into credit memo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
