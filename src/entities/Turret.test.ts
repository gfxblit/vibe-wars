import * as THREE from 'three';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Turret } from './Turret';

describe('Turret Entity', () => {
  let turret: Turret;
  const initialPosition = new THREE.Vector3(0, 0, -500);

  beforeEach(() => {
    turret = new Turret(initialPosition);
  });

  it('should initialize with correct position and mesh', () => {
    expect(turret.mesh.position.equals(initialPosition)).toBe(true);
    expect(turret.position.equals(initialPosition)).toBe(true);
    expect(turret.mesh.children.length).toBeGreaterThan(0);
  });

  it('should return a direction when firing', () => {
    const playerPos = new THREE.Vector3(0, 0, 0);
    // Force cooldown to 0
    (turret as any).fireCooldown = 0;
    
    const fireDir = turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    expect(fireDir).not.toBeNull();
    if (fireDir) {
      const turretPos = new THREE.Vector3();
      turret.getWorldPosition(turretPos);
      const expectedDir = new THREE.Vector3().subVectors(playerPos, turretPos).normalize();
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
    const turretPos = new THREE.Vector3();
    turret.getWorldPosition(turretPos);
    const toPlayer = new THREE.Vector3().subVectors(playerPos, turretPos).normalize();
    
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

    // Calling explode again should not change anything
    turret.explode();
    expect(turret.isExploded).toBe(true);
  });

  it('should move pieces when updated after explosion', () => {
    turret.explode();
    
    // Store initial positions of children
    const initialPositions = turret.mesh.children.map(child => child.position.clone());
    const initialRotations = turret.mesh.children.map(child => child.rotation.clone());

    // Update the turret
    turret.update(1.0, new THREE.Vector3(), new THREE.Quaternion(), 0);

    // Verify at least one piece has moved or rotated
    let moved = false;
    let rotated = false;
    turret.mesh.children.forEach((child, index) => {
      if (!child.position.equals(initialPositions[index])) {
        moved = true;
      }
      if (!child.rotation.equals(initialRotations[index])) {
        rotated = true;
      }
    });

    expect(moved).toBe(true);
    expect(rotated).toBe(true);
  });

  it('should return correct score, velocity and fireball size', () => {
    expect(turret.getScore()).toBeGreaterThan(0);
    
    const playerForward = new THREE.Vector3(0, 0, -1);
    const playerSpeed = 100;
    const velocity = turret.getVelocity(playerForward, playerSpeed);
    expect(velocity.z).toBe(-100);
    
    expect(turret.getFireballSize()).toBeGreaterThan(0);
  });

  it('should dispose resources correctly', () => {
    const materialDisposeSpy = vi.spyOn((turret as any).material, 'dispose');
    
    // Create a spy for geometry dispose
    const geometries: THREE.BufferGeometry[] = [];
    turret.mesh.traverse(child => {
      if (child instanceof THREE.Mesh) {
        geometries.push(child.geometry);
      }
    });
    const geoSpies = geometries.map(geo => vi.spyOn(geo, 'dispose'));

    turret.dispose();

    expect(materialDisposeSpy).toHaveBeenCalled();
    geoSpies.forEach(spy => expect(spy).toHaveBeenCalled());
  });
});
