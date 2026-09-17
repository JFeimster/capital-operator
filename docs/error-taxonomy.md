# Error Taxonomy & Diagnostic Codes

## Standardized Error Codes

| Error Code | Category | Root Cause | Resolution Action |
| :--- | :--- | :--- | :--- |
| `ERR_ROUTE_NOT_FOUND` | Client Routing | Hash route not mapped in `AppRouter`. | Fallback to `<NotFound />` and offer `#home` reset. |
| `ERR_ASSESSMENT_INCOMPLETE`| State Validation | User attempts to view `#blueprint` with <12 answers. | Redirect to `#assessment` with step preservation. |
| `ERR_TALLY_EMBED_BLOCKED` | Iframe Security | Third-party cookie / iframe restriction. | Provide direct "Open in Tab" fallback link. |
| `ERR_CALC_INVALID_INPUT` | Math Logic | Negative or non-numeric input in DSCR calculator. | Clamp to mathematical min limits (0 for NOI, 1 for debt service). |
| `ERR_API_UNAUTHORIZED` | REST API | Missing or expired Bearer token. | Return HTTP 401 with `WWW-Authenticate` header. |
| `ERR_WEBHOOK_SIG_MISMATCH` | Webhooks | HMAC SHA-256 digest does not match header. | Return HTTP 403 Forbidden and log IP address. |
