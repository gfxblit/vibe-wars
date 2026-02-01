// @vitest-environment happy-dom
import { expect, test, describe, beforeEach } from 'vitest'
import { setupInput } from './input'
import { state, initGame } from './state'

describe('Input Handling', () => {
  beforeEach(() => {
    initGame();
    setupInput();
  })

  test('keydown "w" sets targetInput.y to 1', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
    expect(state.targetInput.y).toBe(1);
  })

  test('keydown "s" sets targetInput.y to -1', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }));
    expect(state.targetInput.y).toBe(-1);
  })

  test('keydown "a" sets targetInput.x to -1', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(state.targetInput.x).toBe(-1);
  })

  test('keydown "d" sets targetInput.x to 1', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'd' }));
    expect(state.targetInput.x).toBe(1);
  })

  test('multiple keys update targetInput correctly', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(state.targetInput.x).toBe(-1);
    expect(state.targetInput.y).toBe(1);
  })

  test('keyup resets targetInput components', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'w' }));
    expect(state.targetInput.y).toBe(0);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    expect(state.targetInput.x).toBe(0);
  })

  test('opposing keys result in zero', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }));
    // Depending on implementation, it could be 0 (cancel out) or last one wins. 
    // Canceling out is usually better.
    expect(state.targetInput.y).toBe(0);
  })
});
