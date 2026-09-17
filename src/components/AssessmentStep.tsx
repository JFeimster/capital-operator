/**
 * Capital Operator — Assessment Step Experience
 * src/components/AssessmentStep.tsx
 */

import React, { useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Check, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AssessmentAnswers } from '../types';

interface QuestionDef {
  id: number;
  question: string;
  subtext?: string;
  type: 'single' | 'multi';
  maxSelections?: number;
  options: string[];
}

export const QUESTIONS: QuestionDef[] = [
  {
    id: 1,
    question: "How are you handling capital opportunities today?",
    subtext: "Select the operating situation that most accurately reflects your starting point.",
    type: 'single',
    options: [
      "I want to add capital as a new revenue line",
      "I personally manage deals from lead to funding",
      "My team handles an active funding pipeline",
      "I refer capital opportunities elsewhere today",
      "Clients ask me about funding, but it isn't a core service",
      "My users need capital inside my platform or ecosystem"
    ]
  },
  {
    id: 2,
    question: "About how many capital opportunities touch your business each month?",
    subtext: "Include inquiries, client requests, form fills, or potential referrals.",
    type: 'single',
    options: [
      "Under 10",
      "10–25",
      "26–75",
      "76–200",
      "200+"
    ]
  },
  {
    id: 3,
    question: "Where do those opportunities come from today?",
    subtext: "Select all primary channels generating financing inquiries.",
    type: 'multi',
    options: [
      "Website forms",
      "Referrals",
      "Existing clients",
      "Affiliate partners",
      "Paid leads",
      "Cold outreach",
      "Social media",
      "Email",
      "SaaS / platform users",
      "Community / membership",
      "Manual entry",
      "Other"
    ]
  },
  {
    id: 4,
    question: "Where does your pipeline live?",
    subtext: "The primary tool or system where opportunity status is tracked.",
    type: 'single',
    options: [
      "Mostly in my head / inbox",
      "Spreadsheet",
      "Notion",
      "HubSpot",
      "GoHighLevel",
      "Salesforce",
      "Another CRM",
      "Multiple disconnected systems",
      "No real system yet"
    ]
  },
  {
    id: 5,
    question: "How do you decide whether an opportunity is worth pursuing?",
    subtext: "How business viability and credit readiness are evaluated before deep effort.",
    type: 'single',
    options: [
      "Manual review",
      "Intake form + manual review",
      "Basic eligibility rules",
      "CRM workflows",
      "Automated prequalification",
      "AI-assisted review",
      "It depends on the operator"
    ]
  },
  {
    id: 6,
    question: "How are documents and financial information handled?",
    subtext: "Bank statements, tax returns, P&L, debt schedules, and file collection.",
    type: 'single',
    options: [
      "Mostly email attachments",
      "Shared folders",
      "CRM uploads",
      "Structured data room",
      "Automated extraction / document AI",
      "Mixed depending on the deal",
      "We do not have a defined process"
    ]
  },
  {
    id: 7,
    question: "How do you decide where an opportunity should go?",
    subtext: "Selecting the right lender, capital product, or funding partner.",
    type: 'single',
    options: [
      "Memory and experience",
      "Spreadsheet / lender matrix",
      "Internal playbook",
      "CRM rules",
      "Matching software",
      "AI-assisted routing",
      "Partner handles it after referral",
      "We do not have a consistent process"
    ]
  },
  {
    id: 8,
    question: "How much of your follow-up happens automatically?",
    subtext: "Document reminders, stage updates, scheduling, and check-ins.",
    type: 'single',
    options: [
      "Almost none",
      "Basic email sequences",
      "CRM reminders",
      "CRM workflows",
      "Multi-channel automation",
      "AI-assisted follow-up",
      "Advanced agent workflows"
    ]
  },
  {
    id: 9,
    question: "Where does the machine break down today?",
    subtext: "Select up to 3 biggest operational friction points.",
    type: 'multi',
    maxSelections: 3,
    options: [
      "Not enough capital opportunities entering the pipeline",
      "Too much time wasted on opportunities that were never viable",
      "I don't know enough about the business before I engage",
      "I'm chasing documents instead of moving deals",
      "Every deal requires too much manual analysis",
      "Finding the right capital still depends on memory and guesswork",
      "Packaging and submitting deals takes too long",
      "Good opportunities go cold between touches",
      "I fund or refer the deal and lose the future relationship",
      "My operation lives in too many disconnected systems"
    ]
  },
  {
    id: 10,
    question: "What matters most right now?",
    subtext: "Select up to 3 highest priority business objectives.",
    type: 'multi',
    maxSelections: 3,
    options: [
      "More qualified opportunities",
      "Faster qualification",
      "Less manual work",
      "Faster document collection",
      "Better capital matching",
      "More completed submissions",
      "Better follow-up",
      "Higher close rate",
      "Better partner management",
      "Keep customers inside my ecosystem",
      "Add capital as a new revenue line",
      "Build an AI-first operation"
    ]
  },
  {
    id: 11,
    question: "How much are you willing to spend on technology right now?",
    subtext: "Monthly software and operational infrastructure budget.",
    type: 'single',
    options: [
      "Free / bootstrap",
      "Under $250 per month",
      "$250–$750 per month",
      "$750–$2,000 per month",
      "$2,000+ per month"
    ]
  },
  {
    id: 12,
    question: "How hands-on do you want to remain?",
    subtext: "Your preferred boundary between autonomous systems and human judgment.",
    type: 'single',
    options: [
      "I want maximum control",
      "Automate repetitive work, keep decisions human",
      "I want aggressive automation with approvals",
      "I want most operations handled by systems unless judgment is required"
    ]
  }
];

