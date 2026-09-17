# Ecosystem Registry: Capital Operator

## Status
**BETA — Phase 3 / Batch B**

The canonical ecosystem registry is `src/config/ecosystem.ts`. Capability ownership is defined in `src/config/capabilities.ts`.

Do not duplicate product URLs/status/metadata in pages or alternate registries. `src/config/ecosystemProducts.ts` is only a backward-compatible UI projection.

## Control-Plane Model

`workflow stage → capability → responsibility → ecosystem product → fallback → human checkpoint`

Implemented ecosystem nodes include Distilled Funding, Partner Intake OS, Funding Operator OS, Funding Partners OS, Distilled Funding Tools, and adapter-ready HubSpot/n8n entries. Am I Fundable and Funding Applicant OS are represented as **SPECIFIED** until a canonical public handoff URL/production integration is source-controlled here.

## Responsibility Boundary

- **SYSTEM** handles repetition, mappings, deterministic rules, and workflow handoffs.
- **AI** assists with synthesis and organization.
- **HUMAN** owns judgment, exceptions, external representations, negotiations, and routing approval.
- **CAPITAL_PARTNER** owns actual capital decisions.

The ecosystem router does not claim live lender availability or approval.

## Executable Sources

- `src/config/capabilities.ts`
- `src/config/ecosystem.ts`
- `src/lib/capabilityMatcher.ts`
- `src/lib/ecosystemRouter.ts`
- `src/pages/Ecosystem.tsx`
- `src/components/ecosystem/*`
