# Project Memory

- [2026-01-31 20:10:53] The codebase relies on the `packageManager` field in `package.json` as the single source of truth for tool versions to ensure consistency between local development and CI/CD pipelines.
- [2026-02-01 15:57:20] Forward motion in the game world is defined along the negative Z-axis.
- [2026-02-02 07:24:02] Parenting the camera directly to the player mesh simplifies follow-camera logic and ensures consistent perspective by leveraging automatic scene graph transform inheritance.
- [2026-02-02 09:15:00] When creating relative rotation quaternions from 2D input, use Euler order 'YXZ' (Yaw then Pitch) to prevent pitch input from inducing unwanted roll artifacts during turns.
- [2026-02-02 21:32:28] Centralize all tunable game parameters, including camera properties, input sensitivity, and entity constants, within the `GameConfig` object in `src/config.ts` to maintain a single source of truth for game balance.
- Using 'as const' on global configuration objects in TypeScript provides strict type-level immutability and ensures that the compiler catches any accidental modifications to game parameters. [Tuesday, February 3, 2026 at 06:30:00 PM PST]
