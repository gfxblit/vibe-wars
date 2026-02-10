import * as THREE from 'three';
import { describe, it, expect, beforeEach } from 'vitest';
import { Turret } from './Turret';

describe('Turret Entity', () => {
  let turret: Turret;
  const initialPosition = new THREE.Vector3(0, 0, -500);

  beforeEach(() => {
    turret = new Turret(initialPosition);
  });

  it('should initialize with correct position and mesh', () => {
    expect(turret.mesh.position.equals(initialPosition)).toBe(true);
    expect(turret.mesh.children.length).toBeGreaterThan(0);
  });

  it('should return a direction when firing', () => {
    const playerPos = new THREE.Vector3(0, 0, 0);
    // Force cooldown to 0
    (turret as any).fireCooldown = 0;
    
    const fireDir = turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    expect(fireDir).not.toBeNull();
    if (fireDir) {
      const expectedDir = new THREE.Vector3().subVectors(playerPos, initialPosition).normalize();
      expect(fireDir.distanceTo(expectedDir)).toBeLessThan(0.001);
    }
  });

  it('should obey fire rate', () => {
    const playerPos = new THREE.Vector3(0, 0, 0);
    // Force cooldown to 0
    (turret as any).fireCooldown = 0;
    
    let fireDir = turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    expect(fireDir).not.toBeNull();
    
    // Immediately updating again should not fire
    fireDir = turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    expect(fireDir).toBeNull();
  });

  it('should not fire if player is out of range', () => {
    const playerPos = new THREE.Vector3(0, 0, 10000); // Very far away
    (turret as any).fireCooldown = 0;
    
    const fireDir = turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    expect(fireDir).toBeNull();
  });

  it('should aim at the player', () => {
    const playerPos = new THREE.Vector3(100, 100, 0);
    turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    
    // Turret should look at the player (roughly)
    // We check if the forward vector of the mesh points towards the player
    const turretForward = new THREE.Vector3(0, 0, 1).applyQuaternion(turret.mesh.quaternion);
    const toPlayer = new THREE.Vector3().subVectors(playerPos, turret.mesh.position).normalize();
    
    // Depending on implementation, it might look at player with +Z or -Z.
    // Let's assume +Z for now.
    expect(turretForward.dot(toPlayer)).toBeGreaterThan(0.9);
  });

  it('should change color to orange when exploded', () => {
    turret.explode();
    
    turret.mesh.traverse(child => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
        expect(child.material.color.getHex()).toBe(0xffa500); // Orange
      }
    });
  });
});
