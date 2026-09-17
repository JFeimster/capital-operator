# Capital Operator

<div align="center">

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
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

## 🔌 Developer APIs, Webhooks & MCP

Capital Operator provides a complete developer integration suite for fintechs, SaaS platforms, and AI agents:

### 1. REST API
- `POST /api/v1/intake/submit`: Programmatic business borrowing application ingestion.
- `POST /api/v1/routing/match-buy-box`: Deterministic lender criteria matching against 50+ debt funds.

### 2. Real-Time Webhooks
- Cryptographically verified HMAC-SHA256 event payloads (`deal.submitted`, `prequal.computed`, `documents.extracted`, `facility.funded`).

### 3. Model Context Protocol (MCP)
Exposes commercial lending tools directly to AI coding assistants and autonomous agents (Claude Desktop, Cursor, Gemini CLI, n8n):
- `calculate_commercial_dscr`
- `query_lender_buy_box`
- `generate_capital_blueprint`

### 4. Turnkey Tally Form Embeds
Zero-code iframe integration with dynamic query parameters and hidden field attribution (`partner_id`, `tier`, `source`).

---

## 🛠 Tech Stack & Architecture

- **Frontend Core**: React 18+ (SPA with Hash Routing)
- **Language**: TypeScript 5.x (Strict Type Checking)
- **Styling**: Tailwind CSS with custom dark fintech design tokens
- **Icons**: `lucide-react`
- **Build Engine**: Vite 6.x
- **Deterministic Engine**: Pure client-side scoring logic with `localStorage` persistence
- **Export Formats**: Audit-ready executive Print/PDF stylesheet (`window.print`)
- **CI/CD**: GitHub Actions deploying automatically to GitHub Pages

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or 20.x
- npm 9.x or higher

### Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/JFeimster/capital-operator.git
cd capital-operator

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application will be accessible locally at `http://localhost:3000`.

### Building & Verification

```bash
# Type check and lint codebase
npm run lint

# Build production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```text
capital-operator/
├── .github/
│   └── workflows/
│       ├── deploy.yml            # Automated GitHub Pages CI/CD deployment
│       ├── ci.yml                # Typecheck and linting pipeline
│       └── lighthouse.yml        # Performance & accessibility audit
├── docs/                         # Comprehensive architectural & domain specifications
│   ├── product-master-context.md # Master context & persona maps
│   ├── api-architecture.md       # REST endpoint specifications
│   ├── webhook-architecture.md   # Event schemas & HMAC verification
│   ├── mcp-architecture.md       # Model Context Protocol tool registry
│   └── ...                       # 25+ detailed system knowledge documents
├── public/                       # Favicons, manifests, SEO assets, 404 router
├── src/
│   ├── components/               # Modular UI components
│   │   ├── assessment/           # 12-Question diagnostic matrix & progress bars
│   │   ├── blueprint/            # Operating blueprint, roadmaps, friction maps
│   │   ├── home/                 # Command center landing views
│   │   ├── integrations/         # Tally form embed & modal components
│   │   ├── layout/               # Header, Footer, Container, Section wrappers
│   │   ├── resources/            # Calculators, templates, and credit memo downloads
│   │   ├── site/                 # Terminals, badges, buttons, SEO heads
│   │   └── tools/                # Interactive tool directory & stack presets
│   ├── config/                   # Central configuration registries
│   │   ├── ctas.ts               # Authoritative destination URLs
│   │   ├── navigation.ts         # Route hierarchy & header actions
│   │   ├── questions.ts          # Diagnostic questions & scoring weights
│   │   ├── seo.ts                # OpenGraph & meta tags
│   │   ├── tools.ts              # 20+ software tools & pricing models
│   │   └── workflowStages.ts     # The 8 operating stages specifications
│   ├── hooks/                    # Sticky headers, keyboard navigation, window sizing
│   ├── lib/                      # Recommendation engine, analytics, router
│   ├── pages/                    # Route views (Home, Assessment, Blueprint, Docs, Playbooks)
│   ├── types.ts                  # Canonical TypeScript domain contracts
│   ├── App.tsx                   # Top-level state orchestration
│   ├── index.css                 # Tailwind CSS styles & animation utilities
│   └── main.tsx                  # React DOM entry point
├── AGENTS.md                     # AI Agent operating rules & design tokens
├── metadata.json                 # Google AI Studio application configuration
├── package.json                  # Dependencies and execution scripts
├── vite.config.ts                # Vite bundler configuration
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
