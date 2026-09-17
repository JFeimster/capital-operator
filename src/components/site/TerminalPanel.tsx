import React from 'react';

export interface TerminalPanelProps {
  title?: string;
  command?: string;
  children: React.ReactNode;
  className?: string;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  title = 'bash',
  command,
  children,
  className = ''
}) => {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-[#05070a] overflow-hidden font-mono text-xs ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-slate-400 text-[11px]">{title}</span>
        </div>
        {command && <span className="text-slate-500 text-[11px]">$ {command}</span>}
      </div>
      <div className="p-4 text-slate-300 overflow-x-auto leading-relaxed">
        {children}
      </div>
    </div>
  );
};
