import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { SurfaceStage } from './SurfaceStage';
import { GameConfig } from '../config';
import { state } from '../state';
import { Player } from '../entities/Player';
import { Surface } from '../entities/Surface';

// Mock dependencies
vi.mock('../state', () => ({
  state: {
    entityManager: {
      clear: vi.fn(),
      setSpawningEnabled: vi.fn(),
      spawnFireball: vi.fn(),
      addTarget: vi.fn(),
      removeTarget: vi.fn(),
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
  let mockCamera: THREE.Camera;

  beforeEach(() => {
    vi.clearAllMocks();
    scene = new THREE.Scene();
    mockCamera = new THREE.PerspectiveCamera();
    
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
    stage = new SurfaceStage(scene, goToNextStage);
    expect(stage.speed).toBe(GameConfig.player.forwardSpeeds.SURFACE);
  });

  it('should clear enemies and disable spawning on initialization', () => {
    stage = new SurfaceStage(scene, goToNextStage);
    expect(state.entityManager?.clear).toHaveBeenCalled();
    expect(state.entityManager?.setSpawningEnabled).toHaveBeenCalledWith(false);
  });

  it('should reset player position and orientation on initialization', () => {
    state.player!.position.set(100, 200, 300);
    state.player!.mesh.quaternion.set(0.5, 0.5, 0.5, 0.5);
    
    stage = new SurfaceStage(scene, goToNextStage);
    
    expect(state.player!.position.x).toBe(0);
    expect(state.player!.position.y).toBe(0);
    expect(state.player!.position.z).toBe(0);
    expect(state.player!.mesh.quaternion.x).toBe(0);
    expect(state.player!.mesh.quaternion.y).toBe(0);
    expect(state.player!.mesh.quaternion.z).toBe(0);
    expect(state.player!.mesh.quaternion.w).toBe(1);
  });

  it('should create a floor grid', () => {
    stage = new SurfaceStage(scene, goToNextStage);
    // Scene should contain the floor group
    expect(scene.children.length).toBeGreaterThan(0);
    const floor = scene.children.find(c => c instanceof THREE.Group);
    expect(floor).toBeDefined();
  });

  it('should transition to next stage after timer expires', () => {
    stage = new SurfaceStage(scene, goToNextStage);
    
    // Update with delta less than duration
    stage.update(GameConfig.stages.surface.duration - 0.1, state.player as Player, mockCamera);
    expect(goToNextStage).not.toHaveBeenCalled();

    // Update to pass the duration
    stage.update(0.2, state.player as Player, mockCamera);
    expect(goToNextStage).toHaveBeenCalled();
  });

  it('should damage player if they hit the floor', () => {
    stage = new SurfaceStage(scene, goToNextStage);
    const player = state.player as Player;
    
    // Position player below floor threshold
    // Floor Y is -50 (default in config). Collision is < -50 + buffer
    player.position.y = GameConfig.stages.surface.floorY - GameConfig.stages.surface.floorClampBuffer;
    
    stage.update(0.1, player, mockCamera);
    expect(takeDamage).toHaveBeenCalledWith(GameConfig.stages.surface.collisionDamage);
    // Should bump player up by the bounce amount
    expect(player.position.y).toBe(GameConfig.stages.surface.floorY + GameConfig.stages.surface.floorBounce);
  });

  it('should spawn towers over time', () => {
    stage = new SurfaceStage(scene, goToNextStage);
    
    // Initially no towers
    expect(stage.getTowers().length).toBe(0);
    
    stage.update(0.1, state.player as Player, mockCamera);
    
    // Should have spawned a tower
    expect(stage.getTowers().length).toBeGreaterThan(0);
  });

  it('should return towers from getTowers', () => {
    stage = new SurfaceStage(scene, vi.fn());
    const towers = stage.getTowers();
    expect(Array.isArray(towers)).toBe(true);
  });

  it('should cleanup resources', () => {
    stage = new SurfaceStage(scene, vi.fn());
    const removeSpy = vi.spyOn(scene, 'remove');
    stage.cleanup();
    expect(removeSpy).toHaveBeenCalled();
  });

  it('should damage player if they hit a tower', () => {
    const mockTower = { isExploded: false };
    const mockSurface = {
      mesh: new THREE.Group(),
      update: vi.fn(),
      checkCollisions: vi.fn().mockReturnValue({ floorHit: false, towerHit: mockTower }),
      getTowers: vi.fn().mockReturnValue([mockTower]),
      dispose: vi.fn()
    } as unknown as Surface;

    stage = new SurfaceStage(scene, vi.fn(), mockSurface);
    const player = state.player as Player;
    
    stage.update(0.1, player, mockCamera);
    
    expect(takeDamage).toHaveBeenCalledWith(GameConfig.stages.surface.collisionDamage);
    expect(mockTower.isExploded).toBe(true);
  });
});
