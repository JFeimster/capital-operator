# Capital Stack Design Skill

## Status
**BETA — Batch B**

## Purpose
Produce non-binding capital-structure planning categories tied to use of funds and operating constraints.

## Required inputs
- Requested amount
- Use of funds
- Relevant collateral/receivables/real-estate/working-capital indicators

## Canonical tools and sources
- recommend_capital_stack
- calculate_commercial_dscr when verified inputs are supplied

## Structured output
`{ components, rationale, assumptions, disclaimer, humanReviewRequired: true }`

## Operating boundary
- Deterministic calculations and routing come from canonical Capital Operator code/API/MCP tools.
- AI may summarize, explain, classify, and organize returned facts.
- Do not invent lender approvals, pricing, eligibility, buy boxes, credit decisions, or unavailable data.
- Consequential capital representations require human review.
- If a required canonical capability is unavailable or returns an error, report the limitation and stop rather than fabricate a substitute result.

## Human checkpoint
A human operator must verify material facts and approve any external capital representation, lender-facing route, submission, negotiation, or recommendation.
