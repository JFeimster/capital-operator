# API Architecture Specification

## Architecture Principles
1. **Deterministic Execution**: Scoring, triage, and pre-qualification utilize transparent arithmetic models without arbitrary black-box thresholds.
2. **Stateless Endpoint Design**: Standardized RESTful endpoints accepting structured JSON payloads.
3. **Strict HMAC Authentication**: All programmatic endpoints enforce Bearer token header authentication and webhook payload verification.

---

## Core Endpoint Specifications

### 1. Programmatic Intake
- **Route**: `POST /api/v1/intake/submit`
- **Headers**:
  ```http
  Authorization: Bearer <API_KEY>
  Content-Type: application/json
  X-Partner-ID: <PARTNER_CODE>
  ```
- **Request Body**:
  ```json
  {
    "business_name": "Apex Logistics LLC",
    "ein": "82-1234567",
    "annual_revenue": 3200000,
    "avg_monthly_deposits": 265000,
    "time_in_business_months": 48,
    "requested_facility": "ABL_REVOLVER",
    "target_amount": 500000
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
      "max_credit_limit": 625000,
      "recommended_program": "ASSET_BASED_CREDIT_LINE",
      "matched_lenders_count": 4
    }
  }
  ```

### 2. Buy-Box Matching
- **Route**: `POST /api/v1/routing/match-buy-box`
- **Description**: Filters applicant financial attributes against 50+ debt fund criteria matrices to return ranked matches.
