import React from 'react';

export interface CommandPanelProps {
  title?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export const CommandPanel: React.FC<CommandPanelProps> = ({
  title,
  badge,
  children,
  className = ''
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md relative overflow-hidden card-glow ${className}`}
    >
      {(title || badge) && (
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          {title && (
            <h3 className="text-base font-bold text-white tracking-wide">
              {title}
            </h3>
          )}
          {badge && (
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {badge}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
