/**
 * Capital Operator — Shareable State URL Encoder / Decoder
 * src/lib/shareState.ts
 */

import { AssessmentAnswers } from '../types';

export function encodeAnswersToQuery(answers: AssessmentAnswers): string {
  try {
    const jsonStr = JSON.stringify(answers);
    return btoa(encodeURIComponent(jsonStr));
  } catch (err) {
    console.warn('Failed to encode share state:', err);
    return '';
  }
}

export function decodeAnswersFromQuery(hashStr: string): AssessmentAnswers | null {
  try {
    const decoded = decodeURIComponent(atob(hashStr));
    return JSON.parse(decoded);
  } catch (err) {
    console.warn('Failed to decode share state:', err);
    return null;
  }
}

export function buildShareUrl(answers: AssessmentAnswers): string {
  const code = encodeAnswersToQuery(answers);
  const base = window.location.origin + window.location.pathname;
  return `${base}?blueprint=${code}`;
}
