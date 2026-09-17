/**
 * Capital Operator — Persona & Segment Classifier
 * src/lib/segmentEngine.ts
 */

import { AssessmentAnswers, SegmentType } from '../types';

export function determineSegment(answers: AssessmentAnswers): SegmentType {
  const current = answers.q1_currentHandling || '';

  if (current.includes('refer capital') || current.includes("isn't a core service")) {
    return 'affiliate';
  }
  if (current.includes('platform or ecosystem')) {
    return 'platform';
  }
  if (current.includes('team handles')) {
    return 'operator';
  }
  if (current.includes('new revenue line')) {
    return 'new_revenue';
  }
  return 'advisor';
}

export function getSegmentPathwayTitle(segment: SegmentType): string {
  switch (segment) {
    case 'advisor':
      return 'The Trusted Advisor Capital Desk';
    case 'operator':
      return 'The High-Velocity Deal Desk';
    case 'affiliate':
      return 'The Sovereign Referral Infrastructure';
    case 'platform':
      return 'The Embedded Capital Engine';
    case 'new_revenue':
      return 'The Turnkey Capital Practice';
  }
}
