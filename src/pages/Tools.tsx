import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { ToolDirectoryPreview } from '../components/tools/ToolDirectoryPreview';
import { CTAButton } from '../components/site/CTAButton';

export const Tools: React.FC = () => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.tools} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'Tools Directory' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              TECHNOLOGY INFRASTRUCTURE
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Capital Advisory & Underwriting Tool Directory
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Curated software and API infrastructure for document scrubbing, cash-flow parsing, CRM pipeline tracking, and lender distribution.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <ToolDirectoryPreview />

          <div className="mt-16 text-center">
            <CTAButton href="#assessment" size="lg">
              Match Tools to Your Operating Stage
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
