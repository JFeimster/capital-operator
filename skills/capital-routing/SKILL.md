# Capital Routing Skill

## Status
**BETA — Batch B**

## Purpose
Classify potential capital route categories for human review without representing lender eligibility.

## Required inputs
- Validated routing input fields

## Canonical tools and sources
- match_capital_routes (SANDBOX)

## Structured output
`{ capabilityStatus: 'SANDBOX', matches, reviewFlags, disclaimer, humanReviewRequired: true }`

## Operating boundary
- Deterministic calculations and routing come from canonical Capital Operator code/API/MCP tools.
- AI may summarize, explain, classify, and organize returned facts.
- Do not invent lender approvals, pricing, eligibility, buy boxes, credit decisions, or unavailable data.
- Consequential capital representations require human review.
- If a required canonical capability is unavailable or returns an error, report the limitation and stop rather than fabricate a substitute result.

## Human checkpoint
A human operator must verify material facts and approve any external capital representation, lender-facing route, submission, negotiation, or recommendation.
