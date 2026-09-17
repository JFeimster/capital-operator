import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { AudiencePath } from '../../config/audiences';

export interface AudienceCardProps {
  audience: AudiencePath;
  className?: string;
}

export const AudienceCard: React.FC<AudienceCardProps> = ({
  audience,
  className = ''
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/80 transition-all card-glow ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            {audience.badge}
          </span>
          <span className="text-xs text-slate-500 font-mono">{audience.role}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{audience.title}</h3>
        <p className="text-sm text-slate-400 mb-6">{audience.subtitle}</p>

        <div className="space-y-2 mb-6 pt-4 border-t border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            Target Outcomes:
          </div>
          {audience.outcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      <a
        href={audience.href}
        className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-800/80 text-xs font-semibold text-emerald-400 hover:text-emerald-300 group cursor-pointer"
      >
        <span>Explore Architecture</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
};
