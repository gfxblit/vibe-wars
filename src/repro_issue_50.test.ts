import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InputManager } from './input';
import { state } from './state';

describe('InputManager Multi-touch Repro (Issue #50)', () => {
  let inputManager: InputManager;
  let listeners: Record<string, any> = {};
  let fireButton: HTMLButtonElement;

  beforeEach(() => {
    listeners = {};
    vi.stubGlobal('innerWidth', 1000);
    vi.stubGlobal('innerHeight', 1000);
    state.viewport.width = 1000;
    state.viewport.height = 1000;
    state.viewport.centerX = 500;
    state.viewport.centerY = 500;

    // Create fire button
    fireButton = document.createElement('button');
    fireButton.id = 'fire-button';
    document.body.appendChild(fireButton);
    
    vi.spyOn(window, 'addEventListener').mockImplementation((event, listener) => {
        listeners[event] = listener;
    });
    inputManager = new InputManager();
    inputManager.setup();
  });

  afterEach(() => {
      vi.restoreAllMocks();
      inputManager.teardown();
      if (document.body.contains(fireButton)) {
        document.body.removeChild(fireButton);
      }
  });

  it('calculates steering relative to the second touch when the first touch is on the fire button', () => {
    // 1. Touch Fire Button (Touch 0)
    const touch0 = { identifier: 0, clientX: 900, clientY: 900, target: fireButton };
    listeners['touchstart']({
        touches: [touch0],
        changedTouches: [touch0],
        target: fireButton,
        preventDefault: vi.fn()
    });
    
    expect(inputManager.getInput().isFiring).toBe(true);
    expect(inputManager.getInput().x).toBe(0);
    expect(inputManager.getInput().y).toBe(0);

    // 2. Touch Screen for steering (Touch 1)
    const touch1 = { identifier: 1, clientX: 500, clientY: 500, target: document.body };
    listeners['touchstart']({
        touches: [touch0, touch1],
        changedTouches: [touch1],
        target: document.body,
        preventDefault: vi.fn()
    });

    // Currently, InputManager might incorrectly use touch0 as anchor if it doesn't track identifiers
    // Or it might just not start dragging because it already thinks it's firing?
    // Let's see what happens.

    // 3. Move Touch 1
    const touch1Moved = { identifier: 1, clientX: 550, clientY: 450, target: document.body };
    listeners['touchmove']({
        touches: [touch0, touch1Moved],
        changedTouches: [touch1Moved],
        preventDefault: vi.fn()
    });

    inputManager.update(0);
    
    // Expected: relative to (500, 500), moved +50 in X, +50 in Y (inverted clientY)
    // dx = 550 - 500 = 50
    // dy = 500 - 450 = 50
    // touchRadius = 100
    // x = 50/100 = 0.5
    // y = 50/100 = 0.5
    
    const input = inputManager.getInput();
    expect(input.isFiring).toBe(true);
    
    // This is expected to FAIL with current implementation
    // Current implementation uses touches[0] (the fire button) as anchor if it started drag
    // OR it might use touches[0] in touchmove.
    expect(input.x).toBeCloseTo(0.5);
    expect(input.y).toBeCloseTo(0.5);
  });

  it('lifting fire button does not stop steering', () => {
    // 1. Touch Steering (Touch 0)
    const touch0 = { identifier: 0, clientX: 500, clientY: 500, target: document.body };
    listeners['touchstart']({
        touches: [touch0],
        changedTouches: [touch0],
        target: document.body,
        preventDefault: vi.fn()
    });

    // 2. Touch Fire (Touch 1)
    const touch1 = { identifier: 1, clientX: 900, clientY: 900, target: fireButton };
    listeners['touchstart']({
        touches: [touch0, touch1],
        changedTouches: [touch1],
        target: fireButton,
        preventDefault: vi.fn()
    });

    // 3. Move Steering (Touch 0)
    const touch0Moved = { identifier: 0, clientX: 550, clientY: 450, target: document.body };
    listeners['touchmove']({
        touches: [touch0Moved, touch1],
        changedTouches: [touch0Moved],
        preventDefault: vi.fn()
    });

    inputManager.update(0);
    expect(inputManager.getInput().x).toBeCloseTo(0.5);
    expect(inputManager.getInput().isFiring).toBe(true);

    // 4. Lift Fire (Touch 1)
    listeners['touchend']({
        touches: [touch0Moved],
        changedTouches: [touch1],
        target: fireButton,
        preventDefault: vi.fn()
    });

    inputManager.update(0);
    // Should still be steering
    expect(inputManager.getInput().x).toBeCloseTo(0.5);
    expect(inputManager.getInput().isFiring).toBe(false);
  });
});
