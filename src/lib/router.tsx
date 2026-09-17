import React from 'react';
import { Home } from '../pages/Home';
import { HowItWorks } from '../pages/HowItWorks';
import { ForAdvisors } from '../pages/ForAdvisors';
import { ForOperators } from '../pages/ForOperators';
import { ForPlatforms } from '../pages/ForPlatforms';
import { ForPartners } from '../pages/ForPartners';
import { CapitalStack } from '../pages/CapitalStack';
import { PublicToolPage } from '../components/tools/PublicToolPage';
import { PUBLIC_TOOLS, type PublicToolId } from '../config/publicTools';
import { Assessment } from '../pages/Assessment';
import { Blueprint } from '../pages/Blueprint';
import { Tools } from '../pages/Tools';
import { Ecosystem } from '../pages/Ecosystem';
import { Resources } from '../pages/Resources';
import { Docs } from '../pages/Docs';
import { About } from '../pages/About';
import { Methodology } from '../pages/Methodology';
import { PrivacyPolicy } from '../pages/PrivacyPolicy';
import { TermsOfService } from '../pages/TermsOfService';
import { NotFound } from '../pages/NotFound';
import { AssessmentAnswers, BlueprintResult } from '../types';

export interface RouterProps {
  currentRoute: string;
  answers: AssessmentAnswers;
  currentStep: number;
  isAssessing: boolean;
  blueprint: BlueprintResult | null;
  onUpdateAnswer: (step: number, answer: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSelectSituation: (situation: string) => void;
  onRestart: () => void;
  onStartAssessment: () => void;
}

export const AppRouter: React.FC<RouterProps> = ({
  currentRoute,
  answers,
  currentStep,
  isAssessing,
  blueprint,
  onUpdateAnswer,
  onNext,
  onBack,
  onSelectSituation,
  onRestart,
  onStartAssessment
}) => {
  const cleanRoute = currentRoute.replace(/^#?\/?/, '').split('?')[0].split('/')[0].toLowerCase();

  switch (cleanRoute) {
    case '':
    case 'home':
      return <Home />;

    case 'how-it-works':
      return <HowItWorks />;

    case 'for-advisors':
      return <ForAdvisors />;

    case 'for-operators':
      return <ForOperators />;

    case 'for-platforms':
      return <ForPlatforms />;

    case 'for-partners':
      return <ForPartners />;

    case 'capital-stack':
      return <CapitalStack />;

    case 'capital-stack-builder':
    case 'capital-ops-calculator':
    case 'capital-workflow-builder':
    case 'capital-tech-stack':
    case 'capital-readiness-audit':
    case 'embedded-capital-calculator':
    case 'referral-revenue-calculator':
      return <PublicToolPage tool={PUBLIC_TOOLS[cleanRoute as PublicToolId]} />;

    case 'assessment':
      return (
        <Assessment
          answers={answers}
          currentStep={currentStep}
          onUpdateAnswer={onUpdateAnswer}
          onNext={onNext}
          onBack={onBack}
          onSelectSituation={onSelectSituation}
          onRestart={onRestart}
        />
      );

    case 'blueprint':
      return (
        <Blueprint
          blueprint={blueprint}
          onRestart={onRestart}
          onRunDiagnostic={onStartAssessment}
        />
      );

    case 'tools':
      return <Tools />;

    case 'ecosystem':
      return <Ecosystem />;

    case 'resources':
      return <Resources />;

    case 'docs':
    case 'api':
      return <Docs />;

    case 'about':
      return <About />;

    case 'methodology':
      return <Methodology onBack={() => { window.location.hash = '#home'; }} />;

    case 'privacy':
    case 'privacypolicy':
      return <PrivacyPolicy onBack={() => { window.location.hash = '#home'; }} />;

    case 'terms':
    case 'termsofservice':
      return <TermsOfService onBack={() => { window.location.hash = '#home'; }} />;

    default:
      return <NotFound onBack={() => { window.location.hash = '#home'; }} />;
  }
};
