/**
 * Capital Operator — Application Router (Reconciled Phase 4B / C2)
 * src/lib/router.tsx
 */

import React from 'react';
import { Home } from '../pages/Home.js';
import { HowItWorks } from '../pages/HowItWorks.js';
import { ForAdvisors } from '../pages/ForAdvisors.js';
import { ForOperators } from '../pages/ForOperators.js';
import { ForPlatforms } from '../pages/ForPlatforms.js';
import { ForPartners } from '../pages/ForPartners.js';
import { CapitalStack } from '../pages/CapitalStack.js';
import { PublicToolPage } from '../components/tools/PublicToolPage.js';
import { PUBLIC_TOOLS, type PublicToolId } from '../config/publicTools.js';
import { Assessment } from '../pages/Assessment.js';
import { Blueprint } from '../pages/Blueprint.js';
import { Tools } from '../pages/Tools.js';
import { Ecosystem } from '../pages/Ecosystem.js';
import { Resources } from '../pages/Resources.js';
import { Docs } from '../pages/Docs.js';
import { About } from '../pages/About.js';
import { Methodology } from '../pages/Methodology.js';
import { PrivacyPolicy } from '../pages/PrivacyPolicy.js';
import { TermsOfService } from '../pages/TermsOfService.js';
import { NotFound } from '../pages/NotFound.js';
import { AssessmentAnswers, BlueprintResult } from '../types.js';

// C2 Knowledge, Operating Model, and Workflow Stage Imports
import { KNOWLEDGE_PAGES } from '../data/knowledgePages.js';
import { OPERATING_MODEL_ENTITIES } from '../data/operatingModelEntities.js';
import { WORKFLOW_STAGE_ENTITIES } from '../data/workflowStageEntities.js';
import { KnowledgePageTemplate } from '../components/knowledge/KnowledgePageTemplate';
import { OperatingModelPageTemplate } from '../components/models/OperatingModelPageTemplate';
import { WorkflowStagePageTemplate } from '../components/workflow/WorkflowStagePageTemplate';

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
  const rawPath = currentRoute.split('?')[0].replace(/^#?\/?/, '').toLowerCase();
  const segments = rawPath.split('/').filter(Boolean);
  const primarySegment = segments[0] || '';
  const subSegment = segments[1] || '';

  if (primarySegment === 'learn' && subSegment) {
    const page = KNOWLEDGE_PAGES[subSegment];
    if (page) {
      return <KnowledgePageTemplate page={page} />;
    }
  }

  if (primarySegment === 'models' && subSegment) {
    const model = OPERATING_MODEL_ENTITIES[subSegment];
    if (model) {
      return <OperatingModelPageTemplate model={model} />;
    }
  }

  if (primarySegment === 'workflow' && subSegment) {
    const stage = WORKFLOW_STAGE_ENTITIES[subSegment];
    if (stage) {
      return <WorkflowStagePageTemplate stage={stage} />;
    }
  }

  if (primarySegment in PUBLIC_TOOLS) {
    return <PublicToolPage tool={PUBLIC_TOOLS[primarySegment as PublicToolId]} />;
  }

  switch (primarySegment) {
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
