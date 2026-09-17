import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { ResourceCenterFull } from '../components/resources/ResourceCenterFull';
import { CTAButton } from '../components/site/CTAButton';

export const Resources: React.FC = () => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.resources} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'Resources & Playbooks' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              OPERATIONAL PLAYBOOKS & TEMPLATES
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Borrower Checklists, Credit Memos & Calculators
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Standardized templates, interactive DSCR & term sheet calculators, credit memo specifications, and syndication schemas to eliminate friction in debt placement.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <ResourceCenterFull />

          <div className="mt-16 text-center">
            <CTAButton href="#assessment" size="lg">
              Get Customized Resource Recommendations
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
