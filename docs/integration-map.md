# Integration Map & External Endpoints

## External Services Architecture

### 1. Partner Lead Capture (Tally Form & Webhooks)
- **Primary Endpoint**: `https://tally.so/r/mOe658`
- **Purpose**: Moonshine Capital Funding Partner application.
- **Payload Forwarding**: When `VITE_LEAD_WEBHOOK_URL` is provided, lead payloads are dispatched via HTTPS POST.

### 2. Business Funding Direct Intake
- **Endpoint**: `https://tally.so/r/mDEJB5`
- **Purpose**: Direct borrower financing intake for small-to-medium businesses.

### 3. Capital Operator Software Directory
- **Endpoint**: `https://tools.distilledfunding.com`
- **Purpose**: Comprehensive library of commercial lending CRMs, OCR tools, and debt infrastructure software.

### 4. Client-Side Webhook Fallback
If webhook network requests encounter CORS or connectivity limits, the client-side state machine safely falls back to local storage and alerts the user that their blueprint is ready for export.
