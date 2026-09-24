import type { WorkspacePermission, WorkspaceRole } from '../../src/types/workspace.js';

export type AuthMode = 'disabled' | 'development' | 'static_token';

export interface AuthHeaders {
  authorization?: string;
  'x-capital-user-id'?: string;
  'x-capital-workspace-id'?: string;
  'x-capital-role'?: string;
  'x-request-id'?: string;
  [key: string]: string | undefined;
}

export interface SessionContext {
  userId: string;
  workspaceId: string;
  membershipId: string;
  role: WorkspaceRole;
  permissions: WorkspacePermission[];
  authMode: Exclude<AuthMode, 'disabled'>;
  requestId?: string;
}

export interface AuthCapability {
  status: 'BETA' | 'SPECIFIED' | 'DEVELOPMENT_ONLY';
  mode: AuthMode;
  configured: boolean;
  description: string;
}

export class AuthenticationError extends Error {
  constructor(
    public readonly code: 'AUTH_NOT_CONFIGURED' | 'UNAUTHENTICATED' | 'FORBIDDEN' | 'INVALID_AUTH_CONFIGURATION',
    message: string,
    public readonly statusCode: 401 | 403 | 503
  ) {
    super(message);
    this.name = 'AuthenticationError';
  }
}
