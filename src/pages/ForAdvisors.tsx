/**
 * Capital Operator — Role Playbook: Advisors & Fractional CFOs
 * src/pages/ForAdvisors.tsx
 */

import React, { useState } from 'react';
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
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Layers,
  Sparkles,
  Users,
  Briefcase,
  Sliders
} from 'lucide-react';

export const ForAdvisors: React.FC = () => {
  // Interactive Advisor Economics Simulator
  const [clientCount, setClientCount] = useState<number>(3);
  const [avgDealSize, setAvgDealSize] = useState<number>(350000);
  const [feeBps, setFeeBps] = useState<number>(150); // 1.5%

  const annualVolume = clientCount * 12 * avgDealSize;
  const annualAdvisoryRevenue = (annualVolume * (feeBps / 10000));
  const estimatedHoursSaved = clientCount * 12 * 14; // 14 hours saved per deal

  return (
    <>
      <SEOHead seo={SEO_CONFIG.forAdvisors} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'Playbooks' }, { label: 'For Advisors & CFOs' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              ROLE PLAYBOOK: FRACTIONAL CFOS & DEBT ADVISORS
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Institutionalize Commercial Debt Placement
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Unlock a high-margin commercial debt placement revenue line for your portfolio clients without turning your advisory practice into a chaotic broker desk.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {/* Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-8 card-glow">
              <div className="flex items-center gap-2 mb-4 text-rose-400 font-mono text-xs uppercase font-bold">
                <AlertTriangle className="h-4 w-4" />
                <span>The Unstructured Advisory Trap</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold">&times;</span>
                  <span>Spending 15+ unbillable hours formatting bank statements, tax returns, and messy debt schedules.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold">&times;</span>
                  <span>Shotgunning loan packages to local banks with weeks of radio silence and arbitrary declines.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold">&times;</span>
                  <span>Advisory reputation damaged when non-conforming deals get rejected at credit committee.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 card-glow">
              <div className="flex items-center gap-2 mb-4 text-emerald-400 font-mono text-xs uppercase font-bold">
                <ShieldCheck className="h-4 w-4" />
                <span>The Capital Operator Standard</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Turnkey digital intake portal branded with your firm's advisory standards.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Instant DSCR, debt-yield, and borrowing capacity calculations generated in minutes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct access to 50+ institutional debt buy-boxes through Moonshine Capital's syndicate network.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 4-Stage Operating System */}
          <div className="mb-16">
            <SectionHeading
              title="The 4-Stage Advisor Operating Protocol"
              subtitle="How top fractional CFO firms manage 10+ active debt inquiries simultaneously with zero administrative drag."
              tag="SYSTEM ARCHITECTURE"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[
                {
                  stage: '01',
                  title: 'Pre-Flight Intake',
                  desc: 'Client completes a 5-minute digital intake form with automatic document validation.'
                },
                {
                  stage: '02',
                  title: 'Deterministic Triage',
                  desc: 'Algorithm scores debt capacity, DSCR, and matches against active lender guidelines.'
                },
                {
                  stage: '03',
                  title: 'Syndicate Packaging',
                  desc: 'Generate a 2-page credit memo and single-link secure data room for institutional lenders.'
                },
                {
                  stage: '04',
                  title: 'Closing & Retainer',
                  desc: 'Deal funds via direct wire with automated advisory fee splits and 90-day renewal tracking.'
                }
              ].map((step) => (
                <div key={step.stage} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 card-glow">
                  <span className="font-mono text-xs font-bold text-emerald-400 block mb-2">STAGE {step.stage}</span>
                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Advisor Placement Economics Calculator */}
          <div className="mb-16 p-8 rounded-2xl border border-slate-800 bg-slate-900/60 card-glow">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase">ROI & REVENUE PROJECTION</span>
                <h3 className="text-xl font-bold text-white mt-1">Advisor Debt Placement Economics</h3>
              </div>
              <span className="font-mono text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700">
                Institutional Fee Split Model
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Sliders */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                    <span>Active Client Inquiries / Month:</span>
                    <span className="text-emerald-400 font-bold">{clientCount} deals / mo</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={clientCount}
                    onChange={(e) => setClientCount(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                    <span>Average Loan / Facility Size:</span>
                    <span className="text-emerald-400 font-bold">${avgDealSize.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="2000000"
                    step="50000"
                    value={avgDealSize}
                    onChange={(e) => setAvgDealSize(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                    <span>Advisory Placement Share (bps):</span>
                    <span className="text-cyan-400 font-bold">{feeBps} bps ({(feeBps / 100).toFixed(2)}%)</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    step="25"
                    value={feeBps}
                    onChange={(e) => setFeeBps(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Computed Outputs */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-center">
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase">Estimated Annual Revenue</span>
                  <span className="text-3xl font-black text-emerald-400">
                    ${Math.round(annualAdvisoryRevenue).toLocaleString()}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block uppercase">Annual Hours Saved</span>
                  <span className="text-xl font-bold text-cyan-400">
                    {estimatedHoursSaved} hrs / yr
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Partner Intake */}
          <div className="mb-16">
            <SectionHeading
              title="Apply as an Advisor Partner"
              subtitle="Get access to white-labeled intake links, credit memo tools, and Moonshine Capital's 50+ debt syndicate network."
              tag="FAST-TRACK ONBOARDING"
            />
            <div className="mt-8">
              <TallyEmbed
                formId="mOe658"
                title="Advisor & Fractional CFO Partner Application"
                hiddenFields={{ source: 'playbook_for_advisors', tier: 'cfo_partner' }}
              />
            </div>
          </div>

          <div className="text-center">
            <CTAButton href="#assessment" size="lg">
              Audit Your Advisory Workflow (12 Qs)
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
