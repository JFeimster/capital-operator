# Capital Operator

> **Turn Capital Demand Into an Operating System.**
> An interactive capital infrastructure diagnostic and blueprint engine for commercial loan brokers, fractional CFOs, debt advisors, corporate operators, and digital referral platforms. Developed in partnership with Moonshine Capital.

---

## ⚡ Overview

Most firms that encounter business borrowing demand operate on **tribal memory, manual spreadsheets, and ad-hoc email threads**. When deals stall, volume surges, or key personnel leave, the pipeline breaks.

**Capital Operator** diagnoses your capital workflow across the **8-Stage Capital Operating Architecture**, categorizes your firm into an Operating Model tier, audits where you are paying humans to perform machine work, and outputs a prioritized 30-day build sequence to turn deal demand into a scalable operating asset.

---

## 🏛 The 8-Stage Operating Model

1. **Create Demand (Inbound / Partner)**: Multi-channel intake pipelines with zero-friction entry points.
2. **Find the Real Opportunities (Qualify)**: Instant preliminary triage against lender criteria before wasting team hours.
3. **Know the Business (Collect & Synthesize)**: Secure portal uploads with automated OCR parsing, revenue trend calculation, and debt schedule normalization.
4. **Build the Capital Case (Packaging & Synthesis)**: Executive credit memorandum generation, risk profiling, and AI synthesis.
5. **Route to the Right Capital (Lender Matching)**: Algorithmic matching against active credit box matrices.
6. **Move the Deal (Lender Submission)**: Governed parallel submissions, multi-lender tracking, and offer negotiation.
7. **Keep Momentum (Closing & Funding)**: Condition clearing, closing coordination, stipulation tracking, and wire disbursement verification.
8. **Own the Relationship (Post-Funding Lifecycle)**: Portfolio monitoring, covenant tracking, refinance alerts, and automated client renewal loops.

---

## 📊 Operating Model Classifications

- **Tier 1: Relationship-Led** — High touch, spreadsheet-driven, heavy administrative drag.
- **Tier 2: Systemized** — Core CRM and cloud document repositories in place, but manual document review and ad-hoc lender outreach.
- **Tier 3: AI-Augmented** — Automated intake, OCR document digestion, AI credit memo drafts, and systematic lender routing.
- **Tier 4: Capital Operator** — Full-stack automated capital infrastructure with continuous renewal loops and white-label partner distribution.

---

## 🛠 Tech Stack

- **Framework**: React 18+ with TypeScript
- **Bundler & Build**: Vite
- **Styling**: Tailwind CSS with custom dark fintech design tokens
- **Icons**: `lucide-react`
- **Data & Scoring**: Pure client-side deterministic scoring engine with local persistence (`localStorage`)
- **Export Formats**: Audit-ready executive Print/PDF stylesheet (`window.print`) and formatted plain-text clipboard export

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/moonshine-capital/capital-operator.git
cd capital-operator

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The app will be accessible at `http://localhost:3000`.

### Building for Production

```bash
# Run type checks and build static assets
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Key Directories

```text
capital-operator/
├── src/
│   ├── components/       # UI modules (Diagnostic, Architecture Map, Results, PrintView)
│   ├── config/           # Centralized CTAs, questions, tools, and segment definitions
│   ├── lib/              # Recommendation and diagnostic scoring engine
│   ├── types.ts          # Complete TypeScript domain contracts
│   └── App.tsx           # Primary application orchestration
├── public/               # Static assets, robots.txt, sitemap, webmanifest
└── .github/              # CI/CD workflows and PR templates
```

---

## 📄 License & Terms

Licensed under the Apache-2.0 License. See [LICENSE](LICENSE) for details.
Diagnostic recommendations are for operational planning purposes and do not constitute credit commitments or legal underwriting advice.
