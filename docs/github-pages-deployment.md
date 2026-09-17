# GitHub Pages Deployment — Capital Operator

## Steps for Deployment
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. The `dist/` directory includes `public/404.html` and `public/.nojekyll` to handle client-side routing on GitHub Pages without server-side 404 errors.
3. Deploy the contents of `dist/` to the `gh-pages` branch or configure GitHub Actions to deploy from the root build artifact.
