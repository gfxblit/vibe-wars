import { describe, it, expect, beforeEach } from 'vitest';
import { initGame, state, spawnLasers } from './state';
import * as THREE from 'three';

describe('Laser Integration', () => {
  beforeEach(() => {
    initGame(new THREE.Scene(), new THREE.Scene());
  });

  it('adds lasers to state when spawned', () => {
    const input = { x: 0, y: 0, isFiring: true };
    const newLasers = spawnLasers(input);
    expect(newLasers.length).toBeGreaterThanOrEqual(2);
    expect(state.entityManager!.getLasers().length).toBeGreaterThanOrEqual(2);
  });

  it('removes lasers when they expire', () => {
    const input = { x: 0, y: 0, isFiring: true };
    spawnLasers(input);
    expect(state.entityManager!.getLasers().length).toBeGreaterThanOrEqual(2);
    
    // Use EntityManager to update and expire lasers
    state.entityManager!.update(2.1, new THREE.Vector3(), new THREE.Quaternion(), true, 'DOGFIGHT');
    
    expect(state.entityManager!.getLasers().length).toBe(0);
  });
});