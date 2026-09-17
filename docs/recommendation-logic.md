# Recommendation Logic Specification

## Architecture Overview
The recommendation engine (`src/lib/recommendationEngine.ts` and `src/lib/assessmentEngine.ts`) translates 12 structured diagnostic responses into an executive blueprint.

## Scoring Dimensions
Responses carry points contributing to the **Operating Model Score** (0–100):
- **Intake & Volume**: Under 10 deals vs. 200+ monthly opportunities.
- **Pipeline Infrastructure**: Email inbox (0 pts) -> Spreadsheets (3 pts) -> Standard CRM (7 pts) -> Loan Origination System (10 pts).
- **Document Handling**: Manual email attachments (0 pts) -> Cloud folders (3 pts) -> Upload portals (7 pts) -> OCR & financial data extraction (12 pts).
- **Lender Routing**: Informal broker contacts (0 pts) -> Multi-lender shotgun (5 pts) -> Structured criteria matrix (9 pts).
- **Automation Level**: Fully manual (0 pts) -> Templates (3 pts) -> Automated reminders (7 pts) -> Programmatic sequences with human checkpoints (11 pts).

## Stage Priority Matrix
Each of the 8 stages is assigned one of four operational priorities:
- **FIX NOW**: Acute friction point identified by the user in Q9 or directly targeted in Q10.
- **BUILD NEXT**: The prerequisite capability required to reach the next operating tier.
- **WORKING WELL**: Existing tooling and automation already meet target performance thresholds.
- **LATER**: Advanced capabilities reserved for higher deal volumes.

## Deterministic Guarantee
The logic is fully deterministic. Given the same answer payload, the engine will always generate identical findings, priority states, tool recommendations, and roadmap milestones.
