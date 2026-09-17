/**
 * Capital Operator — Health Check Alias Endpoint
 * api/health.ts
 */

import v1HealthHandler from './v1/health.js';

export default async function handler(req: any, res: any) {
  return v1HealthHandler(req, res);
}
