import * as THREE from 'three';
import { describe, it, expect, beforeEach } from 'vitest';
import { Turret } from './Turret';

describe('Turret Orientation and Firing', () => {
  let turret: Turret;
  const initialPosition = new THREE.Vector3(0, -50, -500); // Typical surface position

  beforeEach(() => {
    turret = new Turret(initialPosition);
  });

  it('should fire towards the player when rotated flat on the ground', () => {
    // Rotate turret like it is on the surface
    turret.mesh.rotation.x = -Math.PI / 2;
    turret.mesh.updateMatrixWorld(true);

    const playerPos = new THREE.Vector3(0, 0, 0); // Player at origin
    // Force cooldown to 0
    (turret as any).fireCooldown = 0;
    
    const fireDir = turret.update(0.1, playerPos, new THREE.Quaternion(), 200);
    
    expect(fireDir).not.toBeNull();
    if (fireDir) {
      const turretWorldPos = new THREE.Vector3();
      turret.getWorldPosition(turretWorldPos);
      
      const expectedDir = new THREE.Vector3().subVectors(playerPos, turretWorldPos).normalize();
      
      // The fire direction should be towards the player
      expect(fireDir.x).toBeCloseTo(expectedDir.x, 2);
      expect(fireDir.y).toBeCloseTo(expectedDir.y, 2);
      expect(fireDir.z).toBeCloseTo(expectedDir.z, 2);
    }
  });

  it('should swivel correctly when rotated flat on the ground', () => {
    turret.mesh.rotation.x = -Math.PI / 2;
    turret.mesh.updateMatrixWorld(true);

    const playerPos = new THREE.Vector3(100, 50, -250); // Player to the right and above
    turret.update(0.1, playerPos, new THREE.Quaternion(), 200);
    
    // Check if swivelBody is looking at player
    // Since swivelBody is a child of mesh (which is rotated), 
    // we check its world orientation.
    const swivelWorldDirection = new THREE.Vector3(0, 0, 1);
    const swivelBody = (turret as any).swivelBody as THREE.Group;
    swivelBody.updateMatrixWorld(true);
    swivelWorldDirection.applyQuaternion(swivelBody.getWorldQuaternion(new THREE.Quaternion()));

    const turretWorldPos = new THREE.Vector3();
    turret.getWorldPosition(turretWorldPos);
    const toPlayer = new THREE.Vector3().subVectors(playerPos, turretWorldPos).normalize();

    expect(swivelWorldDirection.dot(toPlayer)).toBeGreaterThan(0.9);
  });
});
