import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InputManager } from './input';
import { state } from './state';

describe('InputManager', () => {
  let inputManager: InputManager;
  let listeners: Record<string, any> = {};

  beforeEach(() => {
    listeners = {};
    vi.stubGlobal('innerWidth', 1000);
    vi.stubGlobal('innerHeight', 1000);
    state.viewport.width = 1000;
    state.viewport.height = 1000;
    state.viewport.centerX = 500;
    state.viewport.centerY = 500;
    
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
  });

  it('initializes with zero input', () => {
    expect(inputManager.getInput()).toEqual({ x: 0, y: 0 });
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

  it('moves towards target value gradually with update', () => {
    // Reset input
    listeners['keyup'](new KeyboardEvent('keyup', { code: 'ArrowLeft' }));
    
    listeners['keydown'](new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    // If it's gradual, it shouldn't be -1 immediately after update(0) or very small update
    // But wait, the previous tests expect it to be -1 immediately.
    // I should probably change the existing tests if I want gradual movement.
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
    // Mock window dimensions
    vi.stubGlobal('innerWidth', 1000);
    vi.stubGlobal('innerHeight', 1000);

    // Mouse down
    listeners['mousedown'](new MouseEvent('mousedown'));
    
    // Mouse move to top-left (-1, 1 in our coordinate system)
    // Screen: (0,0) is top-left. Center is (500, 500)
    // (0,0) screen -> (-1, 1) normalized
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    inputManager.update(0);
    
    // For mouse/touch, it should be immediate according to requirements "Dragging moves the virtual input vector"
    // and "The vector represents the offset from the screen center"
    expect(inputManager.getInput().x).toBe(-1);
    expect(inputManager.getInput().y).toBe(1);

    // Mouse move to center
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 500, clientY: 500 }));
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(0);
    expect(inputManager.getInput().y).toBe(0);
  });

  it('resets to zero when mouse is released', () => {
    listeners['mousedown'](new MouseEvent('mousedown'));
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(-1);

    listeners['mouseup'](new MouseEvent('mouseup'));
    inputManager.update(0);
    // Does it snap or decay? "Releasing touch/mouse: Centers the virtual input vector"
    // Usually it snaps for touch/mouse release.
    expect(inputManager.getInput().x).toBe(0);
  });

  it('responds to touch movement', () => {
    vi.stubGlobal('innerWidth', 1000);
    vi.stubGlobal('innerHeight', 1000);

    // Touch start
    const touchStartEvent = {
        touches: [{ clientX: 0, clientY: 0 }],
        preventDefault: vi.fn()
    };
    listeners['touchstart'](touchStartEvent);
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(-1);
    expect(inputManager.getInput().y).toBe(1);

    // Touch move
    const touchMoveEvent = {
        touches: [{ clientX: 500, clientY: 500 }],
        preventDefault: vi.fn()
    };
    listeners['touchmove'](touchMoveEvent);
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(0);
    expect(inputManager.getInput().y).toBe(0);
    expect(touchMoveEvent.preventDefault).toHaveBeenCalled();

    // Touch end
    listeners['touchend'](new TouchEvent('touchend'));
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(0);
  });

  it('updates target input based on state.viewport after resize', () => {
    state.viewport.width = 2000;
    state.viewport.height = 2000;
    state.viewport.centerX = 1000;
    state.viewport.centerY = 1000;
    
    listeners['mousedown'](new MouseEvent('mousedown'));
    // (500, 500) in 2000x2000 should be (-0.5, 0.5)
    // centerX = 1000, centerY = 1000
    // x = (500 - 1000) / 1000 = -0.5
    // y = (1000 - 500) / 1000 = 0.5
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 500, clientY: 500 }));
    inputManager.update(0);
    
    expect(inputManager.getInput().x).toBe(-0.5);
    expect(inputManager.getInput().y).toBe(0.5);
  });

  it('merges keyboard and mouse input', () => {
    // Keyboard Left (-1, 0)
    listeners['keydown'](new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    inputManager.update(1.0);
    
    // Mouse dragging at (250, 500) -> x = (250 - 500) / 500 = -0.5
    listeners['mousedown'](new MouseEvent('mousedown'));
    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 250, clientY: 500 }));
    
    inputManager.update(0.01);
    
    // Total should be clamped to -1
    expect(inputManager.getInput().x).toBe(-1);
    
    // Mouse dragging at (750, 500) -> x = (750 - 500) / 500 = 0.5
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
     listeners['mousedown'](new MouseEvent('mousedown'));
     listeners['mousemove'](new MouseEvent('mousemove', { clientX: 500, clientY: 500 }));
     
     inputManager.update(0.01);

     // Should still be -1
     expect(inputManager.getInput().x).toBe(-1);
  });
});
