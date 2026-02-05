import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { initGame, state, spawnLasers } from './state';

describe('Laser Integration', () => {
  beforeEach(() => {
    initGame();
  });

  it('adds lasers to state when spawned', () => {
    const camera = new THREE.PerspectiveCamera();
    const input = { x: 0, y: 0, isFiring: true };
    
    const newLasers = spawnLasers(camera, input);
    expect(newLasers.length).toBe(4);
    expect(state.lasers.length).toBe(4);
  });

  it('removes lasers when they expire', () => {
    const camera = new THREE.PerspectiveCamera();
    const input = { x: 0, y: 0, isFiring: true };
    
    spawnLasers(camera, input);
    expect(state.lasers.length).toBe(4);
    
    // Simulate update loop logic from main.ts
    const deltaTime = 2.1; // More than lifetime
    for (let i = state.lasers.length - 1; i >= 0; i--) {
        const laser = state.lasers[i];
        laser.update(deltaTime);
        if (laser.isExpired()) {
            state.lasers.splice(i, 1);
        }
    }
    
    expect(state.lasers.length).toBe(0);
  });
});
