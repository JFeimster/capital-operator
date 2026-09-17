/** Deterministic public-tool calculations and routing. No component owns business rules. */
import { recommendCapitalStack, type CapitalStackComponent } from './capitalStack';
import { matchCapabilities } from './capabilityMatcher';
import { routeEcosystem, type EcosystemRouteRecommendation } from './ecosystemRouter';
import { WORKFLOW_STAGES } from '../config/workflowStages';
import type { PublicToolId } from '../config/publicTools';

export type PublicToolValue = string | number | boolean | string[] | undefined;
export type PublicToolInput = Record<string, PublicToolValue>;
export interface PublicToolMetric { label: string; value: string; detail: string; }
export interface PublicToolResult {
  metrics: PublicToolMetric[];
  insights: string[];
  assumptions: string[];
  capabilityIds: string[];
  workflowStages: number[];
  ecosystem: EcosystemRouteRecommendation[];
  responsibility: Array<{ owner: 'SYSTEM' | 'AI' | 'HUMAN' | 'CAPITAL_PARTNER'; detail: string }>;
  disclaimer: string;
  resultVariant: string;
}

const n = (input: PublicToolInput, key: string) => Math.max(0, Number(input[key]) || 0);
const pct = (input: PublicToolInput, key: string) => Math.min(100, n(input, key)) / 100;
const array = (input: PublicToolInput, key: string) => Array.isArray(input[key]) ? input[key] as string[] : [];
const currency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
const integer = (value: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);

function result(input: Omit<PublicToolResult, 'ecosystem'>): PublicToolResult {
  return { ...input, ecosystem: routeEcosystem({ capabilityIds: input.capabilityIds, workflowStage: input.workflowStages[0] }) };
}
function defaultResponsibilities(): PublicToolResult['responsibility'] {
  return [
    { owner: 'SYSTEM', detail: 'Calculates repeatable inputs, preserves context, and surfaces workflow gaps.' },
    { owner: 'AI', detail: 'May synthesize documented context; it does not decide capital outcomes.' },
    { owner: 'HUMAN', detail: 'Validates facts, consequences, external representations, and any capital action.' },
    { owner: 'CAPITAL_PARTNER', detail: 'Makes independent availability, terms, pricing, and approval decisions.' }
  ];
}
function capabilityIdsFor(input: Parameters<typeof matchCapabilities>[0]) {
  return matchCapabilities(input).filter(match => match.missing).map(match => match.capability.id);
}

export function calculatePublicTool(toolId: PublicToolId, input: PublicToolInput): PublicToolResult {
  switch (toolId) {
    case 'capital-stack-builder': return capitalStack(input);
    case 'capital-ops-calculator': return capitalOps(input);
    case 'capital-workflow-builder': return workflow(input);
    case 'capital-tech-stack': return techStack(input);
    case 'capital-readiness-audit': return readiness(input);
    case 'embedded-capital-calculator': return embedded(input);
    case 'referral-revenue-calculator': return referral(input);
  }
}

function capitalStack(input: PublicToolInput): PublicToolResult {
  const requestedAmount = n(input, 'requestedAmount');
  if (!requestedAmount) return emptyResult('Enter a requested capital amount to build a planning structure.');
  const stack = recommendCapitalStack({ requestedAmount, useOfFunds: String(input.useOfFunds || ''), recurringWorkingCapitalNeed: Boolean(input.recurringWorkingCapitalNeed), collateralAvailable: Boolean(input.collateralAvailable), preserveLiquidity: Boolean(input.preserveLiquidity), receivablesDriven: String(input.useOfFunds) === 'receivables', realEstateRelated: String(input.useOfFunds) === 'real estate' });
  const components = stack.components.map(item => item.component);
  const stage = components.includes('EQUIPMENT_FINANCE' as CapitalStackComponent) || components.includes('RECEIVABLES_FINANCE' as CapitalStackComponent) ? 5 : 4;
  const ids = capabilityIdsFor({ workflowStage: stage, capitalDemandProfile: { requestedAmount, useOfFunds: String(input.useOfFunds || ''), recurringWorkingCapitalNeed: Boolean(input.recurringWorkingCapitalNeed) }, requiredCapabilityIds: ['capital-stack-planning', 'capital-case', 'routing'] });
  return result({ metrics: [{ label: 'Capital requirement', value: currency(requestedAmount), detail: 'Planning input supplied by you.' }, { label: 'Potential components', value: String(stack.components.length), detail: 'Categories to evaluate with a human reviewer.' }], insights: stack.components.map(item => `${item.priority}: ${item.component.replaceAll('_', ' ')} — ${item.reason}`), assumptions: ['Categories are selected from declared use of funds and operating constraints.', 'No capital source, rate, availability, eligibility, or approval is represented.'], capabilityIds: ids, workflowStages: [4, 5], responsibility: defaultResponsibilities(), disclaimer: stack.disclaimer, resultVariant: stack.components.map(item => item.component).join('_').toLowerCase() });
}

