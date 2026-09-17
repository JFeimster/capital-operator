/**
 * Capital Operator — Local Storage Schema & Serializer
 * src/lib/storage.ts
 */

import { AssessmentAnswers, BlueprintResult } from '../types';

export const STORAGE_KEYS = {
  ANSWERS: 'capital_operator_assessment_answers',
  BLUEPRINT: 'capital_operator_cached_blueprint',
  SESSION_ID: 'capital_operator_session_id',
  LEAD_SUBMITTED: 'capital_operator_lead_submitted'
};

export function saveAssessmentAnswers(answers: AssessmentAnswers): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  } catch (err) {
    console.warn('Failed to save assessment to localStorage:', err);
  }
}

export function loadAssessmentAnswers(): AssessmentAnswers | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANSWERS);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('Failed to parse assessment from localStorage:', err);
    return null;
  }
}

export function saveCachedBlueprint(blueprint: BlueprintResult): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BLUEPRINT, JSON.stringify(blueprint));
  } catch (err) {
    console.warn('Failed to cache blueprint:', err);
  }
}

export function loadCachedBlueprint(): BlueprintResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLUEPRINT);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('Failed to read cached blueprint:', err);
    return null;
  }
}

export function clearAssessmentState(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.ANSWERS);
    localStorage.removeItem(STORAGE_KEYS.BLUEPRINT);
  } catch (err) {
    console.warn('Failed to clear state:', err);
  }
}
