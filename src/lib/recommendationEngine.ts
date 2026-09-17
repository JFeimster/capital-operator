/**
 * Capital Operator — Deterministic Recommendation Engine
 * src/lib/recommendationEngine.ts
 */

import { 
  AssessmentAnswers, 
  BlueprintResult, 
  OperatingModelType, 
  SegmentType, 
  StageRecommendation, 
  AutomationLeakItem, 
  RoadmapItem,
  StagePriority
} from '../types.js';
import { TOOLS_REGISTRY } from '../config/tools.js';
import { WORKFLOW_STAGES } from '../config/workflowStages.js';

export function generateBlueprint(answers: AssessmentAnswers): BlueprintResult {
  // 1. Determine User Segment
  const segment = inferSegment(answers);

  // 2. Infer Operating Model & Next Unlock
  const { operatingModel, nextUnlock } = inferOperatingModel(answers);

  // 3. Determine Top Finding Headline
  const topFindingHeadline = inferTopFinding(answers);

  // 4. Generate Executive Summary
  const executiveSummary = generateExecutiveSummary(answers, operatingModel);

  // 5. Determine Highest-Leverage Move
  const highestLeverageMove = inferHighestLeverageMove(answers);

  // 6. Generate 8-Stage Operating Model Cards
  const stages = generateStageRecommendations(answers);

  // 7. Calculate Automation Leaks ("Paying humans for machine work")
  const automationLeaks = inferAutomationLeaks(answers);

  // 8. Determine Relationship Leak Status (for referrers & partner models)
  const isReferralOrLostEquity = 
    answers.q1_currentHandling === 'I refer capital opportunities elsewhere today' ||
    answers.q1_currentHandling === 'Clients ask me about funding, but it isn\'t a core service' ||
    answers.q9_breakdownPoints.includes('I fund or refer the deal and lose the future relationship');

  let relationshipLeakDetails = undefined;
  if (isReferralOrLostEquity) {
    relationshipLeakDetails = {
      headline: "YOU'RE GENERATING THE DEMAND. SOMEONE ELSE OWNS THE RELATIONSHIP.",
      points: [
        "Lost Visibility: Once an inquiry leaves your inbox or referral link, you have zero visibility into actual approval status, lender review, or why a deal was turned down.",
        "Lost Referral Intelligence: You don't learn what profiles are getting funded or which credit boxes are expanding, preventing you from sharpening your targeting.",
        "Lost Renewal Opportunity: Commercial financing has high repeat frequency (30-60% renewal within 6-12 months). Today, the external lender captures that lifetime equity.",
        "Lost Deal Data: Financial statements, borrower credit trends, and transaction history remain locked in third-party systems instead of building equity in your business.",
        "Lost Cross-Sell Positioning: When a client receives financing from a third party, that third party becomes their trusted financial advisor for future growth needs."
      ],
      recommendation: "Plug into white-labeled capital infrastructure. Retain intake, attribution, client trust, and long-term upside while letting specialized partner rails handle capital fulfillment."
    };
  }

  // 9. Generate Implementation Roadmap (First 7 Days, Next 30 Days, Later)
  const roadmap = generateRoadmap(answers, stages);

  return {
    operatingModel,
    nextUnlock,
    topFindingHeadline,
    executiveSummary,
    highestLeverageMove,
    segment,
    stages,
    automationLeaks,
    hasRelationshipLeak: isReferralOrLostEquity,
    relationshipLeakDetails,
    roadmap,
    recommendedCapabilitiesCount: stages.filter(s => s.priority === 'FIX NOW' || s.priority === 'BUILD NEXT').length,
    totalTimeEstimated: '3-4 weeks to full system deployment'
  };
}

/**
 * Infer segment classification based on Q1
 */
function inferSegment(answers: AssessmentAnswers): SegmentType {
  const q1 = answers.q1_currentHandling;
  if (q1 === 'Clients ask me about funding, but it isn\'t a core service') return 'advisor';
  if (q1 === 'I personally manage deals from lead to funding' || q1 === 'My team handles an active funding pipeline') return 'operator';
  if (q1 === 'I refer capital opportunities elsewhere today') return 'affiliate';
  if (q1 === 'My users need capital inside my platform or ecosystem') return 'platform';
  return 'new_revenue';
}

/**
 * Infer current operating maturity model
 */
