# Print & PDF Export Specification

## Print Styling Rules
When `window.print()` is called:
1. All screen-only controls, navigation bars, fixed floating footers, and buttons are hidden via `@media print { .no-print { display: none !important; } }`.
2. The print-only executive document (`src/components/PrintView.tsx`) renders with crisp black-and-white contrast (`#000` text on pure `#fff` paper).
3. Headers, section dividers, and page-break markers prevent orphan table rows across page boundaries.
4. Compliance disclaimers and Moonshine Capital partner attribution appear as a formal footer on each printed page.
