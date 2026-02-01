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
    const playerShip = new PlayerShip();
    const nose = playerShip.mesh.children[0] as THREE.LineSegments;
    const material = nose.material as THREE.LineBasicMaterial;
    expect(material.color.getHex()).toBe(PlayerShip.COLOR);
  });
});
