// @vitest-environment happy-dom
import { expect, test, describe, beforeEach } from 'vitest'
import { setupInput } from './input'
import { state, initGame } from './state'

describe('Input Handling', () => {
  beforeEach(() => {
    initGame();
    setupInput();
  })

  test('keydown "KeyW" sets targetInput.y to 1', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));
    expect(state.targetInput.y).toBe(1);
  })

  test('keydown "KeyS" sets targetInput.y to -1', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyS' }));
    expect(state.targetInput.y).toBe(-1);
  })

  test('keydown "KeyA" sets targetInput.x to -1', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));
    expect(state.targetInput.x).toBe(-1);
  })

  test('keydown "KeyD" sets targetInput.x to 1', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyD' }));
    expect(state.targetInput.x).toBe(1);
  })

  test('multiple keys update targetInput correctly', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));
    expect(state.targetInput.x).toBe(-1);
    expect(state.targetInput.y).toBe(1);
  })

  test('keyup resets targetInput components', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));
    window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyW' }));
    expect(state.targetInput.y).toBe(0);

    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));
    window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyA' }));
    expect(state.targetInput.x).toBe(0);
  })

  test('opposing keys result in zero', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyS' }));
    expect(state.targetInput.y).toBe(0);
  })
});
