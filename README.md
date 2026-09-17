# Capital Operator

<div align="center">

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![CI / Deploy](https://github.com/JFeimster/capital-operator/actions/workflows/deploy.yml/badge.svg)](https://github.com/JFeimster/capital-operator/actions/workflows/deploy.yml)

**Turn Capital Demand Into an Operating System.**

[Public App](https://jfeimster.github.io/capital-operator/) • [Diagnostic](https://jfeimster.github.io/capital-operator/#assessment) • [Developer Docs](https://jfeimster.github.io/capital-operator/#docs) • [Partner Onboarding](https://tally.so/r/mOe658)

</div>

---

## Overview

Capital Operator is capital infrastructure / operating-system software for advisors, operators, agencies, platforms, funding teams, referral ecosystems, partner ecosystems, and businesses adding capital capabilities.

It maps and helps construct the technology, workflows, automation, AI assistance, human judgment, and partner infrastructure required to turn existing capital demand into a repeatable operating capability.

It is **not** a lender marketplace, a funding score, an automated credit decision engine, or a generic AI chatbot.

Core operating principle:

- **Systems handle repetition.**
- **AI handles synthesis.**
- **Humans handle judgment.**
- **Capital partners handle capital.**

---

## Canonical 8-Stage Workflow

1. **Create Demand**
2. **Find the Real Opportunities**
3. **Know the Business**
4. **Build the Capital Case**
5. **Route to the Right Capital**
6. **Move the Deal**
7. **Keep Momentum**
8. **Own the Relationship**

The current application focuses on operational diagnostics, blueprints, workflow architecture, and the programmable foundation required to support later capital operations.

---

## Operating Models

1. **Relationship-Led**
2. **Systemized**
3. **AI-Augmented**
4. **Capital Operator**

These describe operating maturity, not borrower creditworthiness.

---

## Capability Status

Capital Operator uses a strict status taxonomy:

- **LIVE** — executable and production-available
- **BETA** — executable but intentionally limited or still being validated
- **SANDBOX** — executable only in test/demo/non-production conditions
- **SPECIFIED** — architecture/contract documented but not implemented
- **PLANNED** — future capability without executable implementation

A README, schema, mock, or specification does not make a capability LIVE.

---

## Batch A — Production Foundation + Capital API/Event Layer

### REST API

- `GET /api/v1/health` — **LIVE** service and capability status endpoint
- `GET /api/health` — **LIVE** health alias
- `POST /api/v1/intake/submit` — **LIVE** validated intake submission and workflow classification; does **not** make lender eligibility or approval decisions
- `POST /api/v1/routing/match-buy-box` — **SANDBOX** capability-routing endpoint; informational only and requires human review
- `POST /api/v1/webhooks/test` — **SANDBOX/BETA** signed webhook delivery test endpoint
- `POST /api/lead` — **LIVE/BETA** provider-agnostic lead dispatch boundary depending on configured external adapters

### Event layer

The server uses a canonical `CapitalEvent` envelope with typed lifecycle events, UUID identifiers, timestamps, versioning, and context metadata.

Initial event families include:

- `assessment.completed`
- `blueprint.generated`
- `lead.submitted`
- `lead.routed`
- `integration.dispatched`
- `integration.failed`
- `routing.completed`
- webhook dispatch/failure events

### Webhook security

Outbound signed webhooks use HMAC-SHA256 signatures with replay-window verification.

Headers include:

- `X-Capital-Signature: t=<timestamp>,v1=<hmac-sha256>`
- `X-Capital-Event: <event-type>`
- `X-Capital-Delivery: del_<uuid>`

### Integration adapters

Server-side provider adapters exist for:

- HubSpot
- Notion
- n8n
- generic outbound webhook

Adapters are credential-isolated and fault-tolerant. If no external adapter successfully accepts a payload, the API reports a degraded state and **does not claim that the payload was buffered or persisted**.

External integrations should be treated as **BETA** when configured and **SPECIFIED** when credentials are absent.

---

## Routing Boundary

The current routing endpoint is intentionally **SANDBOX**.

It can surface program categories that may merit review, but it does not expose or claim:

- live lender availability
- lender approval
- lender eligibility
- verified lender buy boxes
- interest-rate quotes
- facility limits
- underwriting decisions

Consequential financial representations and lender decisions remain human-controlled.

---

## Deployment Architecture

```text
Browser
→ Capital Operator frontend
→ secure Capital Operator API / orchestration layer
→ CRM / database / automation / AI / capital ecosystem
```

- **Vercel** hosts the serverless API and production-capable application runtime.
- **GitHub Pages** remains a static public mirror/fallback where intentionally supported.
- SPA rewrites are configured so `/api/*` is not intercepted by frontend routing.
- Private credentials must remain server-side and must never be placed in private-style `VITE_*` variables.

---

## Tech Stack

- React 19
- TypeScript 5
- Vite 8
- Tailwind CSS 4
- Vercel Serverless Functions
- GitHub Actions
- `tsx` test execution

---

## Local Development

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

---

## Project Structure

```text
capital-operator/
├── .github/workflows/
├── api/
│   ├── v1/
│   │   ├── health.ts
│   │   ├── intake/submit.ts
│   │   ├── routing/match-buy-box.ts
│   │   └── webhooks/test.ts
│   ├── health.ts
│   └── lead.ts
├── server/
│   ├── events/
│   ├── http/
│   └── integrations/
├── docs/
├── src/
│   ├── components/
│   ├── config/
│   ├── lib/
│   ├── schemas/
│   └── types/
├── tests/
├── AGENTS.md
├── ROADMAP.md
└── README.md
```

---

## Roadmap

The canonical Phase 0–5 roadmap is tracked in [GitHub Issue #8](https://github.com/JFeimster/capital-operator/issues/8) and summarized in [`ROADMAP.md`](ROADMAP.md).

- **Batch A:** Phase 0 + Phase 1 — production foundation and programmability
- **Batch B:** Phase 2 + Phase 3 — Skills, agents, production MCP, and ecosystem routing
- **Batch C:** Phase 4 + Phase 5 — public acquisition/SEO-AEO and authenticated capital-clearing infrastructure

**Production MCP belongs in Phase 2 / Batch B.**

---

## Live Ecosystem Links

- **Public Application:** https://jfeimster.github.io/capital-operator/
- **Distilled Funding:** https://www.distilledfunding.com
- **Partner & Advisor Onboarding:** https://tally.so/r/mOe658
- **Funding Intake:** https://tally.so/r/mDEJB5

---

## License & Compliance

Licensed under the **Apache-2.0 License**. See [LICENSE](LICENSE) for details.

Capital Operator provides operational diagnostics, workflow architecture, routing assistance, and software infrastructure. Diagnostic outputs and sandbox routing results are for operational planning and human review; they are not credit decisions, loan commitments, lender approvals, or legal/underwriting advice.
