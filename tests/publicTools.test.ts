import { calculatePublicTool } from '../src/lib/publicTools';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export function runPublicToolTests() {
  const stack = calculatePublicTool('capital-stack-builder', { requestedAmount: 250000, useOfFunds: 'equipment', recurringWorkingCapitalNeed: true });
  assert(stack.insights.some(item => item.includes('EQUIPMENT FINANCE')), 'Equipment use of funds must surface equipment planning.');
  assert(stack.insights.some(item => item.includes('REVOLVING LIQUIDITY')), 'Recurring liquidity must surface reusable liquidity planning.');
  assert(stack.disclaimer.toLowerCase().includes('does not represent lender availability'), 'Capital stack result must retain human-review boundary.');

  const receivables = calculatePublicTool('capital-stack-builder', { requestedAmount: 100000, useOfFunds: 'receivables' });
  assert(receivables.insights.some(item => item.includes('RECEIVABLES FINANCE')), 'Receivables use of funds must surface receivables planning.');

  const ops = calculatePublicTool('capital-ops-calculator', { monthlyOpportunities: 10, averageOpportunityValue: 5000, conversionRate: 20, followUpRate: 50, responseHours: 48, manualHours: 10, operatorCost: 50 });
  assert(ops.metrics.find(metric => metric.label === 'Modeled unworked value')?.value === '$5,000', 'Operations leakage calculation should be deterministic.');
  const opsZero = calculatePublicTool('capital-ops-calculator', {});
  assert(opsZero.metrics.every(metric => !metric.value.includes('NaN')), 'Operations zero inputs must remain finite.');

  const workflow = calculatePublicTool('capital-workflow-builder', { currentStages: ['1', '2'], manualStages: ['2'], brokenHandoffs: 'documents', systems: 'spreadsheets' });
  assert(workflow.metrics.find(metric => metric.label === 'Missing stages')?.value === '6', 'Workflow builder must detect missing canonical stages.');
  assert(workflow.metrics.find(metric => metric.label === 'Manual stages')?.value === '1', 'Workflow builder must preserve manual-gap detection.');
  assert(workflow.capabilityIds.includes('automation'), 'Workflow builder must route manual gaps to capabilities.');

  const tech = calculatePublicTool('capital-tech-stack', { operatingModel: 'partner', monthlyOpportunities: 25, teamSize: 2, currentSystems: ['crm', 'intake', 'crm'], complexity: 'balanced' });
  assert(new Set(tech.capabilityIds).size === tech.capabilityIds.length, 'Tech stack capability recommendations must not duplicate entries.');
  assert(tech.insights.some(item => item.startsWith('KEEP: CRM & Lifecycle')), 'Existing capability coverage must be retained as keep guidance.');

  const readiness = calculatePublicTool('capital-readiness-audit', { intakeQuality: 'ready', informationCompleteness: 'missing', documentReadiness: 'developing' });
  assert(readiness.metrics.find(metric => metric.label === 'Operational readiness')?.value === '50%', 'Readiness categories must calculate operational coverage.');
  assert(readiness.disclaimer.toLowerCase().includes('not a business’s creditworthiness'), 'Readiness audit must prohibit borrower-approval semantics.');

  const embedded = calculatePublicTool('embedded-capital-calculator', { audienceCount: 1000, monthlyInquiries: 20, handoffRate: 10, targetAdoption: 20, estimatedFinancedAmount: 100000, economicRate: 1, internalStaffingCost: 1000 });
  assert(embedded.metrics.find(metric => metric.label === 'Illustrative monthly economics')?.value === '$4,000', 'Embedded capital scenario math must be deterministic.');
  assert(embedded.disclaimer.toLowerCase().includes('not a promise'), 'Embedded capital results must not imply guaranteed economics.');

  const referral = calculatePublicTool('referral-revenue-calculator', { leads: 10, qualifiedRate: 50, fundedRate: 20, averageFundedAmount: 100000, compensationRate: 1, repeatRate: 10 });
  assert(referral.metrics.find(metric => metric.label === 'Base monthly scenario')?.value === '$1,000', 'Referral monthly scenario math must be deterministic.');
  assert(referral.metrics.find(metric => metric.label === 'Annual scenario with repeat assumption')?.value === '$13,200', 'Referral annual sensitivity must include repeat assumption.');
  const referralZero = calculatePublicTool('referral-revenue-calculator', {});
  assert(referralZero.metrics.every(metric => !metric.value.includes('NaN')), 'Referral zero inputs must remain finite.');

  return { passed: true, testName: 'runPublicToolTests' };
}
