import type { WorkspacePermission, WorkspaceRole } from '../../src/types/workspace.js';

const ALL_PERMISSIONS: WorkspacePermission[] = [
  'workspace.read','workspace.manage',
  'deal.read','deal.create','deal.update','deal.route',
  'document.read','document.manage',
  'submission.read','submission.create','submission.authorize',
  'offer.read','offer.manage',
  'condition.manage','audit.read'
];

export const ROLE_PERMISSIONS: Record<WorkspaceRole, readonly WorkspacePermission[]> = {
  owner: ALL_PERMISSIONS,
  admin: ALL_PERMISSIONS,
  operator: [
    'workspace.read',
    'deal.read','deal.create','deal.update','deal.route',
    'document.read','document.manage',
    'submission.read','submission.create','submission.authorize',
    'offer.read','offer.manage',
    'condition.manage','audit.read'
  ],
  analyst: [
    'workspace.read',
    'deal.read',
    'document.read',
    'submission.read',
    'offer.read',
    'audit.read'
  ],
  partner: [
    'workspace.read',
    'deal.read',
    'document.read',
    'submission.read',
    'offer.read'
  ],
  viewer: [
    'workspace.read',
    'deal.read',
    'submission.read',
    'offer.read'
  ]
};

export function permissionsForRole(role: WorkspaceRole): WorkspacePermission[] {
  return [...ROLE_PERMISSIONS[role]];
}

export function roleHasPermission(role: WorkspaceRole, permission: WorkspacePermission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
