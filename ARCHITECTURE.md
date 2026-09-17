# Capital Operator System Architecture

## 1. Architectural Philosophy

Capital Operator follows four operating rules:

1. **Systems handle repetition.** Deterministic software owns validation, schemas, calculations, mappings, workflow state, and explicit routing rules.
2. **AI handles synthesis.** AI may summarize, classify, explain, recommend, and assist operators after deterministic logic.
3. **Humans handle judgment.** Consequential capital representations, exceptions, eligibility judgments, negotiations, and lender decisions remain human-controlled.
4. **Capital partners handle capital.** Capital Operator orchestrates infrastructure; it does not pretend software itself is the capital provider.

One canonical source should own each domain. Do not create parallel scoring, routing, or configuration systems.

---

## 2. Runtime Architecture

```text
Browser
→ React/Vite Capital Operator frontend
→ Vercel serverless API / orchestration layer
→ integration adapters / event layer
→ CRM / database / automation / AI / capital ecosystem
```

### Frontend

- React + TypeScript + Vite
- diagnostic and blueprint workflow
- localStorage resilience for client-side diagnostic state
- provider-agnostic lead dispatch boundary
- zero private credentials in client configuration

### Server/API

- `/api/v1/health` — runtime/capability health
- `/api/v1/intake/submit` — validated intake + workflow classification + adapter dispatch
- `/api/v1/routing/match-buy-box` — **SANDBOX** capability routing requiring human review
- `/api/v1/webhooks/test` — signed webhook delivery sandbox
- `/api/lead` — backwards-compatible lead dispatch endpoint

The routing endpoint does not constitute a verified live lender network, lender approval engine, or autonomous underwriting system.

### Integration Layer

Normalized server adapters exist for:

- HubSpot
- Notion
- n8n
- generic outbound webhook

Each adapter is fault-isolated. Missing credentials disable/degrade only that integration. If no provider accepts a payload, the platform reports degraded state and does not claim durable buffering or persistence.

### Event Layer

Canonical events use the `CapitalEvent` envelope:

- unique event ID
- version
- ISO timestamp
- typed payload
- optional request/environment/partner context

Initial lifecycle vocabulary includes diagnostic, blueprint, lead, routing, integration, and webhook events. Future deal/submission/offer/funding event names do not imply that those later operational systems are already implemented.

---

## 3. Client State

The diagnostic can operate without authenticated cloud persistence. Client state may persist through localStorage keys such as:

- `capital_operator_answers`
- `capital_operator_step`
- `capital_operator_is_assessing`
- `capital_operator_blueprint`

Client persistence is not a substitute for later authenticated operational deal storage.

---

## 4. Deployment Roles

### Vercel

Canonical serverless runtime for `/api/*` and production-capable application deployment.

`vercel.json` keeps `main` deployment enabled and isolates `/api/*` from SPA rewrites.

### GitHub Pages

Static public mirror/fallback for the frontend where intentionally supported. GitHub Pages cannot provide the serverless API runtime.

---

## 5. Security Boundary

- private credentials are server-side only
- no private API keys in `VITE_*`
- externally supplied payloads are validated
- client-computed financial values are not trusted for consequential server operations
- failed provider dispatch is never represented as successful persistence
- CORS uses either public non-credentialed wildcard access or an explicit credentialed origin allowlist, never both simultaneously

---

## 6. Current Capability Status

- diagnostic — **LIVE**
- blueprint — **LIVE**
- health API — **LIVE**
- intake API — **LIVE**
- event envelope/event bus foundation — **LIVE**
- HMAC webhook signing/verification foundation — **LIVE**
- webhook test endpoint — **SANDBOX**
- capital routing endpoint — **SANDBOX**
- external integration adapters — **BETA** when configured, otherwise **SPECIFIED**
- production MCP — **PLANNED, Phase 2 / Batch B**
- document intelligence/OCR — **PLANNED**
- authenticated capital clearing/deal operations — **PLANNED, Phase 5 / Batch C**
