import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { state, initGame } from './state';
import { GameConfig } from './config';
import { TrenchStage } from './stages/TrenchStage';
import { GameSystem } from './GameSystem';

describe('Trench Turret Integration', () => {
  let worldScene: THREE.Scene;
  let hudScene: THREE.Scene;

  beforeEach(() => {
    worldScene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(worldScene, hudScene);
  });

  it('should spawn turrets in TRENCH stage', () => {
    state.stage = 'TRENCH';
    state.stageManager!.reset();

    const trenchStage = state.stageManager!.getStage() as TrenchStage;
    expect(trenchStage).toBeInstanceOf(TrenchStage);

    const turrets = trenchStage.getTurrets();
    expect(turrets.length).toBeGreaterThan(0);

    // Verify they are added to the scene
    let turretMeshesFound = 0;
    worldScene.traverse(child => {
      if (child instanceof THREE.Group && turrets.some(t => t.mesh === child)) {
        turretMeshesFound++;
      }
    });
    expect(turretMeshesFound).toBe(turrets.length);

    // Verify they are registered as targets in EntityManager
    const targets = state.entityManager!.getTargets();
    turrets.forEach(turret => {
      expect(targets).toContain(turret);
    });
  });

  it('should allow destroying turrets with lasers', () => {
    state.stage = 'TRENCH';
    state.stageManager!.reset();

    const trenchStage = state.stageManager!.getStage() as TrenchStage;
    const turret = trenchStage.getTurrets()[0];
    const turretPos = turret.position.clone();

    // Position player to look at the turret
    state.player!.position.set(turretPos.x, turretPos.y, turretPos.z + 100);
    
    const camera = new THREE.PerspectiveCamera();
    const gameSystem = new GameSystem(camera);

    camera.position.copy(state.player!.position);
    camera.lookAt(turretPos);
    camera.updateMatrixWorld();

    const initialScore = state.score;
    const initialKills = state.kills;

    // Fire at the turret
    gameSystem.update(0.1, { x: 0, y: 0, isFiring: true });

    expect(turret.isExploded).toBe(true);
    expect(state.score).toBe(initialScore + GameConfig.turret.points);
    expect(state.kills).toBe(initialKills + 1);
  });

  it('should fire fireballs from turrets', () => {
    state.stage = 'TRENCH';
    state.stageManager!.reset();

    const trenchStage = state.stageManager!.getStage() as TrenchStage;
    const turret = trenchStage.getTurrets()[0];
    
    // Force fire cooldown to 0
    (turret as any).fireCooldown = 0;

    const turretPos = new THREE.Vector3();
    turret.getWorldPosition(turretPos);

    // Position player ahead of the turret (player.z > turret.z) and within range
    state.player!.position.set(turretPos.x, turretPos.y, turretPos.z + 100);
    
    const camera = new THREE.PerspectiveCamera();
    const gameSystem = new GameSystem(camera);

    camera.position.copy(state.player!.position);
    camera.lookAt(turretPos);
    camera.updateMatrixWorld();

    const initialFireballs = state.entityManager!.getFireballs().length;

    // Update should trigger turret firing
    gameSystem.update(0.1, { x: 0, y: 0, isFiring: false });

    const fireballs = state.entityManager!.getFireballs();
    expect(fireballs.length).toBeGreaterThan(initialFireballs);
  });
});
