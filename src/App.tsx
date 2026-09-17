/**
 * Capital Operator — Main Application
 * Moonshine Capital
 * src/App.tsx
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PositioningSection } from './components/PositioningSection';
import { AudienceCards } from './components/AudienceCards';
import { AssessmentIntro } from './components/AssessmentIntro';
import { AssessmentStep, QUESTIONS } from './components/AssessmentStep';
import { ResultsView } from './components/ResultsView';
import { PrintView } from './components/PrintView';
import { Footer } from './components/Footer';
import { CapitalArchitectureMap } from './components/CapitalArchitectureMap';
import { AssessmentAnswers, BlueprintResult } from './types';
import { generateBlueprint } from './lib/recommendationEngine';
import { trackEvent } from './lib/analytics';

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
    } catch (e) {
      return INITIAL_ANSWERS;
    }
  });

  const [currentStep, setCurrentStep] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('capital_operator_step');
      return saved ? Math.max(1, Math.min(parseInt(saved, 10), QUESTIONS.length)) : 1;
    } catch (e) {
      return 1;
    }
  });

  const [isAssessing, setIsAssessing] = useState<boolean>(() => {
    try {
      return localStorage.getItem('capital_operator_is_assessing') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [blueprint, setBlueprint] = useState<BlueprintResult | null>(() => {
    try {
      const saved = localStorage.getItem('capital_operator_blueprint');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Persist state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('capital_operator_answers', JSON.stringify(answers));
      localStorage.setItem('capital_operator_step', currentStep.toString());
      localStorage.setItem('capital_operator_is_assessing', isAssessing ? 'true' : 'false');
      if (blueprint) {
        localStorage.setItem('capital_operator_blueprint', JSON.stringify(blueprint));
      } else {
        localStorage.removeItem('capital_operator_blueprint');
      }
    } catch (e) {
      // Storage quota or private browsing
    }
  }, [answers, currentStep, isAssessing, blueprint]);

  const handleStartAssessment = () => {
    setIsAssessing(true);
    trackEvent('capital_operator_started');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSituation = (situationText: string) => {
    setAnswers(prev => ({
      ...prev,
      q1_currentHandling: situationText
    }));
    setCurrentStep(2);
    setIsAssessing(true);
    trackEvent('capital_operator_started', { situation: situationText });
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
    } else {
      // Completed all 12 questions -> generate blueprint
      const result = generateBlueprint(answers);
      setBlueprint(result);
      setIsAssessing(false);
      trackEvent('assessment_completed', {
        operatingModel: result.operatingModel,
        segment: result.segment
      });
      trackEvent('blueprint_generated');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    } catch (e) {
      // Non-blocking
    }
    setAnswers(INITIAL_ANSWERS);
    setCurrentStep(1);
    setIsAssessing(false);
    setBlueprint(null);
    trackEvent('assessment_restarted');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreStack = () => {
    const el = document.getElementById('architecture-preview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleStartAssessment();
    }
  };

  return (
    <div className="min-h-screen bg-[#07090d] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar
        onStartAssessment={handleStartAssessment}
        onRestart={handleRestart}
        hasStarted={isAssessing || blueprint !== null || answers.q1_currentHandling !== ''}
        isCompleted={blueprint !== null}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: Diagnostic Questionnaire in progress */}
        {isAssessing && (
          <div className="no-print">
            <AssessmentStep
              currentStep={currentStep}
              answers={answers}
              onUpdateAnswer={handleUpdateAnswer}
              onNext={handleNext}
              onBack={handleBack}
            />
          </div>
        )}

        {/* VIEW 2: Results View (Blueprint Generated) */}
        {!isAssessing && blueprint && (
          <div>
            <div className="no-print">
              <ResultsView
                blueprint={blueprint}
                onRestart={handleRestart}
              />
            </div>

            {/* Hidden except during window.print() */}
            <PrintView blueprint={blueprint} />
          </div>
        )}

        {/* VIEW 3: Landing / Assessment Introduction */}
        {!isAssessing && !blueprint && (
          <div className="no-print">
            <Hero
              onStartAssessment={handleStartAssessment}
              onExploreStack={handleExploreStack}
            />

            <PositioningSection
              onStartAssessment={handleStartAssessment}
            />

            <AudienceCards
              onSelectSituation={handleSelectSituation}
            />

            {/* Architecture Preview Section */}
            <div id="architecture-preview" className="py-16 bg-[#07090d] border-b border-slate-800/80">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-4">
                  <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase font-mono-code">
                    INTERACTIVE PREVIEW
                  </span>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    The Modern Capital Stack
                  </h2>
                  <p className="mt-3 text-base text-slate-400">
                    Explore how repetitive administrative workflows, AI synthesis, and human judgment collaborate across an active deal lifecycle.
                  </p>
                </div>

                <CapitalArchitectureMap />
              </div>
            </div>

            <AssessmentIntro
              onStart={handleStartAssessment}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
