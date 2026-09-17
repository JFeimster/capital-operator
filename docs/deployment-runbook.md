# Deployment Runbook

## Production Architecture

```text
Browser
→ Capital Operator frontend
→ Vercel serverless `/api/*`
→ integration adapters / event layer
→ external systems
```

- **Vercel** is the canonical serverless runtime and production-capable host.
- **GitHub Pages** remains a static frontend mirror/fallback. It cannot provide `/api/*` serverless execution.
- `vercel.json` keeps `main` deployment enabled and excludes `/api/*` from SPA rewrites.

---

## 1. Validation Before Deployment

```bash
npm run lint
npm test
npm run build
```

All three steps are enforced by the GitHub Actions CI pipeline.

---

## 2. Environment Configuration

### Public client configuration

Public URLs, form IDs, public HubSpot IDs, public Notion reference IDs, and ecosystem URLs are source-controlled in:

`src/config/publicEnv.ts`

Only genuinely public values belong in client-visible configuration.

### Private server configuration

Private credentials belong only in the Vercel/server environment and must never use `VITE_*` variables.

Current optional server-side variables include provider-specific values such as:

- `HUBSPOT_ACCESS_TOKEN`
- `NOTION_TOKEN`
- `NOTION_DATABASE_ID` or the adapter-specific database/data-source setting used by current source
- `N8N_WEBHOOK_URL`
- generic webhook URL/secret variables used by the current adapter
- `WEBHOOK_SECRET`
- `CAPITAL_ALLOWED_ORIGINS` for explicit credentialed CORS allowlisting

Consult the current adapter source and environment-variable registry before adding credentials; do not invent duplicate variables.

Missing optional credentials must degrade only the associated integration and must not break core application behavior.

---

## 3. Vercel Verification

After a `main` deployment:

1. confirm Vercel reports deployment success
2. confirm the root SPA loads
3. confirm `/api/*` is not rewritten to `index.html`
4. verify `GET /api/v1/health`
5. verify intake validation behavior
6. verify the routing endpoint identifies itself as `SANDBOX`
7. verify unavailable integrations return truthful degraded/disabled state rather than fake persistence
8. verify webhook signing tests where a safe sandbox target is available

---

## 4. GitHub Pages Verification

The GitHub Pages workflow should:

1. build the frontend with the Pages base path
2. publish the static `dist/` artifact
3. preserve SPA/hash navigation
4. remain independent of server-only `/api/*` functionality

GitHub Pages is a mirror/fallback, not the canonical API runtime.

---

## 5. Rollback / Failure Rules

- Do not represent a failed deployment as live.
- Do not represent a failed integration dispatch as persisted.
- Revert or patch a failing `main` change and rerun CI.
- Preserve the last known working frontend/API contract where possible.
- Do not disable Vercel `main` deployment while Vercel remains the canonical serverless runtime.
