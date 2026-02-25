import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Turret } from './Turret';

describe('Turret Orientation', () => {
  let turret: Turret;
  const size = 10;

  beforeEach(() => {
    turret = new Turret(new THREE.Vector3(0, 0, 0), size);
  });

  it('should have fire position in front of swivel body (+Z)', () => {
    const firePos = new THREE.Vector3();
    turret.getFirePosition(firePos);
    
    // swivelBody is at 0,0,0 initially looking down +Z (default Object3D)
    // local (0, 0, size * 0.4) should be (0, 0, 4) in world
    expect(firePos.x).toBeCloseTo(0);
    expect(firePos.y).toBeCloseTo(0);
    expect(firePos.z).toBeCloseTo(4);
  });

  it('should swivel to look at player', () => {
    const playerPos = new THREE.Vector3(0, 0, -100);
    turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    
    // swivelBody.lookAt(playerPos) makes +Z point towards playerPos
    // Player is at -100 on Z. So +Z should point towards -Z world.
    const firePos = new THREE.Vector3();
    turret.getFirePosition(firePos);
    
    // firePos was at local (0, 0, 4). 
    // If +Z points to -100 world Z, then firePos should be at (0, 0, -4) roughly.
    expect(firePos.z).toBeLessThan(0);
  });
});
