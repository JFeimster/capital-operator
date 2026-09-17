import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SectionHeading } from '../components/site/SectionHeading';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { CommandPanel } from '../components/site/CommandPanel';
import { ShieldCheck, Target, Layers, ArrowRight } from 'lucide-react';
import { CTAButton } from '../components/site/CTAButton';

export const About: React.FC = () => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.about} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'About Moonshine Capital' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-4 inline-block font-semibold">
              ABOUT CAPITAL OPERATOR
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Building Open Infrastructure for Commercial Debt
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Capital Operator was engineered by Moonshine Capital to replace artisan, email-driven deal desks with standardized, automated capital placement systems.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <CommandPanel title="Our Conviction" badge="01">
              <p className="text-sm text-slate-300 leading-relaxed">
                Commercial debt should not be a black box of phone tag and document chasing. When borrower intake and financial verification follow structured data protocols, capital deployment accelerates by 5x.
              </p>
            </CommandPanel>

            <CommandPanel title="Operator-Led" badge="02">
              <p className="text-sm text-slate-300 leading-relaxed">
                We aren't software theorists. Our team has originated, underwritten, and syndicated commercial debt across senior bank credit, SBA 7(a), asset-backed facilities, and revenue-based facilities.
              </p>
            </CommandPanel>

            <CommandPanel title="Institutional Privacy" badge="03">
              <p className="text-sm text-slate-300 leading-relaxed">
                Capital Operator runs client-side in your browser. All diagnostic scoring and blueprint generation execute locally without requiring database storage or third-party tracking.
              </p>
            </CommandPanel>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 card-glow flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Evaluate Your Capital Pipeline
              </h3>
              <p className="text-sm text-slate-400">
                Run our 12-question diagnostic matrix to uncover automation leaks in your deal flow.
              </p>
            </div>
            <CTAButton href="#assessment">Launch Diagnostic</CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
