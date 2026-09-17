# Integration Registry: Capital Operator

## Overview

This registry catalogs external systems, protocols, and integration points. Status reflects executable reality, not intended future architecture.

---

## 1. Core Platform & Form Integrations

| Service | Method | Route / Target ID | Status | Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Tally Partner Form** | Iframe / Direct Link | `mOe658` | **LIVE** | Partner application/intake surface with attribution support. |
| **Tally Funding Intake** | Iframe / Direct Link | `mDEJB5` | **LIVE** | External funding-intake form. |
| **REST Health API** | GET | `/api/v1/health` | **LIVE** | Service heartbeat, environment metadata, and truthful capability status. |
| **REST Intake API** | POST | `/api/v1/intake/submit` | **LIVE** | Validated intake, non-underwriting workflow classification, event emission, and adapter dispatch. |
| **Capital Route API** | POST | `/api/v1/routing/match-buy-box` | **SANDBOX** | Informational capital-program category routing requiring human review. Not a live lender eligibility or pricing system. |
| **Webhook Test Endpoint** | POST | `/api/v1/webhooks/test` | **SANDBOX** | HMAC-SHA256 test signature generation and target delivery verification. |

---

## 2. Normalized Server Adapters

| Service | Provider ID | Protocol | Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| **HubSpot** | `hubspot` | REST | **BETA when configured / SPECIFIED otherwise** | Server-side CRM dispatch adapter. |
| **Notion** | `notion` | REST | **BETA when configured / SPECIFIED otherwise** | Server-side database/page dispatch adapter. |
| **n8n Workflow** | `n8n` | Webhook | **BETA when configured / SPECIFIED otherwise** | Workflow automation dispatch adapter. |
| **Generic Webhook** | `genericWebhook` | HTTP POST | **BETA when configured / SPECIFIED otherwise** | Generic outbound webhook adapter. |

Adapters are fault-isolated. A missing credential or failed adapter does not crash unrelated application behavior.

If no adapter successfully accepts a payload, Capital Operator reports a degraded state and does **not** claim that the payload was queued, buffered, or persisted.

---

## 3. Financial Data & Document Intelligence

| Service | Integration Type | Status | Use Case |
| :--- | :--- | :--- | :--- |
| **Heron Data** | REST API | **PLANNED** | Optional document/bank-data extraction provider for later document-intelligence architecture. |
| **Ocrolus** | API / Webhook | **PLANNED** | Optional document/OCR provider. |
| **Validis** | Direct Sync | **PLANNED** | Optional accounting-data provider. |

Provider-agnostic document intelligence belongs to Phase 2. Credentials should not be required to define interfaces, schemas, mocks, or disabled states.

---

## 4. Future Operational Connectors

| Service | Protocol | Status | Notes |
| :--- | :--- | :--- | :--- |
| **QuickBooks / Xero** | API | **PLANNED** | Phase 5 accounting/operational connector candidates. |
| **Plaid** | API | **PLANNED** | Potential bank-data connector where justified. |
| **Partner APIs / LOS** | REST / provider-specific | **PLANNED** | Provider adapters only after canonical domain contracts exist. |
| **Slack / messaging alerts** | Webhook / API | **PLANNED** | Optional operational notification layer. |

No connector should be presented as LIVE solely because an interface, schema, or documentation exists.
