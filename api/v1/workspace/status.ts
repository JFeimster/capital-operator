import { applyCors } from '../../../server/http/cors.js';
import { getAuthCapability } from '../../../server/auth/authService.js';
import { getPersistenceCapability } from '../../../server/persistence/index.js';

export default async function handler(req: any, res: any) {
  applyCors(req, res, ['GET', 'OPTIONS']);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') {
    return res.status(405).json({
      status:'error',
      code:'METHOD_NOT_ALLOWED',
      message:'Expected GET.',
      timestamp:new Date().toISOString()
    });
  }

  const auth = getAuthCapability();
  const persistence = getPersistenceCapability();
  return res.status(200).json({
    status: 'success',
    capability_status: auth.configured && persistence.configured ? 'BETA' : 'SPECIFIED',
    auth,
    persistence,
    transactional_deals_available: auth.configured && persistence.configured,
    timestamp: new Date().toISOString()
  });
}
