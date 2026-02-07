import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { initGame, state, updateState } from './state';
import { UIManager } from './UIManager';
import { GameConfig } from './config';

describe('Damage FX Integration', () => {
  let uiManager: UIManager;

  beforeEach(() => {
    document.body.innerHTML = '';
    uiManager = new UIManager();
    initGame();
  });

  afterEach(() => {
    uiManager.destroy();
  });

  it('should trigger damage FX when player takes damage from fireball', () => {
    // Initial update to sync lastShields
    uiManager.update(state);
    
    const overlay = document.getElementById('damage-overlay');
    const shieldBar = document.getElementById('shield-bar');
    
    expect(overlay?.classList.contains('animate-damage-flash')).toBe(false);
    expect(shieldBar?.classList.contains('animate-shield-impact')).toBe(false);

    // Spawn a fireball
    let fb = null;
    for (let i = 0; i < 100 && !fb; i++) {
      const { newFireballs } = updateState(0.1);
      if (newFireballs.length > 0) fb = newFireballs[0];
    }
    
    expect(fb).toBeDefined();
    
    // Teleport fireball to player to cause collision
    fb!.position.copy(state.player!.position);

    // Update state to process collision
    updateState(0.01);
    
    expect(state.shields).toBeLessThan(GameConfig.player.maxShields);

    // Update UI
    uiManager.update(state);

    expect(overlay?.classList.contains('animate-damage-flash')).toBe(true);
    expect(shieldBar?.classList.contains('animate-shield-impact')).toBe(true);
  });
});
