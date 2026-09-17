import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { CTAButton } from '../components/site/CTAButton';
import { TerminalPanel } from '../components/site/TerminalPanel';

export const ForPlatforms: React.FC = () => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.forPlatforms} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'For Platforms & Fintechs' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              ROLE PLAYBOOK: FINTECHS & PLATFORMS
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Embed Commercial Lending Rails
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Monetize commercial transaction demand with turnkey underwriting and syndication architecture.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Programmatic Debt Ingestion</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect your platform's merchant cash flow data to institutional capital providers via standardized webhook ingestion and credit memo extraction.
              </p>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>&bull; Zero balance-sheet or credit risk exposure</li>
                <li>&bull; Transparent API payload schema with deterministic pre-qualification</li>
                <li>&bull; Full commission attribution per funded facility</li>
              </ul>
            </div>

            <TerminalPanel title="webhook-ingest.json" command="curl -X POST /api/capital/intake">
              <div className="space-y-1 text-slate-300 font-mono text-xs">
                <div>&#123;</div>
                <div className="pl-4">"company_ein": "XX-XXXXXXX",</div>
                <div className="pl-4">"gross_revenue_annual": 2400000,</div>
                <div className="pl-4">"avg_monthly_deposits": 200000,</div>
                <div className="pl-4">"facility_requested": "ABL_REVOLVER",</div>
                <div className="pl-4">"routing_status": "PRE_APPROVED_TIER1"</div>
                <div>&#125;</div>
              </div>
            </TerminalPanel>
          </div>

          <div className="text-center">
            <CTAButton href="#assessment" size="lg">
              Explore Platform Integration Matrix
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
