# Environment Variable Registry

## Configuration & Environment Variables

All environment variables used in server and client environments must be defined in `.env.example`.

```env
# .env.example
# Server-side Gemini API (Required for AI Synthesis)
GEMINI_API_KEY=

# Server-side Webhook & Integration Secrets (Optional)
WEBHOOK_SIGNING_SECRET=
MOONSHINE_PARTNER_API_KEY=

# Client-side Public Config (Vite prefixed)
VITE_APP_ENV=production
VITE_DEFAULT_TALLY_PARTNER_ID=mOe658
VITE_DEFAULT_TALLY_DEAL_ID=mDEJB5
```

---

## Security Governance
1. **Server Secrets**: `GEMINI_API_KEY` and `WEBHOOK_SIGNING_SECRET` must **never** be exposed with `VITE_` prefixes.
2. **Client Config**: Only non-sensitive public IDs may use the `VITE_` prefix.
