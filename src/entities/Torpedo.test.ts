import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { Torpedo } from './Torpedo';
import { GameConfig } from '../config';

describe('Torpedo', () => {
  it('should initialize with position and velocity', () => {
    const pos = new THREE.Vector3(1, 2, 3);
    const vel = new THREE.Vector3(0, 0, -100);
    const torpedo = new Torpedo(pos, vel);

    expect(torpedo.position.x).toBe(1);
    expect(torpedo.position.y).toBe(2);
    expect(torpedo.position.z).toBe(3);
  });

  it('should update position based on velocity and deltaTime', () => {
    const pos = new THREE.Vector3(0, 0, 0);
    const vel = new THREE.Vector3(0, 0, -100);
    const torpedo = new Torpedo(pos, vel);

    torpedo.update(0.1);

    expect(torpedo.position.z).toBeCloseTo(-10);
  });

  it('should mark as expired after explosion duration', () => {
    const pos = new THREE.Vector3(0, 0, 0);
    const vel = new THREE.Vector3(0, 0, -100);
    const torpedo = new Torpedo(pos, vel);

    torpedo.explode();
    expect(torpedo.isExploded).toBe(true);
    expect(torpedo.isExpired()).toBe(false);

    torpedo.update(GameConfig.fireball.explosionDuration + 0.1);
    expect(torpedo.isExpired()).toBe(true);
  });
});
