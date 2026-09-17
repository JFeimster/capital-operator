/**
 * Capital Operator — Feature Flags Configuration
 * src/config/featureFlags.ts
 */

export interface FeatureFlags {
  enableLeadCapture: boolean;
  enableInteractiveMap: boolean;
  enablePrintExport: boolean;
  enableClipboardExport: boolean;
  enableAnalyticsTelemetry: boolean;
  enableDetailedFrictionBadges: boolean;
}

export const FEATURE_FLAGS: FeatureFlags = {
  enableLeadCapture: true,
  enableInteractiveMap: true,
  enablePrintExport: true,
  enableClipboardExport: true,
  enableAnalyticsTelemetry: true,
  enableDetailedFrictionBadges: true
};
