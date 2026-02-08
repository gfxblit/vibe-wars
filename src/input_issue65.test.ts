import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InputManager } from './input';
import { state } from './state';
import { GameConfig } from './config';

describe('InputManager (Issue #65: Tap and Drag Fire)', () => {
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
    vi.spyOn(window, 'removeEventListener');
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

  it('allows dragging from the fire button (Touch)', () => {
    // Touch start on fire button
    const touch = { identifier: 1, clientX: 500, clientY: 500, target: fireButton };
    const touchStartEvent = {
        touches: [touch],
        changedTouches: [touch],
        target: fireButton,
        preventDefault: vi.fn()
    };
    listeners['touchstart'](touchStartEvent);

    // Should be firing
    expect(inputManager.getInput().isFiring).toBe(true);

    // Move touch
    const touchMoved = { identifier: 1, clientX: 600, clientY: 400, target: fireButton }; // dx=100, dy=100
    const touchMoveEvent = {
        touches: [touchMoved],
        changedTouches: [touchMoved],
        preventDefault: vi.fn()
    };
    listeners['touchmove'](touchMoveEvent);
    inputManager.update(0);

    // Should be moving (relative input is used for touches)
    // 100 / touchRadius
    const expectedVal = 100 / GameConfig.input.touchRadius;
    expect(inputManager.getInput().x).toBeCloseTo(expectedVal);
    expect(inputManager.getInput().y).toBeCloseTo(expectedVal);
  });

  it('allows dragging from the fire button (Mouse)', () => {
    // Mouse down on fire button
    const event = new MouseEvent('mousedown', { clientX: 500, clientY: 500 });
    Object.defineProperty(event, 'target', { value: fireButton });
    listeners['mousedown'](event);

    // Should be firing
    expect(inputManager.getInput().isFiring).toBe(true);

    // Move mouse (Mouse uses absolute positioning by default in current impl, 
    // but let's see if we want to change that or just ensure it moves. 
    // Current implementation of updatePointerInput handles both.)
    
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 600, clientY: 400 }));
    inputManager.update(0);

    // Absolute positioning check:
    // x = (600 - 500) / 500 = 0.2
    // y = (500 - 400) / 500 = 0.2
    expect(inputManager.getInput().x).toBeCloseTo(0.2);
    expect(inputManager.getInput().y).toBeCloseTo(0.2);
  });

  it('allows second touch on canvas to hijack control from fire button', () => {
    // 1. Touch start on fire button
    const touch1 = { identifier: 1, clientX: 800, clientY: 800, target: fireButton };
    const touchStart1 = {
        touches: [touch1],
        changedTouches: [touch1],
        target: fireButton,
        preventDefault: vi.fn()
    };
    listeners['touchstart'](touchStart1);

    // Confirm initial state
    expect(inputManager.getInput().isFiring).toBe(true);
    
    // Move touch 1 slightly to confirm it has control
    const touch1Moved = { identifier: 1, clientX: 810, clientY: 790, target: fireButton };
    listeners['touchmove']({ touches: [touch1Moved], changedTouches: [touch1Moved], preventDefault: vi.fn() });
    inputManager.update(0);
    expect(inputManager.getInput().x).not.toBe(0);

    // 2. Touch start on canvas (HIJACK)
    const touch2 = { identifier: 2, clientX: 200, clientY: 200, target: document.body };
    const touchStart2 = {
        touches: [touch1Moved, touch2],
        changedTouches: [touch2],
        target: document.body,
        preventDefault: vi.fn()
    };
    listeners['touchstart'](touchStart2);

    // Touch 2 should now be the anchor. 
    // Input should be reset to 0 relative to new anchor until moved.
    // Or at least, the anchor should be reset.
    // Let's move touch 2 and see if it controls input.
    
    const touch2Moved = { identifier: 2, clientX: 300, clientY: 100, target: document.body }; // +100, +100
    const touchMove2 = {
        touches: [touch1Moved, touch2Moved],
        changedTouches: [touch2Moved],
        preventDefault: vi.fn()
    };
    listeners['touchmove'](touchMove2);
    inputManager.update(0);

    const expectedVal = 100 / GameConfig.input.touchRadius;
    expect(inputManager.getInput().x).toBeCloseTo(expectedVal);
    expect(inputManager.getInput().y).toBeCloseTo(expectedVal);
    
    // Verify touch 1 no longer controls input
    const touch1MovedAgain = { identifier: 1, clientX: 700, clientY: 700, target: fireButton }; // Big move
    const touchMove1 = {
        touches: [touch1MovedAgain, touch2Moved],
        changedTouches: [touch1MovedAgain],
        preventDefault: vi.fn()
    };
    listeners['touchmove'](touchMove1);
    inputManager.update(0);

    // Should still be based on touch 2's position
    expect(inputManager.getInput().x).toBeCloseTo(expectedVal);
  });

  it('maintains control with hijacked touch when fire button is released', () => {
     // 1. Touch start on fire button
     const touch1 = { identifier: 1, clientX: 800, clientY: 800, target: fireButton };
     listeners['touchstart']({ touches: [touch1], changedTouches: [touch1], target: fireButton, preventDefault: vi.fn() });

     // 2. Touch start on canvas (HIJACK)
     const touch2 = { identifier: 2, clientX: 200, clientY: 200, target: document.body };
     listeners['touchstart']({ touches: [touch1, touch2], changedTouches: [touch2], target: document.body, preventDefault: vi.fn() });

     // 3. Release fire button
     listeners['touchend']({ touches: [touch2], changedTouches: [touch1], target: fireButton });
     
     // Should still be firing? No, releasing fire button stops firing.
     expect(inputManager.getInput().isFiring).toBe(false);

     // But dragging should continue with touch 2
     const touch2Moved = { identifier: 2, clientX: 300, clientY: 100, target: document.body };
     listeners['touchmove']({ touches: [touch2Moved], changedTouches: [touch2Moved], preventDefault: vi.fn() });
     inputManager.update(0);

     const expectedVal = 100 / GameConfig.input.touchRadius;
     expect(inputManager.getInput().x).toBeCloseTo(expectedVal);
     expect(inputManager.getInput().y).toBeCloseTo(expectedVal);
  });

  it('allows canvas touch to hijack control from a mouse drag on the fire button', () => {
    // 1. Mouse down on fire button
    const event = new MouseEvent('mousedown', { clientX: 500, clientY: 500 });
    Object.defineProperty(event, 'target', { value: fireButton });
    listeners['mousedown'](event);

    // Should be firing
    expect(inputManager.getInput().isFiring).toBe(true);

    // 2. Touch start on canvas (HIJACK)
    const touch = { identifier: 1, clientX: 200, clientY: 200, target: document.body };
    const touchStart = {
        touches: [touch],
        changedTouches: [touch],
        target: document.body,
        preventDefault: vi.fn()
    };
    listeners['touchstart'](touchStart);

    // Touch should now be the anchor. Move it.
    const touchMoved = { identifier: 1, clientX: 300, clientY: 100, target: document.body }; // +100, +100
    listeners['touchmove']({ touches: [touchMoved], changedTouches: [touchMoved], preventDefault: vi.fn() });
    inputManager.update(0);

    const expectedVal = 100 / GameConfig.input.touchRadius;
    expect(inputManager.getInput().x).toBeCloseTo(expectedVal);
    expect(inputManager.getInput().y).toBeCloseTo(expectedVal);

    // Verify mouse no longer controls input
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 600, clientY: 400 }));
    inputManager.update(0);

    // Should still be based on touch's position
    expect(inputManager.getInput().x).toBeCloseTo(expectedVal);
  });
});
