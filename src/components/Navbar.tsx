/**
 * Capital Operator — Navbar Component
 * src/components/Navbar.tsx
 */

import React from 'react';
import { Layers, RotateCcw, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';

interface NavbarProps {
  onStartAssessment: () => void;
  onRestart: () => void;
  hasStarted: boolean;
  isCompleted: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartAssessment,
  onRestart,
  hasStarted,
  isCompleted
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#07090d]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Lockup */}
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase font-mono-code">
                MOONSHINE CAPITAL
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20 font-mono-code">
                v2.4 SPEC
              </span>
            </div>
            <div className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              CAPITAL OPERATOR
              <span className="hidden sm:inline text-xs font-normal text-slate-500">| Capital Stack Builder</span>
            </div>
          </div>
        </div>

        {/* Navigation Anchors & Status */}
        <div className="flex items-center space-x-3">
          {hasStarted && (
            <button
              onClick={onRestart}
              className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
              title="Reset diagnostic answers"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden sm:inline">Start Over</span>
            </button>
          )}

          {!isCompleted ? (
            <button
              onClick={onStartAssessment}
              className="inline-flex items-center space-x-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all cursor-pointer"
            >
              <span>{hasStarted ? 'Resume Diagnostic' : 'Build My System'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => window.print()}
              className="inline-flex items-center space-x-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer no-print"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Save Blueprint (PDF)</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
