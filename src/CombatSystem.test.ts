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
  let camera: THREE.Camera;
  let combatSystem: CombatSystem;

  beforeEach(() => {
    const scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    camera = new THREE.PerspectiveCamera();
    combatSystem = new CombatSystem(camera);
    vi.clearAllMocks();
  });

  it('spawns lasers when firing and cooldown is 0', () => {
    const input = { x: 0, y: 0, isFiring: true };
    combatSystem.update(0.01, input);

    expect(StateModule.spawnLasers).toHaveBeenCalled();
    expect(state.entityManager!.getLasers().length).toBeGreaterThanOrEqual(2);
  });

  it('respects firing cooldown using spy', () => {
    const input = { x: 0, y: 0, isFiring: true };

    // First shot
    combatSystem.update(0.01, input);
    expect(StateModule.spawnLasers).toHaveBeenCalledTimes(1);

    // Should not fire again immediately
    combatSystem.update(0.01, input);
    expect(StateModule.spawnLasers).toHaveBeenCalledTimes(1);

    // Wait for cooldown (GameConfig.laser.cooldown is 0.15)
    combatSystem.update(0.1, input); // total elapsed since first shot: 0.11. Cooldown remaining: 0.04
    expect(StateModule.spawnLasers).toHaveBeenCalledTimes(1);

    combatSystem.update(0.05, input); // total elapsed: 0.16. Should fire.
    expect(StateModule.spawnLasers).toHaveBeenCalledTimes(2);
  });

  it('updates and removes expired lasers', () => {
    const input = { x: 0, y: 0, isFiring: true };
    combatSystem.update(0.01, input);

    const initialCount = state.entityManager!.getLasers().length;
    expect(initialCount).toBeGreaterThan(0);

    // Update via EntityManager to expire lasers
    state.entityManager!.update(2.1, new THREE.Vector3(), new THREE.Quaternion(), true, () => { });

    expect(state.entityManager!.getLasers().length).toBe(0);
    expect(hudScene.children.length).toBe(0);
  });

  it('detects hits and updates score', () => {
    // We need a TIE fighter in front of the camera
    const tf = state.entityManager!.getTieFighters()[0];
    tf.position.set(0, 0, -50);

    // input pointing directly at it (0,0 in NDC)
    const input = { x: 0, y: 0, isFiring: true };

    const initialScore = state.score;
    combatSystem.update(0.01, input);

    expect(tf.isExploded).toBe(true);
    expect(state.score).toBeGreaterThan(initialScore);
  });
});
