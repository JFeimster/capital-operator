/**
 * Capital Operator — Routing API Test Suite
 * tests/routingApi.test.ts
 */

import handler, { evaluateBuyBoxMatches } from '../api/v1/routing/match-buy-box';

class MockResponse {
  statusCode: number = 200;
  headers: Record<string, string> = {};
  data: any = null;
  status(code: number) { this.statusCode = code; return this; }
  setHeader(name: string, value: string) { this.headers[name] = value; return this; }
  json(body: any) { this.data = body; return this; }
  end() { return this; }
}

export async function runRoutingApiTests() {
  const request = {
    annual_revenue: 1200000,
    avg_monthly_deposits: 105000,
    time_in_business_months: 36,
    credit_score: 725,
    collateral_available: true,
    requested_amount: 250000,
    use_of_funds: 'equipment purchase',
    has_tax_liens: false,
    has_bankruptcy: false
  };

  const matches = evaluateBuyBoxMatches(request);
  if (matches.length === 0) throw new Error('Routing test failed: expected capability routes');
  if (!matches.every(match => match.human_review_required === true)) throw new Error('Routing test failed: all routes must require human review');
  if (matches.some((match: any) => 'estimated_rate_range' in match || 'max_facility_amount' in match || 'fund_name' in match)) {
    throw new Error('Routing test failed: sandbox routes must not expose fabricated lender, pricing, or facility claims');
  }

  const equipmentRoute = matches.find(match => match.route_id === 'route_equipment_review');
  if (!equipmentRoute || equipmentRoute.match_tier === 'NOT_INDICATED') throw new Error('Routing test failed: equipment use-of-funds should surface equipment review route');

  const req = { method: 'POST', headers: {}, body: request };
  const res = new MockResponse();
  await handler(req, res);

  if (res.statusCode !== 200) throw new Error(`Routing API test failed: Expected 200, got ${res.statusCode}`);
  if (res.data?.status !== 'success' || res.data?.capability_status !== 'SANDBOX') throw new Error('Routing API test failed: response must be truthful SANDBOX capability');
  if (!Array.isArray(res.data?.matches)) throw new Error('Routing API test failed: malformed matches');

  return { passed: true, testName: 'runRoutingApiTests' };
}
