/**
 * Capital Operator — Main Application & Shell
 * Moonshine Capital
 */

import React, { useState, useEffect } from 'react';
import { SiteShell } from './components/layout/SiteShell';
import { AppRouter } from './lib/router';
import { PrintView } from './components/PrintView';
import { QUESTIONS } from './components/AssessmentStep';
import { AssessmentAnswers, BlueprintResult } from './types';
import { generateBlueprint } from './lib/recommendationEngine';
import { trackEvent } from './lib/analytics';
import { captureAttribution, updateAttributionDiagnostic } from './lib/attribution';
import { resolveAppLocation, toAppHref } from './lib/routeLocation';

const INITIAL_ANSWERS: AssessmentAnswers = {
  q1_currentHandling: '',
  q2_monthlyVolume: '',
  q3_leadSources: [],
  q4_pipelineLocation: '',
  q5_pursuingDecision: '',
  q6_documentHandling: '',
  q7_routingDecision: '',
  q8_followUpAutomation: '',
  q9_breakdownPoints: [],
  q10_priorities: [],
  q11_techBudget: '',
  q12_handsOnControl: ''
};

export default function App() {
  const [answers, setAnswers] = useState<AssessmentAnswers>(() => {
    try {
      const saved = localStorage.getItem('capital_operator_answers');
      return saved ? JSON.parse(saved) : INITIAL_ANSWERS;
    } catch {
      return INITIAL_ANSWERS;
    }
  });

  const [currentStep, setCurrentStep] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('capital_operator_step');
      return saved ? Math.max(1, Math.min(parseInt(saved, 10), QUESTIONS.length)) : 1;
    } catch {
      return 1;
    }
  });

  const [isAssessing, setIsAssessing] = useState<boolean>(() => {
    try {
      return localStorage.getItem('capital_operator_is_assessing') === 'true';
    } catch {
      return false;
    }
  });

  const [blueprint, setBlueprint] = useState<BlueprintResult | null>(() => {
    try {
      const saved = localStorage.getItem('capital_operator_blueprint');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const activeLocation = () =>
    resolveAppLocation(window.location.pathname, window.location.hash, import.meta.env.BASE_URL);

  const [currentRoute, setCurrentRoute] = useState<string>(activeLocation);

  useEffect(() => {
    captureAttribution();
    const syncRoute = () => setCurrentRoute(activeLocation());
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('capital_operator_answers', JSON.stringify(answers));
      localStorage.setItem('capital_operator_step', currentStep.toString());
      localStorage.setItem('capital_operator_is_assessing', isAssessing ? 'true' : 'false');
      if (blueprint) localStorage.setItem('capital_operator_blueprint', JSON.stringify(blueprint));
      else localStorage.removeItem('capital_operator_blueprint');
    } catch {
      // Non-blocking browser storage failure.
    }
  }, [answers, currentStep, isAssessing, blueprint]);

  const navigate = (path: string) => {
    const href = toAppHref(path);
    if (href.startsWith('#')) window.location.hash = href.slice(1);
    else window.location.assign(href);
  };

  const handleStartAssessment = () => {
    setIsAssessing(true);
    trackEvent('capital_operator_started');
    navigate('/assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSituation = (situationText: string) => {
    setAnswers(prev => ({ ...prev, q1_currentHandling: situationText }));
    setCurrentStep(2);
    setIsAssessing(true);
    trackEvent('capital_operator_started', { situation: situationText });
    navigate('/assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAnswer = (step: number, answer: string | string[]) => {
    setAnswers(prev => {
      const updated = { ...prev };
      switch (step) {
        case 1: updated.q1_currentHandling = answer as string; break;
        case 2: updated.q2_monthlyVolume = answer as string; break;
        case 3: updated.q3_leadSources = answer as string[]; break;
        case 4: updated.q4_pipelineLocation = answer as string; break;
        case 5: updated.q5_pursuingDecision = answer as string; break;
        case 6: updated.q6_documentHandling = answer as string; break;
        case 7: updated.q7_routingDecision = answer as string; break;
        case 8: updated.q8_followUpAutomation = answer as string; break;
        case 9: updated.q9_breakdownPoints = answer as string[]; break;
        case 10: updated.q10_priorities = answer as string[]; break;
        case 11: updated.q11_techBudget = answer as string; break;
        case 12: updated.q12_handsOnControl = answer as string; break;
      }
      return updated;
    });
  };

  const handleNext = () => {
    trackEvent('assessment_step_completed', { step: currentStep });
    if (currentStep < QUESTIONS.length) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const result = generateBlueprint(answers);
    setBlueprint(result);
    setIsAssessing(false);
    updateAttributionDiagnostic(result.segment, result.operatingModel);
    trackEvent('assessment_completed', { operatingModel: result.operatingModel, segment: result.segment });
    trackEvent('blueprint_generated');
    navigate('/blueprint');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    try {
      localStorage.removeItem('capital_operator_answers');
      localStorage.removeItem('capital_operator_step');
      localStorage.removeItem('capital_operator_is_assessing');
      localStorage.removeItem('capital_operator_blueprint');
    } catch {
      // Non-blocking.
    }
    setAnswers(INITIAL_ANSWERS);
    setCurrentStep(1);
    setIsAssessing(false);
    setBlueprint(null);
    trackEvent('assessment_restarted');
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SiteShell currentRoute={currentRoute}>
      <AppRouter
        currentRoute={currentRoute}
        answers={answers}
        currentStep={currentStep}
        isAssessing={isAssessing}
        blueprint={blueprint}
        onUpdateAnswer={handleUpdateAnswer}
        onNext={handleNext}
        onBack={handleBack}
        onSelectSituation={handleSelectSituation}
        onRestart={handleRestart}
        onStartAssessment={handleStartAssessment}
      />
      {blueprint && <PrintView blueprint={blueprint} />}
    </SiteShell>
  );
}
