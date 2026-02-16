import { describe, it, expect, vi } from 'vitest';
import * as THREE from 'three';
import { Laser } from './Laser';

describe('Laser (HUD-based)', () => {
  it('updates progress and moves the mesh', () => {
    const laser = new Laser(-1, 1, 0, 0, 0xffffff);
    
    const initialPosition = laser.mesh.position.clone();
    laser.update(0.05);
    expect(laser.mesh.position.equals(initialPosition)).toBe(false);
  });

  it('expires when progress reaches 1.0', () => {
    const laser = new Laser(-1, 1, 0, 0, 0xffffff);
    
    expect(laser.isExpired()).toBe(false);
    
    // speed 2000, depth 200 => 10 units/sec. 1.0 takes 0.1s.
    laser.update(0.2); 
    expect(laser.isExpired()).toBe(true);
  });

  it('reuses geometry and material', () => {
    const laser1 = new Laser(0, 0, 1, 1, 0xff0000);
    const laser2 = new Laser(0, 0, 1, 1, 0xff0000);
    const laser3 = new Laser(0, 0, 1, 1, 0x00ff00);

    expect(laser1.mesh.geometry).toBe(laser2.mesh.geometry);
    expect(laser1.mesh.material).toBe(laser2.mesh.material);

    expect(laser1.mesh.geometry).toBe(laser3.mesh.geometry);
    expect(laser1.mesh.material).not.toBe(laser3.mesh.material);
  });

  it('dispose does NOT dispose shared geometry/material', () => {
    const laser = new Laser(0, 0, 1, 1, 0xffffff);
    const geometryDisposeSpy = vi.spyOn(laser.mesh.geometry, 'dispose');
    const materialDisposeSpy = vi.spyOn(laser.mesh.material as THREE.Material, 'dispose');
    
    laser.dispose();
    
    expect(geometryDisposeSpy).not.toHaveBeenCalled();
    expect(materialDisposeSpy).not.toHaveBeenCalled();
  });
});