function inferOperatingModel(answers: AssessmentAnswers): { operatingModel: OperatingModelType; nextUnlock: string } {
  let score = 0;

  // Pipeline location scoring
  if (answers.q4_pipelineLocation === 'HubSpot' || answers.q4_pipelineLocation === 'Salesforce' || answers.q4_pipelineLocation === 'GoHighLevel') score += 2;
  else if (answers.q4_pipelineLocation === 'Spreadsheet' || answers.q4_pipelineLocation === 'Notion') score += 1;

  // Decision scoring
  if (answers.q5_pursuingDecision === 'Automated prequalification' || answers.q5_pursuingDecision === 'AI-assisted review') score += 2;
  else if (answers.q5_pursuingDecision === 'Basic eligibility rules' || answers.q5_pursuingDecision === 'CRM workflows') score += 1;

  // Document scoring
  if (answers.q6_documentHandling === 'Structured data room' || answers.q6_documentHandling === 'Automated extraction / document AI') score += 2;
  else if (answers.q6_documentHandling === 'CRM uploads') score += 1;

  // Routing scoring
  if (answers.q7_routingDecision === 'Matching software' || answers.q7_routingDecision === 'AI-assisted routing') score += 2;
  else if (answers.q7_routingDecision === 'Spreadsheet / lender matrix' || answers.q7_routingDecision === 'CRM rules') score += 1;

  // Follow up
  if (answers.q8_followUpAutomation === 'Multi-channel automation' || answers.q8_followUpAutomation === 'AI-assisted follow-up' || answers.q8_followUpAutomation === 'Advanced agent workflows') score += 2;
  else if (answers.q8_followUpAutomation === 'CRM workflows' || answers.q8_followUpAutomation === 'CRM reminders') score += 1;

  if (score <= 2) {
    return {
      operatingModel: 'Relationship-Led',
      nextUnlock: 'Systemized intake + minimum qualification rules'
    };
  } else if (score <= 5) {
    return {
      operatingModel: 'Systemized',
      nextUnlock: 'Automated document extraction + governed lender-routing matrix'
    };
  } else if (score <= 8) {
    return {
      operatingModel: 'AI-Augmented',
      nextUnlock: 'Multi-agent deal packaging + automated renewal attribution'
    };
  } else {
    return {
      operatingModel: 'Capital Operator',
      nextUnlock: 'Embedded capital rails + platform-wide relationship equity'
    };
  }
}

/**
 * Infer the top diagnostic finding headline
 */
function inferTopFinding(answers: AssessmentAnswers): string {
  const b = answers.q9_breakdownPoints;

  if (b.includes('Finding the right capital still depends on memory and guesswork')) {
    return "You Don't Have a Lead Problem. You Have a Routing Problem.";
  }
  if (b.includes('I\'m chasing documents instead of moving deals')) {
    return "Your Pipeline Is Choked by Manual Document Chasing.";
  }
  if (b.includes('Too much time wasted on opportunities that were never viable') || b.includes('Every deal requires too much manual analysis')) {
    return "Your Best Operator Is Still Doing Work the System Should Handle.";
  }
  if (b.includes('I fund or refer the deal and lose the future relationship')) {
    return "You're Generating Capital Demand but Giving Away the Lifetime Relationship.";
  }
  if (b.includes('Good opportunities go cold between touches')) {
    return "Deals Are Leaking Revenue Between Handoffs and Manual Follow-Ups.";
  }
  if (b.includes('My operation lives in too many disconnected systems')) {
    return "Your Capital Business Lives in Tribal Knowledge Across Disconnected Tools.";
  }

  return "Your Capital Operation Has 3 Structural Leaks Worth Fixing First.";
}

/**
 * Generate personal executive summary
 */
function generateExecutiveSummary(answers: AssessmentAnswers, model: OperatingModelType): string {
  const volume = answers.q2_monthlyVolume || '10–25';
  const pipeline = answers.q4_pipelineLocation || 'spreadsheets';

  if (model === 'Relationship-Led') {
    return `You're encountering ${volume} capital opportunities each month, but deal qualification, document collection, and lender routing still depend heavily on manual memory and scattered ${pipeline}. The highest-leverage move is not generating more raw lead volume—it is creating a structured intake and eligibility screening layer before deals ever touch an operator.`;
  }

  if (model === 'Systemized') {
    return `You have established a baseline pipeline in ${pipeline}, but packaging and lender matching remain a heavy manual drag. The operation loses velocity chasing missing statements and re-analyzing bank metrics. Automating financial extraction and governing your lender matrix will liberate 15+ hours per week for higher-value relationship management.`;
  }

  return `Your operation possesses strong baseline volume and workflow tools, but deals risk stalling between submission and closing. Transitioning from generic automation to agent-assisted deal synthesis, automated debt detection, and lifecycle retention workflows will maximize conversion and prevent client leakage to third-party lenders.`;
}

