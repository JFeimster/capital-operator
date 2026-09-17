import React from 'react';
import { AlertCircle, Wrench } from 'lucide-react';

export interface WorkflowStageCardProps {
  code: string;
  name: string;
  category: string;
  description: string;
  leakMetric: string;
  fix: string;
  className?: string;
}

export const WorkflowStageCard: React.FC<WorkflowStageCardProps> = ({
  code,
  name,
  category,
  description,
  leakMetric,
  fix,
  className = ''
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 transition-all card-glow ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            STAGE {code}
          </span>
          <span className="font-mono text-xs text-slate-500 uppercase">{category}</span>
        </div>
        <h3 className="text-base font-bold text-white mb-2">{name}</h3>
        <p className="text-sm text-slate-400 mb-4">{description}</p>
      </div>

      <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs">
        <div className="flex items-start gap-2 text-rose-400/90 bg-rose-500/5 p-2 rounded-lg border border-rose-500/10">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-mono uppercase text-[10px] text-rose-400 font-bold block">Friction Point:</span>
            <span>{leakMetric}</span>
          </div>
        </div>

        <div className="flex items-start gap-2 text-emerald-400/90 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
          <Wrench className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-mono uppercase text-[10px] text-emerald-400 font-bold block">System Fix:</span>
            <span>{fix}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
