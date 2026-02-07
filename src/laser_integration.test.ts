import { describe, it, expect, beforeEach } from 'vitest';
import { initGame, state, spawnLasers } from './state';

describe('Laser Integration', () => {
  beforeEach(() => {
    initGame();
  });

  it('adds lasers to state when spawned', () => {
    const input = { x: 0, y: 0, isFiring: true };
    const newLasers = spawnLasers(input);
    expect(newLasers.length).toBeGreaterThanOrEqual(2);
    expect(state.lasers.length).toBeGreaterThanOrEqual(2);
  });

  it('removes lasers when they expire', () => {
    const input = { x: 0, y: 0, isFiring: true };
    spawnLasers(input);
    expect(state.lasers.length).toBeGreaterThanOrEqual(2);
    
    // Simulate update loop logic from main.ts
    const deltaTime = 2.1; // More than enough to reach target
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