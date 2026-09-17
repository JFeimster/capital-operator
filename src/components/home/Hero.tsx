import React from 'react';
import { ArrowRight, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { HOMEPAGE_CONFIG } from '../../config/homepage';
import { Badge } from '../site/Badge';
import { StatCard } from '../site/StatCard';
import { CTAButton } from '../site/CTAButton';
import { Container } from '../layout/Container';

export const Hero: React.FC = () => {
  const { hero } = HOMEPAGE_CONFIG;

  return (
    <div className="relative py-20 sm:py-28 overflow-hidden bg-grid-pattern">
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <Badge variant="emerald" icon={<Terminal className="h-3 w-3" />}>
              {hero.badge}
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Turn Borrowing Demand Into An{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Operating System.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            {hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <CTAButton
              href={hero.primaryAction.href}
              size="lg"
              className="w-full sm:w-auto text-base"
            >
              {hero.primaryAction.label}
            </CTAButton>
            <CTAButton
              href={hero.secondaryAction.href}
              variant="secondary"
              size="lg"
              showArrow={false}
              className="w-full sm:w-auto text-base"
            >
              {hero.secondaryAction.label}
            </CTAButton>
          </div>

          {/* Metric Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            {hero.metrics.map((metric, idx) => (
              <StatCard
                key={idx}
                label={metric.label}
                value={metric.value}
                desc={metric.desc}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
