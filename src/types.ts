/**
 * Capital Operator — Types & Interfaces
 * Moonshine Capital
 */

export type OperatingModelType = 
  | 'Relationship-Led'
  | 'Systemized'
  | 'AI-Augmented'
  | 'Capital Operator';

export type StagePriority = 'FIX NOW' | 'BUILD NEXT' | 'LATER' | 'WORKING WELL';

export type SegmentType = 
  | 'advisor'
  | 'operator'
  | 'affiliate'
  | 'platform'
  | 'new_revenue';

export type ToolCategory =
  | 'intake'
  | 'CRM'
  | 'workflow automation'
  | 'document collection'
  | 'financial data'
  | 'document intelligence'
  | 'research'
  | 'underwriting support'
  | 'capital matching'
  | 'lender management'
  | 'submission management'
  | 'email'
  | 'SMS'
  | 'call intelligence'
  | 'analytics'
  | 'partner management'
  | 'AI agents'
  | 'MCP / integrations';

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  workflowStage: number; // 1 to 8
  description: string;
  bestFor: string;
  notFor: string;
  pricingTier: 'Free / Low' | 'Mid ($50-$250)' | 'Pro ($250-$750)' | 'Enterprise ($750+)';
  websiteUrl: string;
  affiliateUrl?: string;
  isAffiliate: boolean;
  moonshineAsset: boolean;
  capability: string;
  aiRole?: string;
  humanRole?: string;
  alternatives?: string[];
  tags: string[];
}

export interface WorkflowStageDef {
  number: number;
  name: string;
  internalLabel: string;
  job: string;
  capabilityNeeded: string;
  defaultTools: string[]; // Tool IDs
  systemHandles: string;
  judgmentMatters: string;
}

export interface AssessmentAnswers {
  q1_currentHandling?: string;
  q2_monthlyVolume?: string;
  q3_leadSources: string[];
  q4_pipelineLocation?: string;
  q5_pursuingDecision?: string;
  q6_documentHandling?: string;
  q7_routingDecision?: string;
  q8_followUpAutomation?: string;
  q9_breakdownPoints: string[];
  q10_priorities: string[];
  q11_techBudget?: string;
  q12_handsOnControl?: string;
}

export interface StageRecommendation {
  stageNumber: number;
  stageName: string;
  internalLabel: string;
  job: string;
  currentFriction: string;
  capabilityNeeded: string;
  primaryTool: ToolItem;
  alternativeTools: ToolItem[];
  systemHandles: string;
  judgmentMatters: string;
  priority: StagePriority;
}

export interface AutomationLeakItem {
  currentWork: string;
  systemHandles: string;
  businessImpact: string;
  urgency: 'HIGH' | 'MEDIUM';
}

export interface RoadmapItem {
  step: number;
  title: string;
  description: string;
  stageLabel?: string;
}

export interface BlueprintResult {
  operatingModel: OperatingModelType;
  nextUnlock: string;
  topFindingHeadline: string;
  executiveSummary: string;
  highestLeverageMove: {
    headline: string;
    subheadline: string;
    action: string;
  };
  segment: SegmentType;
  stages: StageRecommendation[];
  automationLeaks: AutomationLeakItem[];
  hasRelationshipLeak: boolean;
  relationshipLeakDetails?: {
    headline: string;
    points: string[];
    recommendation: string;
  };
  roadmap: {
    first7Days: RoadmapItem[];
    next30Days: RoadmapItem[];
    later: RoadmapItem[];
  };
  recommendedCapabilitiesCount: number;
  totalTimeEstimated: string;
}

export interface LeadCapturePayload {
  firstName: string;
  email: string;
  company: string;
  role: string;
  phone?: string;
  operatingModel?: string;
  assessmentAnswers?: AssessmentAnswers;
}
