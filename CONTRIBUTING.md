# Contributing to Capital Operator

Thank you for your interest in contributing to **Capital Operator**! We welcome improvements to the diagnostic algorithms, styling, export capabilities, and partner infrastructure.

---

## Code of Conduct

All contributors and maintainers are expected to maintain professional, collaborative, and inclusive communication.

---

## Development Workflow

1. **Fork & Branch**: Create a feature branch from `main`:
   ```bash
   git checkout -b feat/add-crm-tool-integration
   ```

2. **Commit Conventions**: Use Conventional Commits:
   - `feat:` for new capabilities or diagnostic modules
   - `fix:` for bug fixes in the scoring engine or UI
   - `docs:` for documentation updates
   - `style:` for Tailwind token and aesthetic adjustments
   - `refactor:` for code restructuring without behavioral changes

3. **Verification**:
   - Run type checks: `npm run lint`
   - Test production compilation: `npm run build`

4. **Pull Requests**:
   - Fill out the PR template in `.github/pull_request_template.md`.
   - Ensure all automated CI checks pass.
   - Request review from a repository maintainer.
