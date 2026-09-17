/**
 * Capital Operator — Role Playbook: Lenders & Syndicate Partners
 * src/pages/ForPartners.tsx
 */

import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SectionHeading } from '../components/site/SectionHeading';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { CTAButton } from '../components/site/CTAButton';
import { TallyEmbed } from '../components/integrations/TallyEmbed';
import {
  CheckCircle2,
  ShieldCheck,
  Layers,
  Sparkles,
  TrendingUp,
  FileCheck,
  Building2,
  Lock,
  ArrowRight
} from 'lucide-react';

export const ForPartners: React.FC = () => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.forPartners} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'Playbooks' }, { label: 'For Partners & Lenders' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              ROLE PLAYBOOK: LENDERS & SYNDICATES
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Receive Pre-Screened Deal Flow
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Partner with Moonshine Capital's syndicate network to receive pre-packaged loan files that meet your exact credit guidelines with 0% junk submissions.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {/* Why Credit Committees Approve Faster */}
          <div className="mb-16">
            <SectionHeading
              title="Why Underwriters Prioritize Moonshine Deals"
              subtitle="Every file delivered to our syndicate partners adheres to the Institutional Credit Memorandum standard."
              tag="UNDERWRITING STANDARDS"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 card-glow">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <FileCheck className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Standardized 5-Doc Data Room</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No missing tax return schedules or handwritten notes. All bank statements are normalized with electronic transaction ledgers.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 card-glow">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Pre-Calculated DSCR & Cash Flow</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Debt service coverage ratios, normalized EBITDA add-backs, and existing debt schedules are pre-computed prior to delivery.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 card-glow">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                  <Lock className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Exact Buy-Box Matching</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You only receive deals matching your geographic boundaries, minimum revenues, time in business, and credit score thresholds.
                </p>
              </div>
            </div>
          </div>

          {/* Supported Credit Facilities */}
          <div className="mb-16 p-8 rounded-2xl border border-slate-800 bg-slate-900/60">
            <h3 className="text-xl font-bold text-white mb-6">Active Syndicate Credit Facilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              {[
                { name: 'Asset-Based Revolvers', range: '$250k - $10M', collateral: 'AR / Inventory' },
                { name: 'SBA 7(a) & 504 Loans', range: '$350k - $5M', collateral: 'Owner-Occupied / Equipment' },
                { name: 'Senior Cash-Flow Debt', range: '$500k - $15M', collateral: '1.25x+ DSCR Coverage' },
                { name: 'Equipment Financing', range: '$50k - $3M', collateral: 'Titled / Hard Assets' }
              ].map((fac) => (
                <div key={fac.name} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">{fac.name}</span>
                  <span className="text-slate-300 block">{fac.range}</span>
                  <span className="text-[11px] text-slate-500 block">{fac.collateral}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Partner Onboarding Form */}
          <div className="mb-16">
            <SectionHeading
              title="Apply to Join Moonshine Syndicate Desk"
              subtitle="Register your credit fund or institutional lending desk to receive pre-qualified deal packages."
              tag="PARTNER ONBOARDING"
            />
            <div className="mt-8">
              <TallyEmbed
                formId="mOe658"
                title="Moonshine Capital Lender & Syndicate Partner Application"
                hiddenFields={{ source: 'partner_playbook', tier: 'lender_syndicate' }}
              />
            </div>
          </div>

          <div className="text-center">
            <CTAButton href="#assessment" size="lg">
              Test Operational Diagnostic (12 Qs)
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
