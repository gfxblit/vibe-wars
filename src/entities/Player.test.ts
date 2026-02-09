import { describe, it, expect, beforeEach } from 'vitest'
import * as THREE from 'three'
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

  it('position should be the same object as mesh position and be readonly', () => {
    expect(player.position).toBe(player.mesh.position);

    // @ts-expect-error - position should be readonly and throw on assignment in strict mode.
    expect(() => { player.position = new THREE.Vector3(1, 2, 3); }).toThrow();
  })

  it('update should move player forward if speed > 0', () => {
    const initialZ = player.position.z;
    const speed = GameConfig.player.baseForwardSpeed;
    player.update({ x: 0, y: 0, isFiring: false, isLaunchingTorpedo: false }, 0.1, speed);
    if (speed > 0) {
      expect(player.position.z).toBeLessThan(initialZ);
    } else {
      expect(player.position.z).toBe(initialZ);
    }
  })

  it('update should move player horizontally based on input x (if speed > 0)', () => {
    const player = new Player();
    const speed = GameConfig.player.baseForwardSpeed;
    player.update({ x: 1, y: 0, isFiring: false, isLaunchingTorpedo: false }, 0.1, speed);
    if (speed > 0) {
      expect(player.position.x).toBeGreaterThan(0);
    } else {
      expect(player.position.x).toBe(0);
    }
  })

  it('update should move player vertically based on input y (if speed > 0)', () => {
    const player = new Player();
    const speed = GameConfig.player.baseForwardSpeed;
    player.update({ x: 0, y: 1, isFiring: false, isLaunchingTorpedo: false }, 0.1, speed);
    if (speed > 0) {
      expect(player.position.y).toBeGreaterThan(0);
    } else {
      expect(player.position.y).toBe(0);
    }
  })

  it('update should bank the visual mesh based on input x', () => {
    player.update({ x: 1, y: 0, isFiring: false, isLaunchingTorpedo: false }, 0.1, GameConfig.player.baseForwardSpeed);
    // @ts-ignore - access private visualMesh via property if needed or check rotation.z
    expect(player.mesh.children[0].rotation.z).toBeLessThan(0);
  })

  it('update should rotate the player mesh based on input y', () => {
    const initialQuat = player.mesh.quaternion.clone();
    player.update({ x: 0, y: 1, isFiring: false, isLaunchingTorpedo: false }, 0.1, GameConfig.player.baseForwardSpeed);
    expect(player.mesh.quaternion.equals(initialQuat)).toBe(false);
  })

  it('should rotate over time with horizontal input', () => {
    const startQuat = player.mesh.quaternion.clone();
    player.update({ x: 1, y: 0, isFiring: false, isLaunchingTorpedo: false }, 0.5, GameConfig.player.baseForwardSpeed);
    expect(player.mesh.quaternion.equals(startQuat)).toBe(false);
  })

  it('should rotate over time with vertical input', () => {
    const startQuat = player.mesh.quaternion.clone();
    player.update({ x: 0, y: 1, isFiring: false, isLaunchingTorpedo: false }, 0.5, GameConfig.player.baseForwardSpeed);
    expect(player.mesh.quaternion.equals(startQuat)).toBe(false);
  })

  it('should move in the direction of current heading (if speed > 0)', () => {
    const player = new Player();
    const speed = GameConfig.player.baseForwardSpeed;
    // Turn 90 degrees right (approx)
    player.update({ x: 1, y: 0, isFiring: false, isLaunchingTorpedo: false }, 1.0, speed);

    const initialX = player.position.x;
    player.update({ x: 0, y: 0, isFiring: false, isLaunchingTorpedo: false }, 0.1, speed);

    if (speed > 0) {
      expect(player.position.x).not.toBe(initialX);
    } else {
      expect(player.position.x).toBe(initialX);
    }
  })

  it('should toggle chassis visibility', () => {
    // @ts-ignore - access private visualMesh
    const visualMesh = player.mesh.children[0];

    // Default should be NOT visible
    expect(visualMesh.visible).toBe(false);

    // Toggle on
    player.update({ x: 0, y: 0, isFiring: false, isLaunchingTorpedo: false }, 0.1, GameConfig.player.baseForwardSpeed, true);
    expect(visualMesh.visible).toBe(true);

    // Toggle off
    player.update({ x: 0, y: 0, isFiring: false, isLaunchingTorpedo: false }, 0.1, GameConfig.player.baseForwardSpeed, false);
    expect(visualMesh.visible).toBe(false);
  })

  describe('orientation constraints', () => {
    it('should lock roll to zero when lockUpright is enabled', () => {
      // Give some horizontal input that would normally cause rotation (yaw/pitch)
      // and potentially roll if using relative quaternions without care.
      // But the requirement is specifically about world roll being 0.
      player.update({ x: 1, y: 0.5, isFiring: false, isLaunchingTorpedo: false }, 0.1, 100, false, { lockUpright: true });
      
      const euler = new THREE.Euler().setFromQuaternion(player.mesh.quaternion, 'YXZ');
      expect(euler.z).toBeCloseTo(0);
    });

    it('should clamp pitch to provided limits', () => {
      const maxPitch = Math.PI / 6; // 30 degrees
      // Extreme up input
      player.update({ x: 0, y: 10, isFiring: false, isLaunchingTorpedo: false }, 1.0, 100, false, { lockUpright: true, maxPitch });
      
      const euler = new THREE.Euler().setFromQuaternion(player.mesh.quaternion, 'YXZ');
      expect(euler.x).toBeLessThanOrEqual(maxPitch + 0.001);
      
      // Extreme down input
      player.update({ x: 0, y: -10, isFiring: false, isLaunchingTorpedo: false }, 1.0, 100, false, { lockUpright: true, maxPitch });
      const euler2 = new THREE.Euler().setFromQuaternion(player.mesh.quaternion, 'YXZ');
      expect(euler2.x).toBeGreaterThanOrEqual(-maxPitch - 0.001);
    });

    it('should clamp yaw to provided limits', () => {
      const maxYaw = Math.PI / 6; // 30 degrees
      // Extreme right input
      player.update({ x: 10, y: 0, isFiring: false, isLaunchingTorpedo: false }, 1.0, 100, false, { lockUpright: true, maxYaw });
      
      const euler = new THREE.Euler().setFromQuaternion(player.mesh.quaternion, 'YXZ');
      expect(euler.y).toBeLessThanOrEqual(maxYaw + 0.001);
      
      // Extreme left input
      player.update({ x: -10, y: 0, isFiring: false, isLaunchingTorpedo: false }, 1.0, 100, false, { lockUpright: true, maxYaw });
      const euler2 = new THREE.Euler().setFromQuaternion(player.mesh.quaternion, 'YXZ');
      expect(euler2.y).toBeGreaterThanOrEqual(-maxYaw - 0.001);
    });

    it('should maintain 6DOF behavior when no options are provided', () => {
      // In 6DOF, we should be able to loop.
      // 10 seconds of full pitch up should result in a loop (more than 30 degrees)
      player.update({ x: 0, y: 1, isFiring: false, isLaunchingTorpedo: false }, 10.0, 100);
      
      const euler = new THREE.Euler().setFromQuaternion(player.mesh.quaternion, 'YXZ');
      // If it's not clamped to 30 degrees (Math.PI/6 ~ 0.52), it should be much larger or have wrapped.
      // Basically, it shouldn't be clamped to 0.52.
      expect(Math.abs(euler.x)).toBeGreaterThan(Math.PI / 6);
    });
  });
})
