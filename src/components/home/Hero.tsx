import React from 'react';
import { Terminal } from 'lucide-react';
import { HOMEPAGE_CONFIG } from '../../config/homepage';
import { Badge } from '../site/Badge';
import { StatCard } from '../site/StatCard';
import { CTAButton } from '../site/CTAButton';
import { Container } from '../layout/Container';
import { toAppHref } from '../../lib/routeLocation';

export const Hero: React.FC = () => {
  const { hero } = HOMEPAGE_CONFIG;

  return (
    <div className="relative pt-20 sm:pt-28 pb-8 overflow-hidden bg-grid-pattern">
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <Badge variant="emerald" icon={<Terminal className="h-3 w-3" />}>
              {hero.badge}
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.02] mb-6">
            Turn Capital Demand Into an{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300">
              Operating System.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-9">
            {hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <CTAButton href={toAppHref(hero.primaryAction.href)} size="lg" className="w-full sm:w-auto text-base px-7">
              {hero.primaryAction.label}
            </CTAButton>
            <CTAButton
              href={toAppHref(hero.secondaryAction.href)}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-base px-7"
            >
              {hero.secondaryAction.label}
            </CTAButton>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto text-left">
            {hero.metrics.map((metric, idx) => (
              <StatCard key={idx} label={metric.label} value={metric.value} desc={metric.desc} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
