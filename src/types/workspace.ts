/**
 * Capital Operator — Workspace / Tenancy Contracts
 */

export type WorkspaceRole = 'owner' | 'admin' | 'operator' | 'analyst' | 'partner' | 'viewer';

export type WorkspacePermission =
  | 'workspace.read'
  | 'workspace.manage'
  | 'deal.read'
  | 'deal.create'
  | 'deal.update'
  | 'deal.route'
  | 'document.read'
  | 'document.manage'
  | 'submission.read'
  | 'submission.create'
  | 'submission.authorize'
  | 'offer.read'
  | 'offer.manage'
  | 'condition.manage'
  | 'audit.read';

export interface Workspace {
  id: string;
  name: string;
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: string;
  createdBy: string;
}

export interface UserIdentity {
  id: string;
  externalSubject?: string;
  email?: string;
  displayName?: string;
  createdAt: string;
}

export interface Membership {
  id: string;
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  status: 'ACTIVE' | 'DISABLED';
  createdAt: string;
  createdBy: string;
}
