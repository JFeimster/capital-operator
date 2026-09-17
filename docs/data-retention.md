# Data Retention Policy

## Client-Side Data
- `AssessmentAnswers` and cached blueprints remain in the user's browser `localStorage` until the user clicks "Retake Diagnostic" or manually clears browser cookies.
- No expiration cookie is placed to force eviction.

## Server & Webhook Retention
- Anonymous telemetry logs are retained for 90 days to monitor completion rates.
- Submitted partner inquiries are stored in secure CRM systems adhering to commercial record retention standards. Users can request immediate record deletion by contacting `compliance@moonshinecapital.io`.
