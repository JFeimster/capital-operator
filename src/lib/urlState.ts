/**
 * Capital Operator — URL Hash & Route State Manager
 * src/lib/urlState.ts
 */

export function parseHashRoute(hash: string): string {
  if (!hash) return 'home';
  const clean = hash.replace(/^#\/?/, '').split('?')[0].split('/')[0];
  return clean || 'home';
}

export function setHashRoute(route: string) {
  const target = route.startsWith('#') ? route : `#${route}`;
  if (window.location.hash !== target) {
    window.location.hash = target;
  }
}
