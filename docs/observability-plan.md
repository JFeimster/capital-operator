# Observability & Analytics Plan

## Observability Architecture
Tracks user interactions, diagnostic completions, tool clicks, and embed engagement while respecting user privacy.

---

## Analytics Event Schema (`src/lib/analytics.ts`)

| Event Type | Trigger | Key Parameters |
| :--- | :--- | :--- |
| `page_view` | Hash route change | `route`, `referrer` |
| `assessment_started` | User initiates diagnostic | `source_cta`, `initial_situation` |
| `assessment_step_completed`| User answers question | `step_number`, `question_id`, `answer` |
| `assessment_completed` | All 12 questions submitted | `overall_score`, `friction_count`, `operating_model` |
| `blueprint_generated` | Executive blueprint viewed | `operating_model`, `high_leverage_stages` |
| `integration_viewed` | Tally form or embed loaded | `form_id`, `route_key` |
| `embed_copied` | User copies embed snippet | `embed_type` (`widget`, `tally`, `api`) |
| `marketing_cta_click` | CTA button clicked | `cta_label`, `destination_href` |
