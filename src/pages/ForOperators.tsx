/**
 * Capital Operator — Role Playbook: Commercial Loan Brokers & Deal Desk Leads
 * src/pages/ForOperators.tsx
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
  Cpu,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  Sparkles,
  Database,
  BarChart3,
  Sliders
} from 'lucide-react';

export const ForOperators: React.FC = () => {
  // Interactive Pipeline Leakage Calculator
  const [monthlyLeads, setMonthlyLeads] = useState<number>(40);
  const [manualDocChaseDays, setManualDocChaseDays] = useState<number>(9);
  const [avgCommission, setAvgCommission] = useState<number>(7500);

  // Leakage math: each day of doc chase degrades conversion by ~4%
  const estimatedConversionWithoutAutomation = Math.max(5, 25 - manualDocChaseDays * 1.8);
  const estimatedConversionWithAutomation = 28; // Standard systemized desk
  const lostDealsPerMonth = Math.max(0, Math.round(monthlyLeads * ((estimatedConversionWithAutomation - estimatedConversionWithoutAutomation) / 100)));
  const monthlyRevenueLeakage = lostDealsPerMonth * avgCommission;

  return (
    <>
      <SEOHead seo={SEO_CONFIG.forOperators} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'Playbooks' }, { label: 'For Operators & Brokers' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              ROLE PLAYBOOK: COMMERCIAL LOAN BROKERS & DEAL DESKS
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Scale Velocity & Placement Yield
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Transform an email-clogged broker desk into an automated deal syndication engine that closes deals 3x faster with 90% less manual document scrubbing.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 card-glow">
              <div className="font-mono text-xs text-emerald-400 mb-2 font-bold flex items-center gap-1.5">
                <Zap className="h-4 w-4" />
                <span>SPEED & OCR</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Automated Document Scrubbing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extract bank deposits, calculate monthly cash flows, detect MCA stacking, and spot NSF risks automatically with OCR pipelines in under 3 minutes.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 card-glow">
              <div className="font-mono text-xs text-cyan-400 mb-2 font-bold flex items-center gap-1.5">
                <Cpu className="h-4 w-4" />
                <span>PRECISION</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Lender Buy-Box Routing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stop blind submissions. Match borrower financial profiles to exact credit committee guidelines to eliminate 14-day decline delays.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 card-glow">
              <div className="font-mono text-xs text-amber-400 mb-2 font-bold flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4" />
                <span>RETENTION</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Lifetime Renewal Triggers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Capture repeat borrowing revenue by triggering automated line renewal check-ins at 60 and 120 days post-funding before competitors reach them.
              </p>
            </div>
          </div>

          {/* Interactive Pipeline Friction & Leakage Calculator */}
          <div className="mb-16 p-8 rounded-2xl border border-slate-800 bg-slate-900/60 card-glow">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-red-400 font-bold uppercase">PIPELINE AUDIT</span>
                <h3 className="text-xl font-bold text-white mt-1">Deal Desk Friction & Leakage Calculator</h3>
              </div>
              <span className="font-mono text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700">
                Speed-to-Submission Math
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                    <span>Monthly Inbound Loan Inquiries:</span>
                    <span className="text-emerald-400 font-bold">{monthlyLeads} deals / mo</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={monthlyLeads}
                    onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                    <span>Average Days Spent Chasing Missing Documents:</span>
                    <span className="text-amber-400 font-bold">{manualDocChaseDays} days</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="21"
                    step="1"
                    value={manualDocChaseDays}
                    onChange={(e) => setManualDocChaseDays(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                    <span>Average Commission / Placement Fee:</span>
                    <span className="text-cyan-400 font-bold">${avgCommission.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="25000"
                    step="500"
                    value={avgCommission}
                    onChange={(e) => setAvgCommission(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Computed Leakage */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-center">
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase">Monthly Commission Leaked</span>
                  <span className="text-3xl font-black text-rose-400">
                    ${monthlyRevenueLeakage.toLocaleString()}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block uppercase">Estimated Deals Lost to Delay</span>
                  <span className="text-xl font-bold text-amber-400">
                    {lostDealsPerMonth} deals / mo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit a Live Deal Embed */}
          <div className="mb-16">
            <SectionHeading
              title="Submit a Live Commercial Deal for Co-Syndication"
              subtitle="Upload deals requiring non-bank debt funds, asset-based revolvers, or SBA takeouts through our streamlined underwriting intake."
              tag="DEAL DESK SYNDICATION"
            />
            <div className="mt-8">
              <TallyEmbed
                formId="mDEJB5"
                title="Commercial Financing Request Submission"
                hiddenFields={{ source: 'broker_playbook', tier: 'deal_desk' }}
              />
            </div>
          </div>

          <div className="text-center">
            <CTAButton href="#assessment" size="lg">
              Run Complete 12-Question Desk Diagnostic
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
