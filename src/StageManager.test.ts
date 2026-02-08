import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { StageManager } from './StageManager';
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

  it('should transition to SurfaceStage when kill threshold is met', () => {
    state.kills = GameConfig.stage.trenchKillsThreshold;
    stageManager.update(0.1, player);

    expect(state.stage).toBe('SURFACE');
    expect(scene.children.some(child => child.type === 'Mesh' && (child as THREE.Mesh).geometry.type === 'SphereGeometry')).toBe(true);

    // Verify TIE fighters are cleared and spawning is disabled
    expect(state.entityManager!.getTieFighters().length).toBe(0);
  });

  it('should transition to TrenchStage when player is close to DeathStar', () => {
    state.kills = GameConfig.stage.trenchKillsThreshold;
    stageManager.update(0.1, player);
    expect(state.stage).toBe('SURFACE');

    const deathStarMesh = scene.children.find(child => child.type === 'Mesh' && (child as THREE.Mesh).geometry.type === 'SphereGeometry') as THREE.Mesh;
    expect(deathStarMesh).toBeDefined();

    const dsPos = deathStarMesh.position.clone();
    player.position.copy(dsPos).add(new THREE.Vector3(0, 0, GameConfig.stage.deathStarSize + GameConfig.stage.trenchTransitionDistance - 10));

    stageManager.update(0.1, player);

    expect(state.stage).toBe('TRENCH');
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

  it('should complete level when reaching end of trench', () => {
    state.stage = 'TRENCH';
    stageManager.reset();

    player.position.set(0, 0, -GameConfig.stage.trenchLength - 100);
    stageManager.update(0.1, player);

    expect(state.stage).not.toBe('TRENCH');
  });

  it('should complete level when hitting the exhaust port', () => {
    state.stage = 'TRENCH';
    stageManager.reset();

    const { catwalkEndZ, exhaustPortZOffset, trenchHeight } = GameConfig.stage;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    const portY = -trenchHeight / 2 + 10;

    player.position.set(0, portY, portZ);
    stageManager.update(0.1, player);

    expect(state.stage).not.toBe('TRENCH');
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
});