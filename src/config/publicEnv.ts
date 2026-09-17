/**
 * Capital Operator — Public Configuration
 *
 * These values are intentionally public and source-controlled. They do not
 * require environment variables or secret entry in Google AI Studio.
 */

export const PUBLIC_ENV = {
  appName: 'Capital Operator',
  appUrl: 'https://jfeimster.github.io/capital-operator/',
  distilledFundingUrl: 'https://www.distilledfunding.com',
  repoUrl: 'https://github.com/JFeimster/capital-operator',

  tally: {
    partnerFormId: 'mOe658',
    partnerFormUrl: 'https://tally.so/r/mOe658',
    fundingFormId: 'mDEJB5',
    fundingFormUrl: 'https://tally.so/r/mDEJB5',
    agentProfileFormId: '9qjWEE',
    agentProfileFormUrl: 'https://tally.so/r/9qjWEE',
    joinAgentFormId: 'rjM6do',
    joinAgentFormUrl: 'https://tally.so/r/rjM6do',
    submitDealFormId: 'q416K8',
    submitDealFormUrl: 'https://tally.so/r/q416K8',
    launchAgencyFormId: 'A7edqy',
    launchAgencyFormUrl: 'https://tally.so/r/A7edqy',
    personalizedIntakeFormId: 'dWvEqN',
    personalizedIntakeFormUrl: 'https://tally.so/r/dWvEqN'
  },

  hubspot: {
    portalId: '6891090',
    n8nFundingFormId: '87d96c51-2cb5-408e-99c5-94bc3aef6b40',
    instantMicroFundingFormId: '099cf0e0-73c9-48ae-8235-5b70d48b5304',
    prequalFormId: 'ef7bd8c7-95f4-4a64-942f-1aae5194987f'
  },

  notion: {
    fundingLeadsDbId: '62e717f6-e619-41d4-99bc-f81a41daacfe',
    fundingLeadsDataSourceId: '51d0f71f-b6c8-4c7a-a703-7ec1fb96c64a',
    fundingPartnersDbId: '1c54bc1b-d63c-8037-8577-ede11c6bc0df',
    fundingPartnersDataSourceId: '1c54bc1b-d63c-801f-946c-000bd9dd59b5',
    projectReadinessDbId: '7f2aa235-8717-455f-9882-29a62d4a1dd5',
    projectReadinessDataSourceId: '4e2801f8-c577-44ca-973d-81313558f21b'
  },

  ecosystem: {
    teamSlug: 'jason-feimsters-projects',
    partnerIntakeOsUrl: 'https://partner-intake-t5e7p3fnv-jason-feimsters-projects.vercel.app',
    fundingOperatorOsUrl: 'https://funding-operator-nzehpctxq-jason-feimsters-projects.vercel.app',
    distilledFundingToolsUrl: 'https://distilled-funding-tools-34mdirlai-jason-feimsters-projects.vercel.app',
    fundingPartnersOsUrl: 'https://funding-partners-os-dashboard-afpy26axy.vercel.app'
  },

  // Disabled by default. Analytics can be wired later without blocking the app.
  gtmId: ''
} as const;

export function isGtmEnabled(): boolean {
  return Boolean(PUBLIC_ENV.gtmId);
}

export function isHubSpotPublicConfigured(): boolean {
  return Boolean(PUBLIC_ENV.hubspot.portalId);
}
