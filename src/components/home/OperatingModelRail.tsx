import React from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { SectionHeading } from '../site/SectionHeading';
import { OperatingModelCard } from '../site/OperatingModelCard';
import modelsData from '../../data/operating-models.json';

export const OperatingModelRail: React.FC = () => {
  return (
    <Section id="operating-models" borderBottom>
      <Container>
        <SectionHeading
          badge="OPERATING MATURITY"
          title="The 4 Operating Models of Commercial Debt Desks"
          subtitle="From artisan broker practices to autonomous programmatic capital distribution."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modelsData.models.map((model) => (
            <OperatingModelCard
              key={model.id}
              id={model.id}
              name={model.name}
              stage={model.stage}
              description={model.description}
              unlock={model.unlock}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};
