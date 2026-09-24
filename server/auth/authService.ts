import crypto from 'crypto';
import { permissionsForRole, roleHasPermission } from './permissions.js';
import type { WorkspacePermission, WorkspaceRole } from '../../src/types/workspace.js';
import type { AuthCapability, AuthHeaders, AuthMode, SessionContext } from './types.js';
import { AuthenticationError } from './types.js';

interface StaticTokenRecord {
  tokenHash: string;
  userId: string;
  workspaceId: string;
  membershipId?: string;
  role: WorkspaceRole;
}

const VALID_ROLES: WorkspaceRole[] = ['owner','admin','operator','analyst','partner','viewer'];

function configuredMode(): AuthMode {
  const value = String(process.env.CAPITAL_AUTH_MODE || 'disabled').toLowerCase();
  return value === 'development' || value === 'static_token' ? value : 'disabled';
}

function parseStaticTokens(): StaticTokenRecord[] {
  try {
    const raw = process.env.CAPITAL_AUTH_TOKENS_JSON;
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item: any) =>
      item &&
      typeof item.tokenHash === 'string' &&
      /^[a-f0-9]{64}$/i.test(item.tokenHash) &&
      typeof item.userId === 'string' &&
      typeof item.workspaceId === 'string' &&
      VALID_ROLES.includes(item.role)
    );
  } catch {
    return [];
  }
}

function secureHashMatches(token: string, expectedHex: string): boolean {
  const actual = crypto.createHash('sha256').update(token).digest();
  const expected = Buffer.from(expectedHex, 'hex');
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

export function getAuthCapability(): AuthCapability {
  const mode = configuredMode();

  if (mode === 'development') {
    if (process.env.NODE_ENV === 'production') {
      return {
        status: 'SPECIFIED',
        mode,
        configured: false,
        description: 'Development header authentication is disabled in production.'
      };
    }
    return {
      status: 'DEVELOPMENT_ONLY',
      mode,
      configured: true,
      description: 'Development/test identity headers are enabled outside production.'
    };
  }

  if (mode === 'static_token') {
    const configured = parseStaticTokens().length > 0;
    return {
      status: configured ? 'BETA' : 'SPECIFIED',
      mode,
      configured,
      description: configured
        ? 'Server-side hashed bearer-token authentication is configured.'
        : 'Static-token auth mode requires CAPITAL_AUTH_TOKENS_JSON with SHA-256 token hashes.'
    };
  }

  return {
    status: 'SPECIFIED',
    mode: 'disabled',
    configured: false,
    description: 'No production authentication adapter is configured.'
  };
}

function developmentSession(headers: AuthHeaders): SessionContext {
  if (process.env.NODE_ENV === 'production') {
    throw new AuthenticationError('AUTH_NOT_CONFIGURED', 'Development authentication is never accepted in production.', 503);
  }

  const userId = headers['x-capital-user-id'];
  const workspaceId = headers['x-capital-workspace-id'];
  const rawRole = headers['x-capital-role'];

  if (!userId || !workspaceId || !rawRole || !VALID_ROLES.includes(rawRole as WorkspaceRole)) {
    throw new AuthenticationError(
      'UNAUTHENTICATED',
      'Development auth requires x-capital-user-id, x-capital-workspace-id, and a valid x-capital-role.',
      401
    );
  }

  const role = rawRole as WorkspaceRole;
  return {
    userId,
    workspaceId,
    membershipId: `membership_${workspaceId}_${userId}`,
    role,
    permissions: permissionsForRole(role),
    authMode: 'development',
    requestId: headers['x-request-id']
  };
}

function staticTokenSession(headers: AuthHeaders): SessionContext {
  const authorization = headers.authorization || '';
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    throw new AuthenticationError('UNAUTHENTICATED', 'Bearer authorization is required.', 401);
  }

  const record = parseStaticTokens().find(item => secureHashMatches(match[1], item.tokenHash));
  if (!record) {
    throw new AuthenticationError('UNAUTHENTICATED', 'Bearer token is not recognized.', 401);
  }

  return {
    userId: record.userId,
    workspaceId: record.workspaceId,
    membershipId: record.membershipId || `membership_${record.workspaceId}_${record.userId}`,
    role: record.role,
    permissions: permissionsForRole(record.role),
    authMode: 'static_token',
    requestId: headers['x-request-id']
  };
}

export function authenticateHeaders(headers: AuthHeaders): SessionContext {
  const capability = getAuthCapability();
  if (!capability.configured) {
    throw new AuthenticationError('AUTH_NOT_CONFIGURED', capability.description, 503);
  }

  return capability.mode === 'development'
    ? developmentSession(headers)
    : staticTokenSession(headers);
}

export function requirePermission(
  headers: AuthHeaders,
  permission: WorkspacePermission
): SessionContext {
  const session = authenticateHeaders(headers);
  if (!roleHasPermission(session.role, permission)) {
    throw new AuthenticationError(
      'FORBIDDEN',
      `Role ${session.role} does not have permission ${permission}.`,
      403
    );
  }
  return session;
}

export function headersFromRequest(req: any): AuthHeaders {
  const out: AuthHeaders = {};
  for (const [key, value] of Object.entries(req?.headers || {})) {
    const normalized = Array.isArray(value) ? value[0] : value;
    if (typeof normalized === 'string') out[key.toLowerCase()] = normalized;
  }
  return out;
}
