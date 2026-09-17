# Security Architecture & Data Protection

## Security Model
Capital Operator processes sensitive commercial financial metadata. The architecture enforces zero client-side secret exposure, TLS 1.3 encryption, and data minimization.

---

## Security Tenets

### 1. Data Minimization & Privacy
- Client diagnostic answers are scored client-side in browser memory and persisted in the user's isolated `localStorage`.
- No sensitive personally identifiable information (PII) is permanently stored without explicit form submission.

### 2. Form & Iframe Isolation
- Tally embeds utilize sandboxed iframes over HTTPS with `256-bit TLS encryption`.
- Cross-origin iframe messaging is strictly validated against `https://tally.so`.

### 3. API & Webhook Security
- Server API routes require Bearer token authorization.
- Webhook endpoints sign payloads using HMAC-SHA256 (`X-Capital-Signature`).
- API keys (Gemini, Webhooks) are server-only secrets managed via environment variables.
