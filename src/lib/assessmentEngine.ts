/**
 * Capital Operator — Assessment Calculation Engine
 * src/lib/assessmentEngine.ts
 */

import { AssessmentAnswers, OperatingModelType, StagePriority } from '../types';
import { OPERATING_MODEL_THRESHOLDS } from '../config/scoring';

export function calculateOperatingModel(answers: AssessmentAnswers): OperatingModelType {
  let score = 0;

  // Q1: Current handling
  if (answers.q1_currentHandling?.includes('new revenue')) score += 2;
  else if (answers.q1_currentHandling?.includes('personally manage')) score += 4;
  else if (answers.q1_currentHandling?.includes('team handles')) score += 8;
  else if (answers.q1_currentHandling?.includes('refer')) score += 3;
  else if (answers.q1_currentHandling?.includes('platform')) score += 9;

  // Q2: Volume
  if (answers.q2_monthlyVolume === '10–25') score += 3;
  else if (answers.q2_monthlyVolume === '26–75') score += 6;
  else if (answers.q2_monthlyVolume === '76–200') score += 9;
  else if (answers.q2_monthlyVolume === '200+') score += 12;

  // Q4: Pipeline location
  if (answers.q4_pipelineLocation?.includes('Spreadsheets')) score += 3;
  else if (answers.q4_pipelineLocation?.includes('Standard CRM')) score += 7;
  else if (answers.q4_pipelineLocation?.includes('Vertical lending')) score += 10;
  else if (answers.q4_pipelineLocation?.includes('Proprietary')) score += 12;

  // Q6: Document handling
  if (answers.q6_documentHandling?.includes('Shared cloud')) score += 3;
  else if (answers.q6_documentHandling?.includes('Dedicated document')) score += 7;
  else if (answers.q6_documentHandling?.includes('Automated financial data')) score += 12;

  // Q7: Routing decision
  if (answers.q7_routingDecision?.includes('spreadsheet list')) score += 3;
  else if (answers.q7_routingDecision?.includes('multiple lenders')) score += 5;
  else if (answers.q7_routingDecision?.includes('structured lender matrix')) score += 9;

  // Q8: Automation
  if (answers.q8_followUpAutomation?.includes('templates')) score += 3;
  else if (answers.q8_followUpAutomation?.includes('reminders')) score += 7;
  else if (answers.q8_followUpAutomation?.includes('Fully automated')) score += 11;

  // Q11: Tech Budget
  if (answers.q11_techBudget?.includes('$50–$250')) score += 3;
  else if (answers.q11_techBudget?.includes('$250–$750')) score += 6;
  else if (answers.q11_techBudget?.includes('$750–$2,000')) score += 9;
  else if (answers.q11_techBudget?.includes('$2,000+')) score += 12;

  for (const item of OPERATING_MODEL_THRESHOLDS) {
    if (score >= item.minScore && score <= item.maxScore) {
      return item.model;
    }
  }

  return 'Relationship-Led';
}

export function evaluateAssessmentCompleteness(answers: AssessmentAnswers): {
  answeredCount: number;
  totalQuestions: number;
  isComplete: boolean;
  completionPercentage: number;
} {
  let count = 0;
  if (answers.q1_currentHandling) count++;
  if (answers.q2_monthlyVolume) count++;
  if (answers.q3_leadSources && answers.q3_leadSources.length > 0) count++;
  if (answers.q4_pipelineLocation) count++;
  if (answers.q5_pursuingDecision) count++;
  if (answers.q6_documentHandling) count++;
  if (answers.q7_routingDecision) count++;
  if (answers.q8_followUpAutomation) count++;
  if (answers.q9_breakdownPoints && answers.q9_breakdownPoints.length > 0) count++;
  if (answers.q10_priorities && answers.q10_priorities.length > 0) count++;
  if (answers.q11_techBudget) count++;
  if (answers.q12_handsOnControl) count++;

  const total = 12;
  return {
    answeredCount: count,
    totalQuestions: total,
    isComplete: count === total,
    completionPercentage: Math.round((count / total) * 100)
  };
}
