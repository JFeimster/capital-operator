# Document Intelligence Foundation

## Status
**SPECIFIED / FOUNDATION IMPLEMENTED — Batch B**

Capital Operator now defines provider-agnostic contracts for document classification, parsing, extraction normalization, synthesis, confidence, provenance, and human review.

No paid OCR/document provider is enabled by this repository.

### Implemented
- `server/documents/types.ts` — classifier/parser/synthesizer interfaces and normalized models.
- `server/documents/normalizer.ts` — deterministic confidence normalization and review flags.
- `src/schemas/document-extraction.schema.json` — portable extraction contract.

### Provider status
- Heron — **SPECIFIED**
- Ocrolus — **SPECIFIED**
- Validis — **SPECIFIED**

Adapters may be added later only when a provider is actually selected/configured. Missing providers do not block the platform.

## Required flow

Document → provider classifier/parser → normalized extraction → deterministic validation → optional AI synthesis → human review.

AI synthesis must not overwrite source facts, invent missing financial values, or convert low-confidence extraction into verified data.
