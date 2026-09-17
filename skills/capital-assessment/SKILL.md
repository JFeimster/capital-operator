# Capital Assessment Skill

## Status
**BETA — Batch B**

## Purpose
Turn canonical diagnostic inputs/results into an operator-readable assessment without changing the scoring model.

## Required inputs
- Assessment answers matching the canonical assessment schema
- Optional existing blueprint

## Canonical tools and sources
- generate_capital_blueprint
- canonical assessment/recommendation engine

## Structured output
`{ operatingModel, segment, topFindings, priorities, missingInformation, humanReviewRequired }`

## Operating boundary
- Deterministic calculations and routing come from canonical Capital Operator code/API/MCP tools.
- AI may summarize, explain, classify, and organize returned facts.
- Do not invent lender approvals, pricing, eligibility, buy boxes, credit decisions, or unavailable data.
- Consequential capital representations require human review.
- If a required canonical capability is unavailable or returns an error, report the limitation and stop rather than fabricate a substitute result.

## Human checkpoint
A human operator must verify material facts and approve any external capital representation, lender-facing route, submission, negotiation, or recommendation.
