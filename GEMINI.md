# Project Memory

- [2026-01-31 20:10:53] The codebase relies on the `packageManager` field in `package.json` as the single source of truth for tool versions to ensure consistency between local development and CI/CD pipelines.
- [2026-02-01 15:57:20] Forward motion in the game world is defined along the negative Z-axis.
- [2026-02-01 16:23:02] The CI deployment step must explicitly exclude the `dist-new` directory from the cleanup process to prevent build artifacts from being deleted before they are deployed.- [2026-02-01 16:37:41] Using a `BufferGeometry` with a `Points` material for the star field provides an efficient way to render thousands of stars in a single draw call.
- [2026-02-01 16:57:19] Disabling frustum culling on the `StarField` entity's `Points` object prevents the entire star field from disappearing when the camera moves or rotates, ensuring the wrapping stars remain visible.
- [2026-02-01 17:13:57] Setting the base path to './' in `vite.config.ts` ensures that built assets use relative paths, allowing the application to load correctly in subdirectory-based deployment environments like PR previews.
- [2026-02-01 17:58:11] The `InputManager` requires an explicit `teardown()` call in tests to remove global event listeners and ensure test isolation.
- [2026-02-01 18:16:02] Centralizing viewport dimensions and center coordinates in the global state ensures consistent input-to-world mapping and rendering across the application.
- [2026-02-01 18:58:00] Applying the player's rotation to the camera's offset vector ensures the camera maintains a consistent third-person perspective during continuous turning.
