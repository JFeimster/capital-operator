import React from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { FundingOwnerCTA } from './FundingOwnerCTA';
import { PartnerCTA } from './PartnerCTA';
import { CTAButton } from '../site/CTAButton';

export const FinalCTA: React.FC = () => {
  return (
    <Section id="final-cta" variant="contrast">
      <Container>
        {/* Core Diagnostic CTA Banner */}
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-950 p-8 sm:p-12 text-center mb-12 relative overflow-hidden card-glow">
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-4 inline-block font-semibold">
              EVALUATE YOUR DEBT ADVISORY INFRASTRUCTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Ready to Stop Losing 40% of Your Deal Yield?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              Take the 12-question diagnostic matrix to discover your operating model stage, pinpoint manual pipeline friction, and receive a customized 30-day implementation blueprint.
            </p>
            <CTAButton href="#assessment" size="lg" className="text-base px-8 py-4">
              Launch Diagnostic Matrix Now
            </CTAButton>
          </div>
        </div>

        {/* Dual Partner / Direct Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FundingOwnerCTA />
          <PartnerCTA />
        </div>
      </Container>
    </Section>
  );
};
