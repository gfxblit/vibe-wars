import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { SurfaceStage } from './SurfaceStage';
import { GameConfig } from '../config';
import { state } from '../state';
import { Player } from '../entities/Player';

// Mock dependencies
vi.mock('../state', () => ({
  state: {
    entityManager: {
      clear: vi.fn(),
      setSpawningEnabled: vi.fn(),
    },
    player: {
      position: new THREE.Vector3(0, 0, 0),
      mesh: {
        quaternion: new THREE.Quaternion(),
      },
    },
  },
  goToNextStage: vi.fn(),
  takeDamage: vi.fn(),
  addScore: vi.fn(),
}));

import { goToNextStage, takeDamage } from '../state';

describe('SurfaceStage', () => {
  let stage: SurfaceStage;
  let scene: THREE.Scene;

  beforeEach(() => {
    vi.clearAllMocks();
    scene = new THREE.Scene();
    
    // Setup a proper player mock with real THREE objects
    state.player = {
      position: new THREE.Vector3(0, 0, 0),
      mesh: new THREE.Group(),
      update: vi.fn(),
    } as unknown as Player;
    
    // Ensure quaternion is set (Group has it, but just to be safe if tests check it)
    state.player.mesh.quaternion.set(0, 0, 0, 1);
  });

  it('should initialize with correct speed', () => {
    stage = new SurfaceStage(scene);
    expect(stage.speed).toBe(GameConfig.player.forwardSpeeds.SURFACE);
  });

  it('should clear enemies and disable spawning on initialization', () => {
    stage = new SurfaceStage(scene);
    expect(state.entityManager?.clear).toHaveBeenCalled();
    expect(state.entityManager?.setSpawningEnabled).toHaveBeenCalledWith(false);
  });

  it('should create a floor grid', () => {
    stage = new SurfaceStage(scene);
    // Scene should contain the floor group
    expect(scene.children.length).toBeGreaterThan(0);
    const floor = scene.children.find(c => c instanceof THREE.Group);
    expect(floor).toBeDefined();
  });

  it('should transition to next stage after timer expires', () => {
    stage = new SurfaceStage(scene);
    
    // Update with delta less than duration
    stage.update(GameConfig.stage.surfaceDuration - 0.1, state.player as Player);
    expect(goToNextStage).not.toHaveBeenCalled();

    // Update to pass the duration
    stage.update(0.2, state.player as Player);
    expect(goToNextStage).toHaveBeenCalled();
  });

  it('should damage player if they hit the floor', () => {
    stage = new SurfaceStage(scene);
    const player = state.player as Player;
    
    // Position player below floor threshold
    // Floor Y is -50 (default in config). Collision is < -50 + buffer
    player.position.y = GameConfig.stage.surfaceFloorY - 10;
    
    stage.update(0.1, player);
    expect(takeDamage).toHaveBeenCalledWith(1);
    // Should bump player up
    expect(player.position.y).toBeGreaterThan(GameConfig.stage.surfaceFloorY);
  });

  it('should spawn towers over time', () => {
    stage = new SurfaceStage(scene);
    
    // Initially only floor
    const initialChildren = scene.children.length; // Floor group
    
    // Advance time to trigger spawn
    // First update spawns a tower.
    stage.update(0.1, state.player as Player);
    
    // Should have spawned a tower
    // Scene children: Floor + Tower Mesh
    expect(scene.children.length).toBeGreaterThan(initialChildren);
  });
});
