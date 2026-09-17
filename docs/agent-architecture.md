# Agent Architecture: Capital Operator

## Status
**BETA — Phase 2 / Batch B**

Capital Operator uses bounded operator-assistance agents, not autonomous underwriting agents.

## Implemented Agents

- **Capital Architect** — synthesizes diagnostic, operating-model, capability, tooling, and ecosystem context.
- **Intake Analyst** — normalizes intake facts and identifies missing information/review flags.
- **Capital Case Builder** — organizes verified facts and deterministic metrics into a human-reviewable capital case.
- **Routing Copilot** — uses SANDBOX route classification to suggest potential categories for operator review.

Definitions live in `agents/`.

## Execution Boundary

Agents may use canonical MCP/API tools and repository-backed registries. They may summarize, explain, classify, and prepare drafts.

Agents may not:
- approve/decline financing
- claim lender eligibility, approval, pricing, or availability
- fabricate lender criteria or financial facts
- negotiate terms/exceptions
- submit externally without explicit authorization
- replace human judgment on consequential capital decisions

Every agent definition includes structured outputs, escalation conditions, prohibited actions, human checkpoints, fallback behavior, and audit trace requirements.
