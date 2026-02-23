import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Tower } from './Tower';
import { GameConfig } from '../config';

describe('Tower', () => {
  let tower: Tower;
  const position = new THREE.Vector3(0, 0, 0);

  beforeEach(() => {
    tower = new Tower(position);
  });

  it('should have the correct height based on GameConfig', () => {
    // The tower consists of two boxes: base and top.
    // Base height is 0.7 * towerHeight, Top height is 0.3 * towerHeight.
    // Total height should be towerHeight.
    const towerHeight = GameConfig.stages.surface.towerHeight;
    const box = new THREE.Box3().setFromObject(tower.mesh);
    const size = new THREE.Vector3();
    box.getSize(size);
    
    // We expect the bounding box height to be towerHeight
    expect(size.y).toBeCloseTo(towerHeight);
  });

  it('should have the base mesh with the correct color', () => {
    const baseMesh = tower.mesh.children[0] as THREE.Mesh;
    const material = baseMesh.material as THREE.MeshBasicMaterial;
    expect(material.color.getHex()).toBe(GameConfig.stages.surface.towerColor);
  });

  it('should have the top mesh with the correct color', () => {
    const topMesh = tower.mesh.children[1] as THREE.Mesh;
    const material = topMesh.material as THREE.MeshBasicMaterial;
    expect(material.color.getHex()).toBe(GameConfig.stages.surface.towerTopColor);
  });

  it('should have wireframe enabled for both materials', () => {
    tower.mesh.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshBasicMaterial;
        expect(material.wireframe).toBe(true);
      }
    });
  });

  it('should use separate materials for base and top', () => {
    const baseMesh = tower.mesh.children[0] as THREE.Mesh;
    const topMesh = tower.mesh.children[1] as THREE.Mesh;
    expect(baseMesh.material).not.toBe(topMesh.material);
  });

  it('should return a direction vector when update is called and cooldown is up', () => {
    const playerPosition = new THREE.Vector3(100, 100, 100);
    // Force cooldown to be up
    // @ts-ignore - fireCooldown is private
    tower.fireCooldown = 0;
    
    const direction = tower.update(0.1, playerPosition);
    expect(direction).toBeDefined();
    expect(direction?.length()).toBeCloseTo(1);
  });

  it('should return null when update is called and cooldown is not up', () => {
    const playerPosition = new THREE.Vector3(100, 100, 100);
    // @ts-ignore - fireCooldown is private
    tower.fireCooldown = 1.0;
    
    const direction = tower.update(0.1, playerPosition);
    expect(direction).toBeNull();
  });

  it('should detect collision with player box', () => {
    const playerBox = new THREE.Box3().setFromCenterAndSize(
      tower.mesh.position.clone().add(new THREE.Vector3(0, 10, 0)),
      new THREE.Vector3(10, 10, 10)
    );
    expect(tower.checkCollision(playerBox)).toBe(true);
  });

  it('should not detect collision when exploded', () => {
    tower.explode();
    const playerBox = new THREE.Box3().setFromCenterAndSize(
      tower.mesh.position.clone().add(new THREE.Vector3(0, 10, 0)),
      new THREE.Vector3(10, 10, 10)
    );
    expect(tower.checkCollision(playerBox)).toBe(false);
  });

  it('should dispose of geometries and materials', () => {
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    
    tower.mesh.traverse(child => {
      if (child instanceof THREE.Mesh) {
        geometries.push(child.geometry);
        materials.push(child.material);
        child.geometry.dispose = vi.fn();
        child.material.dispose = vi.fn();
      }
    });

    tower.dispose();

    geometries.forEach(geo => expect(geo.dispose).toHaveBeenCalled());
    materials.forEach(mat => expect(mat.dispose).toHaveBeenCalled());
  });
});
