/**
 * Capital Operator — Notion Data Sources Configuration
 * src/config/notion.ts
 *
 * NOTE: Only public/structural database and data source identifiers are stored here.
 * Authenticated operations must execute server-side (Vercel serverless / backend)
 * utilizing NOTION_TOKEN. Never perform authenticated Notion API calls in client-side code.
 */

import { PUBLIC_ENV } from './publicEnv';

export interface NotionDataSource {
  id: string;
  databaseId: string;
  name: string;
  description: string;
  targetMapping: string;
  syncRole: 'lead_ingestion' | 'partner_registry' | 'readiness_tracking';
}

export const NOTION_DATA_SOURCES: Record<string, NotionDataSource> = {
  fundingLeads: {
    id: PUBLIC_ENV.notion.fundingLeadsDataSourceId,
    databaseId: PUBLIC_ENV.notion.fundingLeadsDbId,
    name: 'Funding Leads',
    description: 'Central registry of prospective borrower leads and diagnostic submissions.',
    targetMapping: 'Captures full Capital Operator blueprint results, contacts, and friction points.',
    syncRole: 'lead_ingestion'
  },
  fundingPartners: {
    id: PUBLIC_ENV.notion.fundingPartnersDataSourceId,
    databaseId: PUBLIC_ENV.notion.fundingPartnersDbId,
    name: 'Funding Partners Database',
    description: 'Catalog of verified capital syndicates, private lenders, and advisory partners.',
    targetMapping: 'Matches user profile against wholesale lending appetite and partner tiers.',
    syncRole: 'partner_registry'
  },
  projectReadiness: {
    id: PUBLIC_ENV.notion.projectReadinessDataSourceId,
    databaseId: PUBLIC_ENV.notion.projectReadinessDbId,
    name: 'Project Funding Readiness',
    description: 'Readiness checklists, condition clearance tracking, and document verification stages.',
    targetMapping: 'Tracks 8-stage operational blueprint milestones and condition completion.',
    syncRole: 'readiness_tracking'
  }
};
