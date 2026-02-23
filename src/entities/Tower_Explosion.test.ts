import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Tower } from './Tower';
import { GameConfig } from '../config';

describe('Tower Explosion', () => {
  let tower: Tower;
  const position = new THREE.Vector3(0, 0, 0);

  beforeEach(() => {
    tower = new Tower(position);
  });

  it('should set isExploded to true when explode() is called', () => {
    expect(tower.isExploded).toBe(false);
    tower.explode();
    expect(tower.isExploded).toBe(true);
  });

  it('should change material color to config value when exploded', () => {
    tower.explode();
    
    tower.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshBasicMaterial;
        expect(material.color.getHex()).toBe(GameConfig.stages.surface.towerExplosionColor);
      }
    });
  });

  it('should only explode intended debris, not all children', () => {
    // Add a "non-debris" child, like a debug helper or nested mesh
    const nonDebris = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
    nonDebris.name = 'non-debris';
    const initialPos = nonDebris.position.clone();
    tower.mesh.add(nonDebris);

    tower.explode();
    tower.update(0.1, new THREE.Vector3(0, 0, 100));

    // The non-debris child should NOT have moved (because it wasn't part of the initial debris)
    expect(nonDebris.position.equals(initialPos)).toBe(true);
  });

  it('should move and rotate debris in update() when isExploded is true', () => {
    const playerPos = new THREE.Vector3(0, 0, 100);
    const dt = 0.1;

    // Mock Math.random for predictable velocities
    const randomMock = vi.spyOn(Math, 'random').mockReturnValue(0.7);

    // Identify debris by name (we'll add this to Tower.ts)
    const debris = tower.mesh.children.filter(child => child.name === 'debris');
    expect(debris.length).toBeGreaterThan(0);

    const initialStates = debris.map(child => ({
      position: child.position.clone(),
      rotation: child.rotation.clone(),
    }));

    tower.explode();
    tower.update(dt, playerPos);

    debris.forEach((child, index) => {
      const initialState = initialStates[index];
      // Position should have changed
      expect(child.position.equals(initialState.position)).toBe(false);
      
      // Rotation should have changed
      expect(child.rotation.equals(initialState.rotation)).toBe(false);
    });

    randomMock.mockRestore();
  });

  it('should NOT move or rotate children in update() when isExploded is false', () => {
    const playerPos = new THREE.Vector3(0, 0, 100);
    const dt = 0.1;

    // Get initial positions and rotations
    const initialPositions = tower.mesh.children.map(child => child.position.clone());
    const initialRotations = tower.mesh.children.map(child => new THREE.Euler().copy(child.rotation));

    tower.update(dt, playerPos);

    tower.mesh.children.forEach((child, index) => {
      expect(child.position.x).toBe(initialPositions[index].x);
      expect(child.position.y).toBe(initialPositions[index].y);
      expect(child.position.z).toBe(initialPositions[index].z);
      
      expect(child.rotation.x).toBe(initialRotations[index].x);
      expect(child.rotation.y).toBe(initialRotations[index].y);
      expect(child.rotation.z).toBe(initialRotations[index].z);
    });
  });

  it('should keep components visible after explosion', () => {
    tower.explode();
    
    tower.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        expect(child.visible).toBe(true);
      }
    });
  });

  it('should return correct position', () => {
    expect(tower.position.equals(position)).toBe(true);
  });

  it('should return correct world position', () => {
    const target = new THREE.Vector3();
    const worldPos = tower.getWorldPosition(target);
    expect(worldPos.equals(position)).toBe(true);
    expect(target.equals(position)).toBe(true);
  });

  it('should return direction vector when fireCooldown expires', () => {
    // Tower constructor initializes fireCooldown to Math.random() * GameConfig.fireball.fireRate
    // Let's force it by calling update with a large delta
    const playerPos = new THREE.Vector3(0, 0, 100);
    const result = tower.update(GameConfig.fireball.fireRate + 1, playerPos);
    
    expect(result).not.toBeNull();
    expect(result instanceof THREE.Vector3).toBe(true);
    // Direction should be (0, 0, 1) if player is at (0, 0, 100) and tower at (0, 0, 0)
    expect(result?.z).toBeGreaterThan(0.9);
  });

  it('should return correct score', () => {
    // GameConfig.stages.surface.towerPoints is 200
    expect(tower.getScore()).toBe(200);
  });

  it('should return correct fireball size and speed', () => {
    expect(tower.getFireballSize()).toBe(40.0);
    expect(tower.getFireballSpeed()).toBe(400.0);
    
    // Test with debug context
    const context = { surfaceFireballSize: 50.0, surfaceFireballSpeed: 500.0 };
    expect(tower.getFireballSize(context)).toBe(50.0);
    expect(tower.getFireballSpeed(context)).toBe(500.0);
  });

  it('should return zero velocity', () => {
    const playerForward = new THREE.Vector3(0, 0, -1);
    const velocity = tower.getVelocity(playerForward, 100);
    expect(velocity.x).toBe(0);
    expect(velocity.y).toBe(0);
    expect(velocity.z).toBe(0);
  });

  it('should check collision when not exploded', () => {
    const playerBox = new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(0, 25, 0),
      new THREE.Vector3(10, 10, 10)
    );
    expect(tower.checkCollision(playerBox)).toBe(true);

    const farBox = new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(100, 100, 100),
      new THREE.Vector3(10, 10, 10)
    );
    expect(tower.checkCollision(farBox)).toBe(false);
  });

  it('should NOT check collision when exploded', () => {
    tower.explode();
    const playerBox = new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(0, 25, 0),
      new THREE.Vector3(10, 10, 10)
    );
    expect(tower.checkCollision(playerBox)).toBe(false);
  });

  it('should dispose resources correctly', () => {
    const disposeSpy = vi.spyOn(THREE.MeshBasicMaterial.prototype, 'dispose');
    const geoDisposeSpy = vi.spyOn(THREE.BoxGeometry.prototype, 'dispose');
    
    tower.dispose();
    
    expect(disposeSpy).toHaveBeenCalled();
    expect(geoDisposeSpy).toHaveBeenCalled();
    
    disposeSpy.mockRestore();
    geoDisposeSpy.mockRestore();
  });
});
