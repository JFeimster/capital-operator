# Model Context Protocol (MCP) Architecture

## Status
**LIVE / BETA — Phase 2 / Batch B**

Capital Operator exposes a stateless HTTP JSON-RPC MCP endpoint:

`POST /api/mcp`

`GET /api/mcp` returns service/transport discovery metadata.

## Transport

The production implementation supports MCP-style JSON-RPC over stateless HTTP. Core methods:

- `initialize`
- `ping`
- `tools/list`
- `tools/call`
- `notifications/initialized`

The server echoes a client-supplied protocol version during initialization when supplied and advertises tool capability discovery.

## Tools

- `generate_capital_blueprint` — **LIVE**; calls the canonical deterministic recommendation engine.
- `calculate_commercial_dscr` — **LIVE**; deterministic NOI / annual debt-service math.
- `recommend_capital_stack` — **BETA**; non-binding structure planning categories.
- `query_capital_tools` — **LIVE**; queries the canonical tools registry.
- `explain_operating_stage` — **LIVE**; returns one of the eight canonical workflow-stage definitions.
- `match_capital_routes` — **SANDBOX**; informational route classification only, always human-reviewed.

## Security and Decision Boundary

The MCP server contains no client-exposed secrets and does not require optional provider credentials for core tools.

It does not expose a live lender network, pricing engine, credit-decision engine, or autonomous submission capability. Consequential capital decisions remain human-controlled.

## Client Setup

Endpoint: `https://capital-operator.vercel.app/api/mcp`

Send JSON-RPC 2.0 POST requests with `Content-Type: application/json`. Start with `initialize`, then `tools/list` or `tools/call`.

## Future

Authenticated deal-state tools such as `get_deal_status` remain **PLANNED** for later transactional infrastructure.
