import { expect, test, describe } from 'vitest'
import { Player } from './Player'
import * as THREE from 'three'

describe('Player', () => {
  test('should have a position and a mesh', () => {
    const player = new Player();
    expect(player.position).toBeInstanceOf(THREE.Vector3);
    expect(player.mesh).toBeInstanceOf(THREE.LineSegments);
  })

  test('should initialize position at origin', () => {
    const player = new Player();
    expect(player.position.x).toBe(0);
    expect(player.position.y).toBe(0);
    expect(player.position.z).toBe(0);
  })

  test('mesh position should match player position', () => {
    const player = new Player();
    expect(player.mesh.position).toBe(player.position);
  })

  test('position should be the same object as mesh position', () => {
    const player = new Player();
    const newPos = new THREE.Vector3(1, 2, 3);
    // @ts-expect-error - position should be readonly
    expect(() => { player.position = newPos; }).toThrow();
    expect(player.position).not.toBe(newPos);
    expect(player.position).toBe(player.mesh.position);
  })
})
