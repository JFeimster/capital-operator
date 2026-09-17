# Automation Registry: Capital Operator

## Core Automation Pipelines

### 1. Intake to Triage Pipeline
- **Trigger**: New Tally intake or REST API submission.
- **Actions**:
  1. Validate 6-month bank statement attachment format.
  2. Execute cash flow run-rate calculation.
  3. Compute DSCR and match against Moonshine debt buy-box criteria.
  4. Dispatch `deal.submitted` webhook to CRM.

### 2. Document Room Assembly Automation
- **Trigger**: Borrower uploads additional tax schedules.
- **Actions**:
  1. Classify files into the standardized 5-doc data room.
  2. OCR extract debt schedule lines (Form 108).
  3. Compile executive 2-page credit memorandum.

### 3. Post-Close Lifetime Retention Cadence
- **Trigger**: Deal status updated to `FUNDED`.
- **Actions**:
  1. Schedule Day 30 operational wellness touchpoint.
  2. Schedule Day 90 cash-flow refresh request.
  3. Schedule Day 150 credit facility upsize / rate reduction pre-screen.
