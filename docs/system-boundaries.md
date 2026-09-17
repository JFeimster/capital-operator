# System Boundaries: Capital Operator

## Core Architectural Boundaries

### 1. In-Scope Responsibilities
- 12-question operational diagnostic evaluation.
- Deterministic scoring, friction mapping, and 30-day roadmap generation.
- Technology stack recommendations and role-based playbooks.
- Embeddable intake orchestration (Tally and REST APIs).
- Interactive underwriting calculators (DSCR and APR/Factor Rate normalizer).

### 2. Out-of-Scope Boundaries (Externalized Services)
- **Credit Authority**: Capital Operator does not issue loan approvals; credit decisions remain solely with independent syndicate lenders.
- **Direct Banking / Payment Processing**: ACH transfers and loan disbursements are executed via licensed depository partner banks.
- **Legal Representation**: Standardized templates and credit memos serve as operational specifications, not legal counsel.
