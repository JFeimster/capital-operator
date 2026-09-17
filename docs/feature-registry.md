# Feature Registry: Capital Operator

## Interactive Capabilities & Standardized Status Matrix

Status Taxonomy:
- `LIVE`: Operational, tested in production, available for runtime execution.
- `BETA`: Deployed and functionally complete; active testing and stabilization in progress.
- `SANDBOX`: Simulation or staging environment for verification.
- `SPECIFIED`: Formal schema, contracts, and architecture documented; ready for build.
- `PLANNED`: Long-term roadmap item scheduled for future execution.

| Feature ID | Description | Component / Layer | Status | Target Persona |
| :--- | :--- | :--- | :--- | :--- |
| `FEAT_12Q_DIAGNOSTIC` | 12-question commercial underwriting diagnostic matrix. | Client / Assessment Engine | **LIVE** | All Personas |
| `FEAT_BLUEPRINT_GEN` | 8-stage operational blueprint & 30-day roadmap. | Client / Recommendation Engine | **LIVE** | All Personas |
| `FEAT_TOOLS_DIRECTORY` | Interactive directory with filters, stack presets, and tool modals. | Client / Directory Engine | **LIVE** | Operators & Brokers |
| `FEAT_RESOURCE_CENTER` | Template library with DSCR & APR/Factor Rate calculators. | Client / Tooling | **LIVE** | Advisors & Underwriters |
| `FEAT_API_HEALTH_V1` | Operational status, uptime, and capability availability API. | Server / `/api/v1/health` | **LIVE** | Developers & Fintechs |
| `FEAT_API_INTAKE_SUBMIT_V1` | Programmatic intake submission and deterministic triage API. | Server / `/api/v1/intake/submit` | **LIVE** | Origination Platforms |
| `FEAT_API_BUYBOX_MATCH_V1` | Multi-fund credit box routing and lender matching API. | Server / `/api/v1/routing/match-buy-box`| **LIVE** | Brokers & Fintechs |
| `FEAT_HMAC_WEBHOOK_SIGNER` | SHA256 webhook signing, verification, and replay guard. | Server / Event Bus | **LIVE** | Integration Partners |
| `FEAT_EVENT_BUS` | Serverless event envelope creation and lifecycle dispatch. | Server / Event Bus | **LIVE** | Internal Infrastructure |
| `FEAT_CRM_ADAPTERS` | Normalized CRM adapters (HubSpot, Notion, n8n, Webhook). | Server / Integrations | **BETA** | Operations Teams |
| `FEAT_WEBHOOK_TEST_RUNNER` | Sandbox endpoint for testing HMAC webhook delivery. | Server / `/api/v1/webhooks/test` | **SANDBOX** | Integration Partners |
| `FEAT_TALLY_EMBED_SYS` | Secure embed engine with dynamic parameter pass-through. | Client / Tally Config | **LIVE** | Partners & Desks |
| `FEAT_ADVISOR_CALC` | Advisor Debt Placement Economics Simulator. | Client / Calculator | **LIVE** | Fractional CFOs |
| `FEAT_BROKER_LEAK_CALC`| Deal Desk Friction & Commission Leakage Calculator. | Client / Calculator | **LIVE** | Commercial Brokers |
| `FEAT_PLATFORM_GMV_CALC`| Embedded Platform Capital Monetization Simulator. | Client / Calculator | **LIVE** | SaaS & Fintechs |
| `FEAT_PRINT_VIEW` | Black-and-white executive PDF print layout. | Client / Print Engine | **LIVE** | Credit Committees |
| `FEAT_DOCS_API_HUB` | Developer docs, REST specs, webhook guide, MCP agent tools. | Client / Docs Hub | **LIVE** | Developers & Fintechs |
| `FEAT_OCR_DOCUMENT_FEED` | Automated bank statement OCR ingestion (Heron/Ocrolus). | Server / Pipeline | **SPECIFIED** | Underwriting Desks |
| `FEAT_LENDER_LOS_SYNC` | Direct bi-directional Loan Origination System API sync. | Server / Syndication | **SPECIFIED** | Institutional Lenders |
| `FEAT_MCP_TOOL_SERVER` | Model Context Protocol server exposing deal desk tools to AI. | Server / Agent Layer | **SPECIFIED** | AI Agents & Operators |
| `FEAT_MULTI_USER_DESK` | Multi-seat syndicate collaborative deal room. | Full-Stack / Platform | **PLANNED** | Enterprise Desks |
