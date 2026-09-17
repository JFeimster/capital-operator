/**
 * Capital Operator — UTM Parameters & Attribution Hook
 * src/hooks/useUTM.ts
 */

import { useState, useEffect } from 'react';
import { getAttribution } from '../lib/attribution';

export function useUTM() {
  const [attribution, setAttribution] = useState(getAttribution());

  useEffect(() => {
    setAttribution(getAttribution());
  }, []);

  return attribution;
}
