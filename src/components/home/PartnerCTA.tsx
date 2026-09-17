import React from 'react';
import { CTAButton } from '../site/CTAButton';
import { CheckCircle2 } from 'lucide-react';

export const PartnerCTA: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-[#05070a] p-8 card-glow flex flex-col justify-between">
      <div>
        <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 mb-4 inline-block">
          FOR BROKERS & REFERRAL PARTNERS
        </span>
        <h3 className="text-2xl font-black text-white mb-3">
          Partner With Moonshine Capital's Syndication Desk
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Submit commercial deals to our institutional placement network. Get dedicated credit packaging, transparent payouts, and rapid closings.
        </p>
        <ul className="space-y-2 mb-6 text-xs text-slate-400">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            <span>Dedicated underwriting triage & packaging desk</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            <span>50+ institutional non-bank & SBA lender network</span>
          </li>
        </ul>
      </div>
      <CTAButton
        href="https://tally.so/r/mOe658"
        isExternal
        variant="secondary"
        size="md"
        className="w-full justify-center"
      >
        Submit a Partner Deal
      </CTAButton>
    </div>
  );
};
