# Data Flow Map: Capital Operator

## End-to-End Data Pipeline

```
[Borrower / Partner]
        |
        v
1. INTAKE CAPTURE (Web / Tally / REST API)
        |  -> Attribution metadata tagged (partner_id, utm_source)
        v
2. LOCAL & IN-FLIGHT VALIDATION (TypeScript Client State / Node Middleware)
        |  -> Form 108 debt schedule checked
        v
3. DETERMINISTIC SCORING ENGINE (recommendationEngine.ts)
        |  -> 12-question diagnostic evaluated
        |  -> DSCR & Debt-Yield calculated
        v
4. BLUEPRINT SYNTHESIS
        |  -> 8-Stage scores generated
        |  -> Priority matrix & 30-day roadmap assembled
        v
5. SYNDICATE ROUTING & DATA ROOM PACKAGING
        |  -> Buy-box matching against 50+ debt funds
        |  -> Secure webhook dispatch to CRM / Make.com
        v
6. FUNDING & POST-CLOSE LIFECYCLE
        |  -> Automated retention & 90-day renewal check-ins
```
