import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Fireball } from './Fireball';

describe('Fireball', () => {
  let fireball: Fireball;
  const initialPosition = new THREE.Vector3(0, 0, -50);
  const velocity = new THREE.Vector3(0, 0, 10);

  beforeEach(() => {
    fireball = new Fireball(initialPosition.clone(), velocity.clone());
  });

  it('should initialize with correct position and velocity', () => {
    expect(fireball.position.x).toBe(initialPosition.x);
    expect(fireball.position.y).toBe(initialPosition.y);
    expect(fireball.position.z).toBe(initialPosition.z);
  });

  it('should update position based on velocity and deltaTime', () => {
    const deltaTime = 1.0;
    fireball.update(deltaTime);
    
    const expectedPosition = initialPosition.clone().add(velocity.clone().multiplyScalar(deltaTime));
    expect(fireball.position.x).toBe(expectedPosition.x);
    expect(fireball.position.y).toBe(expectedPosition.y);
    expect(fireball.position.z).toBe(expectedPosition.z);
  });

  it('should have a mesh of type LineSegments', () => {
    expect(fireball.mesh).toBeInstanceOf(THREE.LineSegments);
  });
});
