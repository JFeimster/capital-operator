import React from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { SectionHeading } from '../site/SectionHeading';
import { WorkflowStageCard } from '../site/WorkflowStageCard';
import workflowData from '../../data/workflow-stages.json';

export const WorkflowArchitecture: React.FC = () => {
  return (
    <Section id="workflow-architecture" borderBottom>
      <Container>
        <SectionHeading
          badge="STAGE-BY-STAGE BLUEPRINT"
          title="The 8-Stage Operating Workflow"
          subtitle="Pinpoint where manual leaks drain revenue, and review the exact system fixes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowData.stages.map((stage) => (
            <WorkflowStageCard
              key={stage.id}
              code={stage.code}
              name={stage.name}
              category={stage.category}
              description={stage.description}
              leakMetric={stage.leakMetric}
              fix={stage.fix}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};
