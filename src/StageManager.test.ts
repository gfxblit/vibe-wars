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
  });

  it('should transition to TrenchStage when player is close to DeathStar', () => {
    state.kills = GameConfig.stage.trenchKillsThreshold;
    stageManager.update(0.1, player);
    expect(state.phase).toBe('SURFACE');
    
    // DeathStar is at (0, 0, -2000)
    player.position.set(0, 0, -2000 + GameConfig.stage.trenchTransitionDistance - 10);
    stageManager.update(0.1, player);
    
    expect(state.phase).toBe('TRENCH');
    expect(scene.children.some(child => child instanceof THREE.Group)).toBe(true);
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
});
