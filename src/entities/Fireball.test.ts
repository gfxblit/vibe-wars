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

  it('should clone the velocity vector in the constructor', () => {
    const v = new THREE.Vector3(1, 2, 3);
    const fb = new Fireball(new THREE.Vector3(), v);
    v.set(0, 0, 0); // Modify original vector
    expect(fb.velocity.x).toBe(1);
    expect(fb.velocity.y).toBe(2);
    expect(fb.velocity.z).toBe(3);
  });

  it('should have a mesh of type Group', () => {
    expect(fireball.mesh).toBeInstanceOf(THREE.Group);
  });

  it('should initialize as not exploded', () => {
    expect(fireball.isExploded).toBe(false);
  });

  it('should set isExploded to true when explode() is called', () => {
    fireball.explode();
    expect(fireball.isExploded).toBe(true);
  });

  it('should move sparkles outward when exploded', () => {
    const dt = 1.0;
    fireball.explode();
    
    // Capture initial positions of sparkles relative to the group
    const initialSparklePositions = fireball.mesh.children.map(c => c.position.clone());
    
    fireball.update(dt);
    
    fireball.mesh.children.forEach((child, i) => {
      const initialPos = initialSparklePositions[i];
      // The child should have moved away from the origin (0,0,0) of the group
      expect(child.position.length()).toBeGreaterThan(initialPos.length());
    });
  });
});
