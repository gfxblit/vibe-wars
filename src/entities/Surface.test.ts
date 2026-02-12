import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';
import { Surface } from './Surface';
import { GameConfig } from '../config';

describe('Surface Entity', () => {
  let surface: Surface;

  beforeEach(() => {
    surface = new Surface();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with a mesh containing a floor', () => {
    expect(surface.mesh).toBeDefined();
    // floor is added to mesh. 
    // We can check if it has children (floor + maybe towers if spawned immediately? No, towers spawn in update)
    // Floor is a Group containing GridHelper (LineSegments)
    expect(surface.mesh.children.length).toBeGreaterThan(0);
  });

  it('should spawn towers over time', () => {
    const initialTowers = surface.getTowers().length;
    expect(initialTowers).toBe(0);

    // Update with enough time to trigger spawn
    // nextTowerSpawnTime starts at 0, so first update should spawn?
    // In code: if (elapsedTime >= nextTowerSpawnTime) spawn.
    // elapsedTime starts at 0. nextTowerSpawnTime starts at 0.
    // update(0.1) -> elapsedTime=0.1. 0.1 >= 0 -> spawn.
    
    surface.update(0.1, new THREE.Vector3(0, 0, 0)); // playerZ = 0
    
    expect(surface.getTowers().length).toBeGreaterThan(0);
  });

  it('should remove distant towers', () => {
    // Force spawn a tower
    surface.update(0.1, new THREE.Vector3(0, 0, 0));
    const towers = surface.getTowers();
    const tower = towers[0];
    
    // Tower is spawned at playerZ - 1000.
    // If player moves PAST the tower + 200, it is removed.
    // Tower Z is approx -1000.
    // Remove condition: tower.z > playerZ + 200.
    // Wait, tower.z (-1000) > playerZ + 200?
    // If playerZ is -2000. -1000 > -1800. Yes.
    // The player moves in negative Z.
    // So "behind" means greater Z value than player (closer to 0).
    
    // Move player far ahead (negative Z)
    const playerZ = -2000;
    surface.update(0.1, new THREE.Vector3(0, 0, playerZ));
    
    expect(surface.getTowers()).not.toContain(tower);
  });

  it('should detect floor collision', () => {
    const playerBox = new THREE.Box3();
    const position = new THREE.Vector3(0, GameConfig.stage.surfaceFloorY - 5, 0);
    
    const { floorHit } = surface.checkCollisions(playerBox, position);
    expect(floorHit).toBe(true);
  });
  
  it('should detect tower collision', () => {
      // Force spawn
      surface.update(0.1, new THREE.Vector3(0, 0, 0));
      const tower = surface.getTowers()[0];
      
      const playerBox = new THREE.Box3().setFromObject(tower.mesh); // Overlap exactly
      const position = new THREE.Vector3(0, 0, 0);
      
      const { towerHit } = surface.checkCollisions(playerBox, position);
      expect(towerHit).toBe(tower);
  });

  it('should trigger spawnFireball callback when towers fire', () => {
    // Force spawn
    vi.spyOn(Math, 'random').mockReturnValue(0); // Ensure immediate firing
    surface.update(0.1, new THREE.Vector3(0, 0, 0));
    
    const spawnFireball = vi.fn();
    const playerPos = new THREE.Vector3(0, 0, 0); // Player is ahead of tower (tower at -1000)
    // Wait, if tower is at -1000, and player at 0. Player is BEHIND tower?
    // Player moves -Z.
    // 0 is start. -1000 is destination.
    // Tower spawns at playerZ - 1000 = -1000.
    // So tower is ahead of player.
    // Tower fires at player.

    // Update with time delta to trigger fire
    // Note: First update consumed the initial 0 cooldown. It reset to 2.0.
    // So we need to advance > 2.0s.
    surface.update(2.1, playerPos, spawnFireball);
    
    expect(spawnFireball).toHaveBeenCalled();
  });
});
