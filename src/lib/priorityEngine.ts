/**
 * Capital Operator — Stage Priority & Friction Evaluator
 * src/lib/priorityEngine.ts
 */

import { AssessmentAnswers, StagePriority } from '../types';

export function determineStagePriority(
  stageNumber: number,
  answers: AssessmentAnswers
): StagePriority {
  const frictionPoints = answers.q9_breakdownPoints || [];
  const priorities = answers.q10_priorities || [];

  // Stage 1: Demand & Intake
  if (stageNumber === 1) {
    if (frictionPoints.some((f) => f.includes('Sorting through unqualified')) ||
        priorities.some((p) => p.includes('Know in 60 seconds'))) {
      return 'FIX NOW';
    }
    if (!answers.q4_pipelineLocation || answers.q4_pipelineLocation.includes('Email') || answers.q4_pipelineLocation.includes('Spreadsheets')) {
      return 'FIX NOW';
    }
    return 'BUILD NEXT';
  }

  // Stage 2: Qualify & Triage
  if (stageNumber === 2) {
    if (priorities.some((p) => p.includes('Know in 60 seconds')) ||
        answers.q5_pursuingDecision?.includes('Gut feel')) {
      return 'FIX NOW';
    }
    return 'BUILD NEXT';
  }

  // Stage 3: Collect & Verify
  if (stageNumber === 3) {
    if (frictionPoints.some((f) => f.includes('borrowers to send documents')) ||
        priorities.some((p) => p.includes('Stop chasing documents'))) {
      return 'FIX NOW';
    }
    if (answers.q6_documentHandling?.includes('email')) {
      return 'FIX NOW';
    }
    return 'BUILD NEXT';
  }

  // Stage 4: Synthesize & Credit Memo
  if (stageNumber === 4) {
    if (frictionPoints.some((f) => f.includes('Manual data entry')) ||
        priorities.some((p) => p.includes('Package deals faster'))) {
      return 'FIX NOW';
    }
    return 'BUILD NEXT';
  }

  // Stage 5: Capital Matching & Routing
  if (stageNumber === 5) {
    if (frictionPoints.some((f) => f.includes('Knowing which lender')) ||
        priorities.some((p) => p.includes('Route to the right lender'))) {
      return 'FIX NOW';
    }
    return 'BUILD NEXT';
  }

  // Stage 6: Submission Management
  if (stageNumber === 6) {
    if (answers.q7_routingDecision?.includes('multiple lenders simultaneously')) {
      return 'FIX NOW';
    }
    return 'LATER';
  }

  // Stage 7: Clear & Close
  if (stageNumber === 7) {
    if (frictionPoints.some((f) => f.includes('Lender responsiveness')) ||
        frictionPoints.some((f) => f.includes('Borrowers going dark'))) {
      return 'FIX NOW';
    }
    return 'LATER';
  }

  // Stage 8: Service & Compounding Lifecycle
  if (stageNumber === 8) {
    return 'LATER';
  }

  return 'BUILD NEXT';
}
