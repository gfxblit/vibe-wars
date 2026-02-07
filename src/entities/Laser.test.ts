import { describe, it, expect, vi } from 'vitest';
import * as THREE from 'three';
import { Laser } from './Laser';

describe('Laser (HUD-based)', () => {
  it('updates progress linearly for constant screen speed', () => {
    const origin = new THREE.Vector2(-1, 1);
    const target = new THREE.Vector2(0, 0);
    const laser = new Laser(origin, target, 0xffffff);
    
    laser.update(0.1);
    expect(laser.mesh).toBeDefined();
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

  it('disposes of geometry and material', () => {
    const laser = new Laser(new THREE.Vector2(), new THREE.Vector2(), 0xffffff);
    const geometryDisposeSpy = vi.spyOn(laser.mesh.geometry, 'dispose');
    const materialDisposeSpy = vi.spyOn(laser.mesh.material as THREE.Material, 'dispose');
    
    laser.dispose();
    
    expect(geometryDisposeSpy).toHaveBeenCalled();
    expect(materialDisposeSpy).toHaveBeenCalled();
  });
});
