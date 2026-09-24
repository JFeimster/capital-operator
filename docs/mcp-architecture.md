# Model Context Protocol (MCP) Architecture

## Status
**LIVE / BETA — Funding Discovery + Action Layer**

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

## Funding Discovery Tools

- `start_funding_request` — normalize a plain-language funding need.
- `check_funding_readiness` — missing facts, documents, routing readiness, and next preparation actions.
- `build_capital_case` — source-traceable capital case enriched with canonical funding paths and resources.
- `get_funding_document_checklist` — outcome-aware preparation checklist.
- `find_funding_options` — ranked outcomes, product families, products, verified provider candidates where supported, qualification gaps, documents, live resources, next action, and handoff path.
- `find_capital_providers` — verified provider/product criteria lookup using either product paths or a funding request.
- `recommend_funding_support_tools` — contextual live tools/resources for the request.
- `get_next_funding_action` / `get_funding_status` — authenticated deal-state actions using discovery plus transaction state.
- `compare_received_offers` — actual stored offer terms only; never selects a winner.
- `initiate_funding_handoff` — preserves canonical route + attribution and prepares a human-controlled handoff without transmitting externally.

## Practical Examples

Use `tools/call` with inputs such as:

- “Find funding options for a construction company that needs $300K of equipment.”
  - `find_funding_options` with `objective`, `requestedAmount`, business profile, and `assetContext`.
- “I need working capital for an awarded government contract.”
  - `find_funding_options` with `contractContext.status = "awarded"`.
- “What providers may fit this request?”
  - `find_capital_providers` with the same funding context; provider results remain verification-gated.
- “What documents do I need?”
  - `get_funding_document_checklist`.
- “What should I do next?”
  - `get_next_funding_action` for a persisted deal or use `find_funding_options.nextAction` for a non-persistent request.
- “Prepare a funding handoff.”
  - `initiate_funding_handoff` for an authenticated persisted deal.
- “What funding tools should I use for this deal?”
  - `recommend_funding_support_tools` with the funding context.

## General Tools

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

## Current Transaction Boundary

Authenticated deal-state tools are implemented behind workspace auth/persistence contracts. Production durable persistence and external transmission remain configuration-dependent. MCP never autonomously submits a funding request or records a funding event without the existing human authorization/evidence controls.
