/**
 * Capital Operator — Privacy Policy View
 * src/pages/PrivacyPolicy.tsx
 */

import React from 'react';
import { ArrowLeft, Shield, Lock, EyeOff } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack?: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#07090d] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack ? onBack : () => (window.location.hash = '')}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Command Center
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
              Privacy & Data Protection Policy
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              EFFECTIVE DATE: SEPTEMBER 2026 // MOONSHINE CAPITAL
            </p>
          </div>
        </div>

        <div className="prose prose-invert prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-300">
          <section className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
            <h2 className="text-lg font-semibold text-slate-100 mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" /> Client Data Sovereignty & Diagnostic Privacy
            </h2>
            <p>
              Capital Operator is designed as an operational assessment tool for commercial lending advisors,
              brokers, and financial operators. We believe your pipeline data, borrower relationships, and
              internal workflows belong strictly to you.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-slate-100">1. Information We Collect</h3>
            <p>
              When you complete the 12-step diagnostic, your responses are evaluated locally in your browser to
              generate your operating blueprint. If you choose to submit your work email or company information
              to receive an official copy of your blueprint, we store your contact info solely to fulfill your
              request and provide partner updates.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-slate-100">2. No Unsolicited Borrower Data Sharing</h3>
            <p>
              We do not ask for or collect sensitive individual borrower identifying information (such as Social
              Security Numbers, individual consumer credit files, or raw banking passwords) in this public diagnostic.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-slate-100">3. Telemetry & Analytics</h3>
            <p>
              We collect anonymous behavioral telemetry (e.g. diagnostic completion rates, tool click attribution)
              to improve our scoring models. No personally identifiable commercial pipeline data is sold to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-slate-100">4. Contact & Inquiries</h3>
            <p>
              For questions regarding our privacy architecture or to request deletion of any submitted contact
              records, contact <span className="font-mono text-emerald-400">compliance@moonshinecapital.io</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
