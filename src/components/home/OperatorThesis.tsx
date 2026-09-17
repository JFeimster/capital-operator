import React from 'react';
import { HOMEPAGE_CONFIG } from '../../config/homepage';
import { SectionHeading } from '../site/SectionHeading';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { FeatureCard } from '../site/FeatureCard';
import { Layers, ShieldCheck, Zap } from 'lucide-react';

export const OperatorThesis: React.FC = () => {
  const { thesis } = HOMEPAGE_CONFIG;
  const icons = [<Layers key="1" className="h-6 w-6" />, <Zap key="2" className="h-6 w-6" />, <ShieldCheck key="3" className="h-6 w-6" />];

  return (
    <Section id="operator-thesis" variant="contrast" borderTop borderBottom>
      <Container>
        <SectionHeading
          badge={thesis.badge}
          title={thesis.headline}
          subtitle={thesis.statement}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {thesis.points.map((pt, idx) => (
            <FeatureCard
              key={idx}
              icon={icons[idx % icons.length]}
              title={pt.title}
              description={pt.description}
              badge={`RULE 0${idx + 1}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};
