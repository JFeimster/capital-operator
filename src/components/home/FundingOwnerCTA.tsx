import React from 'react';
import { CTAButton } from '../site/CTAButton';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const FundingOwnerCTA: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-[#05070a] p-8 card-glow flex flex-col justify-between">
      <div>
        <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block">
          FOR BUSINESS OWNERS & BORROWERS
        </span>
        <h3 className="text-2xl font-black text-white mb-3">
          Need Direct Commercial Debt For Your Business?
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Connect directly with Moonshine Capital's direct financing arm for transparent equipment, working capital, and expansion facilities.
        </p>
        <ul className="space-y-2 mb-6 text-xs text-slate-400">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Borrowing amounts from $50,000 to $5,000,000+</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Turnaround in as fast as 24-48 hours</span>
          </li>
        </ul>
      </div>
      <CTAButton
        href="https://tally.so/r/mDEJB5"
        isExternal
        size="md"
        className="w-full justify-center"
      >
        Apply for Commercial Funding
      </CTAButton>
    </div>
  );
};
