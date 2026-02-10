# Implementation Plan: Refactor StageManager

## Overview
Refactor the existing `StageManager.ts` by extracting the inner stage classes (`DogfightStage`, `SurfaceStage`, `TrenchStage`) into separate files within a new `src/stages/` directory. This improves code organization, maintainability, and reduces file size. Additionally, we will decouple the stages from the concrete `StageManager` class by passing the `THREE.Scene` directly where needed.

## Requirements
- Extract `Stage` interface to `src/stages/Stage.ts`
- Extract `DogfightStage` to `src/stages/DogfightStage.ts`
- Extract `SurfaceStage` to `src/stages/SurfaceStage.ts`
- Extract `TrenchStage` to `src/stages/TrenchStage.ts`
- Update `StageManager.ts` to import these classes.
- Remove dependency on `StageManager` instance in `SurfaceStage` and `TrenchStage` constructors; pass `worldScene` directly.
- Ensure all existing tests pass.

## Architecture Changes
- **New Directory:** `src/stages/`
- **New Files:**
  - `src/stages/Stage.ts`
  - `src/stages/DogfightStage.ts`
  - `src/stages/SurfaceStage.ts`
  - `src/stages/TrenchStage.ts`
- **Modified File:** `src/StageManager.ts` (Removes class definitions, updates imports and instantiation logic)

## Implementation Steps

### Phase 1: Preparation & Extraction
1. **Create Directory** (Command: `mkdir src/stages`)
   - Action: Create the folder.
   - Why: To house the new files.

2. **Extract Interface** (File: `src/stages/Stage.ts`)
   - Action: Create file with `Stage` interface.
   - Why: Common interface for all stages.

3. **Extract DogfightStage** (File: `src/stages/DogfightStage.ts`)
   - Action: Move `DogfightStage` class code. Update imports (`GameConfig`, `state`, `Player`, `goToNextStage`).
   - Why: Separation of concerns.

4. **Extract SurfaceStage** (File: `src/stages/SurfaceStage.ts`)
   - Action: Move `SurfaceStage` class code. 
   - Refactor: Update constructor to accept `scene: THREE.Scene` instead of `StageManager`.
   - Why: Separation and decoupling.

5. **Extract TrenchStage** (File: `src/stages/TrenchStage.ts`)
   - Action: Move `TrenchStage` class code.
   - Refactor: Update constructor to accept `scene: THREE.Scene` instead of `StageManager`.
   - Why: Separation and decoupling.

### Phase 2: Integration
6. **Update StageManager** (File: `src/StageManager.ts`)
   - Action: Remove extracted classes. Import them from `src/stages/`. Update `initStage` to pass `this.worldScene` to Surface and Trench stages.
   - Why: To use the new file structure.

## Testing Strategy
- **Unit Tests:** Run `vitest src/StageManager.test.ts` and `vitest src/StageTransition.test.ts`.
- **Verification:** Ensure no circular dependency warnings and that the game logic (stage transitions) remains identical.

## Risks & Mitigations
- **Risk:** Circular imports if `StageManager` is still referenced.
  - **Mitigation:** We are replacing `manager: StageManager` with `scene: THREE.Scene` in the stage constructors, removing the need for stages to import `StageManager`.
