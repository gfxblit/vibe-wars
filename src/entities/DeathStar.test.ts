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

  it('should position the dish correctly on the hull', () => {
    const deathStar = new DeathStar(new THREE.Vector3(0, 0, 0));
    const dish = deathStar.mesh.getObjectByName('DeathStarDish') as THREE.LineSegments;
    expect(dish).toBeDefined();

    // The dish should be positioned at a specific point in the northern hemisphere
    // and recessed slightly towards the center.
    // Based on phi=PI*0.25, theta=PI*0.25, radius=100, dishDepth=8
    const expectedX = 50 - (0.5 * 4); // 48
    const expectedY = 100 * Math.cos(Math.PI * 0.25) - (Math.cos(Math.PI * 0.25) * 4); // ~67.88
    const expectedZ = 50 - (0.5 * 4); // 48

    expect(dish.position.x).toBeCloseTo(expectedX);
    expect(dish.position.y).toBeCloseTo(expectedY);
    expect(dish.position.z).toBeCloseTo(expectedZ);
  });

  it('should explode and set isExploded to true', () => {
    const deathStar = new DeathStar(new THREE.Vector3(0, 0, 0));
    expect(deathStar.isExploded).toBe(false);
    deathStar.explode();
    expect(deathStar.isExploded).toBe(true);
  });

  it('should move fragments after explosion', () => {
    const deathStar = new DeathStar(new THREE.Vector3(0, 0, 0));
    deathStar.explode();
    
    const children = deathStar.mesh.children;
    const initialPositions = children.map(c => c.position.clone());

    deathStar.update(1.0); // 1 second update

    children.forEach((child, i) => {
        // We expect them to move
        expect(child.position.equals(initialPositions[i])).toBe(false);
    });
  });
});
