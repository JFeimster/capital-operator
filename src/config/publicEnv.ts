/**
 * Capital Operator — Public Environment Configuration & Validation Helper
 * src/config/publicEnv.ts
 *
 * NOTE: Only safe public frontend variables (VITE_*) are accessed here.
 * Never import or expose private server keys in browser bundles.
 */

export const PUBLIC_ENV = {
  appName: import.meta.env.VITE_APP_NAME || 'Capital Operator',
  distilledFundingUrl: import.meta.env.VITE_DISTILLED_FUNDING_URL || 'https://www.distilledfunding.com',
  repoUrl: import.meta.env.VITE_CAPITAL_OPERATOR_REPO_URL || 'https://github.com/JFeimster/capital-operator',

  // Tally Forms
  tally: {
    partnerFormId: import.meta.env.VITE_TALLY_PARTNER_FORM_ID || 'mOe658',
    partnerFormUrl: import.meta.env.VITE_TALLY_PARTNER_FORM_URL || 'https://tally.so/r/mOe658',
    fundingFormId: import.meta.env.VITE_TALLY_FUNDING_FORM_ID || 'mDEJB5',
    fundingFormUrl: import.meta.env.VITE_TALLY_FUNDING_FORM_URL || 'https://tally.so/r/mDEJB5',
    agentProfileFormId: import.meta.env.VITE_TALLY_AGENT_PROFILE_FORM_ID || '9qjWEE',
    agentProfileFormUrl: import.meta.env.VITE_TALLY_AGENT_PROFILE_FORM_URL || 'https://tally.so/r/9qjWEE',
    joinAgentFormId: import.meta.env.VITE_TALLY_JOIN_AGENT_FORM_ID || 'rjM6do',
    joinAgentFormUrl: import.meta.env.VITE_TALLY_JOIN_AGENT_FORM_URL || 'https://tally.so/r/rjM6do',
    submitDealFormId: import.meta.env.VITE_TALLY_SUBMIT_DEAL_FORM_ID || 'q416K8',
    submitDealFormUrl: import.meta.env.VITE_TALLY_SUBMIT_DEAL_FORM_URL || 'https://tally.so/r/q416K8',
    launchAgencyFormId: import.meta.env.VITE_TALLY_LAUNCH_AGENCY_FORM_ID || 'A7edqy',
    launchAgencyFormUrl: import.meta.env.VITE_TALLY_LAUNCH_AGENCY_FORM_URL || 'https://tally.so/r/A7edqy',
    personalizedIntakeFormId: import.meta.env.VITE_TALLY_PERSONALIZED_INTAKE_FORM_ID || 'dWvEqN',
    personalizedIntakeFormUrl: import.meta.env.VITE_TALLY_PERSONALIZED_INTAKE_FORM_URL || 'https://tally.so/r/dWvEqN'
  },

  // HubSpot Public IDs
  hubspot: {
    portalId: import.meta.env.VITE_HUBSPOT_PORTAL_ID || '6891090',
    n8nFundingFormId: import.meta.env.VITE_HUBSPOT_N8N_FUNDING_FORM_ID || '87d96c51-2cb5-408e-99c5-94bc3aef6b40',
    instantMicroFundingFormId: import.meta.env.VITE_HUBSPOT_INSTANT_MICRO_FUNDING_FORM_ID || '099cf0e0-73c9-48ae-8235-5b70d48b5304',
    prequalFormId: import.meta.env.VITE_HUBSPOT_PREQUAL_FORM_ID || 'ef7bd8c7-95f4-4a64-942f-1aae5194987f'
  },

  // Notion Public Reference IDs
  notion: {
    fundingLeadsDbId: import.meta.env.VITE_NOTION_FUNDING_LEADS_DATABASE_ID || '62e717f6-e619-41d4-99bc-f81a41daacfe',
    fundingLeadsDataSourceId: import.meta.env.VITE_NOTION_FUNDING_LEADS_DATA_SOURCE_ID || '51d0f71f-b6c8-4c7a-a703-7ec1fb96c64a',
    fundingPartnersDbId: import.meta.env.VITE_NOTION_FUNDING_PARTNERS_DATABASE_ID || '1c54bc1b-d63c-8037-8577-ede11c6bc0df',
    fundingPartnersDataSourceId: import.meta.env.VITE_NOTION_FUNDING_PARTNERS_DATA_SOURCE_ID || '1c54bc1b-d63c-801f-946c-000bd9dd59b5',
    projectReadinessDbId: import.meta.env.VITE_NOTION_PROJECT_READINESS_DATABASE_ID || '7f2aa235-8717-455f-9882-29a62d4a1dd5',
    projectReadinessDataSourceId: import.meta.env.VITE_NOTION_PROJECT_READINESS_DATA_SOURCE_ID || '4e2801f8-c577-44ca-973d-81313558f21b'
  },

  // Ecosystem Vercel Endpoints
  ecosystem: {
    teamSlug: import.meta.env.VITE_VERCEL_TEAM_SLUG || 'jason-feimsters-projects',
    partnerIntakeOsUrl: import.meta.env.VITE_PARTNER_INTAKE_OS_URL || 'https://partner-intake-t5e7p3fnv-jason-feimsters-projects.vercel.app',
    fundingOperatorOsUrl: import.meta.env.VITE_FUNDING_OPERATOR_OS_URL || 'https://funding-operator-nzehpctxq-jason-feimsters-projects.vercel.app',
    distilledFundingToolsUrl: import.meta.env.VITE_DISTILLED_FUNDING_TOOLS_URL || 'https://distilled-funding-tools-34mdirlai-jason-feimsters-projects.vercel.app',
    fundingPartnersOsUrl: import.meta.env.VITE_FUNDING_PARTNERS_OS_URL || 'https://funding-partners-os-dashboard-afpy26axy.vercel.app'
  },

  // Optional Analytics
  gtmId: import.meta.env.VITE_GTM_ID || ''
};

/**
 * Returns true if GTM has been provided
 */
export function isGtmEnabled(): boolean {
  return Boolean(PUBLIC_ENV.gtmId && PUBLIC_ENV.gtmId.trim().length > 0);
}

/**
 * Returns true if HubSpot public portal is configured
 */
export function isHubSpotPublicConfigured(): boolean {
  return Boolean(PUBLIC_ENV.hubspot.portalId);
}
