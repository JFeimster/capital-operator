# Deployment Environments: Capital Operator

## Environment Tiers

### 1. Development Environment (Local & Container Sandbox)
- **Port**: 3000 (Mandatory container reverse proxy binding)
- **Host**: `0.0.0.0`
- **Execution Engine**: Vite + tsx (`npm run dev`)
- **HMR Policy**: Platform HMR disabled; refreshed at agent turn completion.

### 2. AI Studio Staging / Preview
- **URL**: `https://ais-dev-*.run.app`
- **Purpose**: Live interactive preview, client validation, responsive design verification.

### 3. Production Cloud Run / Web Distribution
- **Build Step**: `npm run build`
- **Artifacts**: Static client SPA bundle in `dist/` (or `dist/server.cjs` for full-stack configurations).
- **Target URL**: `capitaloperator.io` / `moonshinecapital.io`
