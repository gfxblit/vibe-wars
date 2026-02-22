import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InputManager } from './input';
import { state } from './state';

function createMouseEvent(type: string, init: MouseEventInit = {}, target: EventTarget = document.body) {
    // Automatically set buttons bitmask if button is provided
    if (init.button !== undefined && init.buttons === undefined) {
        if (type === 'mousedown') {
            if (init.button === 0) init.buttons = 1;
            else if (init.button === 1) init.buttons = 4;
            else if (init.button === 2) init.buttons = 2;
        } else if (type === 'mouseup') {
            init.buttons = 0; // Default to no buttons remaining
        }
    } else if (init.buttons === undefined && type === 'mousedown') {
        init.buttons = 1; // Default to Left button for mousedown
    } else if (init.buttons === undefined && type === 'mouseup') {
        init.buttons = 0; // Default to no buttons for mouseup
    }
    
    const event = new MouseEvent(type, init);
    Object.defineProperty(event, 'target', { value: target, configurable: true });
    // JSDOM might not correctly initialize buttons via constructor, so we ensure it here
    if (init.buttons !== undefined) {
        Object.defineProperty(event, 'buttons', { value: init.buttons, configurable: true });
    }
    return event;
}

describe('InputManager', () => {
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

  it('initializes with zero input', () => {
    expect(inputManager.getInput()).toEqual({ x: 0, y: 0, isFiring: false });
  });

  it('reports isFiring when space is pressed', () => {
    const event = new KeyboardEvent('keydown', { code: 'Space' });
    listeners['keydown'](event);
    expect(inputManager.getInput().isFiring).toBe(true);

    const upEvent = new KeyboardEvent('keyup', { code: 'Space' });
    listeners['keyup'](upEvent);
    expect(inputManager.getInput().isFiring).toBe(false);
  });

  it('responds to ArrowLeft keydown', () => {
    const event = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
    listeners['keydown'](event);
    inputManager.update(1.0);
    expect(inputManager.getInput().x).toBe(-1);
  });
  
  it('responds to ArrowRight keydown', () => {
    const event = new KeyboardEvent('keydown', { code: 'ArrowRight' });
    listeners['keydown'](event);
    inputManager.update(1.0);
    expect(inputManager.getInput().x).toBe(1);
  });

  it('resets x when key is released', () => {
      const downEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
      listeners['keydown'](downEvent);
      inputManager.update(1.0);
      expect(inputManager.getInput().x).toBe(-1);
      
      const upEvent = new KeyboardEvent('keyup', { code: 'ArrowLeft' });
      listeners['keyup'](upEvent);
      inputManager.update(1.0);
      expect(inputManager.getInput().x).toBe(0);
  });

  it('handles simultaneous opposite keys (left then right)', () => {
      listeners['keydown'](new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
      listeners['keydown'](new KeyboardEvent('keydown', { code: 'ArrowRight' }));
      inputManager.update(1.0);
      // x = (right ? 1 : 0) - (left ? 1 : 0) -> 0
      expect(inputManager.getInput().x).toBe(0); 
  });

  it('responds to WASD keys', () => {
    listeners['keydown'](new KeyboardEvent('keydown', { code: 'KeyW' }));
    inputManager.update(1.0);
    expect(inputManager.getInput().y).toBe(1);
    
    listeners['keydown'](new KeyboardEvent('keydown', { code: 'KeyS' }));
    inputManager.update(1.0);
    // Up (1) and Down (-1) -> 0
    expect(inputManager.getInput().y).toBe(0);

    listeners['keyup'](new KeyboardEvent('keyup', { code: 'KeyW' }));
    inputManager.update(1.0);
    expect(inputManager.getInput().y).toBe(-1);
  });

  it('decays back to zero when keys are released', () => {
    listeners['keydown'](new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    inputManager.update(1.0); // Assume it reaches -1 in 1 second or less
    
    listeners['keyup'](new KeyboardEvent('keyup', { code: 'ArrowLeft' }));
    // After release, it should still be near -1 but moving towards 0
    inputManager.update(0.1);
    expect(inputManager.getInput().x).toBeGreaterThan(-1);
    expect(inputManager.getInput().x).toBeLessThan(0);
  });

  it('responds to mouse movement when dragging', () => {
    // Mouse down on document body (not UI)
    listeners['mousedown'](createMouseEvent('mousedown'));
    
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    inputManager.update(0);
    
    expect(inputManager.getInput().x).toBe(-1);
    expect(inputManager.getInput().y).toBe(1);

    // Mouse move to center
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 500, clientY: 500 }));
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(0);
    expect(inputManager.getInput().y).toBe(0);
  });

  it('resets to zero when mouse is released', () => {
    listeners['mousedown'](createMouseEvent('mousedown'));
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(-1);

    listeners['mouseup'](new MouseEvent('mouseup'));
    inputManager.update(0.1);
    // Vector magnitude decay:
    // Initial: (-1, 1), Length: sqrt(2)
    // Step: 0.2 (2.0 speed * 0.1s)
    // New Length: sqrt(2) - 0.2
    // New X: -1 * (sqrt(2) - 0.2) / sqrt(2) = -0.8585...
    expect(inputManager.getInput().x).toBeCloseTo(-0.858578);

    inputManager.update(1.0); // Should definitely be zero now
    expect(inputManager.getInput().x).toBe(0);
  });

  it('responds to touch movement', () => {
    // Touch start at (500, 500)
    const touch0 = { identifier: 0, clientX: 500, clientY: 500, target: document.body };
    const touchStartEvent = {
        touches: [touch0],
        changedTouches: [touch0],
        target: document.body,
        preventDefault: vi.fn()
    };
    listeners['touchstart'](touchStartEvent);
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(0);
    expect(inputManager.getInput().y).toBe(0);

    // Touch move to (600, 400)
    const touch0Moved = { identifier: 0, clientX: 600, clientY: 400, target: document.body };
    const touchMoveEvent = {
        touches: [touch0Moved],
        changedTouches: [touch0Moved],
        preventDefault: vi.fn()
    };
    listeners['touchmove'](touchMoveEvent);
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(1);
    expect(inputManager.getInput().y).toBe(1);
    expect(touchMoveEvent.preventDefault).toHaveBeenCalled();

    // Touch end
    listeners['touchend']({
        touches: [],
        changedTouches: [touch0Moved],
        target: document.body
    });
    inputManager.update(0.1);
    // Vector magnitude decay:
    // Initial: (1, 1), Length: sqrt(2)
    // Step: 0.2 (2.0 speed * 0.1s)
    // New Length: sqrt(2) - 0.2
    // New X/Y: 1 * (sqrt(2) - 0.2) / sqrt(2) = 0.8585...
    expect(inputManager.getInput().x).toBeCloseTo(0.858578);
    expect(inputManager.getInput().y).toBeCloseTo(0.858578);

    inputManager.update(1.0);
    expect(inputManager.getInput().x).toBe(0);
    expect(inputManager.getInput().y).toBe(0);
  });

  it('resets dragging state on touchcancel', () => {
    vi.stubGlobal('innerWidth', 1000);
    vi.stubGlobal('innerHeight', 1000);

    const touch0 = { identifier: 0, clientX: 500, clientY: 500, target: document.body };
    const touchStartEvent = {
        touches: [touch0],
        changedTouches: [touch0],
        target: document.body,
        preventDefault: vi.fn()
    };
    listeners['touchstart'](touchStartEvent);
    
    const touch0Moved = { identifier: 0, clientX: 600, clientY: 400, target: document.body };
    const touchMoveEvent = {
        touches: [touch0Moved],
        changedTouches: [touch0Moved],
        preventDefault: vi.fn()
    };
    listeners['touchmove'](touchMoveEvent);
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(1);

    // Touch cancel
    const cancelEvent = {
        touches: [],
        changedTouches: [touch0Moved],
        target: document.body
    };
    listeners['touchcancel'](cancelEvent);
    
    // Should decay now
    inputManager.update(0.1);
    expect(inputManager.getInput().x).toBeCloseTo(0.858578);
  });

  it('updates target input based on state.viewport after resize', () => {
    state.viewport.width = 2000;
    state.viewport.height = 2000;
    state.viewport.centerX = 1000;
    state.viewport.centerY = 1000;
    
    listeners['mousedown'](createMouseEvent('mousedown'));
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 500, clientY: 500 }));
    inputManager.update(0);
    
    expect(inputManager.getInput().x).toBe(-0.5);
    expect(inputManager.getInput().y).toBe(0.5);
  });

  it('merges keyboard and mouse input', () => {
    listeners['keydown'](new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    inputManager.update(1.0);
    
    listeners['mousedown'](createMouseEvent('mousedown'));
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 750, clientY: 500 }));
    inputManager.update(0.01);

    // -1 (keyboard) + 0.5 (mouse) = -0.5
    expect(inputManager.getInput().x).toBe(-0.5);
  });

  it('maintains keyboard turn while mouse is moving', () => {
     // Keyboard Left (-1, 0)
     listeners['keydown'](new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
     inputManager.update(1.0);
     
     // Mouse click at center (0, 0)
     listeners['mousedown'](createMouseEvent('mousedown'));
     listeners['mousemove'](new MouseEvent('mousemove', { clientX: 500, clientY: 500 }));
     
     inputManager.update(0.01);

     // Should still be -1
     expect(inputManager.getInput().x).toBe(-1);
  });

  it('returns to center in a straight line during decay', () => {
    listeners['mousedown'](createMouseEvent('mousedown'));
    // Set an off-axis position: x=0.8, y=0.4 (Ratio 2:1)
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 900, clientY: 300 }));
    inputManager.update(0);
    expect(inputManager.getInput().x).toBeCloseTo(0.8);
    expect(inputManager.getInput().y).toBeCloseTo(0.4);

    listeners['mouseup'](new MouseEvent('mouseup'));
    // Small decay step
    inputManager.update(0.1);
    const pos = inputManager.getInput();
    
    // Verify it's still moving in the same direction (ratio 2:1)
    // (pos.x / pos.y) should be exactly 2.0 if it's a straight line
    expect(pos.x / pos.y).toBeCloseTo(2.0);
    
    // Verify it has moved towards zero
    expect(pos.x).toBeLessThan(0.8);
    expect(pos.y).toBeLessThan(0.4);
  });
  it('reports isFiring when mouse is down', () => {
    listeners['mousedown'](createMouseEvent('mousedown'));
    expect(inputManager.getInput().isFiring).toBe(true);

    listeners['mouseup'](new MouseEvent('mouseup'));
    expect(inputManager.getInput().isFiring).toBe(false);
  });

  it('updates input coordinates but not isFiring when right-clicked and dragged', () => {
    // Right mouse down (button 2)
    const downEvent = createMouseEvent('mousedown', { button: 2 });
    listeners['mousedown'](downEvent);
    
    expect(inputManager.getInput().isFiring).toBe(false);

    // Move mouse while right-clicking
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    inputManager.update(0);
    
    expect(inputManager.getInput().x).toBe(-1);
    expect(inputManager.getInput().y).toBe(1);
    expect(inputManager.getInput().isFiring).toBe(false);

    // Mouse up
    const upEvent = createMouseEvent('mouseup', { button: 2 });
    listeners['mouseup'](upEvent);
    
    // Should start decaying
    inputManager.update(0.1);
    expect(inputManager.getInput().x).toBeGreaterThan(-1);
  });

  it('reports isFiring only when touch is on fire button', () => {
    // Touch on body should NOT fire
    const touch0 = { identifier: 0, clientX: 500, clientY: 500, target: document.body };
    const bodyTouch = {
        touches: [touch0],
        changedTouches: [touch0],
        target: document.body,
        preventDefault: vi.fn()
    };
    listeners['touchstart'](bodyTouch);
    expect(inputManager.getInput().isFiring).toBe(false);

    // Touch on fire button SHOULD fire
    const touch1 = { identifier: 1, clientX: 900, clientY: 900, target: fireButton };
    const buttonTouch = {
        touches: [touch0, touch1],
        changedTouches: [touch1],
        target: fireButton,
        preventDefault: vi.fn()
    };
    listeners['touchstart'](buttonTouch);
    expect(inputManager.getInput().isFiring).toBe(true);
    expect(buttonTouch.preventDefault).toHaveBeenCalled();

    listeners['touchend']({
        touches: [touch0],
        changedTouches: [touch1],
        target: fireButton
    });
    expect(inputManager.getInput().isFiring).toBe(false);
  });

  it('ignores clicks on other UI elements', () => {
    const pauseButton = document.createElement('button');
    document.body.appendChild(pauseButton);

    const event = createMouseEvent('mousedown');
    Object.defineProperty(event, 'target', { value: pauseButton });
    listeners['mousedown'](event);

    expect(inputManager.getInput().isFiring).toBe(false);
    
    // Check dragging state indirectly (update would change input if dragging)
    // If not dragging, update shouldn't move input if mouse moves
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(0);

    document.body.removeChild(pauseButton);
  });

  it('allows clicks on CANVAS element', () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    const event = createMouseEvent('mousedown');
    Object.defineProperty(event, 'target', { value: canvas });
    listeners['mousedown'](event);

    expect(inputManager.getInput().isFiring).toBe(true);

    // Should also trigger dragging
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(-1);

    document.body.removeChild(canvas);
  });

  it('should continue tracking right drag after left click release (Issue 156)', () => {
    // 1. Right-click and hold (button 2, buttons bitmask 2)
    const rightDown = createMouseEvent('mousedown', { button: 2 });
    Object.defineProperty(rightDown, 'buttons', { value: 2 });
    listeners['mousedown'](rightDown);
    
    // 2. Move mouse to (0, 0) -> should be (-1, 1)
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(-1);
    expect(inputManager.getInput().y).toBe(1);
    expect(inputManager.getInput().isFiring).toBe(false);

    // 3. Left-click while right-click is still down (button 0, buttons bitmask 1 + 2 = 3)
    const leftDown = createMouseEvent('mousedown', { button: 0 });
    Object.defineProperty(leftDown, 'buttons', { value: 3 });
    listeners['mousedown'](leftDown);
    expect(inputManager.getInput().isFiring).toBe(true);
    expect(inputManager.getInput().x).toBe(-1);

    // 4. Release left-click (button 0, buttons bitmask remains 2)
    const leftUp = createMouseEvent('mouseup', { button: 0 });
    Object.defineProperty(leftUp, 'buttons', { value: 2 });
    listeners['mouseup'](leftUp);
    expect(inputManager.getInput().isFiring).toBe(false);

    // We expect it to STAY at (-1, 1) because right button (2) is still down.
    inputManager.update(0.1);
    expect(inputManager.getInput().x).toBe(-1);
    expect(inputManager.getInput().y).toBe(1);

    // 5. Move mouse again while right-dragging
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 1000, clientY: 1000 }));
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(1);
    expect(inputManager.getInput().y).toBe(-1);

    // 6. Release right-click (button 2, buttons bitmask becomes 0)
    const rightUp = createMouseEvent('mouseup', { button: 2 });
    Object.defineProperty(rightUp, 'buttons', { value: 0 });
    listeners['mouseup'](rightUp);
    
    // Now it should decay
    inputManager.update(0.1);
    expect(Math.abs(inputManager.getInput().x)).toBeLessThan(1);
  });

  it('should continue firing if middle click is still held after left click release', () => {
    // 1. Left-click (button 0, buttons bitmask 1)
    const leftDown = createMouseEvent('mousedown', { button: 0 });
    Object.defineProperty(leftDown, 'buttons', { value: 1 });
    listeners['mousedown'](leftDown);
    expect(inputManager.getInput().isFiring).toBe(true);

    // 2. Middle-click (button 1, buttons bitmask 1 | 4 = 5)
    // Note: event.button for middle click is 1, but bitmask is 4.
    const middleDown = createMouseEvent('mousedown', { button: 1 });
    Object.defineProperty(middleDown, 'buttons', { value: 5 });
    listeners['mousedown'](middleDown);
    expect(inputManager.getInput().isFiring).toBe(true);

    // 3. Release left-click (button 0, buttons bitmask becomes 4)
    const leftUp = createMouseEvent('mouseup', { button: 0 });
    Object.defineProperty(leftUp, 'buttons', { value: 4 });
    listeners['mouseup'](leftUp);

    // SHOULD still be firing because middle button is still down
    expect(inputManager.getInput().isFiring).toBe(true);

    // 4. Release middle-click (button 1, buttons bitmask becomes 0)
    const middleUp = createMouseEvent('mouseup', { button: 1 });
    Object.defineProperty(middleUp, 'buttons', { value: 0 });
    listeners['mouseup'](middleUp);
    expect(inputManager.getInput().isFiring).toBe(false);
  });

  it('should continue firing if Space is still held after left click release', () => {
    // 1. Press Space
    listeners['keydown'](new KeyboardEvent('keydown', { code: 'Space' }));
    expect(inputManager.getInput().isFiring).toBe(true);

    // 2. Left-click
    const leftDown = createMouseEvent('mousedown', { button: 0 });
    listeners['mousedown'](leftDown);
    expect(inputManager.getInput().isFiring).toBe(true);

    // 3. Release left-click
    const leftUp = createMouseEvent('mouseup', { button: 0 });
    listeners['mouseup'](leftUp);

    // SHOULD still be firing because Space is still down
    expect(inputManager.getInput().isFiring).toBe(true);

    // 4. Release Space
    listeners['keyup'](new KeyboardEvent('keyup', { code: 'Space' }));
    expect(inputManager.getInput().isFiring).toBe(false);
  });

  it('should continue firing if middle click is still held after touch release', () => {
    // 1. Touch fire button
    const touchStart = new TouchEvent('touchstart', {
      changedTouches: [new Touch({ identifier: 1, target: fireButton })],
      bubbles: true,
      cancelable: true
    });
    listeners['touchstart'](touchStart);
    expect(inputManager.getInput().isFiring).toBe(true);

    // 2. Middle-click
    const middleDown = createMouseEvent('mousedown', { button: 1 });
    listeners['mousedown'](middleDown);
    expect(inputManager.getInput().isFiring).toBe(true);

    // 3. Release touch
    const touchEnd = new TouchEvent('touchend', {
      changedTouches: [new Touch({ identifier: 1, target: fireButton })],
      bubbles: true,
      cancelable: true
    });
    listeners['touchend'](touchEnd);

    // SHOULD still be firing because middle button is still down
    expect(inputManager.getInput().isFiring).toBe(true);

    // 4. Release middle-click
    const middleUp = createMouseEvent('mouseup', { button: 1 });
    listeners['mouseup'](middleUp);
    expect(inputManager.getInput().isFiring).toBe(false);
  });
});
