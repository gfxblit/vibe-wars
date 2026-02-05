import { expect, test, describe } from 'vitest'
import { Player } from './Player'
import * as THREE from 'three'

describe('Player', () => {
  test('should have a position and a mesh', () => {
    const player = new Player();
    expect(player.position).toBeInstanceOf(THREE.Vector3);
    expect(player.mesh).toBeInstanceOf(THREE.Group);
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
    player.update({ x: 0, y: 0, isFiring: false }, 0.1);
    expect(player.position.z).toBeLessThan(initialZ);
  })

  test('update should move player horizontally based on input x', () => {
    const player = new Player();
    player.update({ x: 1, y: 0, isFiring: false }, 0.1);
    expect(player.position.x).toBeGreaterThan(0);
    
    const posX = player.position.x;
    // Continuing to turn right should continue to increase X (until we pass 90 deg)
    player.update({ x: 1, y: 0, isFiring: false }, 0.1);
    expect(player.position.x).toBeGreaterThan(posX);
  })

  test('update should move player vertically based on input y', () => {
    const player = new Player();
    player.update({ x: 0, y: 1, isFiring: false }, 0.1);
    expect(player.position.y).toBeGreaterThan(0);
    
    const posY = player.position.y;
    // Continuing to tilt up should continue to increase Y (until we pass 90 deg)
    player.update({ x: 0, y: 1, isFiring: false }, 0.1);
    expect(player.position.y).toBeGreaterThan(posY);
  })

  test('update should bank the visual mesh based on input x', () => {
    const player = new Player();
    player.update({ x: 1, y: 0, isFiring: false }, 0.1);
    // Banking is rotation around Z of the visual mesh.
    // We can access it via mesh.children[0] or we could expose it, 
    // but for tests let's just check children.
    const visualMesh = player.mesh.children[0] as THREE.Object3D;
    expect(visualMesh.rotation.z).not.toBe(0);
  })

  test('update should rotate the player mesh based on input y', () => {
    const player = new Player();
    player.update({ x: 0, y: 1, isFiring: false }, 0.1);
    // Tilting is rotation around X of the main mesh.
    expect(player.mesh.rotation.x).not.toBe(0);
  })

  test('should rotate over time with horizontal input', () => {
    const player = new Player();
    player.update({ x: 1, y: 0, isFiring: false }, 0.1);
    const quat1 = player.mesh.quaternion.clone();
    expect(quat1.equals(new THREE.Quaternion())).toBe(false);
    
    player.update({ x: 1, y: 0, isFiring: false }, 0.1);
    const quat2 = player.mesh.quaternion.clone();
    expect(quat2.equals(quat1)).toBe(false);
  })

  test('should rotate over time with vertical input', () => {
    const player = new Player();
    player.update({ x: 0, y: 1, isFiring: false }, 0.1);
    const quat1 = player.mesh.quaternion.clone();
    expect(quat1.equals(new THREE.Quaternion())).toBe(false);
    
    player.update({ x: 0, y: 1, isFiring: false }, 0.1);
    const quat2 = player.mesh.quaternion.clone();
    expect(quat2.equals(quat1)).toBe(false);
  })

  test('should move in the direction of current heading', () => {
    const player = new Player();
    
    // Turn 90 degrees right (yaw)
    // We don't know the exact TURN_SPEED yet, so let's just simulate enough time
    // or just set it if we want, but it's better to test the update loop.
    
    // If we turn right, we should eventually move towards positive X.
    for (let i = 0; i < 100; i++) {
        player.update({ x: 1, y: 0, isFiring: false }, 0.1);
    }
    
    // After turning right, moving forward should increase X
    const initialX = player.position.x;
    player.update({ x: 0, y: 0, isFiring: false }, 0.1);
    expect(player.position.x).not.toBe(initialX);
  })
})
