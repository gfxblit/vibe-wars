import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { initGame, state, updateState, spawnFireball } from './state';
import { UIManager } from './UIManager';
import { GameConfig } from './config';

describe('Damage FX Integration', () => {
  let uiManager: UIManager;
  let worldScene: THREE.Scene;
  let hudScene: THREE.Scene;

  beforeEach(() => {
    document.body.innerHTML = '';
    uiManager = new UIManager();
    worldScene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(worldScene, hudScene);
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

    // Force spawn a fireball using public API
    const fireball = spawnFireball(
      new THREE.Vector3(0, 0, -10),
      new THREE.Vector3(0, 0, 10)
    );
    
    expect(fireball).not.toBeNull();
    
    // Teleport fireball to near camera to cause collision (Hit Screen)
    // Use origin-based camera for simplicity
    const camera = new THREE.PerspectiveCamera();
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();

    // Start outside threshold (now 2.0) and move through it
    fireball!.position.set(0, 0, -5.0);
    fireball!.velocity.set(0, 0, 80);

    // Update state to process collision
    updateState(0.1, camera);
    
    expect(state.shields).toBeLessThan(GameConfig.player.maxShields);

    // Update UI
    uiManager.update(state);

    expect(overlay?.classList.contains('animate-damage-flash')).toBe(true);
    expect(shieldBar?.classList.contains('animate-shield-impact')).toBe(true);
  });
});