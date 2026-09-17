# Analytics Events Specification

## Event Schema
All telemetry events conform to:
```typescript
interface AnalyticsEventPayload {
  eventName: string;
  properties?: Record<string, any>;
  timestamp: string;
  sessionId: string;
}
```

## Catalog of Tracked Events
1. `capital_operator_started`: Triggered when the user clicks "Run Diagnostic" or begins Q1.
2. `assessment_step_completed`: Triggered on each question progression with `questionId` and `answer`.
3. `assessment_completed`: Triggered when all 12 questions are answered.
4. `blueprint_generated`: Triggered when the engine finishes generating the blueprint view.
5. `blueprint_copied`: Triggered when user clicks "Copy Markdown Blueprint".
6. `blueprint_printed`: Triggered when user invokes window print for executive PDF.
7. `lead_submitted`: Triggered when user enters contact info to register their blueprint.
8. `partner_cta_clicked`: Triggered on clicks to Moonshine Capital partner application (`tally.so/r/mOe658`).
9. `funding_cta_clicked`: Triggered on clicks to borrower quote application (`tally.so/r/mDEJB5`).
10. `tool_clicked`: Triggered when a recommended tool link in the blueprint or stack preview is clicked.
