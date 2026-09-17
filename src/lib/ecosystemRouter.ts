/**
 * Capital Operator — Ecosystem Router
 *
 * Selects source-controlled ecosystem handoffs from canonical capability data.
 */
import { CAPABILITY_BY_ID } from '../config/capabilities.js';
import { ECOSYSTEM_CATALOG, type EcosystemProduct } from '../config/ecosystem.js';
import { matchCapabilities, type CapabilityMatchInput } from './capabilityMatcher.js';

export interface EcosystemRouteInput {
  capabilityIds?: string[];
  context?: CapabilityMatchInput;
  workflowStage?: number;
  unavailableProductIds?: string[];
}

export interface EcosystemRouteRecommendation {
  capabilityId: string;
  product?: EcosystemProduct;
  reason: string;
  matchedBecause: string[];
  fallback: string;
  humanCheckpoint?: string;
  status: string;
}

export function routeEcosystem(input: EcosystemRouteInput): EcosystemRouteRecommendation[] {
  const unavailable=new Set(input.unavailableProductIds || []);
  const contextualMatches=input.context ? matchCapabilities({
    ...input.context,
    workflowStage: input.context.workflowStage ?? input.workflowStage
  }) : [];

  const explicitIds=input.capabilityIds || [];
  const capabilityIds=explicitIds.length > 0
    ? explicitIds
    : contextualMatches.filter(match=>match.missing).map(match=>match.capability.id);

  const matchReasons=new Map(contextualMatches.map(match=>[match.capability.id,match.matchedBecause]));

  return [...new Set(capabilityIds)].flatMap(capabilityId=>{
    const capability=CAPABILITY_BY_ID[capabilityId];
    if(!capability) return [];

    const stage=input.workflowStage ?? input.context?.workflowStage;
    const candidates=capability.ecosystemProductIds
      .map(id=>ECOSYSTEM_CATALOG.find(product=>product.id===id))
      .filter((product): product is EcosystemProduct=>Boolean(product))
      .filter(product=>!unavailable.has(product.id))
      .filter(product=>!stage || product.workflowStages.includes(stage));

    const product=candidates[0];
    const matchedBecause=matchReasons.get(capabilityId) || (explicitIds.includes(capabilityId) ? ['explicit capability route'] : []);

    return [{
      capabilityId,
      product,
      reason: product
        ? `${product.name} is the canonical ecosystem handoff for ${capability.name} in the current context.`
        : `No currently available ecosystem product is registered for ${capability.name}; use the documented fallback.`,
      matchedBecause,
      fallback: capability.fallback,
      humanCheckpoint: capability.humanCheckpoint,
      status: product?.status || capability.status
    }];
  });
}
