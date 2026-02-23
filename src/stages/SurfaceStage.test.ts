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
    // Default to tower spawning (random >= 0.3)
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    scene = new THREE.Scene();
    mockCamera = new THREE.PerspectiveCamera();
    
    // Setup a proper player mock with real THREE objects
    const playerMesh = new THREE.Group();
    // Add a dummy mesh so it has dimensions for setFromObject
    const geometry = new THREE.BoxGeometry(10, 10, 10); // larger for easier collision
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    playerMesh.add(mesh);

    state.player = {
      position: new THREE.Vector3(0, 0, 0),
      mesh: playerMesh,
      update: vi.fn(),
    } as unknown as Player;
    
    // Ensure quaternion is set
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

  it('should NOT damage player if they hit the floor', () => {
    stage = new SurfaceStage(scene, goToNextStage);
    const player = state.player as Player;
    
    // Position player below floor threshold
    player.position.y = GameConfig.stages.surface.floorY - GameConfig.stages.surface.floorClampBuffer;
    
    stage.update(0.1, player, mockCamera);
    expect(takeDamage).not.toHaveBeenCalled();
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

  it('should return correct player options', () => {
    stage = new SurfaceStage(scene, vi.fn());
    const options = stage.getPlayerOptions();
    expect(options).toEqual({
      lockUpright: true,
      maxPitch: GameConfig.stages.surface.maxPitch,
      maxYaw: GameConfig.stages.surface.maxYaw,
    });
  });

  it('should cleanup resources', () => {
    stage = new SurfaceStage(scene, vi.fn());
    const removeSpy = vi.spyOn(scene, 'remove');
    stage.cleanup();
    expect(removeSpy).toHaveBeenCalled();
  });

  it('should damage player if they hit a tower', () => {
    stage = new SurfaceStage(scene, vi.fn());
    const player = state.player as Player;
    
    // Force spawn a tower
    stage.update(0.1, player, mockCamera);
    const towers = stage.getTowers();
    expect(towers.length).toBeGreaterThan(0);
    const tower = towers[0];
    
    // Position player on tower
    player.position.copy(tower.position);
    player.mesh.position.copy(tower.position);
    player.mesh.updateWorldMatrix(true, true);
    
    // Mock explosion to verify it was called
    const explodeSpy = vi.spyOn(tower, 'explode');
    
    stage.update(0.1, player, mockCamera);
    
    expect(takeDamage).toHaveBeenCalledWith(GameConfig.stages.surface.collisionDamage);
    expect(explodeSpy).toHaveBeenCalled();
  });

  it('should damage player if they hit a turret', () => {
    // Force turret spawn
    vi.mocked(Math.random).mockReturnValue(GameConfig.stages.surface.turretSpawnProbability - 0.01);
    
    stage = new SurfaceStage(scene, vi.fn());
    const player = state.player as Player;
    
    // Force spawn
    stage.update(0.1, player, mockCamera);
    const obstacles = (stage as any).spawner.getObstacles();
    const turrets = obstacles.filter((o: any) => o.constructor.name === 'Turret');
    expect(turrets.length).toBeGreaterThan(0);
    const turret = turrets[0];
    
    // Position player on turret
    player.position.copy(turret.position);
    player.mesh.position.copy(turret.position);
    player.mesh.updateWorldMatrix(true, true);
    
    const explodeSpy = vi.spyOn(turret, 'explode');
    
    stage.update(0.1, player, mockCamera);
    
    expect(takeDamage).toHaveBeenCalledWith(GameConfig.stages.surface.collisionDamage);
    expect(explodeSpy).toHaveBeenCalled();
  });
});
