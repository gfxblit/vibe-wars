import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { EntityManager } from './EntityManager';
import { Turret } from './Turret';
import { GameConfig } from '../config';
import { state, initGame } from '../state';
import { SurfaceObstacleFactory } from './SurfaceObstacleFactory';

describe('Turret Surface Aiming', () => {
  let scene: THREE.Scene;
  let hudScene: THREE.Scene;
  let entityManager: EntityManager;
  let factory: SurfaceObstacleFactory;

  beforeEach(() => {
    scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    entityManager = state.entityManager!;
    entityManager.clear();
    factory = new SurfaceObstacleFactory();
  });

  it('should aim correctly when placed on the ground', () => {
    // Surface floor is at -50
    const floorY = GameConfig.stages.surface.floorY;
    const turretPos = new THREE.Vector3(0, floorY, -500);
    const turret = factory.createTurret(turretPos) as Turret;
    
    // Turret is rotated -PI/2 in X in factory
    expect(turret.mesh.rotation.x).toBeCloseTo(-Math.PI / 2);

    // Player at (100, 0, -200)
    // Relative to turret: (100, 50, 300)
    const playerPos = new THREE.Vector3(100, 0, -200);
    const playerQuaternion = new THREE.Quaternion();
    
    // Force turret to fire
    (turret as any).fireCooldown = 0;

    // Update turret and capture fire direction
    const fireDirection = turret.update(0.1, playerPos, playerQuaternion, 200);
    expect(fireDirection).not.toBeNull();
    
    // Direction should point from turret towards player
    // Turret at (0, -50, -500), Player at (100, 0, -200)
    // Vector: (100, 50, 300)
    // Normalized: (0.31, 0.15, 0.93)
    expect(fireDirection!.x).toBeGreaterThan(0);
    expect(fireDirection!.y).toBeGreaterThan(0);
    expect(fireDirection!.z).toBeGreaterThan(0);
    
    const expectedDir = new THREE.Vector3().subVectors(playerPos, turret.getWorldPosition(new THREE.Vector3())).normalize();
    expect(fireDirection!.x).toBeCloseTo(expectedDir.x, 2);
    expect(fireDirection!.y).toBeCloseTo(expectedDir.y, 2);
    expect(fireDirection!.z).toBeCloseTo(expectedDir.z, 2);
  });

  it('should fire fireballs from the correct position on the ground', () => {
    const floorY = GameConfig.stages.surface.floorY;
    const turretPos = new THREE.Vector3(0, floorY, -500);
    const turret = factory.createTurret(turretPos) as Turret;
    entityManager.addTarget(turret);

    const playerPos = new THREE.Vector3(0, 0, -200);
    const playerQuaternion = new THREE.Quaternion();
    
    // Force fire
    (turret as any).fireCooldown = 0;
    
    entityManager.update(0.1, playerPos, playerQuaternion, false, new THREE.Camera(), 200);
    
    const fireballs = entityManager.getFireballs();
    expect(fireballs.length).toBe(1);
    
    const fireball = fireballs[0];
    // console.log('Fireball position Y:', fireball.position.y, 'Floor Y:', floorY);
    // Fireball should start above the floor
    expect(fireball.position.y).toBeGreaterThan(floorY);
  });
});
