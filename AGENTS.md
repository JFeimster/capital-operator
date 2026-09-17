# AGENTS.md

## Project Context: Capital Operator (Moonshine Capital)

This document provides system rules, operational guidelines, and architectural conventions for AI Coding Agents working in the `capital-operator` codebase.

---

### 1. Absolute Directives & Scope Boundaries

- **Single Purpose**: This application is a high-conviction capital infrastructure diagnostic and blueprint generator for Moonshine Capital.
- **User Intent Primacy**: Implement requested features directly without adding unsolicited third-party accounts, bloated multi-page frameworks, or unnecessary external API requirements unless explicitly instructed.
- **Client-Side Architecture**: The core diagnostic scoring, state persistence, and blueprint generation run client-side without requiring a mandatory backend database for evaluation.
- **No Direct Mock Data for Real Services**: When real integrations are implemented (e.g. Tally webhooks, Zapier endpoints), read configuration from `src/config/integrations.ts` and environment variables defined in `.env.example`.

---

### 2. Design System & Theming Tokens

- **Aesthetic Archetype**: Premium dark fintech command center.
- **Backgrounds**: Deep black/charcoal (`#07090d`, `#05070a`, `slate-950`). Never use bright generic purple-blue gradients or white default backdrops in the main views.
- **Borders & Dividers**: Subdued slate (`border-slate-800`, `border-slate-800/80`, `border-slate-900`). Avoid loud 1px hairline neon borders.
- **Accent Tokens**:
  - **Emerald (`emerald-400`, `emerald-500`)**: Systems, automation, efficiency, primary CTAs, completed stages.
  - **Cyan (`cyan-400`)**: AI synthesis, technical architecture, next capability unlocks.
  - **Amber (`amber-400`)**: Human judgment checkpoints, warnings, relationship equity leakage.
  - **Red / Crimson (`red-400`, `red-500`)**: Operational friction, manual leaks, "FIX NOW" priorities.
- **Typography Pairing**:
  - **Display / Headings**: Clean sans-serif (`font-sans`, Plus Jakarta Sans / system).
  - **Technical Meta / Labels**: Monospace (`font-mono-code` or `font-mono`) for stage codes (`01`, `[QUALIFY]`), status badges, and technical metrics.
- **Icons**: All icons must be imported exclusively from `lucide-react`.

---

### 3. Key Architectural Files & Responsibilities

- `src/types.ts`: Core type definitions (`AssessmentAnswers`, `BlueprintResult`, `StagePriority`, `OperatingStage`). Every domain change begins here.
- `src/config/questions.ts`: The 12-question diagnostic matrix with answers, single/multi select flags, and weight tags.
- `src/config/ctas.ts`: Authoritative destination URLs for Moonshine Capital partner funnels (`tally.so/r/mOe658`), business funding (`tally.so/r/mDEJB5`), and operator tools (`tools.distilledfunding.com`).
- `src/config/segments.ts`: Persona messaging and custom pathways for Advisors, Operators, Teams, Referrers, Services, and Platforms.
- `src/lib/recommendationEngine.ts`: Deterministic scoring rules translating 12 user responses into an 8-stage blueprint, priority matrix, automation leaks, and 30-day roadmap.
- `src/components/PrintView.tsx`: Clean black-and-white print layout rendered during `window.print()` for executive PDF generation.

---

### 4. Code Standards & Patterns

- **TypeScript**: Strict mode enabled. No `any` types where interfaces can be defined.
- **State Management**: React functional hooks with localStorage serialization. Never mutate state directly.
- **Safe State Dependencies**: Avoid unstable object references in `useEffect` dependency arrays.
- **DOM & Print**: Ensure all interactive action bars, forms, and landing sections include `no-print` classes, while `PrintView.tsx` uses `print-only`.


---

### 5. Batch B AI / MCP / Ecosystem Rules

- `src/lib/recommendationEngine.ts`, `src/lib/capitalMath.ts`, `src/lib/capitalStack.ts`, and `src/lib/capitalRouting.ts` own deterministic logic. Do not reimplement them inside prompts or agents.
- `api/mcp.ts` + `server/mcp/*` are the production MCP boundary.
- `skills/*/SKILL.md` and `agents/*.md` define bounded AI behavior; they may synthesize but may not autonomously approve, decline, price, negotiate, submit, or claim lender eligibility.
- `src/config/capabilities.ts` and `src/config/ecosystem.ts` are the canonical ecosystem/control-plane registries. Do not hard-code duplicate product URLs or capability metadata in pages.
- `server/documents/*` is provider-agnostic. Do not add paid OCR/data provider calls without an explicitly configured integration.
- SANDBOX routing must always remain labeled informational and human-reviewed.
