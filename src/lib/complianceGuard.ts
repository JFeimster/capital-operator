/**
 * Capital Operator — Compliance Guard & Validator
 * src/lib/complianceGuard.ts
 */

import { COMPLIANCE_CONFIG } from '../config/compliance';

export function sanitizeUserInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // remove direct tag injections
    .trim();
}

export function validateTextCompliance(text: string): {
  isCompliant: boolean;
  violations: string[];
} {
  const violations: string[] = [];
  const lower = text.toLowerCase();

  for (const term of COMPLIANCE_CONFIG.prohibitedTerms) {
    if (lower.includes(term)) {
      violations.push(`Prohibited marketing phrase detected: "${term}"`);
    }
  }

  return {
    isCompliant: violations.length === 0,
    violations
  };
}

export function getCommercialDisclaimer(): string {
  return COMPLIANCE_CONFIG.disclaimers.general;
}
