# Testing Strategy: Capital Operator

## Testing Framework & Verification Layers

### 1. Static Type & Lint Testing
- **Tool**: TypeScript 5.x (`tsc --noEmit`)
- **Enforcement**: Strict null checks, complete enum mappings, and explicit interface typing on all props and state variables.

### 2. Deterministic Scoring Unit Verification
- Validate `src/lib/recommendationEngine.ts`:
  - Verify all 12 questions correctly contribute to stage scores.
  - Verify friction detection fires when suboptimal options are chosen.
  - Verify that answers persist and restore from `localStorage` seamlessly.

### 3. Responsive UI & Accessibility Testing
- Screen breakpoints: Mobile (`375px`), Tablet (`768px`), Desktop (`1280px`).
- Minimum touch target: `44px` on interactive controls.
- Color contrast: Pass WCAG AA standards (4.5:1 ratio for text against slate backgrounds).
- Print styles: `no-print` classes applied to navigation and action bars; `print-only` layout verified.
