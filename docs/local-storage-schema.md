# Local Storage Schema

## Key Namespace
All keys in client storage use the `capital_operator_` prefix:

| Storage Key | Type | Description |
| :--- | :--- | :--- |
| `capital_operator_assessment_answers` | `AssessmentAnswers` | User's active or completed 12 question choices |
| `capital_operator_cached_blueprint` | `BlueprintResult` | Most recently generated operational blueprint |
| `capital_operator_session_id` | `string (UUID)` | Anonymous session identifier for telemetry correlation |
| `capital_operator_lead_submitted` | `boolean` | Flag indicating whether user registered their email |
