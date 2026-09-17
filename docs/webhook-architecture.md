# Webhook Architecture: Capital Operator

## Webhook Dispatch Model
Capital Operator emits asynchronous lifecycle events to registered consumer URLs (CRMs, Zapier, Make.com, internal microservices).

---

## Event Catalog
| Event Name | Trigger Condition | Primary Payload Entities |
| :--- | :--- | :--- |
| `deal.submitted` | Borrower completes intake or Tally form. | `deal_id`, `partner_id`, `borrower_profile` |
| `prequal.computed` | Diagnostic calculates DSCR and borrow limit. | `deal_id`, `triage_score`, `max_limit` |
| `documents.extracted` | Bank statement OCR finishes parsing. | `deal_id`, `cash_flow_summary`, `nsf_count` |
| `lender.matched` | Buy-box engine matches eligible credit funds. | `deal_id`, `matched_fund_ids`, `facility_types` |
| `termsheet.issued` | Credit desk uploads formal term sheet. | `deal_id`, `facility_amount`, `interest_rate` |
| `facility.funded` | Wire release confirmed by syndicate lender. | `deal_id`, `funded_amount`, `partner_commission` |

---

## Security & Verification
All incoming webhooks carry the `X-Capital-Signature` header containing a SHA-256 HMAC of the raw request body signed with your webhook secret.

```typescript
import crypto from "crypto";

export function verifyCapitalWebhook(
  rawBody: string,
  signatureHeader: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = "sha256=" + hmac.update(rawBody).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signatureHeader));
}
```
