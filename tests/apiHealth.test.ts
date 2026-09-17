/**
 * Capital Operator — Health API Test Suite
 * tests/apiHealth.test.ts
 */

import handler from '../api/v1/health';

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

export async function runApiHealthTests() {
  // Test 1: Successful GET returns status ok and capabilities
  const req = { method: 'GET', headers: {} };
  const res = new MockResponse();

  await handler(req, res);

  if (res.statusCode !== 200) {
    throw new Error(`Health test failed: Expected status 200, got ${res.statusCode}`);
  }

  if (res.data?.status !== 'ok') {
    throw new Error(`Health test failed: Expected status: 'ok', got ${res.data?.status}`);
  }

  if (!res.data?.capabilities?.intake || !res.data?.capabilities?.routing) {
    throw new Error('Health test failed: Missing capability flags in response');
  }

  // Test 2: Method Not Allowed for POST
  const postReq = { method: 'POST', headers: {} };
  const postRes = new MockResponse();

  await handler(postReq, postRes);

  if (postRes.statusCode !== 405) {
    throw new Error(`Health test failed: Expected status 405 for POST, got ${postRes.statusCode}`);
  }

  return { passed: true, testName: 'runApiHealthTests' };
}
