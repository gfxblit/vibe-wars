import { describe, it, expect, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { SurfaceObstacleFactory } from './SurfaceObstacleFactory';
import { Tower } from './Tower';
import { Turret } from './Turret';
import { GameConfig } from '../config';

describe('SurfaceObstacleFactory', () => {
  const factory = new SurfaceObstacleFactory();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create a Tower', () => {
    const pos = new THREE.Vector3(1, 2, 3);
    const obstacle = factory.createTower(pos);
    expect(obstacle).toBeInstanceOf(Tower);
    expect(obstacle.position.equals(pos)).toBe(true);
  });

  it('should create a Turret', () => {
    const pos = new THREE.Vector3(1, 2, 3);
    const obstacle = factory.createTurret(pos);
    expect(obstacle).toBeInstanceOf(Turret);
    expect(obstacle.position.equals(pos)).toBe(true);
    // Turret should be rotated to lie on the ground
    expect(obstacle.mesh.rotation.x).toBeCloseTo(-Math.PI / 2);
  });

  it('should create a random obstacle based on probability', () => {
    const pos = new THREE.Vector3(1, 2, 3);
    
    // Test for Turret
    vi.spyOn(Math, 'random').mockReturnValue(GameConfig.stages.surface.turretSpawnProbability - 0.01);
    const turret = factory.createRandom(pos);
    expect(turret).toBeInstanceOf(Turret);
    
    // Test for Tower
    vi.spyOn(Math, 'random').mockReturnValue(GameConfig.stages.surface.turretSpawnProbability + 0.01);
    const tower = factory.createRandom(pos);
    expect(tower).toBeInstanceOf(Tower);
  });
});
