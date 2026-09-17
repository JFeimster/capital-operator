# Model Context Protocol (MCP) Architecture

## Status

**PLANNED — Phase 2 / Batch B**

Capital Operator does not currently expose a production MCP server. This document defines the target architecture for Phase 2 and must not be interpreted as evidence that MCP tools are live.

## Design Rule

MCP must expose canonical Capital Operator logic rather than creating a second scoring, routing, underwriting, or eligibility system inside prompts or tool handlers.

Consequential capital decisions remain human-controlled.

---

## Initial Production MCP Tool Targets

### `generate_capital_blueprint`

Expose the canonical blueprint-generation capability using existing application logic.

### `calculate_commercial_dscr`

Expose the canonical deterministic DSCR calculator only after its production contract, assumptions, validation, and tests are reconciled with the existing calculator implementation.

### `recommend_capital_stack`

Return structured capital-stack recommendations using validated deterministic logic plus AI synthesis where appropriate. Outputs must not be represented as lender approval or binding eligibility.

### `query_capital_tools`

Query the canonical Capital Operator tool/resource registry.

### `explain_operating_stage`

Explain one of the eight canonical Capital Operator workflow stages using repository-backed source material.

### `match_capital_routes`

Add only after the underlying routing service is production-ready. The current `/api/v1/routing/match-buy-box` endpoint is **SANDBOX** capability routing and is not a verified live lender buy-box network.

---

## Required MCP Foundation

Phase 2 implementation must provide:

- capability discovery
- input/output schemas
- validation
- normalized errors
- client setup documentation
- supported transport documentation
- tests
- explicit human-review boundaries
- truthful capability status

A documented tool is not LIVE unless it is executable and validated.

---

## Future Tools

Potential later tools include:

- `get_deal_status`
- `build_capital_case`

These depend on later authenticated operational infrastructure and must remain `PLANNED` until their backing services exist.
