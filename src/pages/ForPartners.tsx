import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { PartnerCTA } from '../components/home/PartnerCTA';
import { CheckCircle2, ShieldCheck, Layers } from 'lucide-react';

export const ForPartners: React.FC = () => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.forPartners} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'For Partners & Lenders' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              ROLE PLAYBOOK: LENDERS & SYNDICATES
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Receive Pre-Screened Deal Flow
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Partner with Moonshine Capital's syndicate network to receive pre-packaged loan files that meet your exact credit guidelines.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="max-w-2xl mx-auto mb-16">
            <PartnerCTA />
          </div>
        </Container>
      </Section>
    </>
  );
};
