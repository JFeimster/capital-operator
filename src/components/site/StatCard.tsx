import React from 'react';

export interface StatCardProps {
  label: string;
  value: string;
  desc?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  desc,
  className = ''
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/40 p-5 card-glow ${className}`}
    >
      <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mb-1">
        {value}
      </div>
      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono mb-1">
        {label}
      </div>
      {desc && <div className="text-xs text-slate-400">{desc}</div>}
    </div>
  );
};
