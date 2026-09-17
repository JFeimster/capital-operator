# Model Context Protocol (MCP) Architecture

## Overview
Capital Operator implements the **Model Context Protocol (MCP)** specification, exposing commercial lending tools and debt capacity calculators directly to AI Agents (Claude Desktop, Cursor, Gemini CLI, n8n Agent Nodes).

---

## MCP Server Tool Registry

### 1. `calculate_commercial_dscr`
- **Description**: Computes Debt Service Coverage Ratio (DSCR), global cash flow, and flags risk thresholds for non-bank credit committees.
- **Parameters**:
  - `monthly_net_operating_income` (number, required)
  - `monthly_debt_service` (number, required)
  - `existing_mca_daily_payments` (number, optional)
- **Output**:
  - `dscr_ratio`: numeric value (e.g. 1.35)
  - `credit_health`: `"HEALTHY"` | `"BORDERLINE"` | `"HIGH_RISK"`
  - `max_recommended_additional_debt_service`: number

---

### 2. `query_lender_buy_box`
- **Description**: Queries Moonshine Capital's 50+ debt fund criteria matrix for matched programs.
- **Parameters**:
  - `annual_revenue` (number)
  - `time_in_business_months` (number)
  - `facility_type` (`"ABL"` | `"SBA_7A"` | `"TERM_DEBT"` | `"EQUIPMENT"`)
  - `frequently_nsf` (boolean)
- **Output**: Array of matched credit funds with target SLA and advance rate percentages.

---

### 3. `generate_capital_blueprint`
- **Description**: Synthesizes 12 diagnostic responses into an 8-stage transformation roadmap and prioritized operational leak checklist.
