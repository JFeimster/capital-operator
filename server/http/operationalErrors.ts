import { AuthenticationError } from '../auth/types.js';
import { DealDomainError } from '../deals/service.js';
import { PersistenceUnavailableError } from '../persistence/types.js';

export function sendOperationalError(res: any, error: unknown, fallbackMessage: string) {
  if (error instanceof AuthenticationError ||
      error instanceof DealDomainError ||
      error instanceof PersistenceUnavailableError) {
    return res.status(error.statusCode).json({
      status: 'error',
      code: error.code,
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }

  const message = error instanceof Error ? error.message : 'Unknown operational failure';
  console.error('[CapitalOperator] Operational error:', message);
  return res.status(500).json({
    status: 'error',
    code: 'INTERNAL_SERVER_ERROR',
    message: fallbackMessage,
    timestamp: new Date().toISOString()
  });
}
