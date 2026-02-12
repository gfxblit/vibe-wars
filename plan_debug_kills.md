# Implementation Plan: Add Debug TIE Fighter Count

Add an option to the debug panel to specify the TIE fighter kill count required to transition from the DOGFIGHT stage to the SURFACE stage.

## Requirements
- Add a numeric input "KILLS TO ADVANCE" to the debug panel (visible only when `state.debug` is true).
- The stage transition logic in `DogfightStage` should respect this custom threshold if set.
- Maintain the default threshold from `GameConfig` if no debug override is provided.

## Architecture Changes
- `src/state.ts`: Add `debugKillsThreshold?: number` to `GameState` interface and initialize it.
- `src/UIManager.ts`: Add a numeric input field to the debug panel to update `state.debugKillsThreshold`.
- `src/stages/DogfightStage.ts`: Update completion logic to use `state.debugKillsThreshold` if available.

## Implementation Steps

### Phase 1: State and Logic
1. **Update GameState** (File: `src/state.ts`)
   - Action: Add `debugKillsThreshold?: number` to `GameState` interface.
   - Action: Initialize `debugKillsThreshold` to `undefined` in `state` object and `initGame` function.
2. **Update DogfightStage** (File: `src/stages/DogfightStage.ts`)
   - Action: Modify the condition that triggers stage transition to use `state.debugKillsThreshold` if it's defined, otherwise use `GameConfig.stage.dogfightKillsThreshold`.

### Phase 2: UI Implementation
1. **Update UIManager** (File: `src/UIManager.ts`)
   - Action: In `createDebugPanel`, add a new `div` containing a label and a numeric input for "KILLS TO ADVANCE".
   - Action: Add an event listener to the input that updates `state.debugKillsThreshold`.

### Phase 3: Testing
1. **Add Unit Test for UI** (File: `src/ui.test.ts`)
   - Action: Verify that the debug panel contains the "KILLS TO ADVANCE" input and updates state.
2. **Add Integration Test for DogfightStage** (File: `src/stages/DogfightStage.test.ts`)
   - Action: Verify that setting `state.debugKillsThreshold` causes the stage to transition at the new threshold.

## Risks & Mitigations
- **Risk**: User enters non-numeric or negative values.
  - Mitigation: Use `<input type="number" min="0">` and use `parseInt` or `parseFloat` with a check for `isNaN`.
- **Risk**: Immediate transition if threshold is set lower than current kills.
  - Mitigation: The logic in `DogfightStage.update` should naturally handle this on the next frame.

## Success Criteria
- [ ] Debug panel shows "KILLS TO ADVANCE" input when `?debug=true` is in URL.
- [ ] Changing the input value updates `state.debugKillsThreshold`.
- [ ] `DogfightStage` transitions to `SurfaceStage` when kills reach `state.debugKillsThreshold`.
