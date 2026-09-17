import React from 'react';
import { TerminalPanel } from '../site/TerminalPanel';

export const BlueprintExample: React.FC = () => {
  return (
    <TerminalPanel title="executive-summary.md" command="cat blueprint-report.md">
      <div className="space-y-3 font-mono text-xs">
        <div className="text-emerald-400 font-bold"># CAPITAL OPERATOR EXECUTIVE BLUEPRINT</div>
        <div className="text-slate-400">Generated for: Commercial Capital Advisory Desk</div>
        <div className="text-slate-400">Current Maturity: Stage 2 (Standardized Deal Desk)</div>
        <div className="text-slate-400">Quantified Monthly Leak: ~$14,200 in wasted advisor time</div>
        <div className="pt-2 text-cyan-400 font-semibold">## HIGH-LEVERAGE ACTION ITEMS</div>
        <div>[x] 1. Replace static web intake with 6-question branching filter.</div>
        <div>[x] 2. Connect statement parser for instant DSCR & add-back calculation.</div>
        <div>[ ] 3. Map top 15 institutional debt funds into dynamic routing matrix.</div>
      </div>
    </TerminalPanel>
  );
};
