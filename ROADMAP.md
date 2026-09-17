# Capital Operator Product Roadmap

Canonical execution ledger: [GitHub Issue #8](https://github.com/JFeimster/capital-operator/issues/8)

**Product thesis:** Turn Capital Demand Into an Operating System.

This file summarizes the canonical Phase 0–5 roadmap. Issue #8 is the authoritative checklist and must remain synchronized with current `main`.

## Batch A — Foundation + Programmability

### Phase 0 — Production Foundation
Status: **LIVE / complete when Issue #8 exit-gate items are verified**

- Production hosting and `/api/*` routing truth
- public/private environment separation
- CI/build/test health
- capability-status taxonomy (`LIVE`, `BETA`, `SANDBOX`, `SPECIFIED`, `PLANNED`)
- documentation reconciliation

### Phase 1 — Capital API + Event Layer
Status: **LIVE with explicitly marked SANDBOX/BETA capabilities**

- versioned health and intake APIs
- normalized server integration adapters
- canonical event envelope/event bus
- signed webhook foundation
- routing capability endpoint (currently **SANDBOX**, not a live lender qualification network)
- analytics and failure/degraded-state handling

---

## Batch B — Intelligence + Ecosystem Control Plane

### Phase 2 — Intelligence, Skills, Agents & MCP
Status: **PLANNED**

- domain Skills using canonical deterministic logic
- Capital Architect, Intake Analyst, Capital Case Builder, Routing Copilot
- production MCP server and validated tool contracts
- provider-agnostic document intelligence architecture

**Production MCP belongs in Phase 2 / Batch B.**

### Phase 3 — Ecosystem Routing Platform
Status: **PLANNED**

- capability registry and deterministic ecosystem routing
- workflow-stage and operating-model recommendations
- downstream handoffs with graceful degradation
- ecosystem analytics

---

## Batch C — Distribution + Transactional Platform

### Phase 4 — Engineering-as-Marketing + SEO/AEO
Status: **PLANNED**

- useful public calculators/builders/audits
- entity/knowledge pages
- schema, sitemap, internal linking, `llms.txt`
- acquisition and assisted-conversion analytics

### Phase 5 — Capital Clearing Infrastructure
Status: **PLANNED**

- domain model for workspaces, opportunities, providers, products, submissions, offers, conditions, attribution, and relationship lifecycle
- authentication, authorization, tenancy, auditability
- deal-operation APIs
- provider adapters and operational connectors
- human approval gates for consequential capital decisions

---

## Execution Batches

- **Batch A:** Phase 0 + Phase 1 → review gate
- **Batch B:** Phase 2 + Phase 3 → review gate
- **Batch C:** Phase 4 + Phase 5 → final architecture review

Do not create a competing roadmap. New capabilities should be mapped into these phases or added to Issue #8 deliberately.
