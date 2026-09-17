# API Architecture Specification

## Architecture Principles
1. **Deterministic Execution**: Scoring, triage, and pre-qualification utilize transparent arithmetic models without arbitrary black-box thresholds.
2. **Stateless Endpoint Design**: Standardized RESTful endpoints accepting structured JSON payloads.
3. **Strict HMAC Authentication**: All programmatic endpoints enforce Bearer token header authentication and HMAC-SHA256 signature verification.
4. **Resilient Integration Adapters**: Multi-destination dispatch with fault isolation ensures provider downtimes never crash client submissions.

---

## Core Endpoint Specifications

### 1. Health & Capability Check
- **Route**: `GET /api/v1/health` (Alias: `GET /api/health`)
- **Headers**:
  ```http
  Accept: application/json
  ```
- **Response**: `200 OK`
  ```json
  {
    "status": "ok",
    "version": "1.0.0",
    "service": "capital-operator-api",
    "environment": "production",
    "timestamp": "2026-09-17T14:00:00.000Z",
    "uptimeSeconds": 1420,
    "capabilities": {
      "diagnostic": "LIVE",
      "blueprint": "LIVE",
      "intake": "LIVE",
      "routing": "LIVE",
      "webhooks": "LIVE",
      "integrations": {
        "hubspot": "LIVE",
        "notion": "LIVE",
        "n8n": "LIVE",
        "genericWebhook": "LIVE"
      }
    }
  }
  ```

---

### 2. Programmatic Intake Submission
- **Route**: `POST /api/v1/intake/submit`
- **Headers**:
  ```http
  Content-Type: application/json
  X-Partner-ID: <PARTNER_CODE>
  ```
- **Request Body**:
  ```json
  {
    "business_name": "Apex Precision Machining LLC",
    "contact_name": "John Miller",
    "email": "jmiller@apexmachining.com",
    "phone": "+1-555-019-2834",
    "ein": "82-1234567",
    "annual_revenue": 1800000,
    "avg_monthly_deposits": 155000,
    "time_in_business_months": 48,
    "credit_score": 740,
    "requested_facility": "ASSET_BASED_REVOLVER",
    "target_amount": 300000,
    "industry": "Manufacturing",
    "use_of_funds": "Working capital for purchase orders"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "deal_id": "deal_984fbc71a92e",
    "triage_score": 92,
    "prequalification": {
      "eligible": true,
      "max_credit_limit": 300000,
      "recommended_program": "SBA_7A_SENIOR_LINE",
      "matched_lenders_count": 6,
      "triage_tier": "TIER_1_PRIME",
      "rationale": [
        "Annual revenue >= $1.0M qualifies for middle-market debt funds.",
        "3+ years operating history unlocks bank and SBA 7(a) senior lines.",
        "Deposit run-rate indicates strong, stable cash flow velocity.",
        "FICO >= 700 allows prime single-digit interest rate pricing."
      ]
    },
    "dispatched_to": [
      "hubspot",
      "notion"
    ],
    "timestamp": "2026-09-17T14:00:00.000Z"
  }
  ```

---

### 3. Credit Fund Buy-Box Matching
- **Route**: `POST /api/v1/routing/match-buy-box`
- **Headers**:
  ```http
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "annual_revenue": 1200000,
    "avg_monthly_deposits": 105000,
    "time_in_business_months": 36,
    "credit_score": 725,
    "collateral_available": true,
    "requested_amount": 250000,
    "has_tax_liens": false,
    "has_bankruptcy": false
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "query_summary": {
      "requested_amount": 250000,
      "annual_revenue": 1200000,
      "qualified_matches_count": 4,
      "top_recommended_program": "SBA_7A_SENIOR_FACILITY"
    },
    "matches": [
      {
        "fund_id": "fund_sba_preferred_desk",
        "fund_name": "Moonshine Preferred SBA 7(a) & Senior Bank Desk",
        "program_type": "SBA_7A_SENIOR_FACILITY",
        "match_score": 100,
        "match_tier": "HIGH_CONVICTION",
        "max_facility_amount": 160000,
        "estimated_rate_range": "Prime + 2.75% to Prime + 4.50%",
        "estimated_term": "5 to 10 Years",
        "key_requirements": [
          "2 Years Business Tax Returns (1120/1065)",
          "Interim P&L and Balance Sheet",
          "Personal Financial Statement (SBA Form 413)",
          "Debt Schedule (Form 108)"
        ]
      },
      {
        "fund_id": "fund_fintech_abl_revolver",
        "fund_name": "Institutional Asset-Based Revolver Network",
        "program_type": "ASSET_BASED_REVOLVER",
        "match_score": 100,
        "match_tier": "HIGH_CONVICTION",
        "max_facility_amount": 190000,
        "estimated_rate_range": "8.5% to 15.0% APR",
        "estimated_term": "12 to 24 Months Revolving",
        "key_requirements": [
          "6 Months Business Bank Statements",
          "Accounts Receivable Aging Report (>90 days)",
          "Current Balance Sheet"
        ]
      }
    ],
    "timestamp": "2026-09-17T14:00:00.000Z"
  }
  ```

---

### 4. Webhook Test Sandbox
- **Route**: `POST /api/v1/webhooks/test`
- **Request Body**:
  ```json
  {
    "target_url": "https://webhook.site/your-test-id",
    "secret": "whsec_test_secret_12345678",
    "event_type": "deal.submitted"
  }
  ```
- **Response**: `200 OK` (or `502 Bad Gateway` if destination fails)
  ```json
  {
    "status": "success",
    "delivery_id": "del_84a910bf8a7c",
    "target_url": "https://webhook.site/your-test-id",
    "event_type": "deal.submitted",
    "http_status": 200,
    "signature_header": "t=1726581600,v1=9e8b7c6d5e4f3a...",
    "duration_ms": 142,
    "timestamp": "2026-09-17T14:00:00.000Z"
  }
  ```

---

### 5. Legacy Lead Dispatch Endpoint
- **Route**: `POST /api/lead`
- **Description**: Backwards-compatible serverless ingestion endpoint used by web forms and embedded partners. Dispatches across all configured adapters (HubSpot, Notion, n8n, Webhook).
