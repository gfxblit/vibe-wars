// @vitest-environment happy-dom
import { expect, test, describe } from 'vitest'
import { PlayerShip } from './PlayerShip'
import * as THREE from 'three'

describe('PlayerShip Entity', () => {
  test('it can be instantiated', () => {
    const ship = new PlayerShip();
    expect(ship).toBeDefined();
    expect(ship.mesh).toBeInstanceOf(THREE.Object3D);
  })

  test('it uses green color', () => {
    const ship = new PlayerShip();
    let hasGreen = false;
    ship.mesh.traverse((child) => {
      if (child instanceof THREE.LineSegments) {
        const material = child.material as THREE.LineBasicMaterial;
        if (material.color.getHex() === 0x00ff00) {
          hasGreen = true;
        }
      }
    });
    expect(hasGreen).toBe(true);
  })
});
