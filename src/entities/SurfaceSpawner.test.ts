import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { SurfaceSpawner } from './SurfaceSpawner';
import { SurfaceObstacleFactory } from './SurfaceObstacleFactory';
import { EntityManager } from './EntityManager';

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
});
