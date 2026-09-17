# Capital Operator

<div align="center">

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![CI / Deploy](https://github.com/JFeimster/capital-operator/actions/workflows/deploy.yml/badge.svg)](https://github.com/JFeimster/capital-operator/actions/workflows/deploy.yml)

**Turn Commercial Borrowing Demand Into a High-Velocity Operating Asset.**

[Live Production App](https://jfeimster.github.io/capital-operator/) • [Run 12-Q Diagnostic](https://jfeimster.github.io/capital-operator/#assessment) • [Developer Docs & API](https://jfeimster.github.io/capital-operator/#docs) • [Partner Onboarding](https://tally.so/r/mOe658)

</div>

---

## ⚡ Overview

Most advisory firms, loan brokers, fractional CFOs, and B2B platforms encounter commercial borrowing demand, yet manage pipelines using **tribal knowledge, chaotic email threads, and manual spreadsheets**. This friction causes slow turnaround times, document chase fatigue, and loan decline rates exceeding 40–60%.

**Capital Operator** (powered by **Moonshine Capital**) transitions informal debt brokerage into a deterministic **8-Stage Capital Operating Architecture**. The platform diagnoses operational bottlenecks via an interactive 12-question diagnostic matrix, pinpoints revenue leaks, and generates an executive 30-day transformation blueprint with curated technology stacks and role playbooks.

---

## 🏛 The 8-Stage Operating Model

```
+-----------------------------------------------------------------------------------+
|                           8-STAGE CAPITAL OPERATING PIPELINE                      |
+-----------+-----------+-----------+-----------+-----------+-----------+-----------+
| 01. INTAKE| 02. TRIAGE| 03. DOCS  | 04. MEMO  | 05. ROUTE | 06. SUBMIT| 07. CLOSE | 08. RENEW |
| Dynamic   | Instant   | Auto OCR  | Exec 2-Pg | 50+ Buy-  | Tracked   | Checklists| 30/90/150 |
| Portals   | DSCR / NSF| Synthesis | Memo Room | Box Match | Data Rooms| & Wires   | Retention |
+-----------+-----------+-----------+-----------+-----------+-----------+-----------+
```

1. **Stage 1: Intake & Lead Capture** — Omnichannel digital capture with automatic partner attribution and structured pre-qualification forms.
2. **Stage 2: Triage & Financial Pre-Screening** — Deterministic cash flow health scoring, NSF/overdraft audits, and debt service capacity calculations.
3. **Stage 3: Document Room & OCR Extraction** — Normalized bank statement parsing, revenue trend reconciliation, and Form 108 debt schedules.
4. **Stage 4: Packaging & Credit Memo Synthesis** — Executive 2-page Institutional Credit Memorandum generation with normalized EBITDA add-backs.
5. **Stage 5: Lender Routing & Buy-Box Matching** — Algorithmic filtering against 50+ non-bank debt funds, SBA preferred desks, and asset-based lenders.
6. **Stage 6: Submission & Deal Movement** — Tracked single-link data rooms with granular document security and parallel submission governance.
7. **Stage 7: Closing, Compliance & Funding** — Closing checklist automation, wire verification, fee attribution, and condition clearing.
8. **Stage 8: Post-Close Relationship Equity** — Automated 30/60/90/150-day retention cadences, facility upsize alerts, and continuous client renewals.

---

## 📊 Operating Model Maturity Tiers

| Tier | Operating Classification | Characteristics | Focus Action |
| :--- | :--- | :--- | :--- |
| **Tier 1** | **Relationship-Led** | Purely manual intake, personal email threads, Excel tracking, heavy administrative drag. | Standardize digital intake & 5-doc data rooms. |
| **Tier 2** | **Systemized** | Basic CRM adoption, cloud storage folders, manual document audit and ad-hoc lender reach-outs. | Automate bank OCR & buy-box routing. |
| **Tier 3** | **AI-Augmented** | Automated intake portals, OCR bank extraction, AI-drafted credit memos, structured lender tracking. | Implement post-close renewal automation loops. |
| **Tier 4** | **Capital Operator** | Autonomous debt routing engine, embedded platform APIs, continuous client lifetime equity capture. | Scale syndicate distribution & platform rev-share. |

---

## 🎯 Role-Specific Playbooks

- **[For Fractional CFOs & Advisors](https://jfeimster.github.io/capital-operator/#for-advisors)**: Institutionalize commercial debt placement, eliminate unbillable document formatting, and monetize borrowing demand with an interactive **Advisor Placement Economics Simulator**.
- **[For Loan Brokers & Operators](https://jfeimster.github.io/capital-operator/#for-operators)**: Build a high-velocity deal desk, reduce cycle times from 21 days to under 48 hours, and diagnose pipeline leaks with the **Deal Desk Friction Calculator**.
- **[For SaaS & Fintech Platforms](https://jfeimster.github.io/capital-operator/#for-platforms)**: Embed zero-balance-sheet commercial lending rails into existing software workflows, model recurring revenue splits (150–250 bps), and access sandbox REST APIs.
- **[For Lenders & Syndicate Partners](https://jfeimster.github.io/capital-operator/#for-partners)**: Receive standardized, pre-screened loan packages with verified electronic bank ledgers, pre-calculated DSCR, and 0% junk submissions.

---

## 🧮 Interactive Financial Tools & Calculators

- **Commercial DSCR Debt Capacity Calculator**: Calculate Debt Service Coverage Ratios, global cash flow buffers, and maximum safe debt burdens for non-bank credit committees.
- **Factor Rate to Effective APR Normalizer**: Convert daily/weekly factor rates and merchant cash advances into annualized percentage rates (APR) and total cost of capital.
- **Advisor Placement Economics Simulator**: Model annual referral commissions, placement velocity, and administrative hours saved.
- **Deal Desk Friction & Leakage Calculator**: Quantify lost annual commission revenue caused by manual document collection and submission drag.
- **Platform GMV Monetization Model**: Simulate software enterprise value enhancement from non-dilutive embedded lending.

---

## 🔌 Developer APIs, Event Layer & Webhooks

Capital Operator provides a complete developer and serverless execution suite:

### 1. REST API Endpoints (`LIVE`)
- `GET /api/v1/health` (Alias: `/api/health`): Real-time service heartbeat, uptime counter, and capability availability.
- `POST /api/v1/intake/submit`: Programmatic commercial borrowing intake ingestion with deterministic triage scoring, pre-qualification limits, and normalized CRM dispatch.
- `POST /api/v1/routing/match-buy-box`: Multi-fund credit box routing and lender qualification matrix against 50+ debt funds (SBA 7a, ABL, RBF, Equipment, Factoring).
- `POST /api/v1/webhooks/test`: Interactive testing sandbox for validating HMAC signature generation and target delivery.
- `POST /api/lead`: Normalized serverless lead integration endpoint with graceful fallbacks.

### 2. Canonical Event Layer (`LIVE`)
Outbound and internal asynchronous events follow the standardized `CapitalEvent` envelope (`deal.submitted`, `deal.qualified`, `routing.completed`, `integration.dispatched`, `webhook.dispatched`).

### 3. Cryptographic Webhook Signer (`LIVE`)
All outbound webhooks include standard replay-protected headers:
- `X-Capital-Signature: t=<timestamp>,v1=<hmac-sha256>`
- `X-Capital-Event: <event-type>`
- `X-Capital-Delivery: del_<uuid>`

---

## 🛠 Tech Stack & Architecture

- **Frontend Core**: React 19+ (Single-Page App with Hash Routing)
- **Backend / API**: Vercel Serverless Functions (`/api/v1/*`) + Express middleware in dev
- **Language**: TypeScript 5.x (Strict Mode)
- **Styling**: Tailwind CSS 4.x with custom dark fintech design tokens
- **Icons**: `lucide-react`
- **Build Engine**: Vite 8.x + `tsx` test execution
- **Persistence & Fallbacks**: Client-side `localStorage` + Serverless buffers + Multi-CRM adapters
- **CI/CD**: GitHub Actions pipeline enforcing typecheck, lint, automated test suites, and deployment

---

## 🚀 Local Development & Testing

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server (port 3000)
npm run dev

# 3. Run full automated test suite (Unit & API Integration Tests)
npm test

# 4. Type check and lint
npm run lint

# 5. Build production bundle
npm run build
```

---

## 📁 Project Structure

```text
capital-operator/
├── .github/workflows/
│   ├── ci.yml                    # Automated typecheck, test runner, and build
│   └── deploy.yml                # Automated GitHub Pages CI/CD deployment
├── api/                          # Vercel Serverless API layer
│   ├── v1/
│   │   ├── health.ts             # Health check & capability status endpoint
│   │   ├── intake/submit.ts      # Programmatic intake & triage endpoint
│   │   ├── routing/match-buy-box.ts # Credit fund buy-box routing endpoint
│   │   └── webhooks/test.ts      # Sandbox webhook test endpoint
│   ├── health.ts                 # Health alias forwarder
│   └── lead.ts                   # Normalized serverless lead endpoint
├── server/
│   ├── events/                   # Event bus, HMAC signer, webhook dispatcher
│   └── integrations/             # Normalized adapters (HubSpot, Notion, n8n, Webhook)
├── docs/                         # Comprehensive architectural & domain specifications
├── src/
│   ├── components/               # Modular UI components (Assessment, Blueprint, Tools, Calculators)
│   ├── config/                   # Central configuration & public environment registries
│   ├── lib/                      # Recommendation engine, analytics, CTA router
│   ├── schemas/                  # JSON validation schemas for intake, routing, webhooks
│   ├── types/                    # Canonical TypeScript API and Event contracts
│   ├── types.ts                  # Core domain models
│   └── App.tsx                   # Top-level state orchestration
├── tests/                        # 10+ automated test suites & test runner
├── AGENTS.md                     # AI Agent operating rules & design tokens
└── README.md                     # Master project documentation
```

---

## 🌐 Live Ecosystem Links

- **Production Application**: [https://jfeimster.github.io/capital-operator/](https://jfeimster.github.io/capital-operator/)
- **Distilled Funding**: [https://www.distilledfunding.com](https://www.distilledfunding.com)
- **Operator Underwriting Tools**: [https://tools.distilledfunding.com](https://tools.distilledfunding.com)
- **Partner & Advisor Onboarding**: [https://tally.so/r/mOe658](https://tally.so/r/mOe658)
- **Direct Deal Submission**: [https://tally.so/r/mDEJB5](https://tally.so/r/mDEJB5)

---

## 📄 License & Compliance

Licensed under the **Apache-2.0 License**. See [LICENSE](LICENSE) for details.

*Disclaimer: Capital Operator is an operational diagnostics and workflow architecture platform provided in partnership with Moonshine Capital. Diagnostic blueprints, capacity models, and scorecards are intended solely for operational planning and do not constitute a credit decision, loan commitment, or legal underwriting advice.*
