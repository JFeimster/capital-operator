/**
 * Capital Operator — Public Configuration Facade
 * src/config/publicConfig.ts
 *
 * Re-exports public configuration from publicEnv.ts to provide a single,
 * canonical source of truth for client-side configuration.
 */

export {
  PUBLIC_ENV,
  PUBLIC_ENV as PUBLIC_CONFIG,
  isGtmEnabled,
  isHubSpotPublicConfigured
} from './publicEnv';
