# QA & Testing Checklist

## Functional Scenarios
1. **New User Flow**: Landing on home screen -> Click "Run 3-Minute Diagnostic" -> Answer 12 steps -> See results.
2. **Multi-Select Constraints**:
   - Verify Q3 allows multiple selections.
   - Verify Q9 blocks selecting more than 3 breakdown points with clear feedback.
   - Verify Q10 blocks selecting more than 2 priorities.
3. **Step Navigation**:
   - Ensure "Back" button preserves previously selected answers.
   - Ensure browser refresh restores saved answers from `localStorage`.
4. **Export Mechanisms**:
   - Click "Copy Markdown Blueprint" -> Verify toast confirmation appears.
   - Click "Print PDF" -> Verify print stylesheet triggers without UI chrome.
