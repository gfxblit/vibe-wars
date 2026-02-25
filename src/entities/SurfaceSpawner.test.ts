import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { SurfaceSpawner } from './SurfaceSpawner';
import { SurfaceObstacleFactory } from './SurfaceObstacleFactory';
import { EntityManager } from './EntityManager';
import { state } from '../state';

describe('SurfaceSpawner', () => {
  let spawner: SurfaceSpawner;
  let factory: SurfaceObstacleFactory;
  let entityManager: EntityManager;
  let scene: THREE.Group;

  beforeEach(() => {
    factory = new SurfaceObstacleFactory();
    entityManager = {
      addTarget: vi.fn(),
      removeTarget: vi.fn(),
    } as any;
    scene = new THREE.Group();
    spawner = new SurfaceSpawner(scene, factory, entityManager);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should spawn obstacles over time', () => {
    const spawnSpy = vi.spyOn(factory, 'createRandom');
    
    // First update should spawn because nextObstacleSpawnTime starts at 0
    spawner.update(0.1, new THREE.Vector3(0, 0, 0));
    
    expect(spawnSpy).toHaveBeenCalled();
    expect(scene.children.length).toBe(1);
    expect(entityManager.addTarget).toHaveBeenCalled();
  });

  it('should remove distant obstacles', () => {
    // Force spawn
    spawner.update(0.1, new THREE.Vector3(0, 0, 0));
    expect(scene.children.length).toBe(1);
    
    // Move player far ahead (negative Z)
    // Obstacle is at approx -1000. Cleanup distance is 200.
    // If player is at -1300, obstacle is at -1000, dist = 300.
    // Wait, implementation: if (obstacle.mesh.position.z > playerZ + towerCleanupDistance)
    // If playerZ = -1300, distance = 200. -1000 > -1300 + 200? -1000 > -1100. Yes.
    
    spawner.update(0.1, new THREE.Vector3(0, 0, -1300));
    
    expect(scene.children.length).toBe(0);
    expect(entityManager.removeTarget).toHaveBeenCalled();
  });

  it('should detect obstacle collisions', () => {
    // Force spawn
    spawner.update(0.1, new THREE.Vector3(0, 0, 0));
    const obstacleMesh = scene.children[0] as THREE.Group;
    
    const playerBox = new THREE.Box3().setFromObject(obstacleMesh);
    
    const hit = spawner.checkCollisions(playerBox);
    expect(hit).not.toBeNull();
  });

  it('should dispose all obstacles', () => {
    spawner.update(0.1, new THREE.Vector3(0, 0, 0));
    expect(scene.children.length).toBe(1);
    
    spawner.dispose();
    expect(scene.children.length).toBe(0);
    expect(entityManager.removeTarget).toHaveBeenCalled();
  });

  it('should scale spawn interval with wave count', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    // Wave 1: base interval (1.5s)
    state.wave = 1;
    // first update spawns immediately
    spawner.update(0.1, new THREE.Vector3(0, 0, 0));
    expect(spawner.getObstacles().length).toBe(1);

    // second update at 1.4s (total 1.5s) should NOT spawn
    spawner.update(1.4, new THREE.Vector3(0, 0, 0));
    expect(spawner.getObstacles().length).toBe(1);
    
    // Total 1.7s should spawn
    spawner.update(0.2, new THREE.Vector3(0, 0, 0));
    expect(spawner.getObstacles().length).toBe(2);

    // Wave 10: multiplier 2.8, interval 1.5 / 2.8 ~= 0.536s
    state.wave = 10;
    spawner = new SurfaceSpawner(scene, factory, entityManager);
    spawner.update(0.1, new THREE.Vector3(0, 0, 0));
    expect(spawner.getObstacles().length).toBe(1);
    
    // next spawn at 0.1 + 0.536 = 0.636s.
    spawner.update(0.4, new THREE.Vector3(0, 0, 0)); // 0.5 total
    expect(spawner.getObstacles().length).toBe(1);
    
    spawner.update(0.2, new THREE.Vector3(0, 0, 0)); // 0.7 total
    expect(spawner.getObstacles().length).toBe(2);
  });
});
