/**
 * Capital Operator — Role Playbook: Fintechs, SaaS & Platforms
 * src/pages/ForPlatforms.tsx
 */

import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SectionHeading } from '../components/site/SectionHeading';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { CTAButton } from '../components/site/CTAButton';
import { TerminalPanel } from '../components/site/TerminalPanel';
import { TallyEmbed } from '../components/integrations/TallyEmbed';
import {
  Code,
  Layers,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Sliders
} from 'lucide-react';

export const ForPlatforms: React.FC = () => {
  // Interactive Embedded Capital Monetization Calculator
  const [activeMerchants, setActiveMerchants] = useState<number>(250);
  const [uptakeRate, setUptakeRate] = useState<number>(4); // 4% conversion
  const [avgFacility, setAvgFacility] = useState<number>(150000);
  const [platformTakeBps, setPlatformTakeBps] = useState<number>(175); // 1.75%

  const fundedMerchantsPerYear = Math.round(activeMerchants * (uptakeRate / 100));
  const totalVolumeFunded = fundedMerchantsPerYear * avgFacility;
  const platformAnnualNetRevenue = totalVolumeFunded * (platformTakeBps / 10000);

  return (
    <>
      <SEOHead seo={SEO_CONFIG.forPlatforms} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'Playbooks' }, { label: 'For Platforms & Fintechs' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              ROLE PLAYBOOK: FINTECHS, B2B SAAS & VERTICAL MARKETPLACES
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Embed Commercial Lending Rails
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Monetize commercial transaction demand with turnkey underwriting and syndication architecture. Zero balance-sheet risk, 100% white-labeled experience.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {/* Architecture Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
            <div className="space-y-4">
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase">ZERO BALANCE-SHEET RISK</span>
              <h3 className="text-2xl font-bold text-white">Programmatic Debt Ingestion & Syndication</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect your platform's merchant cash-flow data or invoicing streams directly to Moonshine Capital's institutional syndicate network.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Zero balance-sheet risk, regulatory licensing, or credit underwriting exposure.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>REST API & Webhooks with 24-hour turnaround SLA to borrowers.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>150–250 bps recurring revenue split on all funded origination volume.</span>
                </li>
              </ul>
            </div>

            <TerminalPanel title="api-embedded-intake.json" command="POST /v1/intake/submit">
              <div className="space-y-1 text-slate-300 font-mono text-xs">
                <div>&#123;</div>
                <div className="pl-4">"platform_id": "saas_quickbooks_app",</div>
                <div className="pl-4">"merchant_ein": "84-9382104",</div>
                <div className="pl-4">"trailing_12m_gmv": 1850000,</div>
                <div className="pl-4">"avg_monthly_payout": 154000,</div>
                <div className="pl-4">"facility_requested": "WORKING_CAPITAL_LINE",</div>
                <div className="pl-4 text-emerald-400">"pre_approved_limit": 225000</div>
                <div>&#125;</div>
              </div>
            </TerminalPanel>
          </div>

          {/* Interactive Embedded Revenue Calculator */}
          <div className="mb-16 p-8 rounded-2xl border border-slate-800 bg-slate-900/60 card-glow">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase">MONETIZATION MODEL</span>
                <h3 className="text-xl font-bold text-white mt-1">Platform Embedded Capital Revenue Model</h3>
              </div>
              <span className="font-mono text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700">
                Non-Dilutive Software Monetization
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                    <span>Active Platform Businesses / Merchants:</span>
                    <span className="text-emerald-400 font-bold">{activeMerchants.toLocaleString()} accounts</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={activeMerchants}
                    onChange={(e) => setActiveMerchants(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                    <span>Annual Financing Uptake Rate (%):</span>
                    <span className="text-emerald-400 font-bold">{uptakeRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={uptakeRate}
                    onChange={(e) => setUptakeRate(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                    <span>Average Facility Funded:</span>
                    <span className="text-cyan-400 font-bold">${avgFacility.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="25000"
                    max="1000000"
                    step="25000"
                    value={avgFacility}
                    onChange={(e) => setAvgFacility(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Outputs */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-center">
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase">Platform Annual Net Revenue</span>
                  <span className="text-3xl font-black text-emerald-400">
                    ${Math.round(platformAnnualNetRevenue).toLocaleString()}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block uppercase">Annual Capital Originated</span>
                  <span className="text-lg font-bold text-cyan-400">
                    ${(totalVolumeFunded / 1000000).toFixed(2)}M / yr
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Platform Sandbox Application */}
          <div className="mb-16">
            <SectionHeading
              title="Request Embedded Platform API Credentials"
              subtitle="Connect with the Moonshine Capital engineering desk to receive sandbox API keys, webhook test endpoints, and widget snippets."
              tag="PLATFORM SANDBOX"
            />
            <div className="mt-8">
              <TallyEmbed
                formId="mOe658"
                title="Fintech & Platform Integration Request"
                hiddenFields={{ source: 'platform_playbook', tier: 'fintech_api' }}
              />
            </div>
          </div>

          <div className="text-center">
            <CTAButton href="#docs" size="lg">
              View Developer Docs & REST API
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
