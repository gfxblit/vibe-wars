import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Tower } from './Tower';

describe('Tower Firing', () => {
  let tower: Tower;

  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0); // Ensure cooldown starts at 0
    tower = new Tower(new THREE.Vector3(0, 0, -500));
  });

  it('should fire at player when in range and cooldown is ready', () => {
    // This test assumes we will add an update method that takes player position and a callback
    // Currently this method doesn't exist, so we expect this to fail if we were to run it against current code.
    // But since I'm writing the test first (TDD), I will define the expected interface.
    
    const playerPos = new THREE.Vector3(0, 0, 0);
    const dt = 1.0;

    // We expect update to return a direction vector if firing
    const fireDir = (tower as any).update(dt, playerPos);

    expect(fireDir).toBeDefined();
    expect(fireDir).toBeInstanceOf(THREE.Vector3);
  });

  it('should not fire if destroyed', () => {
    tower.isExploded = true;
    const playerPos = new THREE.Vector3(0, 0, 0);
    const fireDir = (tower as any).update(1.0, playerPos);
    expect(fireDir).toBeNull();
  });
});
