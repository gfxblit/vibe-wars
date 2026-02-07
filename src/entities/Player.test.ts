import { describe, it, expect, beforeEach } from 'vitest'
import { Player } from './Player'
import { GameConfig } from '../config'

describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player();
  })

  it('should have a position and a mesh', () => {
    expect(player.position).toBeDefined();
    expect(player.mesh).toBeDefined();
  })

  it('should initialize position at origin', () => {
    expect(player.position.x).toBe(0);
    expect(player.position.y).toBe(0);
    expect(player.position.z).toBe(0);
  })

  it('mesh position should match player position', () => {
    expect(player.mesh.position.x).toBe(player.position.x);
    expect(player.mesh.position.y).toBe(player.position.y);
    expect(player.mesh.position.z).toBe(player.position.z);
  })

  it('position should be the same object as mesh position', () => {
    expect(player.position).toBe(player.mesh.position);
  })

  it('update should move player forward if speed > 0', () => {
    const initialZ = player.position.z;
    player.update({ x: 0, y: 0, isFiring: false }, 0.1);
    if (GameConfig.player.forwardSpeed > 0) {
      expect(player.position.z).toBeLessThan(initialZ);
    } else {
      expect(player.position.z).toBe(initialZ);
    }
  })

  it('update should move player horizontally based on input x (if speed > 0)', () => {
    const player = new Player();
    player.update({ x: 1, y: 0, isFiring: false }, 0.1);
    if (GameConfig.player.forwardSpeed > 0) {
      expect(player.position.x).toBeGreaterThan(0);
    } else {
      expect(player.position.x).toBe(0);
    }
  })

  it('update should move player vertically based on input y (if speed > 0)', () => {
    const player = new Player();
    player.update({ x: 0, y: 1, isFiring: false }, 0.1);
    if (GameConfig.player.forwardSpeed > 0) {
      expect(player.position.y).toBeGreaterThan(0);
    } else {
      expect(player.position.y).toBe(0);
    }
  })

  it('update should bank the visual mesh based on input x', () => {
    player.update({ x: 1, y: 0, isFiring: false }, 0.1);
    // @ts-ignore - access private visualMesh via property if needed or check rotation.z
    expect(player.mesh.children[0].rotation.z).toBeLessThan(0);
  })

  it('update should rotate the player mesh based on input y', () => {
    const initialQuat = player.mesh.quaternion.clone();
    player.update({ x: 0, y: 1, isFiring: false }, 0.1);
    expect(player.mesh.quaternion.equals(initialQuat)).toBe(false);
  })

  it('should rotate over time with horizontal input', () => {
    const startQuat = player.mesh.quaternion.clone();
    player.update({ x: 1, y: 0, isFiring: false }, 0.5);
    expect(player.mesh.quaternion.equals(startQuat)).toBe(false);
  })

  it('should rotate over time with vertical input', () => {
    const startQuat = player.mesh.quaternion.clone();
    player.update({ x: 0, y: 1, isFiring: false }, 0.5);
    expect(player.mesh.quaternion.equals(startQuat)).toBe(false);
  })

  it('should move in the direction of current heading (if speed > 0)', () => {
    const player = new Player();
    // Turn 90 degrees right (approx)
    player.update({ x: 1, y: 0, isFiring: false }, 1.0);
    
    const initialX = player.position.x;
    player.update({ x: 0, y: 0, isFiring: false }, 0.1);
    
    if (GameConfig.player.forwardSpeed > 0) {
      expect(player.position.x).not.toBe(initialX);
    } else {
      expect(player.position.x).toBe(initialX);
    }
  })
})