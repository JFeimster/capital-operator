# Capital Case Skill

## Status
**BETA — Batch B**

## Purpose
Organize verified business facts into an operator-ready capital case draft.

## Required inputs
- Normalized intake facts
- Verified document/extraction facts when available
- Use of funds and requested amount

## Canonical tools and sources
- calculate_commercial_dscr
- document normalization interfaces
- canonical intake data

## Structured output
`{ executiveSummary, verifiedFacts, calculatedMetrics, missingInformation, reviewFlags, sourceTrace, humanReviewRequired }`

## Operating boundary
- Deterministic calculations and routing come from canonical Capital Operator code/API/MCP tools.
- AI may summarize, explain, classify, and organize returned facts.
- Do not invent lender approvals, pricing, eligibility, buy boxes, credit decisions, or unavailable data.
- Consequential capital representations require human review.
- If a required canonical capability is unavailable or returns an error, report the limitation and stop rather than fabricate a substitute result.

## Human checkpoint
A human operator must verify material facts and approve any external capital representation, lender-facing route, submission, negotiation, or recommendation.
