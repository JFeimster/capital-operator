/**
 * Capital Operator — SEO Helpers
 * src/lib/seo.ts
 */

import { PageSEO } from '../config/seo';
import { SITE_CONFIG } from '../config/site';

export function updateDocumentSEO(seo: PageSEO) {
  if (typeof document === 'undefined') return;

  document.title = seo.title || SITE_CONFIG.title;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', seo.description || SITE_CONFIG.description);

  // OpenGraph
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', seo.title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', seo.description);

  const canonicalPath = seo.canonical || window.location.pathname;
  const canonicalUrl = new URL(canonicalPath, SITE_CONFIG.url).toString();
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute('content', canonicalUrl);
}
