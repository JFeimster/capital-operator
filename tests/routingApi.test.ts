/**
 * Capital Operator — Buy-Box Routing API Test Suite
 * tests/routingApi.test.ts
 */

import handler, { evaluateBuyBoxMatches } from '../api/v1/routing/match-buy-box';

class MockResponse {
  statusCode: number = 200;
  headers: Record<string, string> = {};
  data: any = null;

  status(code: number) {
    this.statusCode = code;
    return this;
  }

  setHeader(name: string, value: string) {
    this.headers[name] = value;
    return this;
  }

  json(body: any) {
    this.data = body;
    return this;
  }

  end() {
    return this;
  }
}

export async function runRoutingApiTests() {
  // Test 1: Direct evaluation of High Conviction SBA / Senior applicant
  const primeBorrower = {
    annual_revenue: 1200000,
    avg_monthly_deposits: 105000,
    time_in_business_months: 36,
    credit_score: 725,
    collateral_available: true,
    requested_amount: 250000,
    has_tax_liens: false,
    has_bankruptcy: false
  };

  const matches = evaluateBuyBoxMatches(primeBorrower);

  if (matches.length === 0) {
    throw new Error('Routing test failed: Expected matches for prime borrower');
  }

  const sbaMatch = matches.find(m => m.fund_id === 'fund_sba_preferred_desk');
  if (!sbaMatch || sbaMatch.match_tier !== 'HIGH_CONVICTION') {
    throw new Error(`Routing test failed: Expected SBA match to be HIGH_CONVICTION, got ${sbaMatch?.match_tier}`);
  }

  // Test 2: Sub-prime borrower with short history disqualification from SBA
  const startupBorrower = {
    annual_revenue: 140000,
    avg_monthly_deposits: 12000,
    time_in_business_months: 8,
    credit_score: 590,
    collateral_available: false,
    requested_amount: 30000,
    has_tax_liens: false,
    has_bankruptcy: false
  };

  const startupMatches = evaluateBuyBoxMatches(startupBorrower);
  const startupSba = startupMatches.find(m => m.fund_id === 'fund_sba_preferred_desk');

  if (startupSba?.match_tier === 'HIGH_CONVICTION') {
    throw new Error('Routing test failed: Startup borrower should not be HIGH_CONVICTION for SBA');
  }

  // RBF desk should be eligible or stretch
  const rbfMatch = startupMatches.find(m => m.fund_id === 'fund_growth_rbf_desk');
  if (!rbfMatch || (rbfMatch.match_tier !== 'QUALIFIED' && rbfMatch.match_tier !== 'HIGH_CONVICTION')) {
    throw new Error(`Routing test failed: Expected RBF match for 8-month business, got ${rbfMatch?.match_tier}`);
  }

  // Test 3: API Handler integration
  const req = {
    method: 'POST',
    headers: {},
    body: primeBorrower
  };
  const res = new MockResponse();
  await handler(req, res);

  if (res.statusCode !== 200) {
    throw new Error(`Routing API test failed: Expected 200, got ${res.statusCode}`);
  }

  if (res.data?.status !== 'success' || !Array.isArray(res.data?.matches)) {
    throw new Error('Routing API test failed: Malformed response body');
  }

  return { passed: true, testName: 'runRoutingApiTests' };
}
