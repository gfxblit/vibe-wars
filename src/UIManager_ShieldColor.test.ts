import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { UIManager } from './UIManager';
import { state } from './state';
import { GameConfig } from './config';

describe('UIManager Shield Color', () => {
  let uiManager: UIManager;

  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
    // Reset state to full shields
    state.shields = GameConfig.player.maxShields;
    state.score = 0;
    state.wave = 1;
    state.stage = 'DOGFIGHT';

    uiManager = new UIManager();
  });

  afterEach(() => {
    uiManager.destroy();
    vi.restoreAllMocks();
  });

  it('should update shield bar color based on health percentage', () => {
    // Initial state: Full health -> Green
    uiManager.update(state);
    const shieldBar = document.getElementById('shield-bar');
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(true);
    expect(shieldBar?.classList.contains('bg-vector-yellow')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-red')).toBe(false);

    // Damage to 50% (3 shields) -> Should be Yellow
    state.shields = 3;
    uiManager.update(state);
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-yellow')).toBe(true);
    expect(shieldBar?.classList.contains('bg-vector-red')).toBe(false);

    // Damage to 16% (1 shield) -> Should be Red
    state.shields = 1;
    uiManager.update(state);
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-yellow')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-red')).toBe(true);

    // Heal back to full -> Green
    state.shields = 6;
    uiManager.update(state);
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(true);
    expect(shieldBar?.classList.contains('bg-vector-yellow')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-red')).toBe(false);
  });
});
