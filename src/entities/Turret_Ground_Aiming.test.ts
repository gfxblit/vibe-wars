import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { Turret } from './Turret';

describe('Turret Aiming on Ground', () => {
  it('should aim at the player correctly when mesh is rotated for ground and in a scene', () => {
    const scene = new THREE.Scene();
    const position = new THREE.Vector3(0, -50, -500); // On the ground
    const turret = new Turret(position);
    scene.add(turret.mesh);
    
    // Rotate for ground (as in SurfaceObstacleFactory)
    turret.mesh.rotation.x = -Math.PI / 2;
    turret.mesh.updateMatrixWorld(true);

    const playerPos = new THREE.Vector3(0, 0, 0); // Player at origin
    
    turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    
    // Get the world direction of the turret's barrels
    // Barrels are in swivelBody, which is child[1] of mesh
    const swivelBody = turret.mesh.children[1];
    swivelBody.updateMatrixWorld(true);
    
    const barrelDir = new THREE.Vector3(0, 0, -1);
    const worldQuat = new THREE.Quaternion();
    swivelBody.getWorldQuaternion(worldQuat);
    barrelDir.applyQuaternion(worldQuat);
    
    const turretWorldPos = new THREE.Vector3();
    turret.getWorldPosition(turretWorldPos);
    
    const expectedDir = new THREE.Vector3().subVectors(playerPos, turretWorldPos).normalize();
    
    // console.log('Barrel Dir:', barrelDir);
    // console.log('Expected Dir:', expectedDir);
    // console.log('Dot:', barrelDir.dot(expectedDir));
    
    expect(barrelDir.dot(expectedDir)).toBeGreaterThan(0.99);
  });
});
