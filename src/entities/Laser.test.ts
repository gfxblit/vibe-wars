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

  it('disposes of geometry and material', () => {
    const laser = new Laser(new THREE.Vector2(), new THREE.Vector2(), 0xffffff);
    const geometryDisposeSpy = vi.spyOn(laser.mesh.geometry, 'dispose');
    const materialDisposeSpy = vi.spyOn(laser.mesh.material as THREE.Material, 'dispose');
    
    laser.dispose();
    
    expect(geometryDisposeSpy).toHaveBeenCalled();
    expect(materialDisposeSpy).toHaveBeenCalled();
  });

  it('sets material color intensity based on bloom setting', () => {
    // We can't easily mock GameConfig because it's a const and frozen
    // But we can check if it respects what's in GameConfig
    const laser = new Laser(new THREE.Vector2(), new THREE.Vector2(), 0x00ff00);
    const material = laser.mesh.material as THREE.MeshBasicMaterial;
    
    // Default in GameConfig for laser.bloom is true
    // If we implement it by scaling by 2.0 when true, we expect g to be 2.0
    expect(material.color.g).toBeGreaterThan(1.0);
    
    // Wait, I should probably make it configurable in the constructor or use state
  });
});
