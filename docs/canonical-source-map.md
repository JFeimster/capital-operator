# Canonical Source Map

## Authoritative Code & Config Registry

| Domain Area | Canonical Source File | Responsibility |
| :--- | :--- | :--- |
| **Core Types** | `src/types.ts` | Complete TypeScript type definitions across assessments, blueprints, and stages. |
| **API Types & Contracts** | `src/types/api.ts` | V1 REST request, response, prequalification, and error taxonomy contracts. |
| **Event & Webhook Types** | `src/types/events.ts` | Canonical `CapitalEvent` envelope and lifecycle event types. |
| **Diagnostic Matrix** | `src/config/questions.ts` | 12 questions, answer choices, scoring weights, and priority tags. |
| **Operating Stages** | `src/config/workflowStages.ts` | The 8 operational stages of commercial capital infrastructure. |
| **Scoring Logic** | `src/lib/recommendationEngine.ts` | Deterministic mathematical scoring for blueprint generation. |
| **Tools Registry** | `src/config/tools.ts` | 20+ software tools, pricing tiers, workflow stages, and capability maps. |
| **Destination CTAs** | `src/config/ctas.ts` & `src/config/tally.ts` | Authoritative partner URLs and Tally form IDs (`mOe658`, `mDEJB5`). |
| **Integration Adapters** | `server/integrations/registry.ts` | Adapter definitions for HubSpot, Notion, n8n, and generic webhooks. |
| **Event Bus & Dispatch** | `server/events/eventBus.ts` | Canonical event creation, subscription, and outbound webhook delivery. |
| **Webhook Signing** | `server/events/webhookSigner.ts` | HMAC-SHA256 signature generation and constant-time verification. |
| **Public Configuration** | `src/config/publicEnv.ts` | Public IDs and URLs safe for zero-config client builds. |
| **Navigation & SEO** | `src/config/navigation.ts` & `src/config/seo.ts` | Route hierarchy, metadata tags, OpenGraph specs. |
| **Design Rules** | `AGENTS.md` & `src/index.css` | Dark fintech aesthetic tokens, Tailwind utilities. |
| **JSON Schemas** | `src/schemas/` | Validation schemas for intake, buy-box routing, and webhook envelopes. |
| **Automated Tests** | `tests/runAllTests.ts` | Master test runner orchestrating unit and API integration test suites. |
