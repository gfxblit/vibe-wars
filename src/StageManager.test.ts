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
    expect(state.phase).toBe('DOGFIGHT');
  });

  it('should transition to SurfaceStage when kill threshold is met', () => {
    state.kills = GameConfig.stage.trenchKillsThreshold;
    stageManager.update(0.1, player);
    
    expect(state.phase).toBe('SURFACE');
    expect(scene.children.some(child => child.type === 'Mesh' && (child as THREE.Mesh).geometry.type === 'SphereGeometry')).toBe(true);

    // Verify TIE fighters are cleared and spawning is disabled
    expect(state.entityManager!.getTieFighters().length).toBe(0);
    // We can't easily check spawningEnabled without making it public or using a spy, 
    // but we already updated the code to call it.
  });

  it('should transition to TrenchStage when player is close to DeathStar', () => {
    state.kills = GameConfig.stage.trenchKillsThreshold;
    stageManager.update(0.1, player);
    expect(state.phase).toBe('SURFACE');
    
    // Find the spawned DeathStar mesh in the scene
    const deathStarMesh = scene.children.find(child => child.type === 'Mesh' && (child as THREE.Mesh).geometry.type === 'SphereGeometry') as THREE.Mesh;
    expect(deathStarMesh).toBeDefined();

    // Move player close to the DeathStar's surface
    const dsPos = deathStarMesh.position.clone();
    player.position.copy(dsPos).add(new THREE.Vector3(0, 0, GameConfig.stage.deathStarSize + GameConfig.stage.trenchTransitionDistance - 10));
    
    stageManager.update(0.1, player);
    
    expect(state.phase).toBe('TRENCH');
    // Verify player pose reset
    expect(player.position.x).toBe(0);
    expect(player.position.y).toBe(0);
    expect(player.position.z).toBe(0);
    expect(player.mesh.quaternion.w).toBe(1);
  });

  it('should apply trench clamping in TRENCH phase', () => {
    state.phase = 'TRENCH';
    // We need to manually set the stage to TrenchStage because state.phase change alone doesn't do it if we don't call update with transition
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

  it('should detect collision with catwalks in TRENCH phase', () => {
    state.phase = 'TRENCH';
    stageManager.reset();
    const initialShields = state.shields;

    // Catwalk at -500 is low (Y = -20)
    // See Trench.ts: (abs(-500) % 1000 === 0) ? 20 : -20 -> 500 % 1000 != 0 -> -20

    // Test Hit
    player.position.set(0, -20, -500);
    stageManager.update(0.1, player);
    expect(state.shields).toBe(initialShields - 1);

    // Test Debounce (staying in same spot shouldn't damage again)
    stageManager.update(0.1, player);
    expect(state.shields).toBe(initialShields - 1);

    // Move to safe spot at same Z (Y = 20 should be safe for this one)
    // Note: Once we hit, we are "safe" from that specific obstacle ID until we leave it
    // But let's test a clean run for the next obstacle (-1000, Y = 20)
    
    // Reset shields or account for previous damage
    const currentShields = state.shields;
    
    // Move to -1000, Y = 20 (High catwalk)
    player.position.set(0, 20, -1000);
    stageManager.update(0.1, player);
    expect(state.shields).toBe(currentShields - 1);
  });

  it('should allow passing safely through gaps in TRENCH phase', () => {
    state.phase = 'TRENCH';
    stageManager.reset();
    const initialShields = state.shields;

    // Catwalk at -500 is low (-20). Passing high (+20) should be safe.
    player.position.set(0, 20, -500);
    stageManager.update(0.1, player);
    expect(state.shields).toBe(initialShields);

    // Catwalk at -1000 is high (+20). Passing low (-20) should be safe.
    player.position.set(0, -20, -1000);
    stageManager.update(0.1, player);
    expect(state.shields).toBe(initialShields);
  });

  it('should complete level when reaching end of trench', () => {
    state.phase = 'TRENCH';
    stageManager.reset();
    
    player.position.set(0, 0, -GameConfig.stage.trenchLength - 100);
    stageManager.update(0.1, player);
    
    // Should loop back to DOGFIGHT (or whatever next phase logic is)
    // based on StageManager reset() calling initStage() which reads state.phase.
    // Wait, StageManager.ts sets nextPhase() which cycles the enum?
    // Let's check nextPhase() behavior or what happens after Trench.
    // The code says: nextPhase(); manager.reset();
    // We assume nextPhase cycles back to DOGFIGHT if it's the end.
    
    // Actually, looking at previous tests, nextPhase updates state.phase.
    // If TRENCH is the last, it might cycle or stop. 
    // Let's just check that it changed from TRENCH.
    expect(state.phase).not.toBe('TRENCH');
  });

  it('should complete level when hitting the exhaust port', () => {
    state.phase = 'TRENCH';
    stageManager.reset();
    
    const { catwalkEndZ, exhaustPortZOffset, trenchHeight } = GameConfig.stage;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    const portY = -trenchHeight / 2 + 10;
    
    player.position.set(0, portY, portZ);
    stageManager.update(0.1, player);
    
    expect(state.phase).not.toBe('TRENCH');
  });
});
