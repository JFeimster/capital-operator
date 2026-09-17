# Public API Roadmap

This document is subordinate to the canonical Phase 0–5 roadmap tracked in [GitHub Issue #8](https://github.com/JFeimster/capital-operator/issues/8).

## Phase 1 — Capital API + Event Layer
Status: **LIVE with explicitly marked SANDBOX/BETA capabilities**

- `GET /api/v1/health` — LIVE
- `POST /api/v1/intake/submit` — LIVE validated intake/workflow classification
- `POST /api/v1/routing/match-buy-box` — SANDBOX capability routing; human review required
- canonical event envelope and in-process event bus — LIVE foundation
- signed webhook infrastructure — LIVE foundation
- external adapters — BETA when configured / SPECIFIED when unavailable

Phase 1 does not provide autonomous underwriting, verified live lender eligibility, durable queueing, or production MCP.

---

## Phase 2 — Intelligence, Skills, Agents & MCP
Status: **PLANNED**

- domain Skills using canonical application logic
- Capital Architect / Intake Analyst / Capital Case Builder / Routing Copilot
- production MCP server
- MCP capability discovery, schemas, validation, transport/client documentation, and tests
- document-intelligence interfaces and normalized document/financial schema

**Production MCP belongs in Phase 2.**

---

## Phase 3 — Ecosystem Routing Platform
Status: **PLANNED**

- capability registry
- deterministic ecosystem matching/routing
- workflow-stage and operating-model handoffs
- downstream availability/fallback handling
- ecosystem transition analytics

---

## Phase 4 — Public Distribution APIs / Engineering-as-Marketing
Status: **PLANNED**

- APIs supporting public capital-stack builders, audits, calculators, and workflow utilities where useful
- structured entity/knowledge surfaces for SEO/AEO

---

## Phase 5 — Capital Clearing Infrastructure
Status: **PLANNED**

Potential API surface, only as the underlying authenticated domain model becomes real:

- `POST /api/v1/deals`
- `GET /api/v1/deals/:id`
- `POST /api/v1/routing/match`
- `POST /api/v1/submissions`
- `GET /api/v1/offers/:dealId`

These routes must not be presented as LIVE until authentication, tenancy, persistence, auditability, and the corresponding domain services are implemented and validated.
