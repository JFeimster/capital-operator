import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { CTAButton } from '../components/site/CTAButton';
import { CheckCircle2, Cpu, Zap, ArrowRight } from 'lucide-react';

export const ForOperators: React.FC = () => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.forOperators} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'For Loan Brokers & Operators' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              ROLE PLAYBOOK: COMMERCIAL LOAN BROKERS
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Scale Velocity & Placement Yield
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Transform an email-clogged broker desk into an automated deal syndication engine that closes deals 3x faster.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 card-glow">
              <div className="font-mono text-xs text-emerald-400 mb-2">SPEED</div>
              <h3 className="text-lg font-bold text-white mb-2">Automated Document Scrubbing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extract bank deposits, calculate monthly cash flows, and spot NSF risks automatically with OCR pipelines.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 card-glow">
              <div className="font-mono text-xs text-cyan-400 mb-2">PRECISION</div>
              <h3 className="text-lg font-bold text-white mb-2">Lender Buy-Box Routing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stop blind submissions. Match borrower profiles to exact lender risk appetites to eliminate decline delays.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 card-glow">
              <div className="font-mono text-xs text-amber-400 mb-2">RETENTION</div>
              <h3 className="text-lg font-bold text-white mb-2">Lifetime Renewal Triggers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Capture repeat borrowing revenue by triggering automated line renewal check-ins at 60 and 120 days post-funding.
              </p>
            </div>
          </div>

          <div className="text-center">
            <CTAButton href="#assessment" size="lg">
              Launch Broker Desk Audit
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
