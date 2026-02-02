# Project Memory

- [2026-01-31 20:10:53] The codebase relies on the `packageManager` field in `package.json` as the single source of truth for tool versions to ensure consistency between local development and CI/CD pipelines.
- [2026-02-01 16:23:02] The CI deployment step must explicitly exclude the `dist-new` directory from the cleanup process to prevent build artifacts from being deleted before they are deployed.
