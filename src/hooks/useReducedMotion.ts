/**
 * Capital Operator — Reduced Motion Hook
 * src/hooks/useReducedMotion.ts
 */

import { useMediaQuery } from './useMediaQuery';

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
