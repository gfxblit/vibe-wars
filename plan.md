# Implementation Plan: Replace Keyboard with Pointer Lock Mouse Control (Issue #30)

## Overview
This plan replaces the existing hybrid keyboard/drag-mouse control scheme with a dedicated "Virtual Joystick" mouse control using the Pointer Lock API. The keyboard steering will be removed entirely. The mouse will control a virtual cursor that determines the ship's turning direction.

## Requirements
- **Remove Keyboard Control:** Delete all WASD/Arrow key logic from `InputManager`.
- **Pointer Lock:** Implement the Pointer Lock API. Clicking the screen should capture the mouse.
- **Virtual Joystick:**
  - When locked, mouse movement deltas (`movementX`, `movementY`) accumulate into a virtual cursor position.
  - This position is clamped to the screen bounds (normalized -1 to 1).
  - The ship turns based on this normalized position (Center = 0 turn, Edge = Max turn).
- **Visual Feedback:** The DOM cursor must track this virtual position.

## Architecture Changes
- **`src/input.ts`**:
  - Remove `keyboardInput`, `keyboardTarget`, and key event listeners.
  - Add `virtualCursor` (Vector2) to track the accumulated mouse position.
  - Implement `requestPointerLock` on click.
  - Update `mousemove` to use `event.movementX` / `event.movementY` when locked.
  - Expose `isLocked` state if needed (or just rely on the `document.pointerLockElement`).
- **`src/main.ts`**:
  - Update the render loop to position the `#cursor` element based on `InputManager`'s normalized input vector.
  - Ensure the cursor is visible only when interaction is active (or always, depending on lock state).

## Implementation Steps

### Phase 1: InputManager Refactor
1. **Remove Keyboard Logic** (File: `src/input.ts`)
   - Action: Remove properties `keyboardInput`, `keyboardTarget`, `keys`.
   - Action: Remove `keydown`, `keyup` listeners and handlers.
   - Why: Requirement #1.
   - Risk: Low.

2. **Implement Pointer Lock & Delta Movement** (File: `src/input.ts`)
   - Action: Add `click` handler to `document.body` to call `requestPointerLock()`.
   - Action: Update `mousemove` to accumulate `movementX/movementY` into a normalized `virtualCursor` vector.
   - Action: Clamp `virtualCursor` values between -1 and 1.
   - Action: Update `getInput()` to return this `virtualCursor`.
   - Why: Requirement #2 and #3.
   - Risk: Medium (UX tuning for sensitivity).

3. **Update Tests** (File: `src/input.test.ts`)
   - Action: Remove keyboard tests.
   - Action: Add tests for `movementX/Y` accumulation and clamping.
   - Why: Ensure logic is correct and tests pass.

### Phase 2: Integration & Visuals
4. **Update Main Loop** (File: `src/main.ts`)
   - Action: Ensure cursor rendering uses the input vector correctly.
   - Action: Handle "Click to Start" overlay or hint if needed (implicit in "Click to lock").
   - Why: User needs visual feedback of their steering command.

## Testing Strategy
- **Unit Tests:** `src/input.test.ts` - Verify delta accumulation, clamping, and lack of keyboard response.
- **Manual Verification:**
  - Run the game.
  - Verify WASD keys do nothing.
  - Click to lock mouse.
  - Move mouse:
    - Cursor should move.
    - Cursor should stop at screen edges.
    - Ship should turn based on cursor distance from center.
  - Press ESC to unlock -> Mouse control should stop (or pause).

## Risks & Mitigations
- **Sensitivity:** Raw `movementX` can vary by browser/OS.
  - *Mitigation:* Use `GameConfig.input.sensitivity` to tune the delta multiplier.
- **Screen Resizing:** Normalized coordinates depend on screen aspect ratio/size?
  - *Mitigation:* We accumulate in "normalized" space or "pixel" space then normalize. Accumulating in pixel space (then dividing by viewport half-size) is usually robust. We will use `state.viewport` for normalization.
