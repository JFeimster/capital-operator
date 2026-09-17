/**
 * Capital Operator — CTA Router Tests
 * tests/ctaRouter.test.ts
 */

import { routeUserCTA } from '../src/lib/ctaRouter';
import { PARTNER_FUNNEL } from '../src/config/ctas';

export function runCtaRouterTests() {
  const affiliateRoute = routeUserCTA('affiliate', 'Relationship-Led');
  if (affiliateRoute.primaryUrl !== PARTNER_FUNNEL.url) {
    throw new Error('Test Failed: Affiliate segment must route to partner funnel URL');
  }

  const operatorRoute = routeUserCTA('operator', 'Capital Operator');
  if (!operatorRoute.secondaryLabel.includes('Vetted')) {
    throw new Error('Test Failed: Operator route should offer vetted tools portal');
  }

  return { passed: true, testName: 'runCtaRouterTests' };
}
