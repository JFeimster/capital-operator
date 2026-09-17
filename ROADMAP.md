# Capital Operator Product Roadmap

## Batch A: Production Foundation & Capital API + Event Layer (Completed / Live)
- [x] **Phase 0 — Production Foundation**:
  - [x] Standardized capability status language (`LIVE`, `BETA`, `SANDBOX`, `SPECIFIED`, `PLANNED`).
  - [x] CI/CD pipeline health with automated multi-suite test runners (`npm test`).
  - [x] Reconciled public vs private configuration separation (zero-config client).
  - [x] Vercel serverless routing configured (`/api/*` isolated from SPA rewrites).
- [x] **Phase 1 — Capital API + Event Layer**:
  - [x] REST Health API (`/api/v1/health` and `/api/health`).
  - [x] Programmatic Intake Submission API (`/api/v1/intake/submit`) with deterministic triage.
  - [x] Buy-Box Credit Fund Matching Engine (`/api/v1/routing/match-buy-box`).
  - [x] Cryptographic Webhook Signer & Constant-Time HMAC-SHA256 Verifier (`server/events/webhookSigner.ts`).
  - [x] Outbound Webhook Dispatcher with Replay Protection (`server/events/webhookDispatcher.ts`).
  - [x] Server Event Bus with Canonical `CapitalEvent` Envelope (`server/events/eventBus.ts`).
  - [x] Resilient, fault-isolated server integration adapters for HubSpot, Notion, n8n, and generic webhooks.
  - [x] Sandbox Webhook Verification Endpoint (`/api/v1/webhooks/test`).
  - [x] Comprehensive automated test coverage across all API endpoints and engines.

---

## Batch B: Underwriting & Pipeline Acceleration (Next)
- [ ] **Automated Bank Statement Ingestion**: Structured JSON schema for Plaid and OCR data feeds (Heron Data / Ocrolus).
- [ ] **Deterministic Credit Case Builder**: Automated generation of Lender Submission Packets & Credit Committee Memos.
- [ ] **Syndication Router**: Multi-fund simultaneous package distribution with audit logging.

---

## Batch C: Institutional Syndicate Rails (Planned)
- [ ] **Live Lender API Credit Box Feeds**: Real-time rate index and facility capacity feeds.
- [ ] **Model Context Protocol (MCP) Tool Server**: Expose Capital Operator deal tools directly to AI Agents.
- [ ] **Multi-User Collaborative Syndicate Room**: Multi-party document check-off and closing settlement tracking.
