/**
 * Capital Operator — Recommendation Engine Tests
 * tests/recommendationEngine.test.ts
 */

import { generateBlueprint } from '../src/lib/recommendationEngine';
import { AssessmentAnswers } from '../src/types';

export function runRecommendationEngineTests() {
  const mockAnswers: AssessmentAnswers = {
    q1_currentHandling: 'I refer capital opportunities elsewhere today',
    q2_monthlyVolume: 'Under 10',
    q3_leadSources: ['Existing clients or customer base'],
    q4_pipelineLocation: 'Email inbox / memory / sticky notes',
    q5_pursuingDecision: 'Gut feel after talking to the borrower',
    q6_documentHandling: 'Borrowers email them, we download and organize manually',
    q7_routingDecision: 'I send to the 1-2 lenders or brokers I know best',
    q8_followUpAutomation: 'Almost nothing — every email, text, and call is manual',
    q9_breakdownPoints: ['Getting borrowers to send documents'],
    q10_priorities: ['Stop chasing documents manually'],
    q11_techBudget: '$0 — using free tools, email, and spreadsheets',
    q12_handsOnControl: 'Hands-off — I want to introduce deals and receive partner revenue'
  };

  const blueprint = generateBlueprint(mockAnswers);

  if (!blueprint.operatingModel) {
    throw new Error('Test Failed: blueprint should have an operating model');
  }
  if (!blueprint.stages || blueprint.stages.length !== 8) {
    throw new Error(`Test Failed: blueprint should have 8 stages, got ${blueprint.stages?.length}`);
  }
  if (!blueprint.roadmap || !blueprint.roadmap.first7Days) {
    throw new Error('Test Failed: blueprint should contain a first 7 days roadmap');
  }

  return { passed: true, testName: 'runRecommendationEngineTests' };
}
