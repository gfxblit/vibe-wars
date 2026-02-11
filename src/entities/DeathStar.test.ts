import * as THREE from 'three';
import { DeathStar } from './DeathStar';
import { describe, it, expect, vi } from 'vitest';

describe('DeathStar', () => {
  it('should be initialized with a THREE.Group', () => {
    const deathStar = new DeathStar(new THREE.Vector3(0, 0, 0));
    expect(deathStar.mesh).toBeInstanceOf(THREE.Group);
  });

  it('should have hull, dish, and trench components', () => {
    const deathStar = new DeathStar(new THREE.Vector3(0, 0, 0));
    const group = deathStar.mesh as THREE.Group;
    
    // We expect at least 3 components: hull, dish, and trench
    // The implementation might use multiple segments for each, so we check for minimum
    expect(group.children.length).toBeGreaterThanOrEqual(3);
    
    // Check for LineSegments specifically as requested by the issue
    group.children.forEach(child => {
      expect(child).toBeInstanceOf(THREE.LineSegments);
    });
  });

  it('should update rotation over time', () => {
    const deathStar = new DeathStar(new THREE.Vector3(0, 0, 0));
    const initialRotationY = deathStar.mesh.rotation.y;
    deathStar.update(1.0);
    expect(deathStar.mesh.rotation.y).toBeGreaterThan(initialRotationY);
  });

  it('should dispose all geometries and materials', () => {
    const deathStar = new DeathStar(new THREE.Vector3(0, 0, 0));
    const group = deathStar.mesh as THREE.Group;

    // Collect all geometries and materials
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    group.traverse((child) => {
      if (child instanceof THREE.LineSegments || child instanceof THREE.Mesh) {
        geometries.push(child.geometry);
        if (Array.isArray(child.material)) {
          materials.push(...child.material);
        } else {
          materials.push(child.material);
        }
      }
    });

    // Spy on dispose methods
    geometries.forEach(g => vi.spyOn(g, 'dispose'));
    materials.forEach(m => vi.spyOn(m, 'dispose'));

    deathStar.dispose();

    geometries.forEach(g => expect(g.dispose).toHaveBeenCalled());
    materials.forEach(m => expect(m.dispose).toHaveBeenCalled());
  });
});
