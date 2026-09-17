/**
 * Capital Operator — Attribution & Session Provenance Tracker
 * src/lib/attribution.ts
 */

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  partner_id?: string;
  ref?: string;
  source_url?: string;
  assessment_segment?: string;
  operating_model?: string;
  captured_at?: string;
}

const ATTRIBUTION_STORAGE_KEY = 'capital_operator_attribution';

/**
 * Initializes and captures attribution from query parameters or current URL.
 * Persists in localStorage throughout the session.
 */
export function captureAttribution(): AttributionData {
  let existing: AttributionData = {};
  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (raw) {
      existing = JSON.parse(raw);
    }
  } catch (e) {
    // Ignore storage issues
  }

  if (typeof window === 'undefined') {
    return existing;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const fresh: AttributionData = { ...existing };

  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  const utmContent = urlParams.get('utm_content');
  const utmTerm = urlParams.get('utm_term');
  const partnerId = urlParams.get('partner_id');
  const ref = urlParams.get('ref');

  if (utmSource) fresh.utm_source = utmSource;
  if (utmMedium) fresh.utm_medium = utmMedium;
  if (utmCampaign) fresh.utm_campaign = utmCampaign;
  if (utmContent) fresh.utm_content = utmContent;
  if (utmTerm) fresh.utm_term = utmTerm;
  if (partnerId) fresh.partner_id = partnerId;
  if (ref) fresh.ref = ref;

  if (!fresh.source_url) {
    fresh.source_url = window.location.href;
  }
  if (!fresh.captured_at) {
    fresh.captured_at = new Date().toISOString();
  }

  try {
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(fresh));
  } catch (e) {
    // Ignore storage issues
  }

  return fresh;
}

/**
 * Updates attribution with diagnostic outputs (segment and operating model)
 */
export function updateAttributionDiagnostic(segment?: string, operatingModel?: string): void {
  const current = captureAttribution();
  if (segment) current.assessment_segment = segment;
  if (operatingModel) current.operating_model = operatingModel;

  try {
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    // Ignore storage issues
  }
}

/**
 * Retrieves the current persisted attribution record
 */
export function getAttribution(): AttributionData {
  return captureAttribution();
}
