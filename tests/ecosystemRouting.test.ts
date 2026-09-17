import { matchCapabilities } from '../src/lib/capabilityMatcher';
import { routeEcosystem } from '../src/lib/ecosystemRouter';

export function runEcosystemRoutingTests() {
  const matches=matchCapabilities({requiredCapabilityIds:['routing'],currentCapabilityIds:[]});
  if(matches.length!==1 || matches[0].capability.status!=='SANDBOX') throw new Error('Routing capability must remain SANDBOX');
  const routes=routeEcosystem({capabilityIds:['routing']});
  if(routes[0]?.product?.id!=='funding-partners-os') throw new Error('Expected canonical funding-partners-os handoff');
  const fallback=routeEcosystem({capabilityIds:['routing'],unavailableProductIds:['funding-partners-os']});
  if(fallback[0]?.product) throw new Error('Unavailable product must use fallback');
  if(!fallback[0]?.fallback) throw new Error('Fallback text is required');
  return {passed:true,testName:'runEcosystemRoutingTests'};
}
