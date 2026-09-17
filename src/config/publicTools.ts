/**
 * Public tool registry. This is the canonical route, SEO, and relationship
 * source for the engineering-as-marketing tool layer.
 */
import type { PageSEO } from './seo';

export type PublicToolId =
  | 'capital-stack-builder'
  | 'capital-ops-calculator'
  | 'capital-workflow-builder'
  | 'capital-tech-stack'
  | 'capital-readiness-audit'
  | 'embedded-capital-calculator'
  | 'referral-revenue-calculator';

export type PublicToolFieldType = 'number' | 'select' | 'checkbox' | 'multi';

export interface PublicToolField {
  id: string;
  label: string;
  type: PublicToolFieldType;
  hint?: string;
  min?: number;
  step?: number;
  options?: Array<{ value: string; label: string }>;
}

export interface PublicToolDefinition {
  id: PublicToolId;
  route: `/${PublicToolId}`;
  eyebrow: string;
  title: string;
  description: string;
  seo: PageSEO;
  fields: PublicToolField[];
  relatedToolIds: PublicToolId[];
  primaryCta: 'funding' | 'partner' | 'tools';
}

const workflowOptions = [
  { value: '1', label: '01 — Create Demand' },
  { value: '2', label: '02 — Find Real Opportunities' },
  { value: '3', label: '03 — Know the Business' },
  { value: '4', label: '04 — Build the Capital Case' },
  { value: '5', label: '05 — Route to the Right Capital' },
  { value: '6', label: '06 — Move the Deal' },
  { value: '7', label: '07 — Keep Momentum' },
  { value: '8', label: '08 — Own the Relationship' }
];

