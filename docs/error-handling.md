# Error Handling & Resilience Architecture

## Error Boundaries & Fallbacks
1. **Corrupted Local Storage**:
   - If `localStorage` JSON parsing fails, the storage helper logs a warning and returns `null`, resetting to clean initial state.
2. **Missing Question Answers**:
   - The diagnostic stepper disables the "Next" button until the required selection is made, preventing invalid or null state.
3. **Webhook Dispatch Failures**:
   - If a network error or CORS restriction blocks lead webhook delivery, the app displays a success fallback so the user is never blocked from seeing or exporting their blueprint.
4. **Clipboard Permissions**:
   - If `navigator.clipboard.writeText` is blocked by browser permissions, an error notice is provided advising the user to use Print/PDF export.
