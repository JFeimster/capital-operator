/**
 * Capital Operator — Deterministic Capability Matcher
 *
 * Converts operating context into missing platform capabilities. This layer
 * routes work/capability needs only; it does not make lender or credit decisions.
 */
import { CAPABILITIES, type PlatformCapability } from '../config/capabilities.js';
import type { OperatingModelType, SegmentType } from '../types.js';

export interface CapitalDemandProfile {
  requestedAmount?: number;
  useOfFunds?: string;
  recurringWorkingCapitalNeed?: boolean;
  documentHeavy?: boolean;
  partnerOriginated?: boolean;
}

export interface CapabilityMatchInput {
  workflowStage?: number;
  operatingModel?: OperatingModelType;
  segment?: SegmentType;
  businessNeed?: string;
  capitalDemandProfile?: CapitalDemandProfile;
  manualWorkflowGaps?: string[];
  requiredCapabilityIds?: string[];
  currentCapabilityIds?: string[];
  currentEcosystemProductIds?: string[];
  preferAutomated?: boolean;
}

export interface CapabilityMatch {
  capability: PlatformCapability;
  missing: boolean;
  matchedBecause: string[];
  nextAction: string;
  humanRequired: boolean;
}

function add(target: Map<string, string[]>, capabilityId: string, reason: string) {
  const reasons=target.get(capabilityId) || [];
  if(!reasons.includes(reason)) reasons.push(reason);
  target.set(capabilityId,reasons);
}

function inferFromText(target: Map<string,string[]>, text: string, source: string) {
  const value=text.toLowerCase();
  const rules: Array<[RegExp,string[]]> = [
    [/intake|application|form|qualif/, ['funding-intake','capital-readiness']],
    [/partner|referral|channel/, ['partner-intake','attribution']],
    [/document|file|stip|checklist/, ['document-collection']],
    [/ocr|extract|bank statement|financial statement/, ['document-intelligence']],
    [/crm|follow[- ]?up|renewal|relationship/, ['crm-lifecycle']],
    [/route|routing|lender|match|capital source/, ['routing']],
    [/automation|manual|rekey|copy|handoff/, ['automation']],
    [/capital case|credit memo|package|narrative/, ['capital-case']],
    [/capital stack|structure|use of funds/, ['capital-stack-planning']]
  ];
  for(const [pattern,ids] of rules) if(pattern.test(value)) ids.forEach(id=>add(target,id,source));
}

export function matchCapabilities(input: CapabilityMatchInput): CapabilityMatch[] {
  const reasons=new Map<string,string[]>();
  const current=new Set(input.currentCapabilityIds || []);
  const currentProducts=new Set(input.currentEcosystemProductIds || []);

  for(const id of input.requiredCapabilityIds || []) add(reasons,id,'explicit capability requirement');

  if(input.workflowStage){
    for(const capability of CAPABILITIES.filter(item=>item.workflowStages.includes(input.workflowStage!))){
      add(reasons,capability.id,`workflow stage ${input.workflowStage}`);
    }
  }

  const segmentMap: Partial<Record<SegmentType,string[]>> = {
    advisor:['partner-intake','attribution','crm-lifecycle'],
    affiliate:['partner-intake','attribution','crm-lifecycle'],
    operator:['funding-operations','crm-lifecycle','routing'],
    platform:['funding-intake','automation','attribution'],
    new_revenue:['diagnostic','funding-intake','capital-readiness']
  };
  for(const id of input.segment ? segmentMap[input.segment] || [] : []) add(reasons,id,`segment: ${input.segment}`);

  const modelMap: Record<OperatingModelType,string[]> = {
    'Relationship-Led':['crm-lifecycle','automation','attribution'],
    'Systemized':['automation','funding-operations'],
    'AI-Augmented':['capital-case','document-intelligence'],
    'Capital Operator':['routing','partner-operations','funding-operations']
  };
  for(const id of input.operatingModel ? modelMap[input.operatingModel] : []) add(reasons,id,`operating model: ${input.operatingModel}`);

  if(input.businessNeed) inferFromText(reasons,input.businessNeed,'business need');
  for(const gap of input.manualWorkflowGaps || []) inferFromText(reasons,gap,`manual gap: ${gap}`);

  const demand=input.capitalDemandProfile;
  if(demand){
    if(Number.isFinite(demand.requestedAmount) && Number(demand.requestedAmount)>0){
      add(reasons,'capital-stack-planning','active capital demand');
      add(reasons,'routing','active capital demand');
    }
    if(demand.useOfFunds) inferFromText(reasons,demand.useOfFunds,'use of funds');
    if(demand.recurringWorkingCapitalNeed) add(reasons,'capital-stack-planning','recurring working-capital need');
    if(demand.documentHeavy){
      add(reasons,'document-collection','document-heavy workflow');
      add(reasons,'document-intelligence','document-heavy workflow');
    }
    if(demand.partnerOriginated){
      add(reasons,'partner-intake','partner-originated demand');
      add(reasons,'attribution','partner-originated demand');
    }
  }

  const matches=CAPABILITIES
    .filter(capability=>reasons.has(capability.id))
    .map(capability=>{
      const coveredByProduct=capability.ecosystemProductIds.some(id=>currentProducts.has(id));
      const missing=!current.has(capability.id) && !coveredByProduct;
      const product=capability.ecosystemProductIds[0];
      return {
        capability,
        missing,
        matchedBecause:reasons.get(capability.id) || [],
        nextAction: missing
          ? product
            ? `Evaluate ecosystem capability: ${product}`
            : capability.fallback
          : 'Keep current capability; verify performance before adding another system.',
        humanRequired: capability.responsibility === 'HUMAN' || Boolean(capability.humanCheckpoint)
      };
    });

  const responsibilityWeight: Record<PlatformCapability['responsibility'],number> = {
    SYSTEM:0, AI:1, HUMAN:2, CAPITAL_PARTNER:3
  };

  return matches.sort((a,b)=>{
    const missingDelta=Number(b.missing)-Number(a.missing);
    if(missingDelta!==0) return missingDelta;
    if(input.preferAutomated) return responsibilityWeight[a.capability.responsibility]-responsibilityWeight[b.capability.responsibility];
    return a.capability.id.localeCompare(b.capability.id);
  });
}
