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

  test('update should move player forward even with no input', () => {
    const player = new Player();
    const initialZ = player.position.z;
    player.update(new THREE.Vector2(0, 0), 0.1);
    expect(player.position.z).toBeLessThan(initialZ);
  })

  test('update should move player horizontally based on input x', () => {
    const player = new Player();
    player.update(new THREE.Vector2(1, 0), 0.1);
    expect(player.position.x).toBeGreaterThan(0);
    
    const posX = player.position.x;
    player.update(new THREE.Vector2(-1, 0), 0.1);
    expect(player.position.x).toBeLessThan(posX);
  })

  test('update should move player vertically based on input y', () => {
    const player = new Player();
    player.update(new THREE.Vector2(0, 1), 0.1);
    expect(player.position.y).toBeGreaterThan(0);
    
    const posY = player.position.y;
    player.update(new THREE.Vector2(0, -1), 0.1);
    expect(player.position.y).toBeLessThan(posY);
  })

  test('update should bank the ship based on input x', () => {
    const player = new Player();
    player.update(new THREE.Vector2(1, 0), 0.1);
    // Banking is rotation around Z. 
    // Positive X input should roll the ship (bank).
    expect(player.mesh.rotation.z).not.toBe(0);
  })

  test('update should tilt the ship based on input y', () => {
    const player = new Player();
    player.update(new THREE.Vector2(0, 1), 0.1);
    // Tilting is rotation around X.
    expect(player.mesh.rotation.x).not.toBe(0);
  })

  test('position should be clamped within bounds', () => {
    const player = new Player();
    // Move far to the right
    for (let i = 0; i < 100; i++) {
        player.update(new THREE.Vector2(1, 0), 0.1);
    }
    const maxX = player.position.x;
    player.update(new THREE.Vector2(1, 0), 0.1);
    expect(player.position.x).toBe(maxX);
  })
})