function capitalOps(input: PublicToolInput): PublicToolResult {
  const opportunities = n(input, 'monthlyOpportunities'); const value = n(input, 'averageOpportunityValue'); const conversion = pct(input, 'conversionRate'); const followUp = pct(input, 'followUpRate'); const response = n(input, 'responseHours'); const manualHours = n(input, 'manualHours'); const cost = n(input, 'operatorCost');
  const unworked = opportunities * Math.max(0, 1 - followUp); const modeledLeakage = unworked * value * conversion; const manualCost = manualHours * cost; const responsePenalty = response > 24 ? Math.min(0.25, (response - 24) / 240) : 0; const improvedCoverage = Math.min(1, followUp + 0.2); const scenarioValue = opportunities * value * conversion * Math.max(0, improvedCoverage - followUp) * (1 - responsePenalty);
  const stage = followUp < 0.8 ? 7 : manualHours > 20 ? 6 : 2;
  const ids = capabilityIdsFor({ workflowStage: stage, manualWorkflowGaps: ['manual follow-up and response handling'], requiredCapabilityIds: ['crm-lifecycle', 'automation', 'funding-operations'] });
  return result({ metrics: [{ label: 'Modeled unworked value', value: currency(modeledLeakage), detail: 'Opportunity value × current conversion × uncovered follow-up.' }, { label: 'Manual operating cost', value: currency(manualCost), detail: `${integer(manualHours)} manual hours × stated hourly cost.` }, { label: '20-point coverage scenario', value: currency(scenarioValue), detail: 'Illustrative incremental value at the supplied assumptions.' }], insights: [`${integer(unworked)} monthly opportunities are outside stated follow-up coverage.`, response > 24 ? 'First-response time exceeds one day; stage 2 ownership should be reviewed.' : 'First-response time is within a one-day operating target; validate coverage by owner.'], assumptions: ['Opportunity value and conversion are editable operating assumptions, not recognized revenue.', 'The improvement scenario changes follow-up coverage only; it does not guarantee a conversion outcome.'], capabilityIds: ids, workflowStages: [stage], responsibility: defaultResponsibilities(), disclaimer: 'This model estimates process capacity and leakage from your inputs. It does not forecast revenue, capital availability, or funding outcomes.', resultVariant: stage === 7 ? 'follow_up_leakage' : 'manual_operations' });
}

function workflow(input: PublicToolInput): PublicToolResult {
  const current = array(input, 'currentStages').map(Number); const manual = array(input, 'manualStages').map(Number); const ai = array(input, 'aiStages').map(Number); const missing = WORKFLOW_STAGES.map(stage => stage.number).filter(stage => !current.includes(stage));
  const broken = String(input.brokenHandoffs || 'none'); const text = `${input.systems || ''} ${broken} ${manual.length ? 'manual workflow' : ''}`;
  const ids = capabilityIdsFor({ businessNeed: text, manualWorkflowGaps: manual.map(stage => `manual stage ${stage}`), requiredCapabilityIds: missing.length ? ['automation', 'funding-operations'] : [] });
  return result({ metrics: [{ label: 'Stages covered', value: `${current.length}/8`, detail: 'Declared current workflow coverage.' }, { label: 'Missing stages', value: String(missing.length), detail: missing.length ? missing.map(stage => `0${stage}`).join(', ') : 'No structural gap declared.' }, { label: 'Manual stages', value: String(manual.length), detail: manual.length ? manual.map(stage => `0${stage}`).join(', ') : 'No material manual work declared.' }], insights: missing.map(stage => `MISSING: ${WORKFLOW_STAGES.find(item => item.number === stage)?.name}`), assumptions: [`Primary system of record: ${String(input.systems || 'not specified')}.`, `AI assistance is declared for ${ai.length} stage(s); human ownership remains required for consequential work.`], capabilityIds: ids, workflowStages: [...new Set([...missing, ...manual])].slice(0, 3), responsibility: defaultResponsibilities(), disclaimer: 'This map diagnoses workflow coverage. It does not route live capital, determine lender fit, or make a borrower decision.', resultVariant: missing.length ? 'workflow_gaps' : 'workflow_coverage' });
}

