import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { CombatSystem } from './CombatSystem';
import { state, initGame } from './state';

describe('CombatSystem', () => {
  let hudScene: THREE.Scene;
  let camera: THREE.Camera;
  let combatSystem: CombatSystem;

  beforeEach(() => {
    initGame();
    hudScene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();
    combatSystem = new CombatSystem(hudScene, camera);
    vi.clearAllMocks();
  });

  it('spawns lasers when firing and cooldown is 0', () => {
    const input = { x: 0, y: 0, isFiring: true };
    combatSystem.update(0.01, input);

    expect(state.lasers.length).toBeGreaterThanOrEqual(2);
    expect(hudScene.children.length).toBeGreaterThanOrEqual(2);
  });

  it('respects firing cooldown', () => {
    const input = { x: 0, y: 0, isFiring: true };
    combatSystem.update(0.01, input); // First shot
    const initialLaserCount = state.lasers.length;
    expect(initialLaserCount).toBeGreaterThanOrEqual(2);
    
    combatSystem.update(0.01, input); // Should not fire again
    expect(state.lasers.length).toBe(initialLaserCount);
    
    // fireCooldown is now 0.15 - 0.01 = 0.14
    combatSystem.update(0.1, input); // fireCooldown becomes 0.04. Should not fire.
    expect(state.lasers.length).toBe(0); // Old ones expired (0.01 + 0.1 + 0.01 = 0.12 > 0.1)
    
    combatSystem.update(0.05, input); // fireCooldown becomes -0.01. Should fire.
    expect(state.lasers.length).toBeGreaterThanOrEqual(2);
  });

  it('updates and removes expired lasers', () => {
    const input = { x: 0, y: 0, isFiring: true };
    combatSystem.update(0.01, input);
    
    const initialCount = state.lasers.length;
    expect(initialCount).toBeGreaterThan(0);

    // Update with a large deltaTime to expire lasers
    combatSystem.update(1.0, { x: 0, y: 0, isFiring: false });
    
    expect(state.lasers.length).toBe(0);
    expect(hudScene.children.length).toBe(0);
  });

  it('detects hits and updates score', () => {
    // We need a TIE fighter in front of the camera
    state.tieFighters[0].position.set(0, 0, -50);
    
    // input pointing directly at it (0,0 in NDC)
    const input = { x: 0, y: 0, isFiring: true };
    
    const initialScore = state.score;
    combatSystem.update(0.01, input);
    
    expect(state.tieFighters[0].isExploded).toBe(true);
    expect(state.score).toBeGreaterThan(initialScore);
  });
});
