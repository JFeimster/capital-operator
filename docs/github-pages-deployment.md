# GitHub Pages Automated Deployment — Capital Operator

## Automated Workflow (.github/workflows/deploy.yml)

Capital Operator uses an automated GitHub Actions workflow to build and deploy the application to GitHub Pages whenever changes are pushed to `main`.

---

## 1. How the Workflow Operates
1. **Triggers**: On every push to the `main` branch or manual trigger (`workflow_dispatch`).
2. **Environment**: Sets `GITHUB_PAGES: 'true'` and `VITE_BASE_PATH: '/capital-operator/'`.
3. **Build**: Executes `npm ci` and `npm run build`, producing production-optimized static assets in `/dist`.
4. **SPA & Routing Assets**: Includes `.nojekyll` and `404.html` so hash-based routes (`#assessment`, `#blueprint`, `#docs`) load seamlessly without Jekyll filtering or server 404 errors.
5. **Deployment**: Uploads the `dist/` directory as an artifact and publishes it to `https://jfeimster.github.io/capital-operator/`.

---

## 2. GitHub Repository Configuration Checklist
1. Navigate to your GitHub repository: [JFeimster/capital-operator](https://github.com/JFeimster/capital-operator).
2. Go to **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment > Source**, ensure **GitHub Actions** is selected (do not select "Deploy from a branch").
4. Commit and push the `.github/workflows/deploy.yml` file to `main`.
5. Under the **Actions** tab on GitHub, you can watch the `Deploy to GitHub Pages` workflow run and complete.
