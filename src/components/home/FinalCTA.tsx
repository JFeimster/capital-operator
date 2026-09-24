import React from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { FundingOwnerCTA } from './FundingOwnerCTA';
import { PartnerCTA } from './PartnerCTA';
import { CTAButton } from '../site/CTAButton';
import { toAppHref } from '../../lib/routeLocation';

export const FinalCTA: React.FC = () => {
  return (
    <Section id="final-cta" variant="contrast">
      <Container>
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-950 p-8 sm:p-12 text-center mb-12 relative overflow-hidden card-glow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,.10),transparent_55%)]"/>
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-4 inline-block font-semibold">
              PUT THE SYSTEM TO WORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Start with the capital need. Get the path, gaps, resources, and next action.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              Use the funding discovery layer for a live capital request, or open Funding OS to work the opportunity through the operator workflow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <CTAButton href={toAppHref('/get-funded')} size="lg" className="text-base px-8 py-4">Get Funded</CTAButton>
              <CTAButton href={toAppHref('/funding')} variant="secondary" size="lg" className="text-base px-8 py-4">Open Funding OS</CTAButton>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FundingOwnerCTA />
          <PartnerCTA />
        </div>
      </Container>
    </Section>
  );
};
