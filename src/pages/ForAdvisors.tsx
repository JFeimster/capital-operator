import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SectionHeading } from '../components/site/SectionHeading';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { CommandPanel } from '../components/site/CommandPanel';
import { CTAButton } from '../components/site/CTAButton';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export const ForAdvisors: React.FC = () => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.forAdvisors} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'For Advisors & CFOs' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              ROLE PLAYBOOK: ADVISORS & FRACTIONAL CFOS
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Institutionalize Commercial Debt Placement
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Provide institutional debt advisory to your portfolio companies without turning your consulting desk into an administrative document-chasing nightmare.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-8 card-glow">
              <div className="flex items-center gap-2 mb-4 text-rose-400 font-mono text-xs uppercase font-bold">
                <AlertTriangle className="h-4 w-4" />
                <span>The Unstructured Advisory Trap</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold">&times;</span>
                  <span>Spending 15+ billable hours formatting client bank statements and P&L spreadsheets.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold">&times;</span>
                  <span>Shotgunning loan packages to random bank contacts with weeks of radio silence.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold">&times;</span>
                  <span>Advisory credibility damaged when non-conforming deals get rejected at credit committee.</span>
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

          <div className="text-center">
            <CTAButton href="#assessment" size="lg">
              Audit Your Advisory Workflow
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
