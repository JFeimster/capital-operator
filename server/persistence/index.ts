import { InMemoryCapitalRepository } from './inMemory.js';
import type { CapitalRepository, PersistenceCapability } from './types.js';
import { PersistenceUnavailableError } from './types.js';

const memoryRepository = new InMemoryCapitalRepository();

class UnavailableCapitalRepository implements CapitalRepository {
  readonly capability: PersistenceCapability = {
    status: 'SPECIFIED',
    mode: 'unavailable',
    durable: false,
    configured: false,
    description: 'Production repository contracts exist, but no durable persistence adapter is configured.'
  };

  private fail(): never {
    throw new PersistenceUnavailableError(this.capability.description);
  }

  async getWorkspace(): Promise<never> { return this.fail(); }
  async putWorkspace(): Promise<never> { return this.fail(); }
  async getMembership(): Promise<never> { return this.fail(); }
  async putMembership(): Promise<never> { return this.fail(); }
  async createDeal(): Promise<never> { return this.fail(); }
  async getDeal(): Promise<never> { return this.fail(); }
  async listDeals(): Promise<never> { return this.fail(); }
  async updateDeal(): Promise<never> { return this.fail(); }
  async appendAudit(): Promise<never> { return this.fail(); }
  async listAudit(): Promise<never> { return this.fail(); }
}

const unavailableRepository = new UnavailableCapitalRepository();

export function getPersistenceCapability(): PersistenceCapability {
  return getCapitalRepository().capability;
}

export function getCapitalRepository(): CapitalRepository {
  const mode = String(process.env.CAPITAL_PERSISTENCE_MODE || 'unavailable').toLowerCase();
  const canUseMemory = process.env.NODE_ENV !== 'production' && mode === 'memory';
  return canUseMemory ? memoryRepository : unavailableRepository;
}

export function getDevelopmentMemoryRepository(): InMemoryCapitalRepository {
  if (process.env.NODE_ENV === 'production') {
    throw new PersistenceUnavailableError('Development memory repository cannot be used in production.');
  }
  return memoryRepository;
}
