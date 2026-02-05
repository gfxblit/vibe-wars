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
    
    // Mock document.body.requestPointerLock
    document.body.requestPointerLock = vi.fn();
    // Mock document.exitPointerLock
    document.exitPointerLock = vi.fn();
    // Mock document.pointerLockElement
    Object.defineProperty(document, 'pointerLockElement', {
      value: null,
      writable: true
    });

    vi.spyOn(window, 'addEventListener').mockImplementation((event, listener) => {
        listeners[event] = listener;
    });
    vi.spyOn(document, 'addEventListener').mockImplementation((event, listener) => {
        listeners[event] = listener;
    });
    vi.spyOn(document.body, 'addEventListener').mockImplementation((event, listener) => {
        listeners[event] = listener;
    });
    
    vi.spyOn(window, 'removeEventListener');
    vi.spyOn(document, 'removeEventListener');
    vi.spyOn(document.body, 'removeEventListener');

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

  it('requests pointer lock on click', () => {
    // Determine where the click listener is attached. Plan says "document.body".
    if (listeners['click']) {
      listeners['click'](new MouseEvent('click'));
      expect(document.body.requestPointerLock).toHaveBeenCalled();
    } else {
      expect(listeners['click']).toBeDefined(); 
    }
  });

  it('does not accumulate movement when not locked', () => {
    // Simulate mouse move
    const moveEvent = new MouseEvent('mousemove', {
      movementX: 10,
      movementY: 10,
    } as any);
    
    if (listeners['mousemove']) {
      listeners['mousemove'](moveEvent);
    }
    
    // Should stay 0 because not locked
    expect(inputManager.getInput().x).toBe(0);
    expect(inputManager.getInput().y).toBe(0);
  });

  it('accumulates movement when locked', () => {
    // Mock locked state
    Object.defineProperty(document, 'pointerLockElement', { value: document.body });
    
    const moveEvent = new MouseEvent('mousemove');
    Object.defineProperty(moveEvent, 'movementX', { value: 50 });
    Object.defineProperty(moveEvent, 'movementY', { value: 50 });
    
    if (listeners['mousemove']) {
      listeners['mousemove'](moveEvent);
    }
    
    inputManager.update(0); // Sync virtualCursor to input
    
    const input = inputManager.getInput();
    expect(input.x).toBeGreaterThan(0);
    expect(input.y).not.toBe(0); 
  });

  it('clamps values to [-1, 1]', () => {
    Object.defineProperty(document, 'pointerLockElement', { value: document.body });
    
    const moveEvent = new MouseEvent('mousemove');
    Object.defineProperty(moveEvent, 'movementX', { value: 10000 });
    Object.defineProperty(moveEvent, 'movementY', { value: 10000 });
    
    if (listeners['mousemove']) {
      listeners['mousemove'](moveEvent);
    }
    
    inputManager.update(0); // Sync virtualCursor to input
    
    const input = inputManager.getInput();
    expect(input.x).toBe(1);
    expect(Math.abs(input.y)).toBe(1); 
  });

  it('handles zero viewport dimensions gracefully', () => {
    state.viewport.width = 0;
    state.viewport.height = 0;
    
    Object.defineProperty(document, 'pointerLockElement', { value: document.body });
    
    const moveEvent = new MouseEvent('mousemove');
    Object.defineProperty(moveEvent, 'movementX', { value: 10 });
    Object.defineProperty(moveEvent, 'movementY', { value: 10 });
    
    if (listeners['mousemove']) {
      listeners['mousemove'](moveEvent);
    }
    
    inputManager.update(0);
    expect(inputManager.getInput().x).toBe(0);
    expect(inputManager.getInput().y).toBe(0);
  });

  it('does NOT respond to keyboard', () => {
    const keyEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
    if (listeners['keydown']) {
      listeners['keydown'](keyEvent);
    }
    inputManager.update(1.0);
    expect(inputManager.getInput().x).toBe(0);
  });

  describe('Touch Input', () => {
    it('sets input based on touch displacement', () => {
      const touchStartEvent = {
        touches: [{ clientX: 500, clientY: 500 }],
        preventDefault: vi.fn(),
        cancelable: true
      };
      
      if (listeners['touchstart']) {
        listeners['touchstart'](touchStartEvent);
      }

      const touchMoveEvent = {
        touches: [{ clientX: 550, clientY: 450 }],
        preventDefault: vi.fn(),
        cancelable: true
      };

      if (listeners['touchmove']) {
        listeners['touchmove'](touchMoveEvent);
      }

      inputManager.update(0);
      const input = inputManager.getInput();
      
      // touchRadius is 100. dx = 50, dy = 50. x = 0.5, y = 0.5
      expect(input.x).toBe(0.5);
      expect(input.y).toBe(0.5);
      expect(touchMoveEvent.preventDefault).toHaveBeenCalled();
    });

    it('resets input on touch end', () => {
        const touchStartEvent = {
          touches: [{ clientX: 500, clientY: 500 }],
          preventDefault: vi.fn()
        };
        listeners['touchstart'](touchStartEvent);
        listeners['touchmove']({ touches: [{ clientX: 600, clientY: 400 }], preventDefault: vi.fn() });
        
        inputManager.update(0);
        expect(inputManager.getInput().x).toBe(1);

        if (listeners['touchend']) {
            listeners['touchend'](new Event('touchend'));
        }
        
        inputManager.update(0);
        expect(inputManager.getInput().x).toBe(0);
        expect(inputManager.getInput().y).toBe(0);
    });

    it('resets useRelativeInput when mouse is used after touch', () => {
      // 1. Trigger touch
      if (listeners['touchstart']) {
        listeners['touchstart']({ touches: [{ clientX: 500, clientY: 500 }], preventDefault: vi.fn() });
      }            
      
      // 2. Mock locked state for mouse
      Object.defineProperty(document, 'pointerLockElement', { value: document.body });
      
      // 3. Move mouse
      const moveEvent = new MouseEvent('mousemove');
      Object.defineProperty(moveEvent, 'movementX', { value: 10 });
      Object.defineProperty(moveEvent, 'movementY', { value: 0 });
      
      if (listeners['mousemove']) {
        listeners['mousemove'](moveEvent);
      }
      
      // 4. Trigger mouseup
      if (listeners['mouseup']) {
        listeners['mouseup'](new MouseEvent('mouseup'));
      }
      
      // If useRelativeInput was NOT reset, virtualCursor would be (0,0) now.
          inputManager.update(0);
          expect(inputManager.getInput().x).toBeGreaterThan(0);
        });
      
        describe('isInteractionActive', () => {
          it('returns false when no interaction is occurring', () => {
            expect(inputManager.isInteractionActive()).toBe(false);
          });
      
          it('returns true when pointer is locked', () => {
            Object.defineProperty(document, 'pointerLockElement', { value: document.body });
            expect(inputManager.isInteractionActive()).toBe(true);
          });
      
          it('returns true when touch drag is in progress', () => {
            if (listeners['touchstart']) {
              listeners['touchstart']({ touches: [{ clientX: 500, clientY: 500 }], preventDefault: vi.fn() });
            }
            expect(inputManager.isInteractionActive()).toBe(true);
            
            if (listeners['touchend']) {
              listeners['touchend'](new Event('touchend'));
            }
            expect(inputManager.isInteractionActive()).toBe(false);
          });
        });
      });});