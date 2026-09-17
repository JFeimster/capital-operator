# Webhook Architecture: Capital Operator

## Status

The canonical event envelope, HMAC-SHA256 signing/verification foundation, and webhook delivery dispatcher are implemented. The public webhook test endpoint is **SANDBOX**. Durable queue/retry infrastructure is **not** implemented and must not be implied.

---

## Canonical Event Envelope

```json
{
  "id": "evt_9f82a1b74c0e",
  "type": "lead.submitted",
  "version": "1.0.0",
  "timestamp": "2026-09-17T14:00:00.000Z",
  "payload": {
    "submission_id": "intake_984fbc71a92e",
    "business_name": "Apex Logistics LLC",
    "annual_revenue": 3200000,
    "workflow_priority": "HUMAN_REVIEW"
  },
  "context": {
    "source": "capital-operator-server",
    "environment": "production",
    "partnerId": "partner_alpha_01"
  }
}
```

---

## Event Vocabulary

### Implemented foundation / active event families

| Event | Status | Purpose |
| :--- | :--- | :--- |
| `assessment.completed` | **SUPPORTED** | Diagnostic lifecycle vocabulary. |
| `blueprint.generated` | **SUPPORTED** | Blueprint lifecycle vocabulary. |
| `lead.submitted` | **LIVE usage** | Intake accepted after validation. |
| `lead.routed` | **LIVE usage** | Intake dispatched to one or more successful adapters. |
| `routing.completed` | **SANDBOX usage** | Capital-route sandbox evaluation completed. |
| `integration.dispatched` | **LIVE foundation** | Successful provider dispatch. |
| `integration.failed` | **LIVE foundation** | Provider dispatch failure. |
| `webhook.dispatched` | **LIVE foundation** | Webhook delivery succeeded. |
| `webhook.failed` | **LIVE foundation** | Webhook delivery failed. |

`SUPPORTED` means the canonical type system recognizes the event. It does not necessarily mean every frontend workflow currently emits it through the server event bus.

### Expansion vocabulary

The event type registry also reserves future lifecycle events such as:

- `deal.created`
- `deal.submitted`
- `deal.qualified`
- `documents.received`
- `documents.extracted`
- `capital_case.generated`
- `lender.matched`
- `submission.created`
- `termsheet.issued`
- `offer.received`
- `deal.funded`
- `facility.funded`
- `relationship.followup_due`

These names are **future-compatible vocabulary**, not proof that corresponding Phase 5 operational systems are live.

---

## Security Headers

Outbound webhook requests use:

1. `X-Capital-Signature: t=<timestamp>,v1=<hmac-sha256>`
2. `X-Capital-Event: <event-type>`
3. `X-Capital-Delivery: del_<uuid>`

Signature verification uses a timestamp tolerance window and timing-safe HMAC comparison.

---

## Delivery Semantics

Webhook delivery results are normalized as:

- `DELIVERED`
- `FAILED`
- `RETRYING`
- `SKIPPED`

The contract is retry-ready, but current Batch A infrastructure does not claim a durable queue or persistent retry worker.

If a provider or webhook target is unavailable:

- unrelated application behavior continues
- failure is returned/logged truthfully
- the platform does not claim successful persistence
- no fake `serverless_buffer` is reported

---

## Test Endpoint

`POST /api/v1/webhooks/test` is a **SANDBOX** endpoint for validating signing and delivery behavior against a caller-supplied destination.

It should not be used as evidence of production subscriber management, durable delivery guarantees, or persistent event storage.
