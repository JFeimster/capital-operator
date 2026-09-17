# Release Process: Capital Operator

## Release Pipeline & Quality Gates

```
[Code Changes] -> [Linter: tsc --noEmit] -> [Build: vite build] -> [Preview Verification] -> [Deploy]
```

---

## Step-by-Step Quality Checklist
1. **TypeScript Verification**: Execute `npm run lint` (`tsc --noEmit`). Zero compile errors or missing types allowed.
2. **Build Verification**: Execute `npm run build`. Verify static assets compile to `dist/` within bundle size limits.
3. **Navigation & Route Integrity**: Confirm all hash routes (`#home`, `#assessment`, `#blueprint`, `#how-it-works`, `#tools`, `#resources`, `#docs`, `#for-advisors`, `#for-operators`, `#for-platforms`, `#for-partners`, `#capital-stack`, `#methodology`) resolve cleanly without 404s.
4. **Interactive Component Verification**:
   - Assessment 12 questions complete cleanly.
   - Calculators update in real-time.
   - Tally embeds load securely with valid form IDs.
5. **Print View Check**: Ensure `#blueprint` renders executive black-and-white view during `window.print()`.
