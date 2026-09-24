import { InMemoryCapitalRepository } from './inMemory.js';
import type { CapitalRepository, PersistenceCapability } from './types.js';
import { PersistenceUnavailableError } from './types.js';

const memoryRepository=new InMemoryCapitalRepository();

class UnavailableCapitalRepository implements CapitalRepository {
  readonly capability:PersistenceCapability={
    status:'SPECIFIED',
    mode:'unavailable',
    durable:false,
    configured:false,
    description:'Production repository contracts exist, but no durable persistence adapter is configured.'
  };
  private fail():never{throw new PersistenceUnavailableError(this.capability.description);}
  async getWorkspace():Promise<never>{return this.fail();}
  async putWorkspace():Promise<never>{return this.fail();}
  async getMembership():Promise<never>{return this.fail();}
  async putMembership():Promise<never>{return this.fail();}
  async createFundingIntent():Promise<never>{return this.fail();}
  async getFundingIntent():Promise<never>{return this.fail();}
  async createDeal():Promise<never>{return this.fail();}
  async getDeal():Promise<never>{return this.fail();}
  async listDeals():Promise<never>{return this.fail();}
  async updateDeal():Promise<never>{return this.fail();}
  async putCapitalCase():Promise<never>{return this.fail();}
  async getCapitalCase():Promise<never>{return this.fail();}
  async createDocument():Promise<never>{return this.fail();}
  async getDocument():Promise<never>{return this.fail();}
  async listDocuments():Promise<never>{return this.fail();}
  async updateDocument():Promise<never>{return this.fail();}
  async createRoutingDecision():Promise<never>{return this.fail();}
  async listRoutingDecisions():Promise<never>{return this.fail();}
  async updateRoutingDecision():Promise<never>{return this.fail();}
  async createSubmission():Promise<never>{return this.fail();}
  async getSubmission():Promise<never>{return this.fail();}
  async listSubmissions():Promise<never>{return this.fail();}
  async updateSubmission():Promise<never>{return this.fail();}
  async createOffer():Promise<never>{return this.fail();}
  async getOffer():Promise<never>{return this.fail();}
  async listOffers():Promise<never>{return this.fail();}
  async updateOffer():Promise<never>{return this.fail();}
  async createCondition():Promise<never>{return this.fail();}
  async getCondition():Promise<never>{return this.fail();}
  async listConditions():Promise<never>{return this.fail();}
  async updateCondition():Promise<never>{return this.fail();}
  async putRelationship():Promise<never>{return this.fail();}
  async getRelationship():Promise<never>{return this.fail();}
  async appendAudit():Promise<never>{return this.fail();}
  async listAudit():Promise<never>{return this.fail();}
}

const unavailableRepository=new UnavailableCapitalRepository();

export function getPersistenceCapability():PersistenceCapability{return getCapitalRepository().capability;}

export function getCapitalRepository():CapitalRepository{
  const mode=String(process.env.CAPITAL_PERSISTENCE_MODE||'unavailable').toLowerCase();
  const canUseMemory=process.env.NODE_ENV!=='production'&&mode==='memory';
  return canUseMemory?memoryRepository:unavailableRepository;
}

export function getDevelopmentMemoryRepository():InMemoryCapitalRepository{
  if(process.env.NODE_ENV==='production') {
    throw new PersistenceUnavailableError('Development memory repository cannot be used in production.');
  }
  return memoryRepository;
}
