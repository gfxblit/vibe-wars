import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InputManager } from './input';
import { state } from './state';

function createMouseEvent(type: string, init: MouseEventInit = {}, target: EventTarget = document.body) {
    const event = new MouseEvent(type, init);
    Object.defineProperty(event, 'target', { value: target, configurable: true });
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
});
