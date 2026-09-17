# Integration Map & External Endpoints

## Runtime Boundary

```text
Browser
→ Capital Operator frontend
→ Capital Operator serverless API
→ normalized integration adapters
→ external systems
```

Private provider credentials and outbound integration calls belong behind the server/API boundary.

---

## 1. Partner Lead Capture

- **Tally partner form:** `https://tally.so/r/mOe658`
- **Purpose:** partner/advisor application and onboarding surface.
- **Application dispatch:** frontend lead capture uses the provider-agnostic application boundary and server-side integrations where configured.

There is no private client-side `VITE_LEAD_WEBHOOK_URL` integration path.

---

## 2. Funding Intake

- **Tally funding intake:** `https://tally.so/r/mDEJB5`
- **Programmatic API:** `POST /api/v1/intake/submit`

The API validates intake, performs non-underwriting workflow classification, emits lifecycle events, and attempts configured server-side adapter dispatch.

---

## 3. Server Integration Adapters

Normalized adapter targets currently include:

- HubSpot
- Notion
- n8n
- generic outbound webhook

Provider credentials are optional server configuration. Missing credentials produce disabled/degraded states rather than breaking core functionality.

A failed dispatch is not treated as durable persistence.

---

## 4. Routing

`POST /api/v1/routing/match-buy-box` is currently **SANDBOX** capability routing.

It must not be described as a live lender network, lender approval system, or verified buy-box feed.

---

## 5. Static Fallback Behavior

The frontend diagnostic and blueprint retain local client-state resilience through `localStorage`. This preserves core diagnostic utility if server integrations are unavailable, but localStorage is **not** a server-side lead buffer or operational system of record.
