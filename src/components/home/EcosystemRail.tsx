import React from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { SectionHeading } from '../site/SectionHeading';
import { EcosystemProductCard } from '../site/EcosystemProductCard';
import { ECOSYSTEM_PRODUCTS } from '../../config/ecosystemProducts';

export const EcosystemRail: React.FC = () => {
  return (
    <Section id="ecosystem" borderBottom>
      <Container>
        <SectionHeading
          badge="MOONSHINE CAPITAL ECOSYSTEM"
          title="Integrated Products & Operating Engines"
          subtitle="A unified suite of specialized underwriting calculators, intake engines, and syndicate desks."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ECOSYSTEM_PRODUCTS.map((prod) => (
            <EcosystemProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
