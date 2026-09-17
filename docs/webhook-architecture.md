# Webhook Architecture: Capital Operator

## Webhook Dispatch Model
Capital Operator emits asynchronous lifecycle events to registered consumer URLs (CRMs, Zapier, n8n, internal microservices). All events follow the canonical `CapitalEvent` envelope with cryptographic HMAC-SHA256 signatures.

---

## Canonical Event Envelope
```json
{
  "id": "evt_9f82a1b74c0e",
  "type": "deal.submitted",
  "version": "1.0.0",
  "timestamp": "2026-09-17T14:00:00.000Z",
  "payload": {
    "deal_id": "deal_984fbc71a92e",
    "business_name": "Apex Logistics LLC",
    "annual_revenue": 3200000,
    "avg_monthly_deposits": 265000,
    "triage_score": 92
  },
  "context": {
    "source": "capital-operator-server",
    "environment": "production",
    "partnerId": "partner_alpha_01"
  }
}
```

---

## Complete Event Lifecycle Catalog
| Event Name | Lifecycle Stage | Status | Primary Payload Entities |
| :--- | :--- | :--- | :--- |
| `assessment.completed` | Diagnostic | **LIVE** | `answers`, `operating_model`, `readiness_score` |
| `blueprint.generated` | Diagnostic | **LIVE** | `model_type`, `priority_matrix`, `roadmap_30d` |
| `lead.submitted` | Intake / CRM | **LIVE** | `email`, `firstName`, `company`, `role` |
| `lead.routed` | Intake / Routing | **LIVE** | `deal_id`, `partner_id`, `segment` |
| `deal.submitted` | Pipeline | **LIVE** | `deal_id`, `business_name`, `annual_revenue` |
| `deal.qualified` | Underwriting | **LIVE** | `deal_id`, `triage_score`, `max_credit_limit` |
| `routing.completed` | Buy-Box Routing | **LIVE** | `requested_amount`, `qualified_count`, `top_match` |
| `lender.matched` | Syndication | **LIVE** | `deal_id`, `matched_fund_ids`, `program_types` |
| `documents.received` | Document Intake | **SPECIFIED** | `deal_id`, `file_keys`, `document_types` |
| `documents.extracted` | OCR Extraction | **SPECIFIED** | `deal_id`, `cash_flow_summary`, `nsf_count` |
| `capital_case.generated`| Credit Memo | **SPECIFIED** | `deal_id`, `executive_summary`, `risk_rating` |
| `submission.created` | Syndication | **SPECIFIED** | `deal_id`, `lender_id`, `submission_package_url`|
| `termsheet.issued` | Term Sheet | **SPECIFIED** | `deal_id`, `facility_amount`, `interest_rate` |
| `offer.received` | Offer Desk | **SPECIFIED** | `deal_id`, `lender_name`, `rate_apr`, `term_mos` |
| `deal.funded` | Closing | **SPECIFIED** | `deal_id`, `funded_amount`, `commission_split` |
| `facility.funded` | Settlement | **SPECIFIED** | `deal_id`, `wire_reference`, `effective_date` |
| `relationship.followup_due` | Post-Funding | **SPECIFIED**| `deal_id`, `borrower_email`, `trigger_milestone`|
| `integration.dispatched` | Infrastructure | **LIVE** | `provider`, `email`, `dispatchedTo` |
| `integration.failed` | Infrastructure | **LIVE** | `provider`, `email`, `errors` |
| `webhook.dispatched` | Infrastructure | **LIVE** | `delivery_id`, `event_id`, `target_url` |
| `webhook.failed` | Infrastructure | **LIVE** | `delivery_id`, `event_id`, `error_message` |

---

## Security, Headers & HMAC-SHA256 Verification

Every outbound webhook request includes three standard security headers:
1. `X-Capital-Signature`: Contains timestamp and SHA-256 HMAC (format: `t=<timestamp>,v1=<signature>`).
2. `X-Capital-Event`: The event type string (e.g. `deal.submitted`).
3. `X-Capital-Delivery`: Unique delivery trace identifier (`del_...`).

### Signature Verification Implementation (Node.js / TypeScript)

```typescript
import crypto from "crypto";

export function verifyCapitalWebhook(
  rawBody: string,
  signatureHeader: string,
  secret: string,
  toleranceSeconds: number = 300
): { valid: boolean; reason?: string } {
  if (!signatureHeader || !secret) {
    return { valid: false, reason: "Missing signature or secret" };
  }

  const parts = signatureHeader.split(",");
  let timestampStr: string | undefined;
  let signatureV1: string | undefined;

  for (const part of parts) {
    const [key, value] = part.trim().split("=");
    if (key === "t") timestampStr = value;
    if (key === "v1") signatureV1 = value;
  }

  if (!timestampStr || !signatureV1) {
    return { valid: false, reason: "Malformed signature header format" };
  }

  const timestamp = parseInt(timestampStr, 10);
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > toleranceSeconds) {
    return { valid: false, reason: "Timestamp outside tolerance window (replay protection)" };
  }

  const signedPayload = `${timestamp}.${rawBody}`;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(signedPayload);
  const expectedSignature = hmac.digest("hex");

  const signatureBuffer = Buffer.from(signatureV1, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (signatureBuffer.length !== expectedBuffer.length) {
    return { valid: false, reason: "Signature length mismatch" };
  }

  const matches = crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
  return matches ? { valid: true } : { valid: false, reason: "HMAC mismatch" };
}
```
