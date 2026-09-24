import { authenticateHeaders, getAuthCapability, requirePermission } from '../server/auth/authService.js';
import { AuthenticationError } from '../server/auth/types.js';
import { getCapitalRepository, getDevelopmentMemoryRepository, getPersistenceCapability } from '../server/persistence/index.js';
import { normalizeFundingIntent } from '../src/lib/fundingIntent.js';

export async function runWorkspaceAuthTests() {
  const original={
    nodeEnv:process.env.NODE_ENV,
    authMode:process.env.CAPITAL_AUTH_MODE,
    persistenceMode:process.env.CAPITAL_PERSISTENCE_MODE
  };

  try {
    process.env.NODE_ENV='test';
    process.env.CAPITAL_AUTH_MODE='development';
    process.env.CAPITAL_PERSISTENCE_MODE='memory';
    getDevelopmentMemoryRepository().clearForTests();

    const auth=getAuthCapability();
    if(auth.status!=='DEVELOPMENT_ONLY' || !auth.configured) {
      throw new Error('Development auth capability must be explicit');
    }
    const persistence=getPersistenceCapability();
    if(persistence.status!=='DEVELOPMENT_ONLY' || persistence.durable!==false) {
      throw new Error('Memory persistence must be marked DEVELOPMENT_ONLY and non-durable');
    }

    const owner=authenticateHeaders({
      'x-capital-user-id':'user-owner',
      'x-capital-workspace-id':'workspace-a',
      'x-capital-role':'owner'
    });
    if(owner.workspaceId!=='workspace-a' || !owner.permissions.includes('submission.authorize')) {
      throw new Error('Owner permissions not resolved centrally');
    }

    let forbidden=false;
    try {
      requirePermission({
        'x-capital-user-id':'user-viewer',
        'x-capital-workspace-id':'workspace-a',
        'x-capital-role':'viewer'
      },'deal.create');
    } catch(error) {
      forbidden=error instanceof AuthenticationError && error.code==='FORBIDDEN';
    }
    if(!forbidden) throw new Error('Viewer must be denied deal.create');

    const injected=normalizeFundingIntent({
      objective:'I need $100,000 in working capital.',
      workspaceId:'attacker-workspace',
      userId:'attacker-user'
    } as any) as any;
    if('workspaceId' in injected || 'userId' in injected) {
      throw new Error('Funding intent normalization must whitelist fields');
    }

    process.env.NODE_ENV='production';
    const productionDevAuth=getAuthCapability();
    if(productionDevAuth.configured || productionDevAuth.status!=='SPECIFIED') {
      throw new Error('Development auth must be disabled in production');
    }
    const prodRepo=getCapitalRepository();
    if(prodRepo.capability.configured || prodRepo.capability.durable) {
      throw new Error('Memory repository must not masquerade as production persistence');
    }

    return {passed:true,testName:'runWorkspaceAuthTests'};
  } finally {
    if(original.nodeEnv===undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV=original.nodeEnv;
    if(original.authMode===undefined) delete process.env.CAPITAL_AUTH_MODE; else process.env.CAPITAL_AUTH_MODE=original.authMode;
    if(original.persistenceMode===undefined) delete process.env.CAPITAL_PERSISTENCE_MODE; else process.env.CAPITAL_PERSISTENCE_MODE=original.persistenceMode;
  }
}
