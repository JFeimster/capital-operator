import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { CapitalArchitectureMap } from '../components/CapitalArchitectureMap';
import { CTAButton } from '../components/site/CTAButton';

export const CapitalStack: React.FC = () => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.capitalStack} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'Capital Stack Architecture' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              DEBT INSTRUMENTS & STRUCTURE
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              The Modern Commercial Capital Stack
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Understand the risk, cost, covenant restrictions, and velocity tradeoffs across each commercial debt tier.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <CapitalArchitectureMap />

          <div className="mt-16 text-center">
            <CTAButton href="#assessment" size="lg">
              Audit Your Deal Routing Stack
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
