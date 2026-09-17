# Frontend Architecture — Capital Operator

## Overview
Capital Operator is built as a high-conviction client-side diagnostic application and marketing experience for Moonshine Capital.

## Key Architectural Principles
1. **Zero Database Dependency**: All diagnostic scoring, state persistence, and blueprint generation run strictly in the browser.
2. **Deterministic Evaluation**: The scoring matrix in `src/lib/recommendationEngine.ts` maps 12 operational inputs to an 8-stage operating blueprint and 4 maturity stages.
3. **Hash-Based Routing**: Clean client-side SPA routing (`#how-it-works`, `#assessment`, `#blueprint`) that works effortlessly across static hosting environments (GitHub Pages, Cloud Run, Vercel).
4. **Executive Print Mode**: Native CSS media queries (`print-only` and `no-print`) generate standardized 8.5x11 PDF executive memos directly from browser print.

## Directory Structure
- `src/config/`: Authoritative site configuration, questions matrix, audiences, CTA targets, and tools registry.
- `src/data/`: Structured JSON datasets powering capabilities, operating models, workflow stages, and ecosystem products.
- `src/components/layout/`: Modular layout components (`SiteShell`, `SiteHeader`, `SiteFooter`, `Container`, `Section`).
- `src/components/site/`: Atomized UI components (`Badge`, `StatCard`, `CommandPanel`, `CTAButton`, `SectionHeading`).
- `src/components/home/`: Interactive landing modules and capability matrices.
- `src/pages/`: Route-level views for every core marketing and functional journey.
- `src/styles/`: Centralized design tokens and responsive utility definitions.