/**
 * Infer the highest leverage single move
 */
function inferHighestLeverageMove(answers: AssessmentAnswers): { headline: string; subheadline: string; action: string } {
  const b = answers.q9_breakdownPoints;

  if (b.includes('I\'m chasing documents instead of moving deals')) {
    return {
      headline: 'STOP CHASING ATTACHMENTS OVER EMAIL.',
      subheadline: 'Implement a structured data room with automated checklist progression and financial extraction.',
      action: 'Borrowers should upload into a secure workspace that immediately extracts bank metrics and flags missing statements before human review.'
    };
  }

  if (b.includes('Finding the right capital still depends on memory and guesswork')) {
    return {
      headline: 'GOVERN YOUR LENDER CRITERIA IN A ROUTING MATRIX.',
      subheadline: 'Eliminate lender guesswork and tribal memory with deterministic credit box screening.',
      action: 'Map lender parameters into an interactive matrix so operators review a prioritized shortlist grounded in verified metrics, not assumptions.'
    };
  }

  if (b.includes('Too much time wasted on opportunities that were never viable')) {
    return {
      headline: 'STOP QUALIFYING EVERY OPPORTUNITY BY HAND.',
      subheadline: 'Put structured intake, eligibility logic, and financial data collection in front of the operator.',
      action: 'Humans should spend their time interpreting the deal and closing terms—never retyping form fields or screening unviable applicants.'
    };
  }

  return {
    headline: 'ESTABLISH ONE SYSTEM OF RECORD FOR CAPITAL DEMAND.',
    subheadline: 'Connect intake forms directly to automated qualification, staging, and task ownership.',
    action: 'Every opportunity touching your business must receive an automated qualification brief, an assigned owner, and an enforceable next-action deadline.'
  };
}

/**
 * Generate 8-Stage Operating Model Cards
 */
