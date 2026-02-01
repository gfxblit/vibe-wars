# Project Memory

- [2026-01-31 20:10:53] The codebase relies on the `packageManager` field in `package.json` as the single source of truth for tool versions to ensure consistency between local development and CI/CD pipelines.
- [2026-01-31 20:49:02] The movement system centralizes input processing and flight physics within the `state.ts` update loop, deriving player banking from horizontal velocity relative to a leading crosshair.
- [2026-01-31 20:58:03] Testing for entities and stubs avoids console output spying in favor of verifying object properties and state.
- [2026-01-31 21:13:41] The input system tracks active WASD keyboard states in a `Set` to update the `targetInput` vector, replacing the previous mouse-position-based approach.
