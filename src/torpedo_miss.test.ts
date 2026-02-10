import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { StageManager } from './StageManager';
import { Player } from './entities/Player';
import { GameConfig } from './config';
import { state, initGame } from './state';

describe('Torpedo Miss', () => {
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
    
    // Start in TRENCH stage
    state.stage = 'TRENCH';
    stageManager.reset();
  });

  it('should restart trench stage and take damage if player reaches the end without hitting the port', () => {
    const initialShields = state.shields;
    
    // Move player to the end of the trench
    player.position.z = -GameConfig.stage.trenchLength - 10;
    
    // Update stage manager
    stageManager.update(0.1, player);
    
    // Should still be in TRENCH stage (because it restarted)
    expect(state.stage).toBe('TRENCH');
    // Should have taken damage
    expect(state.shields).toBe(initialShields - 1);
    // Should have reset position to start of trench
    expect(player.position.z).toBe(0);
  });

  it('should restart trench stage and take damage if a torpedo misses the port and hits the back wall', () => {
    const initialShields = state.shields;

    // Fire a torpedo that will miss the port but hit the back of the trench
    // The port is at (0, portY, -4900)
    // We fire it at (50, 0, -5000) which is definitely a miss
    const backWallZ = -GameConfig.stage.trenchLength - 10; // Definitely beyond the trench end
    
    state.entityManager!.spawnTorpedo(
      new THREE.Vector3(50, 0, backWallZ),
      new THREE.Vector3(0, 0, 0)
    );
    
    stageManager.update(0.1, player);
    
    // If the torpedo hit the "back wall", it should trigger failure
    expect(state.stage).toBe('TRENCH');
    expect(state.shields).toBe(initialShields - 1);
    expect(player.position.z).toBe(0);
  });

  it('should restart trench stage and take damage if a torpedo hits a catwalk', () => {
    const initialShields = state.shields;

    // Fire a torpedo that hits a catwalk
    // There is a catwalk at z = -500, y = -20
    state.entityManager!.spawnTorpedo(
      new THREE.Vector3(0, -20, -500),
      new THREE.Vector3(0, 0, 0)
    );
    
    stageManager.update(0.1, player);
    
    expect(state.stage).toBe('TRENCH');
    expect(state.shields).toBe(initialShields - 1);
    expect(player.position.z).toBe(0);
  });

  it('should restart trench stage and take damage if the ship hits the port directly', () => {
    const initialShields = state.shields;

    const { catwalkEndZ, exhaustPortZOffset, trenchHeight } = GameConfig.stage;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    const portY = -trenchHeight / 2 + 10;

    // Move player to the port position
    player.position.set(0, portY, portZ);
    
    stageManager.update(0.1, player);
    
    expect(state.stage).toBe('TRENCH');
    expect(state.shields).toBe(initialShields - 1);
    expect(player.position.z).toBe(0);
  });
});
