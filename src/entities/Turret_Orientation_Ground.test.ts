import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { SurfaceObstacleFactory } from './SurfaceObstacleFactory';
import { Turret } from './Turret';

describe('SurfaceObstacleFactory Turret Orientation', () => {
  let factory: SurfaceObstacleFactory;

  beforeEach(() => {
    factory = new SurfaceObstacleFactory();
  });

  it('should rotate turret so its local Z points UP (+Y)', () => {
    const position = new THREE.Vector3(10, 20, 30);
    const turret = factory.createTurret(position) as Turret;
    
    // We want the turret mesh to be oriented such that its local +Z (the way it points) 
    // is now pointing in world +Y (up).
    // wait, actually, if it's a ground turret, it should sit on the ground (base in XZ plane)
    // and its swivel body should be able to look around.
    
    // Let's check the world direction of local +Z of the mesh.
    const localZ = new THREE.Vector3(0, 0, 1);
    localZ.applyQuaternion(turret.mesh.quaternion);
    
    // If it points UP, then y should be 1.
    // In THREE.js, rotation.x = -Math.PI / 2 rotates Y to -Z, Z to Y.
    // In SurfaceObstacleFactory: turret.mesh.rotation.x = -Math.PI / 2;
    // So local Z (0,0,1) should become (0,1,0). (Pointing UP).
    
    expect(localZ.y).toBeCloseTo(1); 
  });
});
