/**
 * Capital Operator — API CORS helper
 * Public API endpoints default to non-credentialed CORS.
 * Set CAPITAL_ALLOWED_ORIGINS to a comma-separated allowlist for credentialed requests.
 */

const configuredOrigins = () =>
  (process.env.CAPITAL_ALLOWED_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

export function applyCors(req: any, res: any, methods: string[] = ['GET', 'POST', 'OPTIONS']) {
  const origin = String(req?.headers?.origin || '');
  const allowlist = configuredOrigins();

  if (allowlist.length > 0) {
    if (origin && allowlist.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Vary', 'Origin');
    }
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', methods.join(','));
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Accept, Accept-Version, Authorization, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-CSRF-Token, X-Partner-ID, X-Requested-With'
  );
}
