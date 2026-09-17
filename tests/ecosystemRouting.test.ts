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

  const contextual=matchCapabilities({
    operatingModel:'Relationship-Led',
    segment:'advisor',
    workflowStage:7,
    manualWorkflowGaps:['Manual follow-up and rekeying between systems'],
    capitalDemandProfile:{requestedAmount:250000,documentHeavy:true,partnerOriginated:true},
    currentCapabilityIds:['diagnostic'],
    currentEcosystemProductIds:['partner-intake-os'],
    preferAutomated:true
  });

  const ids=new Set(contextual.filter(match=>match.missing).map(match=>match.capability.id));
  for(const expected of ['crm-lifecycle','automation','routing','capital-stack-planning','document-collection','document-intelligence']){
    if(!ids.has(expected)) throw new Error(`Expected contextual capability match: ${expected}`);
  }

  const partnerIntake=contextual.find(match=>match.capability.id==='partner-intake');
  if(partnerIntake?.missing!==false) throw new Error('Existing ecosystem product should satisfy its registered capability.');

  const contextualRoutes=routeEcosystem({
    context:{
      operatingModel:'AI-Augmented',
      segment:'operator',
      businessNeed:'Build the capital case and automate lender routing',
      capitalDemandProfile:{requestedAmount:500000,useOfFunds:'equipment and working capital'},
      currentCapabilityIds:['diagnostic']
    },
    unavailableProductIds:['funding-partners-os']
  });
  if(!contextualRoutes.some(route=>route.capabilityId==='routing' && !route.product && Boolean(route.fallback))){
    throw new Error('Contextual routing must preserve fallback when downstream product is unavailable.');
  }
  if(!contextualRoutes.some(route=>route.matchedBecause.length>0)) throw new Error('Contextual routes must preserve match reasons.');

  return {passed:true,testName:'runEcosystemRoutingTests'};
}
