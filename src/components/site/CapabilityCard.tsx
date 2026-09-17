import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export interface CapabilityCardProps {
  stage: number;
  name: string;
  level: string;
  description: string;
  className?: string;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({
  stage,
  name,
  level,
  description,
  className = ''
}) => {
  const levelStyles = {
    Foundational: 'text-slate-400 bg-slate-800/80 border-slate-700',
    Advanced: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    Scale: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  }[level] || 'text-slate-400 bg-slate-800 border-slate-700';

  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-all card-glow ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
          STAGE 0{stage}
        </span>
        <span className={`font-mono text-xs px-2.5 py-0.5 rounded-full border ${levelStyles}`}>
          {level}
        </span>
      </div>
      <h3 className="text-base font-bold text-white mb-2">{name}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{description}</p>
      <div className="flex items-center text-xs text-slate-500 font-mono gap-1.5 pt-2 border-t border-slate-800/80">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
        <span>Institutional Standard</span>
      </div>
    </div>
  );
};
