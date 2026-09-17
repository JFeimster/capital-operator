/**
 * Capital Operator — Ecosystem Router
 *
 * Selects source-controlled ecosystem handoffs from canonical capability data.
 */
import { CAPABILITY_BY_ID } from '../config/capabilities.js';
import { ECOSYSTEM_CATALOG, type EcosystemProduct } from '../config/ecosystem.js';

export interface EcosystemRouteInput {
  capabilityIds: string[];
  workflowStage?: number;
  unavailableProductIds?: string[];
}

export interface EcosystemRouteRecommendation {
  capabilityId: string;
  product?: EcosystemProduct;
  reason: string;
  fallback: string;
  humanCheckpoint?: string;
  status: string;
}

export function routeEcosystem(input: EcosystemRouteInput): EcosystemRouteRecommendation[] {
  const unavailable = new Set(input.unavailableProductIds || []);

  return input.capabilityIds.flatMap(capabilityId => {
    const capability = CAPABILITY_BY_ID[capabilityId];
    if (!capability) return [];

    const candidates = capability.ecosystemProductIds
      .map(id => ECOSYSTEM_CATALOG.find(product => product.id === id))
      .filter((product): product is EcosystemProduct => Boolean(product))
      .filter(product => !unavailable.has(product.id))
      .filter(product => !input.workflowStage || product.workflowStages.includes(input.workflowStage));

    const product = candidates[0];
    return [{
      capabilityId,
      product,
      reason: product
        ? `${product.name} is the canonical ecosystem handoff for ${capability.name} in the current context.`
        : `No currently available ecosystem product is registered for ${capability.name}; use the documented fallback.`,
      fallback: capability.fallback,
      humanCheckpoint: capability.humanCheckpoint,
      status: product?.status || capability.status
    }];
  });
}
