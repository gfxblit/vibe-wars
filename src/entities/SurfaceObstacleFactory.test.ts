import { describe, it, expect, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { SurfaceObstacleFactory } from './SurfaceObstacleFactory';
import { Tower } from './Tower';
import { Turret } from './Turret';
import { GameConfig } from '../config';
import { state } from '../state';

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
    // Turret should be rotated so its local Z (normal) points UP (world +Y)
    // Rotating -PI/2 around X: Z becomes Y.
    expect(obstacle.mesh.rotation.x).toBeCloseTo(-Math.PI / 2);

    // Verify fireball config
    const turret = obstacle as Turret;
    expect(turret.getFireballSize()).toBe(GameConfig.stages.surface.fireballSize);
    expect(turret.getFireballSpeed()).toBe(GameConfig.stages.surface.fireballSpeed);
  });

  it('should create a random obstacle based on density and wave scaling', () => {
    const pos = new THREE.Vector3(1, 2, 3);
    const { turretDensity } = GameConfig.stages.surface;
    
    // Test for Turret at Wave 1 (no scaling)
    vi.spyOn(Math, 'random').mockReturnValue(turretDensity - 0.01);
    const turret = factory.createRandom(pos, 1);
    expect(turret).toBeInstanceOf(Turret);
    
    // Test for Tower at Wave 1
    vi.spyOn(Math, 'random').mockReturnValue(turretDensity + 0.01);
    const tower = factory.createRandom(pos, 1);
    expect(tower).toBeInstanceOf(Tower);

    // Test for Wave 2 scaling
    const wave2Multiplier = GameConfig.getDifficultyMultiplier(2);
    const scaledDensity = turretDensity * wave2Multiplier;
    
    // At wave 2, a value that was previously a tower (e.g., turretDensity + 0.01) 
    // should now be a turret if it's < scaledDensity
    expect(scaledDensity).toBeGreaterThan(turretDensity); // Ensure multiplier > 1
    
    vi.spyOn(Math, 'random').mockReturnValue(turretDensity + 0.01);
    const wave2Turret = factory.createRandom(pos, 2);
    expect(wave2Turret).toBeInstanceOf(Turret);
  });

  it('should override density if state.debugSurfaceTurretDensity is set', () => {
    const pos = new THREE.Vector3(1, 2, 3);
    state.debugSurfaceTurretDensity = 0.9;
    
    // If density is overridden to 0.9, then 0.8 is < 0.9 (Turret)
    vi.spyOn(Math, 'random').mockReturnValue(0.8);
    expect(factory.createRandom(pos, 1)).toBeInstanceOf(Turret);

    // And 0.95 is > 0.9 (Tower)
    vi.spyOn(Math, 'random').mockReturnValue(0.95);
    expect(factory.createRandom(pos, 1)).toBeInstanceOf(Tower);

    // Reset debug state
    state.debugSurfaceTurretDensity = undefined;
  });
});
