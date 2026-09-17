import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { AssessmentHero } from '../components/assessment/AssessmentHero';
import { AssessmentStep, QUESTIONS } from '../components/AssessmentStep';
import { AssessmentAnswers, BlueprintResult } from '../types';
import { Breadcrumbs } from '../components/site/Breadcrumbs';

export interface AssessmentPageProps {
  answers: AssessmentAnswers;
  currentStep: number;
  onUpdateAnswer: (step: number, answer: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSelectSituation?: (situation: string) => void;
  onRestart?: () => void;
}

export const Assessment: React.FC<AssessmentPageProps> = ({
  answers,
  currentStep,
  onUpdateAnswer,
  onNext,
  onBack,
  onSelectSituation,
  onRestart
}) => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.assessment} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'Operational Diagnostic' }]} className="mb-6" />
          <AssessmentHero />
        </Container>
      </div>

      <Section>
        <Container size="md">
          <AssessmentStep
            currentStep={currentStep}
            answers={answers}
            onUpdateAnswer={onUpdateAnswer}
            onNext={onNext}
            onBack={onBack}
          />
        </Container>
      </Section>
    </>
  );
};
