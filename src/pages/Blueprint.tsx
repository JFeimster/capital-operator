import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { BlueprintResult } from '../types';
import { ResultsView } from '../components/ResultsView';
import { BlueprintPreview } from '../components/blueprint/BlueprintPreview';
import { BlueprintExample } from '../components/blueprint/BlueprintExample';
import { CTAButton } from '../components/site/CTAButton';

export interface BlueprintPageProps {
  blueprint: BlueprintResult | null;
  onRestart: () => void;
  onRunDiagnostic: () => void;
}

export const Blueprint: React.FC<BlueprintPageProps> = ({
  blueprint,
  onRestart,
  onRunDiagnostic
}) => {
  if (blueprint) {
    return (
      <>
        <SEOHead seo={SEO_CONFIG.blueprint} />
        <ResultsView blueprint={blueprint} onRestart={onRestart} />
      </>
    );
  }

  return (
    <>
      <SEOHead seo={SEO_CONFIG.blueprint} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'Executive Blueprint' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 mb-4 inline-block font-semibold">
              EXECUTIVE BLUEPRINT SPECIFICATION
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Synthesized Operational Blueprint
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Complete the 12-question diagnostic matrix to generate your firm's customized 8-stage capital architecture, friction hotspot analysis, and 30-day transformation sequence.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <BlueprintPreview />
            <BlueprintExample />
          </div>

          <div className="text-center">
            <CTAButton href="#assessment" onClick={onRunDiagnostic} size="lg">
              Launch Diagnostic to Generate Blueprint
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
