import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { Fireball } from './entities/Fireball';

describe('Fireball Visual Properties', () => {
  it('should have depthWrite disabled to prevent black background artifacts', () => {
    const fireball = new Fireball(new THREE.Vector3(), new THREE.Vector3());
    
    fireball.mesh.children.forEach((child) => {
      if (child instanceof THREE.Sprite) {
        expect(child.material.depthWrite).toBe(false);
      }
    });
  });

  it('should have transparency and additive blending enabled', () => {
    const fireball = new Fireball(new THREE.Vector3(), new THREE.Vector3());
    
    fireball.mesh.children.forEach((child) => {
      if (child instanceof THREE.Sprite) {
        expect(child.material.transparent).toBe(true);
        expect(child.material.blending).toBe(THREE.AdditiveBlending);
      }
    });
  });
});
