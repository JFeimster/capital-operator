# Skills Architecture: Capital Operator

## Status
**BETA — Phase 2 / Batch B**

Capital Operator Skills are reusable operating contracts for ChatGPT/agent tooling. They do not contain independent underwriting or lender-selection logic.

## Implemented Skills

- `skills/capital-assessment/SKILL.md` — interpret canonical diagnostic/blueprint outputs.
- `skills/capital-blueprint/SKILL.md` — generate/explain the deterministic blueprint.
- `skills/capital-routing/SKILL.md` — use SANDBOX route classification for human review.
- `skills/capital-case/SKILL.md` — organize verified facts and deterministic metrics into a reviewable capital-case draft.
- `skills/capital-stack-design/SKILL.md` — produce non-binding capital-structure planning categories.

## Rules

Skills must reuse canonical APIs, MCP tools, engines, schemas, registries, and types. They may synthesize and explain but may not invent lender approvals, pricing, availability, eligibility, buy boxes, or missing financial facts.

Consequential lender-facing representations, submissions, negotiations, exceptions, and capital decisions require human approval.
