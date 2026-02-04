import { expect, test, describe } from 'vitest'
import { Cockpit } from './Cockpit'
import * as THREE from 'three'

describe('Cockpit', () => {
  test('should build cockpit group', () => {
    const cockpit = new Cockpit();
    expect(cockpit.mesh).toBeDefined();
    expect(cockpit.mesh).toBeInstanceOf(THREE.Group);
    expect(cockpit.mesh.name).toBe('cockpit');
  });

  test('cockpit should have nose and two guns', () => {
    const cockpit = new Cockpit();
    // Should have at least 3 children (nose, gunL, gunR)
    // The current implementation adds noseMesh and innerNose, then leftGun, rightGun.
    // So 4 children.
    expect(cockpit.mesh.children.length).toBeGreaterThanOrEqual(3);
  });
  
  test('cockpit components should be LineSegments', () => {
    const cockpit = new Cockpit();
    cockpit.mesh.children.forEach(child => {
      expect(child).toBeInstanceOf(THREE.LineSegments);
    });
  });
})
