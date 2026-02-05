import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { Laser } from './Laser';
import { GameConfig } from '../config';

describe('Laser', () => {
  it('moves forward at the correct speed', () => {
    const origin = new THREE.Vector3(0, 0, 0);
    const direction = new THREE.Vector3(0, 0, -1);
    const laser = new Laser(origin, direction);
    
    laser.update(0.1);
    
    // speed is 600, so in 0.1s it should move 60 units.
    // origin + direction * speed * dt
    const expectedPos = new THREE.Vector3().copy(origin).add(new THREE.Vector3().copy(direction).multiplyScalar(GameConfig.laser.speed * 0.1));
    expect(laser.position.x).toBeCloseTo(expectedPos.x, 5);
    expect(laser.position.y).toBeCloseTo(expectedPos.y, 5);
    expect(laser.position.z).toBeCloseTo(expectedPos.z, 5);
  });

  it('expires after its lifetime', () => {
    const origin = new THREE.Vector3(0, 0, 0);
    const direction = new THREE.Vector3(0, 0, -1);
    const laser = new Laser(origin, direction);
    
    expect(laser.isExpired()).toBe(false);
    
    laser.update(2.1); // lifetime is 2s
    expect(laser.isExpired()).toBe(true);
  });
  
  it('has correct color', () => {
      const laser = new Laser(new THREE.Vector3(), new THREE.Vector3(0,0,-1));
      const material = laser.mesh.material as THREE.LineBasicMaterial;
      expect(material.color.getHex()).toBe(GameConfig.laser.color);
  });
});
