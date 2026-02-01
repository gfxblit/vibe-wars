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
    const lineSegments = crosshair.mesh.children[0] as THREE.LineSegments;
    const material = lineSegments.material as THREE.LineBasicMaterial;
    expect(material.color.getHex()).toBe(Crosshair.COLOR);
  });
});
