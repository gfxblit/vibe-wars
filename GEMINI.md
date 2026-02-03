# Project Memory

- [2026-01-31 20:10:53] The codebase relies on the `packageManager` field in `package.json` as the single source of truth for tool versions to ensure consistency between local development and CI/CD pipelines.
- [2026-02-01 15:57:20] Forward motion in the game world is defined along the negative Z-axis.
- [2026-02-01 16:23:02] The CI deployment step must explicitly exclude the `dist-new` directory from the cleanup process to prevent build artifacts from being deleted before they are deployed.- [2026-02-01 16:37:41] Using a `BufferGeometry` with a `Points` material for the star field provides an efficient way to render thousands of stars in a single draw call.
- [2026-02-01 16:57:19] Disabling frustum culling on the `StarField` entity's `Points` object prevents the entire star field from disappearing when the camera moves or rotates, ensuring the wrapping stars remain visible.
- [2026-02-01 17:13:57] Setting the base path to './' in `vite.config.ts` ensures that built assets use relative paths, allowing the application to load correctly in subdirectory-based deployment environments like PR previews.
- [2026-02-01 17:58:11] The `InputManager` requires an explicit `teardown()` call in tests to remove global event listeners and ensure test isolation.
- [2026-02-01 18:16:02] Centralizing viewport dimensions and center coordinates in the global state ensures consistent input-to-world mapping and rendering across the application.
- [2026-02-01 18:58:00] Applying the player's rotation to the camera's offset vector ensures the camera maintains a consistent third-person perspective during continuous turning.
- [2026-02-01 19:34:27] Separate visual-only transformations like banking from the primary orientation quaternion to ensure that local-axis turning remains stable and decoupled from visual effects.
- [2026-02-01 19:46:36] Transforming the local rotation axes by the visual bank quaternion before applying yaw and pitch rotations enables arcade-style flight mechanics where the turn direction follows the ship's roll.
- [2026-02-02 07:24:02] Parenting the camera directly to the player mesh simplifies follow-camera logic and ensures consistent perspective by leveraging automatic scene graph transform inheritance.
- [2026-02-02 09:15:00] When creating relative rotation quaternions from 2D input, use Euler order 'YXZ' (Yaw then Pitch) to prevent pitch input from inducing unwanted roll artifacts during turns.
- [2026-02-02 21:31:16] Implement relative touch input by anchoring the initial touch position and normalizing displacement against a fixed radius to provide intuitive mobile controls and consistent sensitivity across different screen sizes.
- [2026-02-02 21:32:28] Centralize all tunable game parameters, including camera properties, input sensitivity, and entity constants, within the `GameConfig` object in `src/config.ts` to maintain a single source of truth for game balance.
- [2026-02-03 06:18:12] Unify input clamping after all coordinate transformations to ensure consistent normalized bounds across different control modes.
- [2026-02-03 06:22:10] Apply `as const` to the `GameConfig` object in `src/config.ts` to enforce type-level immutability and prevent accidental modifications of game parameters.