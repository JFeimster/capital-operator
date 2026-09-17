/**
 * Capital Operator — Canonical Capability Registry
 */

import type { CapabilityStatus } from '../types/api.js';

export type Responsibility = 'SYSTEM' | 'AI' | 'HUMAN' | 'CAPITAL_PARTNER';

export interface PlatformCapability {
  id: string;
  name: string;
  description: string;
  workflowStages: number[];
  responsibility: Responsibility;
  status: CapabilityStatus;
  ecosystemProductIds: string[];
  fallback: string;
  humanCheckpoint?: string;
}

export const CAPABILITIES: PlatformCapability[] = [
  { id: 'diagnostic', name: 'Capital Operations Diagnostic', description: 'Diagnose operating-model and workflow gaps.', workflowStages: [1,2,3,4,5,6,7,8], responsibility: 'SYSTEM', status: 'LIVE', ecosystemProductIds: [], fallback: 'Run the Capital Operator diagnostic manually.' },
  { id: 'funding-intake', name: 'Funding Intake', description: 'Collect structured business funding intake data.', workflowStages: [2], responsibility: 'SYSTEM', status: 'LIVE', ecosystemProductIds: ['am-i-fundable','funding-applicant-os'], fallback: 'Use the canonical Tally funding intake.' },
  { id: 'partner-intake', name: 'Partner Intake', description: 'Capture and attribute partner-originated opportunities.', workflowStages: [1,2], responsibility: 'SYSTEM', status: 'BETA', ecosystemProductIds: ['partner-intake-os'], fallback: 'Use the canonical Tally partner intake.' },
  { id: 'applicant-operations', name: 'Applicant Operations', description: 'Coordinate applicant information, documents, and next actions.', workflowStages: [3,4,6,7], responsibility: 'SYSTEM', status: 'SPECIFIED', ecosystemProductIds: ['funding-applicant-os'], fallback: 'Use CRM tasks and document checklists.' },
  { id: 'partner-operations', name: 'Partner Operations', description: 'Manage referral partners, attribution, resources, and lifecycle.', workflowStages: [1,8], responsibility: 'SYSTEM', status: 'SPECIFIED', ecosystemProductIds: ['funding-partners-os'], fallback: 'Use CRM partner records and canonical tracking links.' },
  { id: 'funding-operations', name: 'Funding Operations', description: 'Operate deal workflow from intake through handoff and follow-up.', workflowStages: [2,4,5,6,7,8], responsibility: 'SYSTEM', status: 'SPECIFIED', ecosystemProductIds: ['funding-operator-os'], fallback: 'Use the canonical CRM pipeline and operator checklist.' },
  { id: 'capital-readiness', name: 'Capital Readiness', description: 'Identify missing information and readiness gaps without making a credit decision.', workflowStages: [2,3], responsibility: 'SYSTEM', status: 'BETA', ecosystemProductIds: ['am-i-fundable'], fallback: 'Use structured intake plus human review.' },
  { id: 'capital-stack-planning', name: 'Capital Stack Planning', description: 'Plan capital categories around use of funds and operating constraints.', workflowStages: [4,5], responsibility: 'SYSTEM', status: 'BETA', ecosystemProductIds: ['distilled-funding-tools'], fallback: 'Use operator-led capital structure review.', humanCheckpoint: 'Operator validates structure before external representation.' },
  { id: 'capital-case', name: 'Capital Case Preparation', description: 'Organize verified facts into an operator-ready capital narrative.', workflowStages: [4], responsibility: 'AI', status: 'BETA', ecosystemProductIds: ['funding-applicant-os','funding-operator-os'], fallback: 'Use a human-prepared capital case template.', humanCheckpoint: 'Human verifies all representations before transmission.' },
  { id: 'routing', name: 'Capital Route Classification', description: 'Identify potential capital categories for review without lender eligibility claims.', workflowStages: [5], responsibility: 'SYSTEM', status: 'SANDBOX', ecosystemProductIds: ['funding-partners-os'], fallback: 'Human operator selects route using verified partner criteria.', humanCheckpoint: 'Human approves any lender-facing route or submission.' },
  { id: 'document-collection', name: 'Document Collection', description: 'Collect and organize requested applicant documents.', workflowStages: [4,6], responsibility: 'SYSTEM', status: 'SPECIFIED', ecosystemProductIds: ['funding-applicant-os'], fallback: 'Secure upload plus operator checklist.' },
  { id: 'document-intelligence', name: 'Document Intelligence', description: 'Normalize extracted document facts with confidence and review flags.', workflowStages: [4], responsibility: 'AI', status: 'SPECIFIED', ecosystemProductIds: [], fallback: 'Manual extraction and verification.', humanCheckpoint: 'Human verifies low-confidence or consequential fields.' },
  { id: 'crm-lifecycle', name: 'CRM & Lifecycle', description: 'Track ownership, stage, follow-up, and relationship history.', workflowStages: [2,6,7,8], responsibility: 'SYSTEM', status: 'BETA', ecosystemProductIds: ['hubspot'], fallback: 'Use operator-managed CRM tasks.' },
  { id: 'attribution', name: 'Attribution', description: 'Preserve source, partner, campaign, and handoff context.', workflowStages: [1,8], responsibility: 'SYSTEM', status: 'LIVE', ecosystemProductIds: ['partner-intake-os'], fallback: 'Preserve UTM and partner metadata in the intake record.' },
  { id: 'automation', name: 'Workflow Automation', description: 'Move data and trigger repeatable operational steps.', workflowStages: [1,2,4,6,7,8], responsibility: 'SYSTEM', status: 'BETA', ecosystemProductIds: ['n8n'], fallback: 'Operator-owned task checklist and manual handoff.' },
  { id: 'tools-directory', name: 'Tools & Infrastructure Directory', description: 'Query vetted tooling by workflow stage and capability.', workflowStages: [1,2,3,4,5,6,7,8], responsibility: 'SYSTEM', status: 'LIVE', ecosystemProductIds: ['distilled-funding-tools'], fallback: 'Use the source-controlled tools registry.' }
];

export const CAPABILITY_BY_ID = Object.fromEntries(CAPABILITIES.map(capability => [capability.id, capability])) as Record<string, PlatformCapability>;
