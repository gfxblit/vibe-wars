import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Trench } from './Trench';
import { GameConfig } from '../config';

describe('Trench Truss Rendering', () => {
  let trench: Trench;

  beforeEach(() => {
    trench = new Trench();
  });

  it('should use LineSegments for catwalks', () => {
    // Find catwalks in the mesh group
    const catwalks = trench.mesh.children.filter(child => {
      // Catwalks are at x=0, and y is +/- 20
      const isAtCatwalkPos = child.position.x === 0 && 
                             (child.position.y === GameConfig.stage.catwalkYOffset || 
                              child.position.y === -GameConfig.stage.catwalkYOffset);
      const isInZRange = child.position.z >= GameConfig.stage.catwalkEndZ && 
                         child.position.z <= GameConfig.stage.catwalkStartZ;
      return isAtCatwalkPos && isInZRange;
    });

    expect(catwalks.length).toBeGreaterThan(0);
    catwalks.forEach(catwalk => {
      expect(catwalk).toBeInstanceOf(THREE.LineSegments);
      const lineSegments = catwalk as THREE.LineSegments;
      const material = lineSegments.material as THREE.LineBasicMaterial;
      expect(material.color.getHex()).toBe(GameConfig.stage.catwalkColor);

      // Verify geometry has expected number of vertices
      // Box edges: 12 edges * 2 vertices = 24
      // "X" bracing: 2 "X"s * 2 lines * 2 vertices = 8
      // Total: 32 vertices
      const position = lineSegments.geometry.getAttribute('position');
      expect(position.count).toBe(32);
    });
  });
});
