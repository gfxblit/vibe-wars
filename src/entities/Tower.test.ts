import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Tower } from './Tower';
import { GameConfig } from '../config';

describe('Tower', () => {
  let tower: Tower;

  beforeEach(() => {
    tower = new Tower(new THREE.Vector3(0, 0, 0));
  });

  it('should have a base and a top mesh with correct dimensions', () => {
    const { towerHeight, towerWidth } = GameConfig.stages.surface;
    const expectedBaseHeight = towerHeight * 0.8;
    const expectedTopHeight = towerHeight * 0.2;

    // The tower mesh is a group containing the base and top
    const base = tower.mesh.children[0] as THREE.Mesh;
    const top = tower.mesh.children[1] as THREE.Mesh;

    expect(base.geometry).toBeInstanceOf(THREE.BoxGeometry);
    expect(top.geometry).toBeInstanceOf(THREE.BoxGeometry);

    const baseGeo = base.geometry as THREE.BoxGeometry;
    const topGeo = top.geometry as THREE.BoxGeometry;

    expect(baseGeo.parameters.height).toBeCloseTo(expectedBaseHeight);
    expect(topGeo.parameters.height).toBeCloseTo(expectedTopHeight);
    
    // Top is slightly narrower (0.8 scale in code)
    expect(topGeo.parameters.width).toBeCloseTo(towerWidth * 0.8);
  });

  it('should have correct colors for base and top', () => {
    const { towerColor, towerTopColor } = GameConfig.stages.surface;
    
    const base = tower.mesh.children[0] as THREE.Mesh;
    const top = tower.mesh.children[1] as THREE.Mesh;

    const baseMat = base.material as THREE.MeshBasicMaterial;
    const topMat = top.material as THREE.MeshBasicMaterial;

    expect(baseMat.color.getHex()).toBe(towerColor);
    expect(topMat.color.getHex()).toBe(towerTopColor);
  });

  it('should position the top mesh correctly on top of the base', () => {
    const { towerHeight } = GameConfig.stages.surface;
    const expectedBaseHeight = towerHeight * 0.8;
    const expectedTopHeight = towerHeight * 0.2;

    const top = tower.mesh.children[1] as THREE.Mesh;
    
    // Position Y = baseHeight + topHeight / 2
    const expectedY = expectedBaseHeight + expectedTopHeight / 2;
    expect(top.position.y).toBeCloseTo(expectedY);
  });

  it('should return the correct fire position (top of the tower)', () => {
    const { towerHeight } = GameConfig.stages.surface;
    const expectedBaseHeight = towerHeight * 0.8;
    const expectedTopHeight = towerHeight * 0.2;
    const expectedY = expectedBaseHeight + expectedTopHeight / 2;

    const firePos = tower.getFirePosition(new THREE.Vector3());
    
    // Since tower is at (0,0,0), fire position Y should be the calculated center of the topMesh
    expect(firePos.y).toBeCloseTo(expectedY);
    expect(firePos.x).toBe(0);
    expect(firePos.z).toBe(0);
  });
});
