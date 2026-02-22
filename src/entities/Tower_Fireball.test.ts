import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';
import { Tower } from './Tower';
import { EntityManager } from './EntityManager';
import { state } from '../state';

describe('Tower Fireball Configuration', () => {
  let tower: Tower;

  beforeEach(() => {
    tower = new Tower(new THREE.Vector3(0, 0, 0));
    // Reset state
    state.debugSurfaceFireballSize = undefined;
    state.debugSurfaceFireballSpeed = undefined;
  });

  afterEach(() => {
    tower.dispose();
  });

  it('should have getFireballSize method', () => {
    expect(tower.getFireballSize).toBeDefined();
  });

  it('should have getFireballSpeed method', () => {
    expect(tower.getFireballSpeed).toBeDefined();
  });

  it('getFireballSize should return default config value when debug is not set', () => {
    const size = tower.getFireballSize();
    expect(size).toBe(40.0);
  });

  it('getFireballSpeed should return default config value when debug is not set', () => {
    const speed = tower.getFireballSpeed();
    expect(speed).toBe(400.0);
  });

  it('getFireballSize should return default value even when debug is set', () => {
    state.debugSurfaceFireballSize = 50.0;
    const size = tower.getFireballSize();
    expect(size).toBe(40.0);
  });

  it('getFireballSpeed should return default value even when debug is set', () => {
    state.debugSurfaceFireballSpeed = 100.0;
    const speed = tower.getFireballSpeed();
    expect(speed).toBe(400.0);
  });
});

describe('EntityManager Fireball Speed', () => {
    it('spawnFireballFromTarget should use target fireball speed', () => {
        const scene = new THREE.Scene();
        const entityManager = new EntityManager(scene, scene);
        
        const target = {
            getWorldPosition: (v: THREE.Vector3) => v.set(0,0,0),
            getVelocity: (v: THREE.Vector3) => v.set(0,0,0),
            getFireballSpeed: vi.fn().mockReturnValue(100), // Custom speed
            isExploded: false,
            explode: () => {},
            getScore: () => 0,
            position: new THREE.Vector3(),
            update: vi.fn().mockReturnValue(new THREE.Vector3(0,0,1))
        };

        entityManager.addTarget(target as any);

        entityManager.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), false, new THREE.Camera(), 0);

        expect(target.getFireballSpeed).toHaveBeenCalled();
    });
});
