/**
 * Capital Operator — Core 8 Workflow Stages
 * src/config/workflowStages.ts
 */

import { WorkflowStageDef } from '../types.js';

export const WORKFLOW_STAGES: WorkflowStageDef[] = [
  {
    number: 1,
    name: 'CREATE DEMAND',
    internalLabel: 'ACQUIRE',
    job: 'Generate a reliable flow of relevant businesses and prioritize attention toward prospects with a credible reason to discuss capital.',
    capabilityNeeded: 'Structured inbound capture, account signals & partner attribution',
    defaultTools: ['apollo', 'clay', 'partner_intake_os'],
    systemHandles: 'Inbound capture, deduplication, contact enrichment, source tagging, list sync, and speed-to-lead alerts.',
    judgmentMatters: 'Target-market definition, outreach positioning, claims compliance, and deciding who genuinely warrants partner attention.'
  },
  {
    number: 2,
    name: 'FIND THE REAL OPPORTUNITIES',
    internalLabel: 'QUALIFY',
    job: 'Separate incomplete, unready, clearly mismatched, and potentially viable opportunities before an operator wastes manual hours.',
    capabilityNeeded: 'Structured intake + rule-based pre-qualification + eligibility screening',
    defaultTools: ['tally', 'am_i_fundable', 'hubspot'],
    systemHandles: 'Collect application data, verify completeness, check basic time-in-business and revenue thresholds, and flag obvious disqualifiers.',
    judgmentMatters: 'Operator reviews edge cases, evaluates material business nuances, and decides whether the opportunity is worth advancing.'
  },
  {
    number: 3,
    name: 'KNOW THE BUSINESS',
    internalLabel: 'RESEARCH',
    job: 'Gather verified company context, industry benchmarks, and operating background to inform the discovery conversation.',
    capabilityNeeded: 'Automated business intelligence, entity verification & web research',
    defaultTools: ['perplexity', 'clay', 'claude_ai'],
    systemHandles: 'Pull secretary of state filings, check web reputation, verify entity standing, and compile an executive research briefing.',
    judgmentMatters: 'Human interprets operational context, assesses borrower credibility, and tailors discovery questions.'
  },
  {
    number: 4,
    name: 'BUILD THE CAPITAL CASE',
    internalLabel: 'PACKAGE',
    job: 'Collect, extract, and organize required financial files and data into a decision-useful narrative without manual paper-chasing.',
    capabilityNeeded: 'Secure deal data room + financial OCR extraction + debt detection',
    defaultTools: ['funding_data_room', 'heron_data', 'claude_ai'],
    systemHandles: 'Secure file upload routing, automated document categorization, bank statement metric extraction, and debt payment detection.',
    judgmentMatters: 'Resolving discrepancies, verifying financial representations, and approving the final credit narrative.'
  },
  {
    number: 5,
    name: 'ROUTE TO THE RIGHT CAPITAL',
    internalLabel: 'MATCH',
    job: 'Compare verified business metrics against governed lender credit criteria to build a defensible shortlist of viable paths.',
    capabilityNeeded: 'Governed lender-fit matrix + multi-family capital navigation',
    defaultTools: ['fundstack_ai', 'lender_fit_copilot', 'airtable_ops'],
    systemHandles: 'Eliminate clear product mismatches, check guideline freshness, evaluate criteria thresholds, and highlight product tradeoffs.',
    judgmentMatters: 'Broker relationship context, lender portfolio appetite, stacking/sequence strategy, and deal exception negotiation.'
  },
  {
    number: 6,
    name: 'MOVE THE DEAL',
    internalLabel: 'SUBMIT',
    job: 'Assemble and deliver an accurate, complete package matching the specific lender requirement to prevent back-and-forth friction.',
    capabilityNeeded: 'Submission checklist orchestration & lender package bundling',
    defaultTools: ['n8n', 'hubspot', 'make'],
    systemHandles: 'File bundling, naming convention enforcement, template population, transmission logging, and CRM stage progression.',
    judgmentMatters: 'Final package review, material disclosure confirmation, and managing direct lender underwriter dialogue.'
  },
  {
    number: 7,
    name: 'KEEP MOMENTUM',
    internalLabel: 'FOLLOW UP',
    job: 'Ensure every active opportunity has a clear next-action owner, deadline, and reminder cadence so deals never go cold.',
    capabilityNeeded: 'Event-triggered sequences, call transcription & stale-deal alerts',
    defaultTools: ['hubspot', 'fireflies', 'ai_agent_arsenal'],
    systemHandles: 'Task assignment, automated document reminder cadences, call transcription, CRM note creation, and stale-deal escalation.',
    judgmentMatters: 'Handling objections, negotiating terms, borrower counseling, and communicating sensitive adjustments.'
  },
  {
    number: 8,
    name: 'OWN THE RELATIONSHIP',
    internalLabel: 'RETAIN',
    job: 'Turn funded deals into recurring capital events, client equity, and continuous referral flow rather than losing future visibility.',
    capabilityNeeded: 'Outcome tracking, renewal monitoring & partner relationship lifecycle',
    defaultTools: ['partner_intake_os', 'resource_grid', 'hubspot'],
    systemHandles: 'Funding outcome logging, anniversary triggers, renewal countdown tracking, and referral satisfaction check-ins.',
    judgmentMatters: 'Personal client advisory, strategic repeat-capital planning, and building trusted referral networks.'
  }
];
