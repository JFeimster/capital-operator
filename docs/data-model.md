# Data Model Specification

## Core TypeScript Entities

### `AssessmentAnswers`
Stores the raw user input across the 12 diagnostic dimensions.
- `q1_currentHandling`: Current operating situation.
- `q2_monthlyVolume`: Monthly deal inquiries (Under 10 to 200+).
- `q3_leadSources`: Array of lead channel strings.
- `q4_pipelineLocation`: Where active deals are tracked.
- `q5_pursuingDecision`: Preliminary triage strategy.
- `q6_documentHandling`: How borrower documents are collected and parsed.
- `q7_routingDecision`: Lender selection methodology.
- `q8_followUpAutomation`: Degree of automated communications.
- `q9_breakdownPoints`: Up to 3 acute friction points.
- `q10_priorities`: Top 2 30-day operational priorities.
- `q11_techBudget`: Monthly software budget range.
- `q12_handsOnControl`: Operational posture (Hands-off, Hybrid, Full operator).

### `BlueprintResult`
Contains the complete computed specification:
- `operatingModel`: One of 4 archetypes.
- `nextUnlock`: Highest immediate capability leap.
- `stages`: Array of 8 `StageRecommendation` items with tools and friction.
- `automationLeaks`: Array of specific manual tasks and business impacts.
- `roadmap`: 3-phase execution schedule (`first7Days`, `next30Days`, `later`).
