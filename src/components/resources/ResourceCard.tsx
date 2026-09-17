import React from 'react';
import { FileText, ArrowDownToLine, ExternalLink } from 'lucide-react';

export interface ResourceCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  format: string;
  tag: string;
  className?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  category,
  description,
  format,
  tag,
  className = ''
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 transition-all card-glow ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 uppercase">
            {category}
          </span>
          <span className="font-mono text-xs text-slate-500">{format}</span>
        </div>
        <h3 className="text-base font-bold text-white mb-2">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">{description}</p>
      </div>

      <a
        href="#resources"
        className="inline-flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-semibold text-emerald-400 hover:text-emerald-300 group cursor-pointer"
      >
        <span>Access Resource</span>
        <ArrowDownToLine className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
      </a>
    </div>
  );
};