function techStack(input: PublicToolInput): PublicToolResult {
  const systems = array(input, 'currentSystems'); const operatingModel = String(input.operatingModel || 'operator'); const volume = n(input, 'monthlyOpportunities');
  const known: Record<string, string> = { crm: 'crm-lifecycle', intake: 'funding-intake', documents: 'document-collection', automation: 'automation', partner: 'partner-operations' };
  const currentCapabilityIds = systems.map(item => known[item]).filter(Boolean); const needed = ['funding-intake', 'crm-lifecycle', 'automation', 'document-collection', 'capital-case'];
  if (operatingModel === 'partner' || operatingModel === 'platform') needed.push('partner-intake', 'attribution'); if (volume >= 20) needed.push('funding-operations');
  const matches = matchCapabilities({ businessNeed: `${operatingModel} ${input.complexity || ''} workflow`, currentCapabilityIds, requiredCapabilityIds: needed }); const ids = matches.filter(match => match.missing).map(match => match.capability.id);
  return result({ metrics: [{ label: 'Keep', value: String(currentCapabilityIds.length), detail: 'Declared systems with canonical capability coverage.' }, { label: 'Add or evaluate', value: String(ids.length), detail: 'Missing deterministic capability coverage.' }, { label: 'Operating load', value: `${integer(volume)} / month`, detail: 'Declared opportunity volume.' }], insights: matches.map(match => `${match.missing ? 'ADD / EVALUATE' : 'KEEP'}: ${match.capability.name} — ${match.nextAction}`), assumptions: [`Operating model: ${operatingModel}.`, `Complexity preference: ${String(input.complexity || 'not specified')}.`, 'Recommendations are capability-led and do not indicate tool pricing, contracts, or affiliate preference.'], capabilityIds: ids, workflowStages: [2, 4, 7], responsibility: defaultResponsibilities(), disclaimer: 'This is a technology and workflow recommendation, not a procurement recommendation or representation of third-party availability.', resultVariant: `${operatingModel}_${volume >= 20 ? 'scaled' : 'lean'}` });
}

function readiness(input: PublicToolInput): PublicToolResult {
  const fields = Object.keys(input).filter(key => ['ready', 'developing', 'missing'].includes(String(input[key]))); const scores: Record<string, number> = { ready: 2, developing: 1, missing: 0 }; const total = fields.reduce((sum, field) => sum + scores[String(input[field])], 0); const possible = fields.length * 2; const maturity = possible ? Math.round(total / possible * 100) : 0; const missing = fields.filter(field => input[field] === 'missing');
  const capabilityMap: Record<string, string> = { intakeQuality: 'funding-intake', informationCompleteness: 'capital-readiness', documentReadiness: 'document-collection', capitalCase: 'capital-case', routingReadiness: 'routing', crmOwnership: 'crm-lifecycle', followUp: 'funding-operations', attribution: 'attribution', automation: 'automation', partnerCoordination: 'partner-operations' };
  const ids = [...new Set(missing.map(field => capabilityMap[field]).filter(Boolean))];
  return result({ metrics: [{ label: 'Operational readiness', value: `${maturity}%`, detail: 'Coverage of the operating categories you completed.' }, { label: 'Missing categories', value: String(missing.length), detail: 'Missing or inconsistent operational controls.' }, { label: 'Partly defined', value: String(fields.filter(field => input[field] === 'developing').length), detail: 'Areas that need an owner or documented process.' }], insights: missing.length ? missing.map(field => `FIX NOW: ${field.replace(/([A-Z])/g, ' $1')}`) : ['No category was marked missing. Validate the controls with the people who operate them.'], assumptions: ['This is an operational-readiness indicator only.', 'It is not a credit score, borrower score, funding score, eligibility signal, or funding-probability estimate.'], capabilityIds: ids, workflowStages: [2, 3, 4, 7], responsibility: defaultResponsibilities(), disclaimer: 'Operational readiness describes process coverage, not a business’s creditworthiness or likelihood of receiving capital.', resultVariant: maturity >= 75 ? 'operationally_ready' : 'operational_gaps' });
}

