/**
 * Capital Operator — Blueprint Engine
 * src/lib/blueprintEngine.ts
 */

import { AssessmentAnswers, BlueprintResult, OperatingModelType, SegmentType } from '../types';
import { generateBlueprint } from './recommendationEngine';
import { calculateOperatingModel } from './assessmentEngine';
import { determineSegment } from './segmentEngine';

export function createBlueprintFromAnswers(answers: AssessmentAnswers): BlueprintResult {
  return generateBlueprint(answers);
}

export function getExecutiveHeadline(model: OperatingModelType, segment: SegmentType): string {
  if (segment === 'affiliate') {
    return 'Your Referral Model Suffers From Five Structural Value Leaks';
  }
  if (model === 'Relationship-Led') {
    return 'Your Firm Possesses Strong Capital Demand But Operates on Fragile Tribal Memory';
  }
  if (model === 'Systemized') {
    return 'Pipeline Tracking is Operational, but Document Synthesis Remains a Human Bottleneck';
  }
  if (model === 'AI-Augmented') {
    return 'High-Velocity AI Ingestion with Opportunities to Automate Lender Routing & Closing Loops';
  }
  return 'Enterprise Capital Operating Infrastructure Ready for Embedded White-Label Distribution';
}
