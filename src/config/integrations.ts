/**
 * Capital Operator — Integration Architecture
 * src/config/integrations.ts
 */

import { LeadCapturePayload } from '../types';
import { submitLead as dispatchSubmitLead, LeadDispatchResponse } from '../lib/leadDispatch';

export interface IntegrationConfig {
  webhookUrl?: string;
  enableHubSpotSync?: boolean;
  enableNotionSync?: boolean;
}

export const INTEGRATION_CONFIG: IntegrationConfig = {
  webhookUrl: '',
  enableHubSpotSync: false,
  enableNotionSync: false
};

/**
 * Submits lead capture payload via the provider-agnostic leadDispatch layer.
 */
export async function submitLead(payload: LeadCapturePayload): Promise<LeadDispatchResponse> {
  return dispatchSubmitLead(payload);
}
