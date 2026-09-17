/**
 * Capital Operator — Lead Capture Dispatcher
 * src/lib/leadCapture.ts
 */

import { LeadCapturePayload } from '../types';
import { submitLead } from './leadDispatch';

export async function submitLeadCapture(payload: LeadCapturePayload): Promise<{
  success: boolean;
  message: string;
}> {
  return submitLead(payload);
}
