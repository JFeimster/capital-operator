/**
 * Capital Operator — Public HubSpot Configuration
 * src/config/hubspot.ts
 *
 * NOTE: Only public portal and form identifiers are stored here.
 * API keys and access tokens must remain strictly server-side (Vercel serverless / backend).
 */

import { PUBLIC_ENV } from './publicEnv';

export interface HubSpotPublicForm {
  id: string;
  name: string;
  purpose: string;
  embedType: 'raw_embed' | 'n8n_webhook' | 'serverless_proxy';
}

export const HUBSPOT_CONFIG = {
  portalId: PUBLIC_ENV.hubspot.portalId,

  forms: {
    n8nFundingForm: {
      id: PUBLIC_ENV.hubspot.n8nFundingFormId,
      name: 'n8n Funding Form',
      purpose: 'Funding request ingestion channeled to n8n webhook orchestration.',
      embedType: 'n8n_webhook'
    } as HubSpotPublicForm,

    instantMicroFundingForm: {
      id: PUBLIC_ENV.hubspot.instantMicroFundingFormId,
      name: 'Instant Micro Funding Form',
      purpose: 'Rapid under-$50k small business micro-loan qualification.',
      embedType: 'raw_embed'
    } as HubSpotPublicForm,

    prequalForm: {
      id: PUBLIC_ENV.hubspot.prequalFormId,
      name: 'Commercial Lending Pre-Qualification Form',
      purpose: 'Comprehensive borrower underwriting questionnaire.',
      embedType: 'raw_embed'
    } as HubSpotPublicForm
  },

  /**
   * Field mappings for future serverless dispatch (api/lead.ts)
   */
  propertyKeys: {
    operatingModel: 'capital_operator_operating_model',
    assessmentSegment: 'capital_operator_segment',
    monthlyVolume: 'monthly_opportunity_volume',
    primaryFriction: 'top_friction_point',
    priorityMove: 'highest_leverage_move',
    utmSource: 'utm_source',
    utmMedium: 'utm_medium',
    utmCampaign: 'utm_campaign',
    partnerId: 'partner_id'
  }
};