function embedded(input: PublicToolInput): PublicToolResult {
  const audience = n(input, 'audienceCount'); const inquiries = n(input, 'monthlyInquiries'); const handoff = pct(input, 'handoffRate'); const adoption = pct(input, 'targetAdoption'); const amount = n(input, 'estimatedFinancedAmount'); const economic = pct(input, 'economicRate'); const staffing = n(input, 'internalStaffingCost');
  const currentCompleted = inquiries * handoff; const targetCompleted = inquiries * Math.max(handoff, adoption); const scenarioEconomic = targetCompleted * amount * economic; const incremental = Math.max(0, scenarioEconomic - staffing);
  const ids = capabilityIdsFor({ businessNeed: 'partner referral capital intake attribution workflow', requiredCapabilityIds: ['partner-intake', 'attribution', 'funding-operations', 'automation'] });
  return result({ metrics: [{ label: 'Audience reach', value: integer(audience), detail: 'Declared audience or customer count.' }, { label: 'Completed handoff scenario', value: targetCompleted.toFixed(1), detail: 'Monthly inquiries × greater of current handoff or target adoption.' }, { label: 'Illustrative monthly economics', value: currency(scenarioEconomic), detail: 'Completed handoffs × estimated amount × economic assumption.' }, { label: 'After stated staffing cost', value: currency(incremental), detail: 'Illustrative economics less stated internal staffing cost.' }], insights: ['A governed intake and attribution layer is required before measuring partner economics.', 'Use a human-reviewed routing and handoff process for every consequential capital interaction.'], assumptions: ['All economics are editable scenario assumptions.', 'The model does not represent guaranteed referral revenue, funded volume, compensation, or capital availability.'], capabilityIds: ids, workflowStages: [1, 2, 5, 8], responsibility: defaultResponsibilities(), disclaimer: 'This is an operating-model scenario, not a promise of referral revenue, funding, compensation, or partner terms.', resultVariant: audience >= 1000 ? 'scaled_distribution' : 'early_distribution' });
}

function referral(input: PublicToolInput): PublicToolResult {
  const leads = n(input, 'leads'); const qualified = pct(input, 'qualifiedRate'); const funded = pct(input, 'fundedRate'); const amount = n(input, 'averageFundedAmount'); const comp = pct(input, 'compensationRate'); const repeat = pct(input, 'repeatRate'); const base = leads * qualified * funded * amount * comp; const low = base * 0.7; const high = base * 1.3; const annual = base * 12 * (1 + repeat);
  const ids = capabilityIdsFor({ businessNeed: 'partner referral workflow attribution follow-up', requiredCapabilityIds: ['partner-intake', 'attribution', 'crm-lifecycle', 'partner-operations'] });
  return result({ metrics: [{ label: 'Low monthly scenario', value: currency(low), detail: '70% of base assumptions.' }, { label: 'Base monthly scenario', value: currency(base), detail: 'Leads × qualified rate × completed rate × amount × compensation.' }, { label: 'High monthly scenario', value: currency(high), detail: '130% of base assumptions.' }, { label: 'Annual scenario with repeat assumption', value: currency(annual), detail: 'Base monthly × 12 × (1 + repeat assumption).' }], insights: [`Modeled completed opportunities: ${(leads * qualified * funded).toFixed(1)} per month.`, 'Attribution, consent-aware follow-up, and partner ownership must exist before the volume can be managed reliably.'], assumptions: ['Qualification, completion, funded amount, compensation, and repeat rates are editable assumptions.', 'Sensitivity bands alter the base scenario only; they are not revenue forecasts.'], capabilityIds: ids, workflowStages: [1, 2, 7, 8], responsibility: defaultResponsibilities(), disclaimer: 'This is a scenario model. It does not guarantee referral revenue, compensation, capital availability, or funding outcomes.', resultVariant: leads ? 'referral_scenario' : 'zero_volume' });
}

function emptyResult(message: string): PublicToolResult {
  return result({ metrics: [{ label: 'Awaiting input', value: '—', detail: message }], insights: [message], assumptions: ['Results use only the input you choose to provide.'], capabilityIds: [], workflowStages: [], responsibility: defaultResponsibilities(), disclaimer: 'Capital Operator provides educational operational planning. Human review is required for consequential capital decisions.', resultVariant: 'empty' });
}
