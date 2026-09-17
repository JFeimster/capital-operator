import React from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { SectionHeading } from '../site/SectionHeading';
import { CapabilityCard } from '../site/CapabilityCard';
import capabilitiesData from '../../data/capabilities.json';

export const CapabilityGrid: React.FC = () => {
  return (
    <Section id="capabilities" variant="contrast" borderBottom>
      <Container>
        <SectionHeading
          badge="CAPABILITY ARCHITECTURE"
          title="8 Core Capabilities of Modern Debt Desks"
          subtitle="The operational components required to underwrite and place commercial debt at scale."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilitiesData.capabilities.map((cap) => (
            <CapabilityCard
              key={cap.stage}
              stage={cap.stage}
              name={cap.name}
              level={cap.level}
              description={cap.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};
