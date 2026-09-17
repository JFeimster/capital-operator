/**
 * Capital Operator — Scroll Management Utilities
 * src/lib/scroll.ts
 */

export function scrollToTop(smooth = true) {
  try {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  } catch {
    window.scrollTo(0, 0);
  }
}

export function scrollToElement(elementId: string, offset = 80) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = el.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}