function generateStageRecommendations(answers: AssessmentAnswers): StageRecommendation[] {
  const b = answers.q9_breakdownPoints;
  const p = answers.q10_priorities;

  return WORKFLOW_STAGES.map((stage) => {
    let priority: StagePriority = 'BUILD NEXT';
    let friction = 'Current process has manual handoffs and could benefit from stronger systemization.';

    // Stage 1: Demand / Acquire
    if (stage.number === 1) {
      if (b.includes('Not enough capital opportunities entering the pipeline') || p.includes('More qualified opportunities')) {
        priority = 'FIX NOW';
        friction = 'Inbound deal flow is inconsistent and lacks automated lead enrichment before engagement.';
      } else {
        priority = 'WORKING WELL';
        friction = 'Inbound demand touches the business regularly, but intake attribution needs safeguarding.';
      }
    }

    // Stage 2: Qualify
    if (stage.number === 2) {
      if (
        b.includes('Too much time wasted on opportunities that were never viable') ||
        answers.q5_pursuingDecision === 'Manual review' ||
        answers.q5_pursuingDecision === 'It depends on the operator' ||
        p.includes('Faster qualification')
      ) {
        priority = 'FIX NOW';
        friction = 'Your process relies on manual operator review before basic time-in-business and revenue eligibility are confirmed.';
      } else {
        priority = 'BUILD NEXT';
        friction = 'Basic form intake exists, but lacks automated pre-qualification screening and friction diagnostics.';
      }
    }

    // Stage 3: Research
    if (stage.number === 3) {
      if (b.includes('I don\'t know enough about the business before I engage')) {
        priority = 'FIX NOW';
        friction = 'Brokers enter discovery calls cold without secretary of state filings, web footprint, or industry context.';
      } else {
        priority = 'LATER';
        friction = 'Manual web search is currently performed piecemeal when time permits.';
      }
    }

    // Stage 4: Package / Documents
    if (stage.number === 4) {
      if (
        b.includes('I\'m chasing documents instead of moving deals') ||
        b.includes('Every deal requires too much manual analysis') ||
        answers.q6_documentHandling === 'Mostly email attachments' ||
        p.includes('Faster document collection')
      ) {
        priority = 'FIX NOW';
        friction = 'Documents arrive scattered in email threads. Operators spend hours manually calculating deposits and inspecting PDFs.';
      } else {
        priority = 'BUILD NEXT';
        friction = 'Files are stored in folders, but cash-flow extraction and debt payment checks require manual re-entry.';
      }
    }

    // Stage 5: Match / Routing
    if (stage.number === 5) {
      if (
        b.includes('Finding the right capital still depends on memory and guesswork') ||
        answers.q7_routingDecision === 'Memory and experience' ||
        answers.q7_routingDecision === 'We do not have a consistent process' ||
        p.includes('Better capital matching')
      ) {
        priority = 'FIX NOW';
        friction = 'Lender selection relies entirely on memory and personal contacts, leading to declined files and lost placement fees.';
      } else {
        priority = 'BUILD NEXT';
        friction = 'A spreadsheet matrix exists but is updated irregularly and lacks automated credit box rule filtering.';
      }
    }

    // Stage 6: Submit
    if (stage.number === 6) {
      if (b.includes('Packaging and submitting deals takes too long') || p.includes('More completed submissions')) {
        priority = 'FIX NOW';
        friction = 'Assembling the required lender package requires manual file renaming, notes retyping, and unformatted emails.';
      } else {
        priority = 'LATER';
        friction = 'Standard email submissions work, but lack unified checklist validation prior to lender dispatch.';
      }
    }

    // Stage 7: Follow Up
    if (stage.number === 7) {
      if (
        b.includes('Good opportunities go cold between touches') ||
        answers.q8_followUpAutomation === 'Almost none' ||
        p.includes('Better follow-up')
      ) {
        priority = 'FIX NOW';
        friction = 'Deals stall because missing document requests and lender status checks depend on personal memory.';
      } else {
        priority = 'BUILD NEXT';
        friction = 'Basic email reminders exist, but lack dynamic event triggers and call action-item synchronization.';
      }
    }

    // Stage 8: Retain
    if (stage.number === 8) {
      if (
        b.includes('I fund or refer the deal and lose the future relationship') ||
        p.includes('Keep customers inside my ecosystem')
      ) {
        priority = 'FIX NOW';
        friction = 'Once a deal funds or is referred away, future renewal upside and cross-sell equity are lost to third parties.';
      } else {
        priority = 'BUILD NEXT';
        friction = 'Funded deals are logged, but systematic 6-month renewal countdowns and referral triggers are not automated.';
      }
    }

    // Map tools from registry
    const defaultToolIds = stage.defaultTools;
    const primaryTool = TOOLS_REGISTRY[defaultToolIds[0]] || TOOLS_REGISTRY['tally'];
    const alternativeTools = defaultToolIds.slice(1).map(id => TOOLS_REGISTRY[id]).filter(Boolean);

    return {
      stageNumber: stage.number,
      stageName: stage.name,
      internalLabel: stage.internalLabel,
      job: stage.job,
      currentFriction: friction,
      capabilityNeeded: stage.capabilityNeeded,
      primaryTool,
      alternativeTools,
      systemHandles: stage.systemHandles,
      judgmentMatters: stage.judgmentMatters,
      priority
    };
  });
}

/**
 * Infer automation leaks where humans are doing machine work
 */
