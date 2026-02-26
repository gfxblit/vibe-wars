import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { MaterialSystem } from './MaterialSystem';
import { state } from './state';

describe('MaterialSystem', () => {
  let materialSystem: MaterialSystem;
  let material: THREE.LineBasicMaterial;

  beforeEach(() => {
    materialSystem = new MaterialSystem();
    material = new THREE.LineBasicMaterial({ color: 0xffffff });
    // Reset state debug flags
    Object.keys(state).forEach(key => {
      if (key.startsWith('debug') && key.endsWith('Bloom')) {
        (state as any)[key] = undefined;
      }
    });
  });

  it('should register a material and update its color based on bloom state', () => {
    const baseColor = 0x00ff00;
    materialSystem.register(material, 'Player', baseColor);

    // Initial update (default config: bloom on)
    materialSystem.update();
    // 0x00ff00 * 2.0 = 0x00ff00 in Hex? Wait, multiplyScalar on Color object.
    const expectedColor = new THREE.Color(baseColor).multiplyScalar(2.0);
    expect(material.color.getHex()).toBe(expectedColor.getHex());

    // Turn off bloom via debug
    state.debugPlayerBloom = false;
    materialSystem.update();
    expect(material.color.getHex()).toBe(baseColor);
  });

  it('should handle multiple materials in the same category', () => {
    const mat2 = new THREE.LineBasicMaterial({ color: 0xffffff });
    materialSystem.register(material, 'Laser', 0x00ffff);
    materialSystem.register(mat2, 'Laser', 0x00ffff);

    state.debugLaserBloom = true;
    materialSystem.update();
    const expectedColor = new THREE.Color(0x00ffff).multiplyScalar(2.0);
    expect(material.color.getHex()).toBe(expectedColor.getHex());
    expect(mat2.color.getHex()).toBe(expectedColor.getHex());
  });

  it('should unregister a material', () => {
    const baseColor = 0xff0000;
    materialSystem.register(material, 'Turret', baseColor);
    materialSystem.unregister(material);

    state.debugTurretBloom = true;
    materialSystem.update();
    // Should NOT have updated to 2.0 intensity
    expect(material.color.getHex()).toBe(baseColor);
  });

  it('should use GameConfig default if debug flag is undefined', () => {
    // Assuming GameConfig.fireball.bloom is true in our test environment
    materialSystem.register(material, 'Fireball', 0xffa500);
    state.debugFireballBloom = undefined;

    materialSystem.update();
    const expectedColor = new THREE.Color(0xffa500).multiplyScalar(2.0);
    expect(material.color.getHex()).toBe(expectedColor.getHex());
  });
});
