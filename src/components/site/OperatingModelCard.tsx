import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface OperatingModelCardProps {
  id: string;
  name: string;
  stage: string;
  description: string;
  unlock: string;
  className?: string;
}

export const OperatingModelCard: React.FC<OperatingModelCardProps> = ({
  name,
  stage,
  description,
  unlock,
  className = ''
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between hover:border-slate-700 transition-all card-glow ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            MATURITY: STAGE {stage}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
        <p className="text-sm text-slate-400 mb-4 leading-relaxed">{description}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/80 bg-slate-950/40 -mx-6 -mb-6 p-4 rounded-b-2xl">
        <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wide mb-1 flex items-center gap-1">
          <ArrowUpRight className="h-3 w-3" />
          <span>Next Capability Unlock</span>
        </div>
        <div className="text-xs text-slate-300">{unlock}</div>
      </div>
    </div>
  );
};