function inferAutomationLeaks(answers: AssessmentAnswers): AutomationLeakItem[] {
  const leaks: AutomationLeakItem[] = [];

  if (answers.q5_pursuingDecision === 'Manual review' || answers.q5_pursuingDecision === 'Intake form + manual review') {
    leaks.push({
      currentWork: 'Reading raw application responses and manually calculating if business meets minimum revenue/time criteria.',
      systemHandles: 'Form validation logic, revenue tier categorization, minimum eligibility rules, and instant disqualifier flags.',
      businessImpact: 'Saves 4-8 operator hours weekly; prevents unviable inquiries from ever reaching expensive broker time.',
      urgency: 'HIGH'
    });
  }

  if (answers.q6_documentHandling === 'Mostly email attachments' || answers.q6_documentHandling === 'Shared folders') {
    leaks.push({
      currentWork: 'Downloading PDFs from emails, renaming files, sorting statements by month, and checking for missing pages.',
      systemHandles: 'Client upload data room, automatic document classification, month validation, and missing statement alerts.',
      businessImpact: 'Eliminates 3-5 days of document turnaround drag; reduces file dropout before submission by 30%.',
      urgency: 'HIGH'
    });
  }

  if (answers.q7_routingDecision === 'Memory and experience') {
    leaks.push({
      currentWork: 'Mentally recalling which lender accepts specific industries, restricted states, or minimum credit thresholds.',
      systemHandles: 'Centralized lender credit box database with rule-based multi-parameter filtering and shortlist rationale.',
      businessImpact: 'Prevents wasted lender submissions; cuts first-look declines and preserves lender reputation.',
      urgency: 'HIGH'
    });
  }

  if (answers.q8_followUpAutomation === 'Almost none' || answers.q8_followUpAutomation === 'CRM reminders') {
    leaks.push({
      currentWork: 'Remembering to send reminder emails to borrowers who paused halfway through document upload.',
      systemHandles: 'Event-triggered multi-channel reminders (Day 1, 3, 5) with direct resume links until package is completed.',
      businessImpact: 'Recovers 20-35% of stalled deals that would otherwise ghost the operation.',
      urgency: 'MEDIUM'
    });
  }

  leaks.push({
    currentWork: 'Copying deal notes and call transcripts across spreadsheets, email threads, and lender application portals.',
    systemHandles: 'Meeting AI transcription, automatic CRM deal property updates, and one-click submission package bundling.',
    businessImpact: 'Reclaims 10+ hours per week per operator, transforming admins into high-touch relationship closers.',
    urgency: 'MEDIUM'
  });

  return leaks;
}

/**
 * Generate 3-phase implementation roadmap
 */
function generateRoadmap(answers: AssessmentAnswers, stages: StageRecommendation[]): {
  first7Days: RoadmapItem[];
  next30Days: RoadmapItem[];
  later: RoadmapItem[];
} {
  return {
    first7Days: [
      {
        step: 1,
        title: 'Deploy Structured Conditional Intake',
        description: 'Replace freeform emails or basic contact forms with a structured questionnaire (Tally or Jotform) collecting verified revenue, use of funds, and time in business.',
        stageLabel: 'QUALIFY'
      },
      {
        step: 2,
        title: 'Define Minimum Viable Qualification Rules',
        description: 'Establish clear deterministic gating rules (e.g. minimum $10k/mo revenue, 6+ months in business) so non-fundable inquiries receive immediate educational guidance rather than manual review.',
        stageLabel: 'QUALIFY'
      },
      {
        step: 3,
        title: 'Establish One Central Deal System of Record',
        description: 'Designate a single source of truth for active capital opportunities (HubSpot or Notion base) with strictly defined pipeline stages and mandatory next-action owners.',
        stageLabel: 'OPERATE'
      }
    ],

    next30Days: [
      {
        step: 4,
        title: 'Automate Document Collection & Validation',
        description: 'Deploy a dedicated client data room with automated upload reminders and financial extraction (Heron Data or Docsumo) to eliminate manual bank statement calculation.',
        stageLabel: 'PACKAGE'
      },
      {
        step: 5,
        title: 'Formalize Governed Lender-Routing Matrix',
        description: 'Organize your capital partner credit boxes into a structured table (Airtable or FundStack AI) filtering by product family, minimum credit, and industry appetite.',
        stageLabel: 'MATCH'
      },
      {
        step: 6,
        title: 'Build Event-Triggered Follow-Up Sequences',
        description: 'Automate stage-based follow-up cadences so active opportunities never go cold while waiting on borrower documents or lender status updates.',
        stageLabel: 'FOLLOW UP'
      }
    ],

    later: [
      {
        step: 7,
        title: 'Integrate AI Deal Dossier Synthesis',
        description: 'Implement AI research briefings (Claude / Perplexity) to synthesize borrower financial health and draft lender-ready executive credit memos.',
        stageLabel: 'RESEARCH'
      },
      {
        step: 8,
        title: 'Activate Automated Renewal & Referral Loops',
        description: 'Deploy 6-month post-close countdown triggers and referral attribution tracking to capture recurring capital demand and client lifetime equity.',
        stageLabel: 'RETAIN'
      },
      {
        step: 9,
        title: 'Embed Partner & Ecosystem Rails',
        description: 'Allow partners, CPAs, or platform users to submit capital inquiries through white-labeled portals preserving full attribution and shared deal visibility.',
        stageLabel: 'ACQUIRE'
      }
    ]
  };
}
