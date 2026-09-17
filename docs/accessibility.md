# Accessibility (a11y) Guidelines

## WCAG AA Standards Compliance
1. **Color Contrast**:
   - Primary text (`slate-100`, `slate-50`) against dark backgrounds (`#07090d`, `#0f1722`) exceeds the required 4.5:1 ratio.
   - Status badges use high-contrast backgrounds with explicit border separation.
2. **Keyboard Navigation**:
   - All diagnostic option cards and interactive buttons are accessible via `Tab` and triggerable with `Enter` or `Space`.
   - Focus indicators use visible emerald/cyan rings (`focus:ring-2 focus:ring-emerald-400`).
3. **Screen Readers**:
   - ARIA labels added to icon-only buttons.
   - Form inputs include matching `id` and descriptive label elements.
