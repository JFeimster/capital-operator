# Lead Capture Specification

## Payload Fields
- `firstName`: User's full name or first name (Required).
- `email`: Valid business or professional email (Required).
- `company`: Advisory firm, brokerage, or company name (Required).
- `role`: Role or operational title (Advisor, Broker, Operator, etc.).
- `phone`: Optional phone number for SMS dispatch.
- `operatingModel`: Computed operating model.
- `assessmentAnswers`: Full 12-question responses object.

## Client Validation
1. Empty name or company flags an inline validation badge.
2. Email is validated via regex format check before submission.
3. Successful submission transitions the form to a confirmed state with option to copy markdown or print immediately.
