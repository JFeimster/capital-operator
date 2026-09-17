/**
 * Capital Operator — Capability Matcher
 */
import { CAPABILITIES, type PlatformCapability } from '../config/capabilities.js';

export interface CapabilityMatchInput {
  workflowStage?: number;
  requiredCapabilityIds?: string[];
  currentCapabilityIds?: string[];
  preferAutomated?: boolean;
}

export interface CapabilityMatch {
  capability: PlatformCapability;
  missing: boolean;
  nextAction: string;
  humanRequired: boolean;
}

export function matchCapabilities(input: CapabilityMatchInput): CapabilityMatch[] {
  const required = new Set(input.requiredCapabilityIds || []);
  const current = new Set(input.currentCapabilityIds || []);

  return CAPABILITIES
    .filter(capability => {
      if (required.size > 0 && required.has(capability.id)) return true;
      if (input.workflowStage && capability.workflowStages.includes(input.workflowStage)) return true;
      return false;
    })
    .map(capability => {
      const missing = !current.has(capability.id);
      const product = capability.ecosystemProductIds[0];
      return {
        capability,
        missing,
        nextAction: missing
          ? product
            ? `Evaluate ecosystem capability: ${product}`
            : capability.fallback
          : 'Keep current capability; verify performance before adding another system.',
        humanRequired: capability.responsibility === 'HUMAN' || Boolean(capability.humanCheckpoint)
      };
    })
    .sort((a, b) => Number(b.missing) - Number(a.missing));
}
