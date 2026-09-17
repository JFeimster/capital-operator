/**
 * Capital Operator — Assessment Engine Tests
 * tests/assessmentEngine.test.ts
 */

import { calculateOperatingModel, evaluateAssessmentCompleteness } from '../src/lib/assessmentEngine';
import { AssessmentAnswers } from '../src/types';

export function runAssessmentEngineTests() {
  const emptyAnswers: AssessmentAnswers = {
    q3_leadSources: [],
    q9_breakdownPoints: [],
    q10_priorities: []
  };

  const completeness = evaluateAssessmentCompleteness(emptyAnswers);
  if (completeness.isComplete) {
    throw new Error('Test Failed: Empty assessment should not be complete');
  }

  const advancedAnswers: AssessmentAnswers = {
    q1_currentHandling: 'My team handles an active funding pipeline',
    q2_monthlyVolume: '200+',
    q3_leadSources: ['Direct marketing / paid traffic / outbound'],
    q4_pipelineLocation: 'Vertical lending software / loan origination system',
    q5_pursuingDecision: 'Automated intake with scoring rules',
    q6_documentHandling: 'Automated financial data extraction (Plaid, Heron, Inscribe, OCR)',
    q7_routingDecision: 'We use a structured lender matrix with defined criteria',
    q8_followUpAutomation: 'Fully automated sequences with human review points',
    q9_breakdownPoints: ['Lender responsiveness and condition clearing'],
    q10_priorities: ['Package deals faster with less effort'],
    q11_techBudget: '$2,000+/mo — enterprise infrastructure',
    q12_handsOnControl: 'Full operator — I want to build and run an end-to-end capital desk'
  };

  const model = calculateOperatingModel(advancedAnswers);
  if (model !== 'Capital Operator') {
    throw new Error(`Test Failed: Expected Capital Operator, got ${model}`);
  }

  return { passed: true, testName: 'runAssessmentEngineTests' };
}
