import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Trench } from './Trench';

describe('Trench Visuals', () => {
  let trench: Trench;

  beforeEach(() => {
    trench = new Trench(1);
  });

  it('catwalks should be clean rectangular outlines (no diagonals)', () => {
    const catwalks = trench.mesh.children.filter(child => child.name === 'catwalk');
    
    // There should be catwalks
    expect(catwalks.length).toBeGreaterThan(0);

    const firstCatwalk = catwalks[0] as THREE.LineSegments;
    const geometry = firstCatwalk.geometry;
    const positionAttribute = geometry.getAttribute('position');

    // BoxGeometry Edges have 24 vertices (12 edges * 2 points).
    // The previous truss implementation had 32 (24 + 8 for diagonals).
    expect(positionAttribute.count).toBe(24);
  });
});
