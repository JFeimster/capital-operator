# Frontend QA & Test Checklist — Capital Operator

## Validation Matrix
1. **Hash Routing**: Navigation transitions cleanly between `#home`, `#how-it-works`, `#for-advisors`, `#capital-stack`, `#assessment`, `#blueprint`, `#tools`, `#resources`, `#about`, `#privacy`, and `#terms`.
2. **State Persistence**: In-progress answers and completed blueprints remain cached in `localStorage` across page refreshes.
3. **Assessment Engine**: Completing 12 questions triggers deterministic score generation, maps operating stage correctly, and displays the full blueprint.
4. **PDF Generation**: Clicking "Download as PDF" in the blueprint results view calls `window.print()` and cleanly renders `PrintView.tsx` with all interactive chrome suppressed.
5. **Accessibility**: All interactive buttons feature visible focus rings, aria-labels where icons are standalone, and meet WCAG AA contrast standards.