interface AssessmentStepProps {
  currentStep: number;
  answers: AssessmentAnswers;
  onUpdateAnswer: (step: number, answer: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AssessmentStep: React.FC<AssessmentStepProps> = ({
  currentStep,
  answers,
  onUpdateAnswer,
  onNext,
  onBack
}) => {
  const qIndex = currentStep - 1;
  const q = QUESTIONS[qIndex];

  // Get current answer value
  const getCurrentAnswer = useCallback((): string | string[] => {
    switch (currentStep) {
      case 1: return answers.q1_currentHandling || '';
      case 2: return answers.q2_monthlyVolume || '';
      case 3: return answers.q3_leadSources || [];
      case 4: return answers.q4_pipelineLocation || '';
      case 5: return answers.q5_pursuingDecision || '';
      case 6: return answers.q6_documentHandling || '';
      case 7: return answers.q7_routingDecision || '';
      case 8: return answers.q8_followUpAutomation || '';
      case 9: return answers.q9_breakdownPoints || [];
      case 10: return answers.q10_priorities || [];
      case 11: return answers.q11_techBudget || '';
      case 12: return answers.q12_handsOnControl || '';
      default: return '';
    }
  }, [currentStep, answers]);

  const currentVal = getCurrentAnswer();

  // Check validity
  const isValid = (): boolean => {
    if (q.type === 'single') {
      return typeof currentVal === 'string' && currentVal.trim().length > 0;
    }
    if (q.type === 'multi') {
      const arr = Array.isArray(currentVal) ? currentVal : [];
      if (arr.length === 0) return false;
      if (q.maxSelections && arr.length > q.maxSelections) return false;
      return true;
    }
    return false;
  };

  const handleSelectOption = (option: string) => {
    if (q.type === 'single') {
      onUpdateAnswer(currentStep, option);
    } else {
      const arr = Array.isArray(currentVal) ? [...currentVal] : [];
      const exists = arr.includes(option);
      if (exists) {
        onUpdateAnswer(currentStep, arr.filter(item => item !== option));
      } else {
        if (q.maxSelections && arr.length >= q.maxSelections) {
          // If max reached, replace oldest or block
          return;
        }
        onUpdateAnswer(currentStep, [...arr, option]);
      }
    }
  };

  // Keyboard shortcut listener for options (1-9) and Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Enter' && isValid()) {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft' && currentStep > 1) {
        e.preventDefault();
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isValid, onNext, onBack, currentStep]);

  const selectedCount = Array.isArray(currentVal) ? currentVal.length : 0;
  const progressPercent = Math.round((currentStep / QUESTIONS.length) * 100);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      
      {/* Step Header & Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-2.5">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            CHECKPOINT {currentStep} OF {QUESTIONS.length}
          </span>
          <span>{progressPercent}% COMPLETE</span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
            initial={{ width: `${((currentStep - 1) / QUESTIONS.length) * 100}%` }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Header */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {q.question}
            </h2>
            {q.subtext && (
              <p className="mt-2.5 text-sm sm:text-base text-slate-400">
                {q.subtext}
              </p>
            )}

            {q.type === 'multi' && q.maxSelections && (
              <div className="mt-3 inline-flex items-center space-x-1.5 rounded-full bg-slate-800/80 px-3 py-1 text-xs font-mono-code text-slate-300">
                <span>Selected: {selectedCount} / {q.maxSelections}</span>
                {selectedCount >= q.maxSelections && (
                  <span className="text-emerald-400 font-semibold">(Max reached)</span>
                )}
              </div>
            )}
          </div>

          {/* Option Cards */}
          <div className="space-y-3">
            {q.options.map((option, idx) => {
              const isSelected = q.type === 'single'
                ? currentVal === option
                : Array.isArray(currentVal) && currentVal.includes(option);

              const isMaxReached = q.type === 'multi' && q.maxSelections && selectedCount >= q.maxSelections && !isSelected;

              return (
                <div
                  key={option}
                  onClick={() => !isMaxReached && handleSelectOption(option)}
                  className={`group relative flex items-center justify-between rounded-xl border p-4 sm:p-5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/20 text-white shadow-lg shadow-emerald-500/10'
                      : isMaxReached
                      ? 'border-slate-800/40 bg-slate-900/20 text-slate-500 cursor-not-allowed opacity-60'
                      : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-800/80 text-[11px] font-mono-code text-slate-400">
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-medium leading-normal">
                      {option}
                    </span>
                  </div>

                  <div className="shrink-0">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-500 text-slate-950'
                          : 'border-slate-700 bg-slate-800/40'
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={onBack}
                className="inline-flex items-center space-x-2 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={onNext}
              disabled={!isValid()}
              className={`inline-flex items-center space-x-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-all cursor-pointer ${
                isValid()
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
              }`}
            >
              <span>{currentStep === QUESTIONS.length ? 'Generate My Blueprint' : 'Continue'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};
