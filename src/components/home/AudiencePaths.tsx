import React from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { SectionHeading } from '../site/SectionHeading';
import { AUDIENCE_PATHS } from '../../config/audiences';
import { AudienceCard } from '../site/AudienceCard';

export const AudiencePaths: React.FC = () => {
  return (
    <Section id="audience-paths" variant="elevated" borderBottom>
      <Container>
        <SectionHeading
          badge="TARGET AUDIENCES"
          title="Engineered for Every Capital Role"
          subtitle="Whether you advise portfolio clients, broker high-volume debt, or operate an embedded fintech desk."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AUDIENCE_PATHS.map((audience) => (
            <AudienceCard key={audience.id} audience={audience} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
