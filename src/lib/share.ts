/**
 * Capital Operator — Share State & Web Share Helpers
 * src/lib/share.ts
 */

import { SITE_CONFIG } from '../config/site';

export async function sharePage(title = SITE_CONFIG.title, text = SITE_CONFIG.description, url = window.location.href): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch {
      // User dismissed or share failed
      return false;
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}
