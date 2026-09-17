import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SectionHeading } from '../components/site/SectionHeading';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { WorkflowArchitecture } from '../components/home/WorkflowArchitecture';
import { CapitalDemandFlow } from '../components/home/CapitalDemandFlow';
import { FinalCTA } from '../components/home/FinalCTA';

export const HowItWorks: React.FC = () => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.howItWorks} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'How It Works' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              FRAMEWORK ARCHITECTURE
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              How Modern Capital Desks Operate
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore the end-to-end 8-stage operational architecture: from programmatic borrower qualification to post-closing relationship equity.
            </p>
          </div>
        </Container>
      </div>

      <CapitalDemandFlow />
      <WorkflowArchitecture />
      <FinalCTA />
    </>
  );
};
