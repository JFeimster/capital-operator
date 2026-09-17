# Deployment Runbook

## Production Build & Deployment

### 1. Build Verification
```bash
npm run lint      # Verifies TypeScript compilation with zero errors
npm run build     # Generates production bundle in dist/
```

### 2. Environment Variables
Ensure the following variables are configured in production hosting (e.g. Vercel, Cloud Run):
- `VITE_LEAD_WEBHOOK_URL` (Optional): Webhook endpoint to receive lead capture submissions.
- `VITE_ANALYTICS_ENDPOINT` (Optional): Custom telemetry collector.

### 3. Verification Post-Deployment
1. Verify root route loads command center within 1.5s.
2. Run diagnostic step 1 through 12.
3. Verify print preview and markdown copy functions.
4. Check outbound partner links route correctly to Tally forms.
