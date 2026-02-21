import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { EntityManager } from './EntityManager';
import { Tower } from './Tower';
import { Targetable } from './Entity';
import { state } from '../state';
import * as THREE from 'three';

// Subclass to force firing
class AlwaysFiringTower extends Tower {
  constructor() {
    super(new THREE.Vector3(0, 0, 0));
  }
  update() {
    return new THREE.Vector3(0, 0, 1);
  }
}

// Subclass for non-Tower target
class MockTarget implements Targetable {
  position = new THREE.Vector3();
  isExploded = false;
  getWorldPosition(target: THREE.Vector3) { return target.copy(this.position); }
  getScore() { return 10; }
  explode() {}
  update() { return new THREE.Vector3(0, 0, 1); } // Fires
  getFireballSize() { return 10; }
  getFireballSpeed() { return 10; }
}

describe('EntityManager Tower Debug Overrides', () => {
  let entityManager: EntityManager;
  let scene: THREE.Scene;
  let hudScene: THREE.Scene;

  beforeEach(() => {
    scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    entityManager = new EntityManager(scene, hudScene);
  });

  afterEach(() => {
    state.debugSurfaceFireballSize = undefined;
    state.debugSurfaceFireballSpeed = undefined;
    vi.restoreAllMocks();
  });

  it('should apply debugSurfaceFireballSize when spawning fireball from Tower', () => {
    const tower = new AlwaysFiringTower();
    entityManager.addTarget(tower);
    
    // Set debug override
    state.debugSurfaceFireballSize = 50;

    // Spy on spawnFireball
    const spawnSpy = vi.spyOn(entityManager, 'spawnFireball');

    // Run update to trigger firing
    entityManager.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), false, new THREE.PerspectiveCamera(), 10);

    // Verify spawnFireball was called with override
    expect(spawnSpy).toHaveBeenCalled();
    const args = spawnSpy.mock.calls[0];
    // args: [position, velocity, size]
    expect(args[2]).toBe(50);
  });

  it('should apply debugSurfaceFireballSpeed when spawning fireball from Tower', () => {
    const tower = new AlwaysFiringTower();
    entityManager.addTarget(tower);
    
    // Set debug override
    state.debugSurfaceFireballSpeed = 100; // High speed

    // Spy on spawnFireball
    const spawnSpy = vi.spyOn(entityManager, 'spawnFireball');

    // Run update
    entityManager.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), false, new THREE.PerspectiveCamera(), 10);

    // Check velocity magnitude? 
    // Velocity is (playerVelocity + relativeVelocity)
    // We need to calculate expected velocity to be sure, or just check that it's different from default.
    // Easier: checking logic inside EntityManager requires seeing the result.
    // But spawnFireball receives the final velocity.
    
    // Let's rely on checking that the speed calculation used the override.
    // Default speed is much lower (e.g. 60).
    // If we set it to 1000, velocity length should be high.
    
    expect(spawnSpy).toHaveBeenCalled();
    const velocity = spawnSpy.mock.calls[0][1] as THREE.Vector3;
    
    // playerVelocity is forward * speed (0,0,-1 * 10 = 0,0,-10)
    // fireDirection is 0,0,1
    // relativeVelocity = 0,0,1 * 100 = 0,0,100
    // total = 0,0,90
    // If default speed (60), total = 0,0,50
    
    // With 100 speed:
    // We can't easily assert exact value without reproducing logic, but we can verify it's NOT the default.
    // playerVelocity (0,0,-10) + relativeVelocity (0,0,100) = (0,0,90)
    expect(velocity.z).toBe(90);
  });

  it('should NOT apply debugSurfaceFireballSize for non-Tower targets', () => {
    const target = new MockTarget();
    entityManager.addTarget(target);

    state.debugSurfaceFireballSize = 50;
    
    const spawnSpy = vi.spyOn(entityManager, 'spawnFireball');

    entityManager.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), false, new THREE.PerspectiveCamera(), 10);

    expect(spawnSpy).toHaveBeenCalled();
    const args = spawnSpy.mock.calls[0];
    expect(args[2]).toBe(10); // Should be the target's own size (10), not 50
  });
});
