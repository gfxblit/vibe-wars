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

  it('should move sparkles outward when exploded', () => {
    const pos = new THREE.Vector3(0, 0, 0);
    const vel = new THREE.Vector3(0, 0, -100);
    const torpedo = new Torpedo(pos, vel);
    const dt = 1.0;

    torpedo.explode();

    // The visual group is the first child of the mesh
    const visualGroup = torpedo.mesh.children[0];
    expect(visualGroup).toBeInstanceOf(THREE.Group);

    // Capture initial positions of sparkles relative to the visual group
    const initialSparklePositions = visualGroup.children.map(c => c.position.clone());

    torpedo.update(dt);

    visualGroup.children.forEach((child, i) => {
      const initialPos = initialSparklePositions[i];
      // The child should have moved away from the origin (0,0,0) of the group
      expect(child.position.length()).toBeGreaterThan(initialPos.length());
    });
  });

  it('should have depthWrite set to false for sparkles to fix black background', () => {
    const pos = new THREE.Vector3(0, 0, 0);
    const vel = new THREE.Vector3(0, 0, -100);
    const torpedo = new Torpedo(pos, vel);

    const visualGroup = torpedo.mesh.children[0];
    visualGroup.children.forEach(child => {
      if (child instanceof THREE.Sprite) {
        expect(child.material.depthWrite).toBe(false);
      }
    });
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
