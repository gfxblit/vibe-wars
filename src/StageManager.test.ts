import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { StageManager } from './StageManager';
import { TrenchStage } from './stages/TrenchStage';
import { Player } from './entities/Player';
import { GameConfig } from './config';
import { state, initGame } from './state';

describe('StageManager', () => {
  let scene: THREE.Scene;
  let hudScene: THREE.Scene;
  let stageManager: StageManager;
  let player: Player;

  beforeEach(() => {
    scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    stageManager = state.stageManager!;
    player = state.player!;
  });

  it('should initialize with DogfightStage', () => {
    expect(state.stage).toBe('DOGFIGHT');
  });

  it('should NOT transition to SurfaceStage immediately when kill threshold is met, but start approach', () => {
    state.kills = GameConfig.stage.dogfightKillsThreshold;
    stageManager.update(0.1, player);

    // Should still be in DOGFIGHT stage, but in approach phase
    expect(state.stage).toBe('DOGFIGHT');
    
    // Should have spawned DeathStar
    expect(scene.getObjectByName('DeathStar')).toBeTruthy();

    // Verify TIE fighters are cleared and spawning is disabled
    expect(state.entityManager!.getTieFighters().length).toBe(0);
  });

  it('should transition to TRENCH when player is close to DeathStar in Wave 1', () => {
    state.wave = 1;
    state.kills = GameConfig.stage.dogfightKillsThreshold;
    stageManager.update(0.1, player); // Trigger approach
    expect(state.stage).toBe('DOGFIGHT');

    const deathStar = scene.getObjectByName('DeathStar');
    expect(deathStar).toBeTruthy();

    const dsPos = deathStar!.position.clone();
    player.position.copy(dsPos).add(new THREE.Vector3(0, 0, GameConfig.stage.deathStarSize + GameConfig.stage.trenchTransitionDistance - 10));

    stageManager.update(0.1, player);

    expect(state.stage).toBe('TRENCH');
  });

  it('should transition to SURFACE when player is close to DeathStar in Wave 2+', () => {
    state.wave = 2;
    state.kills = GameConfig.stage.dogfightKillsThreshold;
    stageManager.update(0.1, player); // Trigger approach
    expect(state.stage).toBe('DOGFIGHT');

    const deathStar = scene.getObjectByName('DeathStar');
    expect(deathStar).toBeTruthy();

    const dsPos = deathStar!.position.clone();
    player.position.copy(dsPos).add(new THREE.Vector3(0, 0, GameConfig.stage.deathStarSize + GameConfig.stage.trenchTransitionDistance - 10));

    stageManager.update(0.1, player);

    expect(state.stage).toBe('SURFACE');
  });

  it('should transition to TrenchStage when SurfaceStage timer expires', () => {
    // Manually set stage to SURFACE for this test
    state.wave = 2;
    state.stage = 'SURFACE';
    stageManager.reset(); // Re-init stage manager to pick up SURFACE stage
    
    stageManager.update(0.1, player);
    expect(state.stage).toBe('SURFACE');

    // Advance time past surface duration
    stageManager.update(GameConfig.stage.surfaceDuration + 1.0, player);

    expect(state.stage).toBe('TRENCH');
    
    // Verify player reset logic for Trench
    expect(player.position.x).toBe(0);
    expect(player.position.y).toBe(0);
    expect(player.position.z).toBe(0);
    expect(player.mesh.quaternion.w).toBe(1);
  });

  it('should apply trench clamping in TRENCH stage', () => {
    state.stage = 'TRENCH';
    stageManager.reset();

    const halfWidth = GameConfig.stage.trenchWidth / 2;
    const halfHeight = GameConfig.stage.trenchHeight / 2;

    player.position.set(halfWidth + 10, halfHeight + 10, 0);
    stageManager.update(0.1, player);

    expect(player.position.x).toBeLessThanOrEqual(halfWidth);
    expect(player.position.y).toBeLessThanOrEqual(halfHeight);

    player.position.set(-halfWidth - 10, -halfHeight - 10, 0);
    stageManager.update(0.1, player);

    expect(player.position.x).toBeGreaterThanOrEqual(-halfWidth);
    expect(player.position.y).toBeGreaterThanOrEqual(-halfHeight);
  });

  it('should detect collision with catwalks in TRENCH stage', () => {
    state.stage = 'TRENCH';
    stageManager.reset();
    const initialShields = state.shields;

    player.position.set(0, -20, -500);
    stageManager.update(0.1, player);
    expect(state.shields).toBe(initialShields - 1);

    stageManager.update(0.1, player);
    expect(state.shields).toBe(initialShields - 1);

    const currentShields = state.shields;
    player.position.set(0, 20, -1000);
    stageManager.update(0.1, player);
    expect(state.shields).toBe(currentShields - 1);
  });

  it('should allow passing safely through gaps in TRENCH stage', () => {
    state.stage = 'TRENCH';
    stageManager.reset();
    const initialShields = state.shields;

    player.position.set(0, 20, -500);
    stageManager.update(0.1, player);
    expect(state.shields).toBe(initialShields);

    player.position.set(0, -20, -1000);
    stageManager.update(0.1, player);
    expect(state.shields).toBe(initialShields);
  });

  it('should restart trench stage and take damage when reaching end of trench', () => {
    state.stage = 'TRENCH';
    stageManager.reset();
    const initialShields = state.shields;

    player.position.set(0, 0, -GameConfig.stage.trenchLength - 100);
    stageManager.update(0.1, player);

    expect(state.stage).toBe('TRENCH');
    expect(state.shields).toBe(initialShields - 1);
    expect(player.position.z).toBe(0);
  });

  it('should restart trench stage and take damage when hitting the exhaust port structure', () => {
    state.stage = 'TRENCH';
    stageManager.reset();
    const initialShields = state.shields;

    const { catwalkEndZ, exhaustPortZOffset, trenchHeight } = GameConfig.stage;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    const portY = -trenchHeight / 2 + 10;

    player.position.set(0, portY, portZ);
    stageManager.update(0.1, player);

    expect(state.stage).toBe('TRENCH');
    expect(state.shields).toBe(initialShields - 1);
    expect(player.position.z).toBe(0);
  });

  it('should complete level when a torpedo hits the exhaust port', () => {
    state.stage = 'TRENCH';
    stageManager.reset();
    
    const { catwalkEndZ, exhaustPortZOffset, trenchHeight } = GameConfig.stage;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    const portY = -trenchHeight / 2 + 10;
    
    state.entityManager!.spawnTorpedo(
      new THREE.Vector3(0, portY, portZ),
      new THREE.Vector3(0, 0, 0)
    );
    
    stageManager.update(0.1, player);
    
    expect(state.stage).not.toBe('TRENCH');
  });

  it('should explode torpedo when it hits a catwalk', () => {
    state.stage = 'TRENCH';
    stageManager.reset();
    
    const torpedo = state.entityManager!.spawnTorpedo(
      new THREE.Vector3(0, -20, -500),
      new THREE.Vector3(0, 0, 0)
    );
    
    stageManager.update(0.1, player);
    
    expect(torpedo.isExploded).toBe(true);
  });

  it('should spawn fireballs from turrets in TRENCH stage', () => {
    state.stage = 'TRENCH';
    stageManager.reset();
    
    // Clear any existing fireballs
    state.entityManager!.clear();
    
    // Re-register turrets after clear()
    const stage = stageManager.getStage() as TrenchStage;
    stage.getTurrets().forEach((t) => {
      state.entityManager!.addTarget(t);
      (t as any).fireCooldown = 0; // Set fire cooldown of all turrets to 0
    });

    // Player position near some turrets (turrets are at -500, -1500, etc. based on 1000 spacing)
    player.position.set(0, 0, -400);
    
    state.entityManager!.update(0.1, player.position, player.mesh.quaternion, true, new THREE.Camera(), 100);
    stageManager.update(0.1, player);
    
    const fireballs = state.entityManager!.getFireballs();
    expect(fireballs.length).toBeGreaterThan(0);
  });
});
