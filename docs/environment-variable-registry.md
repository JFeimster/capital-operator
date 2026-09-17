# Environment Variable Registry

## Configuration Model

Capital Operator's frontend is intentionally zero-config for normal static use. Public URLs and IDs are source-controlled in `src/config/publicEnv.ts`.

Private credentials are configured only in the serverless/server environment when optional integrations are enabled.

Do not place private credentials in `VITE_*` variables.

---

## Public Client Configuration

Current public values are source-controlled rather than injected through environment variables. Examples include:

- application/public URLs
- Tally form IDs and links
- public HubSpot portal/form IDs
- public Notion reference IDs
- ecosystem destination URLs
- optional public GTM identifier

`VITE_BASE_PATH` is used by the GitHub Pages build workflow as a public build-time path setting. It is not a secret.

---

## Server-Side Optional Configuration

Current server code may use provider-specific environment variables such as:

- `HUBSPOT_ACCESS_TOKEN`
- `ENABLE_HUBSPOT_INTEGRATION`
- Notion token/database settings used by `server/integrations/notion.ts`
- n8n webhook/secret settings used by `server/integrations/n8n.ts`
- generic webhook URL/secret settings used by `server/integrations/webhook.ts`
- `WEBHOOK_SECRET`
- `CAPITAL_ALLOWED_ORIGINS`

The adapter source is authoritative for the exact variable name. Do not create duplicate aliases unless architecture requires them.

---

## Security Governance

1. **Server secrets stay server-side.** Never expose API tokens, signing secrets, or private webhook credentials via `VITE_*`.
2. **Public config can be client-visible.** Only genuinely public identifiers and URLs belong in source-controlled/public configuration.
3. **Missing credentials degrade gracefully.** Optional integration configuration must not block the frontend, build, or unrelated APIs.
4. **No phantom requirements.** A planned AI/MCP provider key is not a required Batch A environment variable.
5. **CORS allowlist:** `CAPITAL_ALLOWED_ORIGINS` may be set to a comma-separated list when credentialed cross-origin requests are required; otherwise public API CORS remains non-credentialed.
