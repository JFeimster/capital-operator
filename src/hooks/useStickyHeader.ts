/**
 * Capital Operator — Sticky Header Scroll Hook
 * src/hooks/useStickyHeader.ts
 */

import { useState, useEffect } from 'react';

export function useStickyHeader(threshold = 20) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return isScrolled;
}
