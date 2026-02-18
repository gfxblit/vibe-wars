import { describe, it, expect, vi } from 'vitest';
import * as THREE from 'three';
import { Laser } from './Laser';

describe('Laser (HUD-based)', () => {
  it('updates progress and moves the mesh', () => {
    const origin = new THREE.Vector2(-1, 1);
    const target = new THREE.Vector2(0, 0);
    const laser = new Laser(origin, target, 0xffffff);
    
    const initialPosition = laser.mesh.position.clone();
    laser.update(0.05);
    expect(laser.mesh.position.equals(initialPosition)).toBe(false);
  });

  it('expires when progress reaches 1.0', () => {
    const origin = new THREE.Vector2(-1, 1);
    const target = new THREE.Vector2(0, 0);
    const laser = new Laser(origin, target, 0xffffff);
    
    expect(laser.isExpired()).toBe(false);
    
    // speed 2000, depth 200 => 10 units/sec. 1.0 takes 0.1s.
    laser.update(0.2); 
    expect(laser.isExpired()).toBe(true);
  });

  it('does NOT dispose of shared geometry and material', () => {
    const laser = new Laser(new THREE.Vector2(), new THREE.Vector2(), 0xffffff);
    const geometryDisposeSpy = vi.spyOn(laser.mesh.geometry, 'dispose');
    const materialDisposeSpy = vi.spyOn(laser.mesh.material as THREE.Material, 'dispose');
    
    laser.dispose();
    
    expect(geometryDisposeSpy).not.toHaveBeenCalled();
    expect(materialDisposeSpy).not.toHaveBeenCalled();
  });

  it('reuses geometry and material for same color', () => {
    const origin = new THREE.Vector2();
    const target = new THREE.Vector2();
    const laser1 = new Laser(origin, target, 0xffffff);
    const laser2 = new Laser(origin, target, 0xffffff);

    expect(laser1.mesh.geometry).toBe(laser2.mesh.geometry);
    expect(laser1.mesh.material).toBe(laser2.mesh.material);
  });

  it('reuses geometry but different material for different color', () => {
    const origin = new THREE.Vector2();
    const target = new THREE.Vector2();
    const laser1 = new Laser(origin, target, 0xffffff);
    const laser2 = new Laser(origin, target, 0xff0000);

    expect(laser1.mesh.geometry).toBe(laser2.mesh.geometry);
    expect(laser1.mesh.material).not.toBe(laser2.mesh.material);
  });
});
