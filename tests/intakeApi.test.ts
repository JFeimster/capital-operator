/**
 * Capital Operator — Intake API Test Suite
 * tests/intakeApi.test.ts
 */

import handler from '../api/v1/intake/submit';

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

export async function runIntakeApiTests() {
  // Test 1: Successful Prime Intake Submission
  const validPrimeReq = {
    method: 'POST',
    headers: { 'x-partner-id': 'partner_test_alpha' },
    body: {
      business_name: 'Apex Precision Machining LLC',
      contact_name: 'John Miller',
      email: 'jmiller@apexmachining.com',
      annual_revenue: 1800000,
      avg_monthly_deposits: 155000,
      time_in_business_months: 48,
      credit_score: 740,
      requested_facility: 'ASSET_BASED_REVOLVER',
      target_amount: 300000
    }
  };
  const validRes = new MockResponse();
  await handler(validPrimeReq, validRes);

  if (validRes.statusCode !== 200) {
    throw new Error(`Intake test failed: Expected 200, got ${validRes.statusCode}: ${JSON.stringify(validRes.data)}`);
  }

  if (validRes.data?.status !== 'success') {
    throw new Error(`Intake test failed: Expected status success, got ${validRes.data?.status}`);
  }

  if (!validRes.data?.deal_id?.startsWith('deal_')) {
    throw new Error(`Intake test failed: Invalid deal_id format ${validRes.data?.deal_id}`);
  }

  if (validRes.data?.triage_score < 75) {
    throw new Error(`Intake test failed: Prime applicant expected triage score >= 75, got ${validRes.data?.triage_score}`);
  }

  if (!validRes.data?.prequalification?.eligible) {
    throw new Error('Intake test failed: Prime applicant should be eligible');
  }

  // Test 2: Validation failure on missing fields
  const invalidReq = {
    method: 'POST',
    headers: {},
    body: {
      business_name: '',
      email: 'bad-email'
    }
  };
  const invalidRes = new MockResponse();
  await handler(invalidReq, invalidRes);

  if (invalidRes.statusCode !== 400) {
    throw new Error(`Intake test failed: Expected 400 on invalid payload, got ${invalidRes.statusCode}`);
  }

  if (invalidRes.data?.code !== 'VALIDATION_FAILED') {
    throw new Error(`Intake test failed: Expected code VALIDATION_FAILED, got ${invalidRes.data?.code}`);
  }

  return { passed: true, testName: 'runIntakeApiTests' };
}
