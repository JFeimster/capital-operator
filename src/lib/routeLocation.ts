/**
 * Resolve application routes consistently across Vercel clean URLs and
 * the GitHub Pages static fallback.
 */

export function resolveAppLocation(pathname: string, hash: string, base = '/'): string {
  const normalizedBase = base.endsWith('/') ? base : base + '/';
  let path = pathname || '/';

  if (normalizedBase !== '/' && path.startsWith(normalizedBase)) {
    path = '/' + path.slice(normalizedBase.length);
  }

  if (path && path !== '/') return path;
  if (hash && hash !== '#') return hash;
  return '/';
}

export function toAppHref(path: string): string {
  if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
    if (path === '/' || path === '') return '#home';
    return '#' + path.replace(/^\//, '');
  }
  return path;
}
