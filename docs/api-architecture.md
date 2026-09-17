# API Architecture Specification

## Architecture Principles

1. **Deterministic before AI**: Explicit validation, workflow classification, event contracts, and routing signals are preferred to prompt-based logic.
2. **Human-controlled capital judgment**: API responses must not fabricate lender eligibility, approvals, pricing, facility limits, or credit decisions.
3. **Stateless endpoint design**: Versioned REST endpoints accept structured JSON and return normalized responses.
4. **Server-side credential isolation**: Private provider credentials remain in serverless/server contexts and are never exposed through client configuration.
5. **Resilient integration adapters**: Provider failures are isolated and reported truthfully; failed or unavailable adapters do not become fake persistence.
6. **Truthful status language**: `LIVE`, `BETA`, `SANDBOX`, `SPECIFIED`, and `PLANNED` reflect executable reality.

---

## CORS

Public API endpoints default to non-credentialed wildcard CORS. If `CAPITAL_ALLOWED_ORIGINS` is configured, credentialed requests are allowed only for explicitly configured origins.

Wildcard origin and credentialed CORS are never enabled together.

---

## Core Endpoints

### 1. Health & Capability Check — `LIVE`

`GET /api/v1/health`  
Alias: `GET /api/health`

Returns runtime and capability status. Routing is currently reported as `SANDBOX`; external adapters are `BETA` when configured and `SPECIFIED` when unavailable.

Example:

```json
{
  "status": "ok",
  "version": "1.0.0",
  "service": "capital-operator-api",
  "environment": "production",
  "capabilities": {
    "diagnostic": "LIVE",
    "blueprint": "LIVE",
    "intake": "LIVE",
    "routing": "SANDBOX",
    "webhooks": "BETA",
    "integrations": {
      "hubspot": "SPECIFIED",
      "notion": "SPECIFIED",
      "n8n": "SPECIFIED",
      "genericWebhook": "SPECIFIED"
    }
  }
}
```

---

### 2. Programmatic Intake Submission — `LIVE`

`POST /api/v1/intake/submit`

Purpose:

- validate structured intake
- generate a submission identifier
- classify workflow priority
- surface review flags
- emit lifecycle events
- dispatch to configured adapters
- report degraded/persistence state truthfully

It does **not** return lender eligibility, borrowing limits, matched-lender counts, approval likelihood, or credit pricing.

Example response:

```json
{
  "status": "success",
  "submission_id": "intake_984fbc71a92e",
  "workflow": {
    "priority": "EXPEDITE",
    "flags": ["LARGE_REQUEST"],
    "rationale": ["Requested amount merits structured human review."],
    "human_review_required": true
  },
  "dispatched_to": [],
  "persisted_externally": false,
  "degraded": true,
  "warnings": [
    "No external integration accepted or persisted this payload. Core intake completed, but durable external persistence is unavailable."
  ]
}
```

---

### 3. Capital Route Matching — `SANDBOX`

`POST /api/v1/routing/match-buy-box`

The route name is retained for contract continuity, but the current implementation is a sandbox capability router rather than a live lender buy-box network.

It can surface categories for human review, such as:

- SBA/bank term review
- asset-based financing review
- revenue-based financing review
- equipment financing review
- receivables/factoring review

It does **not** represent:

- live lender availability
- lender approval or eligibility
- verified provider buy boxes
- pricing/rate quotes
- facility limits
- autonomous underwriting

Example response:

```json
{
  "status": "success",
  "capability_status": "SANDBOX",
  "disclaimer": "Capability routing is informational and requires human review. It does not represent lender eligibility, approval, pricing, or live lender availability.",
  "query_summary": {
    "requested_amount": 250000,
    "annual_revenue": 1200000,
    "potential_routes_count": 3
  },
  "matches": [
    {
      "route_id": "route_asset_based_review",
      "program_type": "ASSET_BASED_FINANCING_REVIEW",
      "match_tier": "POTENTIAL_FIT",
      "fit_signals": ["Collateral indicated", "Structured facility request"],
      "review_flags": [],
      "human_review_required": true
    }
  ]
}
```

---

### 4. Webhook Test Endpoint — `SANDBOX`

`POST /api/v1/webhooks/test`

Used to validate HMAC signature generation and outbound delivery behavior against a caller-supplied test destination.

This endpoint does not constitute durable queue/retry infrastructure.

---

### 5. Legacy Lead Dispatch — `LIVE/BETA`

`POST /api/lead`

Backwards-compatible serverless lead-ingestion boundary used by the frontend. Provider-specific delivery is normalized behind adapters for HubSpot, Notion, n8n, and generic webhooks.

If no provider successfully accepts the payload, the response must report degraded state. Capital Operator does not claim buffering, queueing, or persistence unless durable infrastructure actually performed it.

---

## Event Model

The canonical `CapitalEvent` envelope includes:

- UUID event identifier
- event type
- contract version
- ISO timestamp
- typed payload
- optional request/partner/environment context

Initial implemented event vocabulary includes:

- `assessment.completed`
- `blueprint.generated`
- `lead.submitted`
- `lead.routed`
- `integration.dispatched`
- `integration.failed`
- `routing.completed`
- `webhook.dispatched`
- `webhook.failed`

Additional deal/submission/offer/funding events are expansion vocabulary and do not by themselves imply that those operational systems are implemented.

---

## Security Boundary

```text
Browser
→ Capital Operator API
→ integration provider
```

Private provider tokens belong only in server-side environment variables. Client `VITE_*` configuration is for genuinely public values only.
