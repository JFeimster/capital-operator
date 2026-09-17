# Capital Operator System Architecture

## 1. Architectural Philosophy

Capital Operator adheres to four core operational principles:

1. **Automate movement before judgment.** Repetitive administrative tasks (chasing bank statements, file renaming, pipeline notifications) should never consume dealmaker bandwidth.
2. **Rules before autonomous agents.** Deterministic logic and rigid lender criteria matrices must precede non-deterministic AI generation.
3. **One source of truth per domain.** One primary CRM for pipeline state, one secure cloud vault for borrower records, and one master lender matrix.
4. **Human checkpoints follow consequence.** Wherever a decision impacts borrower rate, credit exposure, or lender confidence, human review is mandatory.

---

## 2. Component Hierarchy & Flow

```text
[ User Land / Landing View ]
       │
       ├── Situational Selection (AudienceCards)
       └── Direct Diagnostic Entry (AssessmentIntro)
       │
       ▼
[ 12-Step Diagnostic Questionnaire ] (AssessmentStep)
       │
       ├── State managed in React + localStorage
       ├── Keyboard shortcut listeners (1-9, Enter)
       │
       ▼
[ Deterministic Recommendation Engine ] (src/lib/recommendationEngine.ts)
       │
       ├── Calculate Operating Model (Relationship-Led -> Capital Operator)
       ├── Compute 8-Stage Priority (FIX NOW / BUILD NEXT / WORKING WELL / LATER)
       ├── Identify Manual Automation Leaks & Business Cost
       ├── Detect Relationship Equity Leaks (for Referrers)
       └── Synthesize 30-Day Phased Roadmap
       │
       ▼
[ Results View (ResultsView.tsx) ]
       │
       ├── Operating Model Classification & Next Unlock
       ├── Executive Summary & Highest-Leverage Move
       ├── Segment-Specific Custom Pathway
       ├── Expandable 8-Stage Operating Model Cards
       ├── Capital Architecture Map (CapitalArchitectureMap.tsx)
       ├── Automation Leaks Section
       ├── Relationship Leakage Alert (Conditional)
       ├── Phased Roadmap (First 7 Days, Next 30 Days, Later)
       ├── Lead Capture Modal (LeadCaptureModal.tsx)
       └── Partner Ecosystem Conversion Rail (Moonshine Capital)
       │
       ▼
[ Clean Executive Print Layout ] (PrintView.tsx)
```

---

## 3. Data & Storage Contracts

The diagnostic does not require an authenticated cloud database to provide value to the operator. All state persists across sessions via client-side `localStorage` keys:
- `capital_operator_answers`: Complete answers array
- `capital_operator_step`: Current step index (1-12)
- `capital_operator_is_assessing`: Active diagnostic state flag
- `capital_operator_blueprint`: Generated specification object

When lead capture occurs, the payload is dispatched via `src/config/integrations.ts` to configurable endpoints (Tally, Make.com, or custom webhook).
