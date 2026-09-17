# Public API Roadmap

## API Evolution Phases

```
+-----------------------------------------------------------+
| PHASE 1: INTAKE & TRIAGE (Current Live)                   |
| - POST /v1/intake/submit                                  |
| - POST /v1/routing/match-buy-box                          |
| - Webhook lifecycle events                                |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
| PHASE 2: REAL-TIME CREDIT EXTRACTION (Q3 2026)            |
| - POST /v1/underwriting/ocr-statement-parse               |
| - GET /v1/deals/{dealId}/dscr-summary                     |
| - Model Context Protocol (MCP) production server          |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
| PHASE 3: MULTI-LENDER SYNDICATE CLEARING (Q4 2026)        |
| - POST /v1/syndicate/distribute                           |
| - GET /v1/syndicate/term-sheets/{dealId}                  |
| - Direct accounting sync webhooks (QuickBooks/Xero)       |
+-----------------------------------------------------------+
```
