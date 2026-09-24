# Phase 5 — Capital Clearing Infrastructure

Phase 5 turns Capital Operator into an outcome-driven capital operations layer while preserving the platform rule:

Systems handle repetition. AI handles synthesis. Humans handle judgment. Capital partners handle capital.

## Production truth

| Capability | Status |
| --- | --- |
| Public funding intent / readiness / options | LIVE |
| Funding product registry | BETA, provider-agnostic |
| Verified provider registry | SPECIFIED boundary; no provider is promoted without provenance |
| Workspace / RBAC contracts | BETA, configuration-gated |
| Production auth adapter | SPECIFIED until configured |
| Durable persistence | SPECIFIED; no durable adapter is configured |
| Development memory persistence | DEVELOPMENT_ONLY |
| Deal lifecycle and transaction operations | BETA, configuration-gated |
| Operator UI | BETA |
| MCP funding actions | BETA; authenticated tools are configuration-gated |

## Canonical sources

- src/types/funding.ts — funding intent and readiness contracts
- src/types/deals.ts — deal lifecycle and audit envelope
- src/types/transactions.ts — documents, cases, routing, submissions, offers, conditions, relationships, attribution/compensation
- server/auth/* — centralized authentication and RBAC
- server/persistence/* — repository boundary and persistence capability truth
- server/deals/* — workspace-scoped deal state machine
- server/transactions/service.ts — transaction operations and authorization gates
- src/config/fundingProducts.ts — provider-agnostic product paths
- src/config/fundingProviders.ts — verified-provider boundary
- server/mcp/tools.ts — funding-action MCP tools
- src/pages/FundingOperator.tsx — funding/operator UI

## REST surfaces

Public preparation:
- POST /api/v1/funding/intents
- POST /api/v1/funding/readiness
- POST /api/v1/funding/options
- GET /api/v1/products
- GET /api/v1/providers
- GET /api/v1/providers/search

Authenticated and configuration-gated:
- GET|POST /api/v1/deals
- GET|PATCH /api/v1/deals/:id
- POST /api/v1/deals/:id/transition
- GET|POST /api/v1/deals/:id/documents
- GET|POST /api/v1/deals/:id/capital-case
- GET /api/v1/deals/:id/offers
- GET|PATCH /api/v1/deals/:id/relationship
- GET|PATCH /api/v1/deals/:id/attribution
- POST /api/v1/deals/:id/outcome
- POST /api/v1/routing/match
- POST /api/v1/routing/:id/approve
- GET|POST /api/v1/submissions
- GET|PATCH /api/v1/submissions/:id
- GET|POST /api/v1/offers
- PATCH /api/v1/offers/:id
- GET|POST /api/v1/conditions
- PATCH /api/v1/conditions/:id
- GET /api/v1/funding/:id/status
- GET /api/v1/audit/deal/:id

The deal-scoped offers route avoids an ambiguous dynamic collision between offer IDs and deal IDs.

## MCP action tools

Outcome-first tools include:
- start_funding_request
- create_deal
- find_funding_options
- find_capital_providers
- check_funding_readiness
- build_capital_case
- get_funding_document_checklist
- get_next_funding_action
- get_funding_status
- compare_received_offers
- initiate_funding_handoff
- recommend_funding_support_tools

Existing deterministic DSCR, capital-stack, blueprint, tool-registry, workflow-stage, and SANDBOX routing tools remain available.

## Human-control gates

Capital Operator does not fabricate provider criteria or availability, infer lender approval, invent missing offer terms, choose a winning offer, auto-submit a deal, or infer compensation.

A submission moves to AUTHORIZED only after explicit human authorization and a recorded reason. SUBMITTED is a tracking state only after external transmission has independently occurred and evidence is supplied.

A deal can be recorded FUNDED only after explicit human confirmation and external evidence.

## Auth and persistence

Production auth supports a server-side hashed bearer-token adapter when configured. Development header identity is disabled in production.

Durable production persistence is not claimed. The repository interface exists, while the in-memory adapter is restricted to non-production development and testing.

## Deployment

- Vercel: canonical application, API, and MCP runtime
- GitHub Pages: static mirror/fallback

## Audit and events

State-changing transaction operations emit canonical events and append audit records with workspace, entity, actor, correlation ID, previous/new state, and source metadata.

## Operator UI

The funding/operator route provides public funding preparation plus an authenticated session console. Tokens entered in the UI stay in React memory and are not written to localStorage.
