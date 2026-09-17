# Tool Selection Logic

## Criteria for Tool Inclusion
Every tool in `src/config/tools.ts` is audited against four strict standards:
1. **Commercial Lending Relevance**: Must have demonstrated utility in business lending, debt advisory, or credit underwriting.
2. **API & Webhook Extensibility**: Must support Zapier, Make, direct webhooks, or native API sync to prevent closed data silos.
3. **Budget Flexibility**: Must offer reasonable entry-level tiers for single advisors before forcing enterprise commitments.
4. **Data Security**: Must comply with commercial data standards (SOC2, encrypted document storage).

## Stage-Based Matching
The matcher evaluates the user's monthly budget (Q11) and selected friction points (Q9). For low-budget operators, lightweight tools like Tally, Airtable, and Google Drive are prioritized. For high-volume teams, enterprise tools like Filevine, Heron Data, and dedicated LOS platforms are recommended.
