// @vitest-environment happy-dom
import { expect, test, describe } from 'vitest'
import { Crosshair } from './Crosshair'
import * as THREE from 'three'

describe('Crosshair Entity', () => {
  test('it can be instantiated', () => {
    const crosshair = new Crosshair();
    expect(crosshair).toBeDefined();
    expect(crosshair.mesh).toBeInstanceOf(THREE.Object3D);
  })

  test('it uses red color', () => {
    const crosshair = new Crosshair();
    let hasRed = false;
    crosshair.mesh.traverse((child) => {
      if (child instanceof THREE.LineSegments) {
        const material = child.material as THREE.LineBasicMaterial;
        if (material.color.getHex() === 0xff0000) {
          hasRed = true;
        }
      }
    });
    expect(hasRed).toBe(true);
  })
});
