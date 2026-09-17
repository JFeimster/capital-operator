const base = process.env.CAPITAL_OPERATOR_URL || 'https://capital-operator.vercel.app';

async function request(path, init) {
  const response = await fetch(base + path, init);
  const text = await response.text();
  if (!response.ok) throw new Error(`${path} returned ${response.status}: ${text}`);
  return text ? JSON.parse(text) : null;
}

async function rpc(id, method, params = {}) {
  const body = await request('/api/mcp', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id, method, params })
  });
  if (body?.error) throw new Error(`${method} RPC error: ${JSON.stringify(body.error)}`);
  return body?.result;
}

const health = await request('/api/v1/health');
if (health?.status !== 'ok') throw new Error('Production health is not ok.');

const discovery = await request('/api/mcp');
if (discovery?.status !== 'LIVE') throw new Error('MCP discovery is not LIVE.');

const initialized = await rpc(1, 'initialize', { protocolVersion: '2025-06-18' });
if (initialized?.serverInfo?.name !== 'capital-operator') throw new Error('MCP initialize failed.');

const listed = await rpc(2, 'tools/list');
const names = new Set((listed?.tools || []).map(tool => tool.name));
for (const required of [
  'generate_capital_blueprint',
  'calculate_commercial_dscr',
  'recommend_capital_stack',
  'query_capital_tools',
  'explain_operating_stage',
  'match_capital_routes'
]) {
  if (!names.has(required)) throw new Error(`Missing production MCP tool: ${required}`);
}

const dscr = await rpc(3, 'tools/call', {
  name: 'calculate_commercial_dscr',
  arguments: { netOperatingIncome: 125000, annualDebtService: 100000 }
});
if (dscr?.structuredContent?.dscr !== 1.25) throw new Error('Production MCP DSCR result mismatch.');

const routing = await rpc(4, 'tools/call', {
  name: 'match_capital_routes',
  arguments: {
    annual_revenue: 500000,
    avg_monthly_deposits: 42000,
    time_in_business_months: 36,
    requested_amount: 150000,
    use_of_funds: 'equipment'
  }
});
if (routing?.structuredContent?.status !== 'SANDBOX') throw new Error('Production routing must remain SANDBOX.');
if (routing?.structuredContent?.human_review_required !== true) throw new Error('Production routing must require human review.');


const blueprint = await rpc(5, 'tools/call', {
  name: 'generate_capital_blueprint',
  arguments: {
    answers: {
      q1_currentHandling: '',
      q2_monthlyVolume: '',
      q3_leadSources: [],
      q4_pipelineLocation: '',
      q5_pursuingDecision: '',
      q6_documentHandling: '',
      q7_routingDecision: '',
      q8_followUpAutomation: '',
      q9_breakdownPoints: [],
      q10_priorities: [],
      q11_techBudget: '',
      q12_handsOnControl: ''
    }
  }
});
if (!blueprint?.structuredContent?.blueprint?.operatingModel) throw new Error('Production blueprint tool did not return a blueprint.');

const stack = await rpc(6, 'tools/call', {
  name: 'recommend_capital_stack',
  arguments: {
    requestedAmount: 250000,
    useOfFunds: 'equipment and working capital',
    collateralAvailable: true,
    recurringWorkingCapitalNeed: true
  }
});
if (stack?.structuredContent?.status !== 'BETA') throw new Error('Production capital-stack tool must report BETA.');

const queriedTools = await rpc(7, 'tools/call', {
  name: 'query_capital_tools',
  arguments: { workflowStage: 2, limit: 5 }
});
if (!Array.isArray(queriedTools?.structuredContent?.tools)) throw new Error('Production tool query failed.');

const stage = await rpc(8, 'tools/call', {
  name: 'explain_operating_stage',
  arguments: { stage: 5 }
});
if (stage?.structuredContent?.stage?.number !== 5) throw new Error('Production operating-stage explanation failed.');

console.log('Production MCP smoke passed:', {
  health: health.status,
  discovery: discovery.status,
  tools: names.size,
  dscr: dscr.structuredContent.dscr,
  routing: routing.structuredContent.status,
  blueprint: blueprint.structuredContent.blueprint.operatingModel,
  capitalStack: stack.structuredContent.status,
  queriedTools: queriedTools.structuredContent.tools.length,
  explainedStage: stage.structuredContent.stage.number
});
