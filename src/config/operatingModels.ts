/**
 * Capital Operator — Operating Model Definitions
 * src/config/operatingModels.ts
 */

import { OperatingModelType } from '../types';

export interface OperatingModelDetail {
  id: OperatingModelType;
  name: string;
  tagline: string;
  coreCharacteristics: string[];
  primaryVulnerability: string;
  recommendedEvolution: string;
  typicalTechStackCost: string;
  capacityPerOperator: string;
}

export const OPERATING_MODELS_DATA: Record<OperatingModelType, OperatingModelDetail> = {
  'Relationship-Led': {
    id: 'Relationship-Led',
    name: 'Relationship-Led',
    tagline: 'High human touch, spreadsheet-driven, heavy administrative drag',
    coreCharacteristics: [
      'Deals tracked primarily in personal email inbox, memory, or basic spreadsheets',
      'Document collection handled via back-and-forth email attachments',
      'Lender placement reliant on 1–2 informal relationships',
      'Follow-ups and status updates executed manually'
    ],
    primaryVulnerability: 'Pipeline breaks whenever volume surges or key personnel are out of office; significant client leakage.',
    recommendedEvolution: 'Establish a central single source of truth and self-service borrower upload portal.',
    typicalTechStackCost: '$0 – $150 / mo',
    capacityPerOperator: '3 – 7 active deals max'
  },
  'Systemized': {
    id: 'Systemized',
    name: 'Systemized',
    tagline: 'Standardized pipelines, cloud repositories, manual evaluation',
    coreCharacteristics: [
      'CRM or pipeline tracking tools operational with deal stages defined',
      'Shared cloud folders or checklist-based upload links deployed',
      'Document reminders automated based on pipeline stage triggers',
      'Lender criteria stored in spreadsheets or documentation files'
    ],
    primaryVulnerability: 'Senior operators spend 2–4 hours per deal manually spreading financial statements and writing credit memos.',
    recommendedEvolution: 'Deploy OCR document ingestion and AI credit memo summarization.',
    typicalTechStackCost: '$150 – $500 / mo',
    capacityPerOperator: '8 – 20 active deals'
  },
  'AI-Augmented': {
    id: 'AI-Augmented',
    name: 'AI-Augmented',
    tagline: 'Machine extraction, AI credit synthesis, human judgment checkpointing',
    coreCharacteristics: [
      'Automatic financial extraction and cash-flow categorization live',
      'AI-assisted credit memo generation ready in under 3 minutes',
      'Multi-lender credit box matching matrix active',
      'Strict human sign-off checkpoints before lender submission'
    ],
    primaryVulnerability: 'Lender follow-up tracking and condition clearing still create coordination friction during underwriting.',
    recommendedEvolution: 'Automate parallel stipulation tracking and institutional lender APIs.',
    typicalTechStackCost: '$500 – $1,500 / mo',
    capacityPerOperator: '25 – 60 active deals'
  },
  'Capital Operator': {
    id: 'Capital Operator',
    name: 'Capital Operator',
    tagline: 'Full-stack automated capital infrastructure with continuous renewal loops',
    coreCharacteristics: [
      'Multi-channel programmatic intake with real-time pre-qualification',
      'Zero-touch document verification and automated fraud detection',
      'Algorithmic routing to top-decile capital providers',
      'White-label partner portals and continuous refinance triggers'
    ],
    primaryVulnerability: 'Maintaining compliance across diverse state licensing and evolving lender appetite changes.',
    recommendedEvolution: 'Deepen embedded platform integrations and expand secondary credit facilities.',
    typicalTechStackCost: '$1,500+ / mo',
    capacityPerOperator: '75+ active deals'
  }
};
