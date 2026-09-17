# Canonical Source Map

## Authoritative Code & Config Registry

| Domain Area | Canonical Source File | Responsibility |
| :--- | :--- | :--- |
| **Core Types** | `src/types.ts` | Assessment, blueprint, workflow-stage, and shared frontend domain contracts. |
| **API Types & Contracts** | `src/types/api.ts` | V1 REST request/response, workflow classification, routing sandbox, health, webhook, and error contracts. |
| **Event & Webhook Types** | `src/types/events.ts` | Canonical `CapitalEvent` envelope and lifecycle event vocabulary. |
| **Diagnostic Matrix** | `src/config/questions.ts` | Diagnostic questions, answer choices, scoring weights, and priority tags. |
| **Operating Stages** | `src/config/workflowStages.ts` | Canonical eight-stage Capital Operator workflow model. |
| **Blueprint / Recommendation Logic** | `src/lib/recommendationEngine.ts` | Deterministic diagnostic/blueprint recommendation logic. |
| **Capital Math** | `src/lib/capitalMath.ts` | Deterministic DSCR calculation contract. |
| **Capital Stack Planning** | `src/lib/capitalStack.ts` | Non-binding deterministic capital-structure planning categories. |
| **SANDBOX Capital Routing** | `src/lib/capitalRouting.ts` | Canonical informational route classification used by API/MCP. |
| **Tools Registry** | `src/config/tools.ts` | Software/tool registry and workflow/capability metadata. |
| **Destination CTAs** | `src/config/ctas.ts` & `src/config/tally.ts` | Authoritative conversion destinations and Tally form references. |
| **Public Configuration** | `src/config/publicEnv.ts` | Public IDs and URLs safe for zero-config client builds. |
| **Capability Registry** | `src/config/capabilities.ts` | Canonical platform capability ownership/status/fallback metadata. |
| **Ecosystem Registry** | `src/config/ecosystem.ts` | Canonical ecosystem product and handoff metadata. |
| **Capability Matcher** | `src/lib/capabilityMatcher.ts` | Reusable missing-capability matching. |
| **Ecosystem Router** | `src/lib/ecosystemRouter.ts` | Capability-to-product/fallback handoff logic. |
| **API Routing / Intake** | `api/v1/` | Versioned serverless health, intake, routing-sandbox, and webhook-test endpoints. |
| **Integration Registry** | `server/integrations/registry.ts` | Canonical adapter registration for HubSpot, Notion, n8n, and generic webhooks. |
| **Integration Dispatch** | `server/integrations/dispatch.ts` | Fault-isolated dispatch and truthful degraded/persistence semantics. |
| **Event Bus** | `server/events/eventBus.ts` | Canonical in-process event creation/subscription/dispatch foundation. |
| **Webhook Signing** | `server/events/webhookSigner.ts` | HMAC-SHA256 signature generation and timing-safe verification. |
| **Webhook Delivery** | `server/events/webhookDispatcher.ts` | Normalized outbound webhook delivery results. |
| **CORS Policy** | `server/http/cors.ts` | Shared public/allowlisted API CORS behavior. |
| **Analytics Taxonomy** | `src/config/analyticsEvents.ts` | Canonical analytics event names. |
| **Analytics Emitter** | `src/lib/analytics.ts` | Non-blocking GTM/dataLayer-compatible event emission. |
| **Navigation & SEO** | `src/config/navigation.ts` & `src/config/seo.ts` | Route hierarchy and metadata. |
| **Design / Agent Rules** | `AGENTS.md` & `src/index.css` | Repository operating guidance and design tokens. |
| **MCP Server** | `api/mcp.ts`, `server/mcp/*` | Stateless HTTP JSON-RPC MCP capability discovery and tool execution. |
| **Skills** | `skills/*/SKILL.md` | Bounded reusable AI Skill contracts. |
| **Agents** | `agents/*.md` | Bounded operator-assistance agent contracts. |
| **Document Intelligence Contracts** | `server/documents/*`, `src/schemas/document-extraction.schema.json` | Provider-agnostic extraction/normalization foundation. |
| **JSON Schemas** | `src/schemas/` | Intake, routing, webhook, and document extraction contracts. |
| **Automated Tests** | `tests/runAllTests.ts` | Master unit/API integration test runner used by CI. |

## Boundary Notes

- The intake API does not own a separate credit-underwriting or lender-eligibility engine.
- `/api/v1/routing/match-buy-box` is currently a **SANDBOX** capability router, not a verified live lender buy-box source.
- Production MCP is implemented in Batch B and reuses these canonical sources rather than duplicating their logic. `match_capital_routes` remains **SANDBOX** and consequential capital decisions remain human-controlled.
