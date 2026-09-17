# Agent Architecture: Capital Operator

## Autonomous AI Underwriting Agents
Capital Operator utilizes specialized autonomous agent archetypes to streamline human-in-the-loop commercial debt placement.

---

## Agent Roles & Boundaries

```
+----------------------------------------------------------+
|                 ORCHESTRATOR AGENT                       |
|  - Intake Routing                                        |
|  - Task Delegation                                       |
+------------+--------------------+--------------------+---+
             |                    |                    |
             v                    v                    v
+------------------+    +------------------+    +------------------+
| INTAKE PARSER    |    | BUY-BOX MATCHER  |    | MEMO SYNTHESIZER |
| - OCR Validation |    | - Rule Filtering |    | - Executive 2-pg |
| - NSF Counting   |    | - SLA Tracking   |    |   Memo Drafting  |
+------------------+    +------------------+    +------------------+
```

---

## Agent Execution Guidelines
1. **Intake Parser Agent**: Extracts tabular cash flows from bank PDFs. Flags irregularities (e.g., suspicious transfer spikes, undisclosed MCA debits).
2. **Buy-Box Matcher Agent**: Evaluates borrower attributes strictly against deterministic JSON rule-sets. Prevents blind submissions.
3. **Credit Memo Synthesizer Agent**: Structures normalized financial summaries into standardized 2-page credit memos.
4. **Strict Human Judgment Policy**: All AI Agent outputs must pass through human operator validation before formal transmission to credit committees.
