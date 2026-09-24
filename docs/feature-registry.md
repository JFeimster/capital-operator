# Feature Registry: Capital Operator

## Status Taxonomy

- `LIVE`: Executable and production-available.
- `BETA`: Executable but intentionally limited or still being validated.
- `SANDBOX`: Executable only in test/demo/non-production conditions.
- `SPECIFIED`: Architecture or contract documented but not yet implemented.
- `PLANNED`: Future capability without completed executable implementation.

| Feature ID | Description | Component / Layer | Status | Target Persona |
| :--- | :--- | :--- | :--- | :--- |
| `FEAT_12Q_DIAGNOSTIC` | 12-question operational diagnostic matrix. | Client / Assessment Engine | **LIVE** | All Personas |
| `FEAT_BLUEPRINT_GEN` | 8-stage operational blueprint & roadmap. | Client / Recommendation Engine | **LIVE** | All Personas |
| `FEAT_TOOLS_DIRECTORY` | Interactive directory with filters, stack presets, and tool modals. | Client / Directory Engine | **LIVE** | Operators & Brokers |
| `FEAT_RESOURCE_CENTER` | Template library with financial/operational calculators. | Client / Tooling | **LIVE** | Advisors & Operators |
| `FEAT_API_HEALTH_V1` | Operational status, uptime, and capability availability API. | Server / `/api/v1/health` | **LIVE** | Developers & Fintechs |
| `FEAT_API_INTAKE_SUBMIT_V1` | Validated intake submission, workflow classification, events, and adapter dispatch. No credit decisioning. | Server / `/api/v1/intake/submit` | **LIVE** | Origination Platforms |
| `FEAT_API_BUYBOX_MATCH_V1` | Informational capital-route capability matching requiring human review; not a live lender eligibility network. | Server / `/api/v1/routing/match-buy-box` | **SANDBOX** | Operators & Fintechs |
| `FEAT_HMAC_WEBHOOK_SIGNER` | SHA256 webhook signing, verification, and replay guard. | Server / Event Layer | **LIVE** | Integration Partners |
| `FEAT_EVENT_BUS` | Canonical event envelope creation and in-process dispatch foundation. | Server / Event Layer | **LIVE** | Internal Infrastructure |
| `FEAT_CRM_ADAPTERS` | Normalized adapters for HubSpot, Notion, n8n, and generic webhooks. External calls depend on credentials/configuration. | Server / Integrations | **BETA** | Operations Teams |
| `FEAT_WEBHOOK_TEST_RUNNER` | Test endpoint for HMAC webhook delivery. | Server / `/api/v1/webhooks/test` | **SANDBOX** | Integration Partners |
| `FEAT_TALLY_EMBED_SYS` | Embed engine with parameter pass-through. | Client / Tally Config | **LIVE** | Partners & Desks |
| `FEAT_ADVISOR_CALC` | Advisor placement economics simulator. | Client / Calculator | **LIVE** | Fractional CFOs |
| `FEAT_BROKER_LEAK_CALC` | Deal desk friction & leakage calculator. | Client / Calculator | **LIVE** | Commercial Brokers |
| `FEAT_PLATFORM_GMV_CALC` | Embedded-capital monetization simulator. | Client / Calculator | **LIVE** | SaaS & Fintechs |
| `FEAT_PRINT_VIEW` | Executive print/PDF layout. | Client / Print Engine | **LIVE** | Operators |
| `FEAT_DOCS_API_HUB` | Developer documentation for implemented and planned capabilities. | Client / Docs Hub | **LIVE** | Developers & Fintechs |
| `FEAT_DOC_INTELLIGENCE_FOUNDATION` | Provider-agnostic document classification/parsing contracts, normalized extraction schema, confidence/review flags, and deterministic normalization. Paid OCR adapters are not enabled. | Server / Documents | **SPECIFIED** | Capital Operations |
| `FEAT_LENDER_LOS_SYNC` | Direct bi-directional loan-origination-system integration. | Server / Integrations | **PLANNED** | Capital Partners |
| `FEAT_MCP_TOOL_SERVER` | Production stateless HTTP JSON-RPC MCP server exposing validated Capital Operator tools. | Server / `/api/mcp` | **BETA** | AI Agents & Operators |
| `FEAT_ECOSYSTEM_ROUTER` | Capability-driven ecosystem registry, matcher, router, and UI control plane. | Client / Control Plane | **BETA** | Operators & Platforms |
| `FEAT_MULTI_USER_DESK` | Workspace/RBAC, deal lifecycle, transaction APIs, and operator console. Production use requires configured auth and durable persistence. | Full-Stack / Platform | **BETA** | Enterprise Desks |

| `FEAT_AI_SKILLS` | Five bounded Capital Operator Skills backed by canonical tools/engines. | Skills / Agent Layer | **BETA** | AI Agents & Operators |
| `FEAT_OPERATOR_AGENTS` | Four bounded agent definitions with explicit human checkpoints and prohibited autonomy. | Agents / Agent Layer | **BETA** | Operators |
| `FEAT_CAPITAL_CLEARING_TX` | Document metadata, persistent capital cases, routing approval, submissions, offers, conditions, relationship lifecycle, attribution, and funded/closed outcome tracking. | Server / Transactions | **BETA** | Capital Operations |
| `FEAT_FUNDING_OPERATOR_UI` | Outcome-first funding preparation and authenticated transaction console with live capability status. | Client / #funding | **BETA** | Operators |
| `FEAT_VERIFIED_PROVIDER_REGISTRY` | Provider registry boundary requiring provenance and freshness before provider-specific results are exposed. No provider availability is claimed without verified records. | Server / Funding Registry | **SPECIFIED** | Capital Operations |
