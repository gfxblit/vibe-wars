import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Tower } from './Tower';
import { state } from '../state';

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
    const fireDir = tower.update(dt, playerPos);

    expect(fireDir).toBeDefined();
    expect(fireDir).toBeInstanceOf(THREE.Vector3);
  });

  it('should not fire if destroyed', () => {
    tower.explode();
    const playerPos = new THREE.Vector3(0, 0, 0);
    const fireDir = tower.update(1.0, playerPos);
    expect(fireDir).toBeNull();
  });

  it('should scale fire rate and fireball speed with wave count', () => {
    // Wave 1: base fireRate (2.0s), fireballSpeed (400.0)
    state.wave = 1;
    vi.spyOn(Math, 'random').mockReturnValue(1.0); // start at max cooldown
    tower = new Tower(new THREE.Vector3(0, 0, -500));
    
    // update(1.9) -> fireRate (2.0) - 1.9 = 0.1
    let fire = tower.update(1.9, new THREE.Vector3(0, 0, 0));
    expect(fire).toBeNull();
    // update(0.2) -> 0.1 - 0.2 = -0.1 -> fire
    fire = tower.update(0.2, new THREE.Vector3(0, 0, 0));
    expect(fire).not.toBeNull();
    // Cooldown should reset to 2.0 / 1.0 = 2.0
    expect((tower as any).fireCooldown).toBeCloseTo(2.0);
    expect(tower.getFireballSpeed()).toBe(400);

    // Wave 10: multiplier 2.8, fireRate 2.0 / 2.8 ~= 0.714s, fireballSpeed 400 * 2.8 = 1120
    state.wave = 10;
    vi.spyOn(Math, 'random').mockReturnValue(1.0);
    tower = new Tower(new THREE.Vector3(0, 0, -500));
    // Initial cooldown is 2.0 * multiplier if we set it in constructor? 
    // Wait, requirement says scale fireRate in Tower.update and fireballSpeed in Tower.getFireballSpeed.
    
    // Force cooldown to max
    const scaledRate = 2.0 / 2.8;
    (tower as any).fireCooldown = scaledRate;

    fire = tower.update(scaledRate - 0.1, new THREE.Vector3(0, 0, 0));
    expect(fire).toBeNull();
    fire = tower.update(0.2, new THREE.Vector3(0, 0, 0));
    expect(fire).not.toBeNull();
    expect((tower as any).fireCooldown).toBeCloseTo(scaledRate, 2);
    expect(tower.getFireballSpeed()).toBe(1120);
  });
});
