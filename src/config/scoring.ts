/**
 * Capital Operator — Scoring Rules & Weights
 * src/config/scoring.ts
 */

import { OperatingModelType, StagePriority } from '../types';

export interface ScoreThresholds {
  minScore: number;
  maxScore: number;
  model: OperatingModelType;
  nextUnlock: string;
}

export const OPERATING_MODEL_THRESHOLDS: ScoreThresholds[] = [
  {
    minScore: 0,
    maxScore: 18,
    model: 'Relationship-Led',
    nextUnlock: 'Systemized Pipeline & Structured Document Intake'
  },
  {
    minScore: 19,
    maxScore: 32,
    model: 'Systemized',
    nextUnlock: 'AI Document Parsing & Programmatic Credit Memos'
  },
  {
    minScore: 33,
    maxScore: 44,
    model: 'AI-Augmented',
    nextUnlock: 'Algorithmic Lender Routing & Automated Pipeline Governance'
  },
  {
    minScore: 45,
    maxScore: 100,
    model: 'Capital Operator',
    nextUnlock: 'White-Label Partner Distribution & Autonomous Refinance Loops'
  }
];

export const STAGE_WEIGHT_FACTORS = {
  urgencyMultiplierHigh: 1.5,
  urgencyMultiplierMedium: 1.0,
  volumeScalingFactors: {
    'Under 10': 1.0,
    '10–25': 1.2,
    '26–75': 1.5,
    '76–200': 1.8,
    '200+': 2.0
  }
};

export const PRIORITY_MAP: Record<string, StagePriority> = {
  CRITICAL: 'FIX NOW',
  ELEVATED: 'BUILD NEXT',
  STANDARD: 'LATER',
  OPTIMIZED: 'WORKING WELL'
};
