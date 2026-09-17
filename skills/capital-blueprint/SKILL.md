# Capital Blueprint Skill

## Status
**BETA — Batch B**

## Purpose
Generate and explain a Capital Operator blueprint from the canonical deterministic engine.

## Required inputs
- Canonical assessment answers

## Canonical tools and sources
- generate_capital_blueprint
- workflow stage registry
- tools registry

## Structured output
`{ blueprint, explanation, assumptions, humanReviewRequired }`

## Operating boundary
- Deterministic calculations and routing come from canonical Capital Operator code/API/MCP tools.
- AI may summarize, explain, classify, and organize returned facts.
- Do not invent lender approvals, pricing, eligibility, buy boxes, credit decisions, or unavailable data.
- Consequential capital representations require human review.
- If a required canonical capability is unavailable or returns an error, report the limitation and stop rather than fabricate a substitute result.

## Human checkpoint
A human operator must verify material facts and approve any external capital representation, lender-facing route, submission, negotiation, or recommendation.
