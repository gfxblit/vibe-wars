import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { CombatSystem } from './CombatSystem';
import { state, initGame } from './state';
import * as StateModule from './state';

vi.mock('./state', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./state')>();
  return {
    ...actual,
    spawnLasers: vi.fn(actual.spawnLasers),
  };
});

describe('CombatSystem', () => {
  let hudScene: THREE.Scene;
  let scene: THREE.Scene;
  let camera: THREE.Camera;
  let combatSystem: CombatSystem;

  beforeEach(() => {
    initGame();
    hudScene = new THREE.Scene();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();
    combatSystem = new CombatSystem(hudScene, camera);
    vi.clearAllMocks();
  });

  it('spawns lasers when firing and cooldown is 0', () => {
    const input = { x: 0, y: 0, isFiring: true };
    combatSystem.update(0.01, input, scene);

    expect(StateModule.spawnLasers).toHaveBeenCalled();
    expect(state.lasers.length).toBeGreaterThanOrEqual(2);
  });

  it('respects firing cooldown using spy', () => {
    const input = { x: 0, y: 0, isFiring: true };
    
    // First shot
    combatSystem.update(0.01, input, scene);
    expect(StateModule.spawnLasers).toHaveBeenCalledTimes(1);
    
    // Should not fire again immediately
    combatSystem.update(0.01, input, scene);
    expect(StateModule.spawnLasers).toHaveBeenCalledTimes(1);
    
    // Wait for cooldown (GameConfig.laser.cooldown is 0.15)
    combatSystem.update(0.1, input, scene); // total elapsed since first shot: 0.11. Cooldown remaining: 0.04
    expect(StateModule.spawnLasers).toHaveBeenCalledTimes(1);
    
    combatSystem.update(0.05, input, scene); // total elapsed: 0.16. Should fire.
    expect(StateModule.spawnLasers).toHaveBeenCalledTimes(2);
  });

  it('updates and removes expired lasers', () => {
    const input = { x: 0, y: 0, isFiring: true };
    combatSystem.update(0.01, input, scene);
    
    const initialCount = state.lasers.length;
    expect(initialCount).toBeGreaterThan(0);

    // Update with a large deltaTime to expire lasers
    combatSystem.update(1.0, { x: 0, y: 0, isFiring: false }, scene);
    
    expect(state.lasers.length).toBe(0);
    expect(hudScene.children.length).toBe(0);
  });

  it('detects hits and updates score', () => {
    // We need a TIE fighter in front of the camera
    state.tieFighters[0].position.set(0, 0, -50);
    
    // input pointing directly at it (0,0 in NDC)
    const input = { x: 0, y: 0, isFiring: true };
    
    const initialScore = state.score;
    combatSystem.update(0.01, input, scene);
    
    expect(state.tieFighters[0].isExploded).toBe(true);
    expect(state.score).toBeGreaterThan(initialScore);
  });
});