export const PUBLIC_TOOLS: Record<PublicToolId, PublicToolDefinition> = {
  'capital-stack-builder': {
    id: 'capital-stack-builder', route: '/capital-stack-builder', eyebrow: 'CAPITAL STRUCTURE PLANNING',
    title: 'Build a capital structure worth reviewing.',
    description: 'Translate the use of funds and operating constraints into planning categories, workflow needs, and reviewed next steps.',
    seo: { title: 'Capital Stack Builder | Capital Operator', description: 'Plan potential capital-stack components and operating next steps without lender eligibility or pricing claims.', canonical: '/capital-stack-builder', keywords: ['capital stack builder', 'capital structure planning'] },
    fields: [
      { id: 'requestedAmount', label: 'Requested capital', type: 'number', min: 0, step: 1000, hint: 'Planning input only; not sent to analytics.' },
      { id: 'useOfFunds', label: 'Primary use of funds', type: 'select', options: [{ value: 'working capital', label: 'Working capital or inventory' }, { value: 'equipment', label: 'Equipment, machinery, vehicle, or fleet' }, { value: 'receivables', label: 'Receivables or invoice timing' }, { value: 'real estate', label: 'Real estate or property' }, { value: 'expansion', label: 'Expansion, acquisition, or refinance' }] },
      { id: 'recurringWorkingCapitalNeed', label: 'This is a recurring liquidity need', type: 'checkbox' },
      { id: 'collateralAvailable', label: 'Potential collateral is available for review', type: 'checkbox' },
      { id: 'preserveLiquidity', label: 'Preserve operating liquidity', type: 'checkbox' }
    ], relatedToolIds: ['capital-readiness-audit', 'capital-workflow-builder'], primaryCta: 'funding'
  },
  'capital-ops-calculator': {
    id: 'capital-ops-calculator', route: '/capital-ops-calculator', eyebrow: 'OPERATIONS LEAKAGE MODEL',
    title: 'Find the work slowing capital demand down.',
    description: 'Model process leakage, manual effort, and improvement scenarios using editable operating assumptions.',
    seo: { title: 'Capital Operations Calculator | Capital Operator', description: 'Estimate operational leakage and capacity scenarios for a capital operation with transparent assumptions.', canonical: '/capital-ops-calculator', keywords: ['capital operations calculator', 'workflow leakage'] },
    fields: [
      { id: 'monthlyOpportunities', label: 'Monthly opportunities', type: 'number', min: 0, step: 1 },
      { id: 'averageOpportunityValue', label: 'Average revenue opportunity', type: 'number', min: 0, step: 100 },
      { id: 'conversionRate', label: 'Current conversion rate (%)', type: 'number', min: 0, step: 1 },
      { id: 'followUpRate', label: 'Follow-up coverage (%)', type: 'number', min: 0, step: 1 },
      { id: 'responseHours', label: 'Average first-response time (hours)', type: 'number', min: 0, step: 1 },
      { id: 'manualHours', label: 'Manual handling hours / month', type: 'number', min: 0, step: 1 },
      { id: 'operatorCost', label: 'Fully loaded operator cost / hour', type: 'number', min: 0, step: 1 }
    ], relatedToolIds: ['capital-workflow-builder', 'capital-tech-stack'], primaryCta: 'tools'
  },
  'capital-workflow-builder': {
    id: 'capital-workflow-builder', route: '/capital-workflow-builder', eyebrow: '8-STAGE WORKFLOW MAP',
    title: 'Map the capital workflow you actually run.',
    description: 'Compare your current process to the canonical eight-stage operating model and identify gaps, duplicated work, and ownership boundaries.',
    seo: { title: 'Capital Workflow Builder | Capital Operator', description: 'Map your current capital workflow against the canonical eight-stage Capital Operator workflow.', canonical: '/capital-workflow-builder', keywords: ['capital workflow builder', 'funding operations workflow'] },
    fields: [
      { id: 'currentStages', label: 'Stages currently covered', type: 'multi', options: workflowOptions },
      { id: 'manualStages', label: 'Stages with material manual work', type: 'multi', options: workflowOptions },
      { id: 'aiStages', label: 'Stages with AI assistance', type: 'multi', options: workflowOptions },
      { id: 'systems', label: 'Primary system of record', type: 'select', options: [{ value: 'crm', label: 'CRM' }, { value: 'spreadsheets', label: 'Spreadsheets' }, { value: 'email', label: 'Email inbox' }, { value: 'none', label: 'No durable system' }] },
      { id: 'brokenHandoffs', label: 'Known broken handoff', type: 'select', options: [{ value: 'intake', label: 'Intake or qualification' }, { value: 'documents', label: 'Documents or capital case' }, { value: 'routing', label: 'Routing or capital source review' }, { value: 'follow-up', label: 'Follow-up or relationship ownership' }, { value: 'none', label: 'None identified' }] }
    ], relatedToolIds: ['capital-tech-stack', 'capital-readiness-audit'], primaryCta: 'tools'
  },
  'capital-tech-stack': {
    id: 'capital-tech-stack', route: '/capital-tech-stack', eyebrow: 'OPERATING SYSTEM DESIGN',
    title: 'Design the stack around the work.',
    description: 'Get a deterministic keep, add, evaluate, or replace plan based on your operating model—not a generic software directory.',
    seo: { title: 'Capital Operations Tech Stack | Capital Operator', description: 'Generate a workflow-led capital operations technology stack and capability plan.', canonical: '/capital-tech-stack', keywords: ['capital operations tech stack', 'funding workflow software'] },
    fields: [
      { id: 'operatingModel', label: 'Operating model', type: 'select', options: [{ value: 'advisor', label: 'Advisor or fractional CFO' }, { value: 'operator', label: 'Capital operator or deal desk' }, { value: 'platform', label: 'Platform, SaaS, or agency' }, { value: 'partner', label: 'Referral or distribution partner' }] },
      { id: 'monthlyOpportunities', label: 'Monthly opportunities', type: 'number', min: 0, step: 1 },
      { id: 'teamSize', label: 'Team size', type: 'number', min: 1, step: 1 },
      { id: 'currentSystems', label: 'Current systems', type: 'multi', options: [{ value: 'crm', label: 'CRM' }, { value: 'intake', label: 'Structured intake' }, { value: 'documents', label: 'Document workflow' }, { value: 'automation', label: 'Automation' }, { value: 'ai', label: 'AI assistance' }, { value: 'partner', label: 'Partner workflow' }] },
      { id: 'complexity', label: 'Complexity preference', type: 'select', options: [{ value: 'lean', label: 'Lean and simple' }, { value: 'balanced', label: 'Balanced' }, { value: 'scaled', label: 'Designed to scale' }] }
    ], relatedToolIds: ['capital-workflow-builder', 'embedded-capital-calculator'], primaryCta: 'tools'
  },
  'capital-readiness-audit': {
    id: 'capital-readiness-audit', route: '/capital-readiness-audit', eyebrow: 'OPERATIONAL READINESS',
    title: 'Check the operation before demand arrives.',
    description: 'Assess intake, information, documentation, routing, ownership, and follow-up readiness. This is not a borrower or funding score.',
    seo: { title: 'Capital Operations Readiness Audit | Capital Operator', description: 'Assess operational readiness for handling capital demand without creditworthiness or approval semantics.', canonical: '/capital-readiness-audit', keywords: ['capital readiness audit', 'capital operations readiness'] },
    fields: ['intakeQuality', 'informationCompleteness', 'documentReadiness', 'capitalCase', 'routingReadiness', 'crmOwnership', 'followUp', 'attribution', 'automation', 'partnerCoordination'].map(id => ({ id, label: id.replace(/([A-Z])/g, ' $1').replace(/^./, char => char.toUpperCase()), type: 'select' as const, options: [{ value: 'ready', label: 'Documented and owned' }, { value: 'developing', label: 'Partly defined' }, { value: 'missing', label: 'Missing or inconsistent' }] })),
    relatedToolIds: ['capital-stack-builder', 'capital-workflow-builder'], primaryCta: 'funding'
  },
  'embedded-capital-calculator': {
    id: 'embedded-capital-calculator', route: '/embedded-capital-calculator', eyebrow: 'EMBEDDED CAPITAL MODEL',
    title: 'Model a capital capability for your audience.',
    description: 'Estimate inquiry volume, operating requirements, and explicit economic scenarios for a partner or platform capability.',
    seo: { title: 'Embedded Capital Calculator | Capital Operator', description: 'Model the operational and economic case for embedding a capital capability with editable assumptions.', canonical: '/embedded-capital-calculator', keywords: ['embedded capital calculator', 'partner capital capability'] },
    fields: [
      { id: 'audienceCount', label: 'Audience or customer count', type: 'number', min: 0, step: 1 },
      { id: 'monthlyInquiries', label: 'Monthly capital inquiries', type: 'number', min: 0, step: 1 },
      { id: 'handoffRate', label: 'Current handoff rate (%)', type: 'number', min: 0, step: 1 },
      { id: 'targetAdoption', label: 'Target adoption (%)', type: 'number', min: 0, step: 1 },
      { id: 'estimatedFinancedAmount', label: 'Estimated financed amount / completed handoff', type: 'number', min: 0, step: 1000 },
      { id: 'economicRate', label: 'Economic assumption (% of completed amount)', type: 'number', min: 0, step: 0.1 },
      { id: 'internalStaffingCost', label: 'Internal staffing cost / month', type: 'number', min: 0, step: 100 }
    ], relatedToolIds: ['referral-revenue-calculator', 'capital-tech-stack'], primaryCta: 'partner'
  },
  'referral-revenue-calculator': {
    id: 'referral-revenue-calculator', route: '/referral-revenue-calculator', eyebrow: 'PARTNER ECONOMICS SCENARIOS',
    title: 'Pressure-test referral economics with assumptions exposed.',
    description: 'Build low, base, and high scenarios for partner economics, operational volume, and capability gaps. It is not a revenue forecast.',
    seo: { title: 'Referral Revenue Calculator | Capital Operator', description: 'Estimate capital referral economics with transparent funding and compensation assumptions.', canonical: '/referral-revenue-calculator', keywords: ['referral revenue calculator', 'capital partner economics'] },
    fields: [
      { id: 'leads', label: 'Leads / month', type: 'number', min: 0, step: 1 },
      { id: 'qualifiedRate', label: 'Qualified opportunity assumption (%)', type: 'number', min: 0, step: 1 },
      { id: 'fundedRate', label: 'Completed funding assumption (%)', type: 'number', min: 0, step: 1 },
      { id: 'averageFundedAmount', label: 'Average funded amount assumption', type: 'number', min: 0, step: 1000 },
      { id: 'compensationRate', label: 'Referral compensation assumption (%)', type: 'number', min: 0, step: 0.1 },
      { id: 'repeatRate', label: 'Repeat or renewal assumption (%)', type: 'number', min: 0, step: 1 }
    ], relatedToolIds: ['embedded-capital-calculator', 'capital-workflow-builder'], primaryCta: 'partner'
  }
};

export const PUBLIC_TOOL_LIST = Object.values(PUBLIC_TOOLS);
