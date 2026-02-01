// @vitest-environment happy-dom
import { expect, test, describe, beforeEach, vi } from 'vitest'
import { setupInput } from './input'
import { state, initGame } from './state'

describe('Input Handling', () => {
  beforeEach(() => {
    initGame();
    // Reset window dimensions
    vi.stubGlobal('innerWidth', 1000);
    vi.stubGlobal('innerHeight', 1000);
    // Clear event listeners? Not easy in standard DOM, but we can re-setup
    setupInput();
  })

  test('mousemove updates targetInput (center)', () => {
    const event = new MouseEvent('mousemove', {
      clientX: 500,
      clientY: 500
    });
    window.dispatchEvent(event);
    
    expect(state.targetInput.x).toBeCloseTo(0);
    expect(state.targetInput.y).toBeCloseTo(0);
  })

  test('mousemove updates targetInput (top-left)', () => {
    const event = new MouseEvent('mousemove', {
      clientX: 0,
      clientY: 0
    });
    window.dispatchEvent(event);
    
    expect(state.targetInput.x).toBe(-1);
    expect(state.targetInput.y).toBe(1); // Y is inverted in screen space vs game space (up is positive Y)
  })

  test('mousemove updates targetInput (bottom-right)', () => {
    const event = new MouseEvent('mousemove', {
      clientX: 1000,
      clientY: 1000
    });
    window.dispatchEvent(event);
    
    expect(state.targetInput.x).toBe(1);
    expect(state.targetInput.y).toBe(-1);
  })
});
