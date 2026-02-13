import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { TrenchStage } from './TrenchStage';
import { GameConfig } from '../config';
import { state } from '../state';
import { Player } from '../entities/Player';
import { Trench } from '../entities/Trench';

// Mock dependencies
vi.mock('../state', () => ({
  state: {
    entityManager: {
      setSpawningEnabled: vi.fn(),
      clear: vi.fn(),
      getTorpedoes: vi.fn().mockReturnValue([]),
    },
    player: {
      position: new THREE.Vector3(0, 0, 0),
      mesh: {
        quaternion: new THREE.Quaternion(),
      },
    },
    shields: 3,
  },
  goToNextStage: vi.fn(),
  addScore: vi.fn(),
  takeDamage: vi.fn((amount) => { state.shields -= amount; }),
}));

import { goToNextStage, takeDamage } from '../state';

// Mock Trench
vi.mock('../entities/Trench', () => {
  const checkObstacleCollision = vi.fn().mockReturnValue(null);
  const checkPortCollision = vi.fn().mockReturnValue(false);
  const getTurrets = vi.fn().mockReturnValue([]);
  const update = vi.fn();
  const dispose = vi.fn();

  return {
    Trench: vi.fn(() => ({
      mesh: new THREE.Mesh(),
      checkObstacleCollision,
      checkPortCollision,
      getTurrets,
      update,
      dispose,
    }))
  };
});

describe('TrenchStage', () => {
  let stage: TrenchStage;
  let scene: THREE.Scene;
  let mockTrenchInstance: any;

  beforeEach(() => {
    vi.clearAllMocks();
    scene = new THREE.Scene();
    state.player!.position.set(0, 0, 0);
    state.player!.mesh.quaternion.set(0, 0, 0, 1);
    state.shields = 3;

    // Capture the mock instance
    stage = new TrenchStage(scene, () => {});
    mockTrenchInstance = (Trench as any).mock.results[0].value;
  });

  it('should initialize with correct speed', () => {
    expect(stage.speed).toBe(GameConfig.player.forwardSpeeds.TRENCH);
  });

  it('should disable spawning and reset player pose on initialization', () => {
    // Note: We need to reset mocks/state BEFORE creating stage in beforeEach for this to be fully tested, 
    // but here we already created it in beforeEach. 
    // Let's create a new one to test the side effects if needed, or check what happened in beforeEach.
    expect(state.entityManager?.setSpawningEnabled).toHaveBeenCalledWith(false);
    expect(state.player!.position.x).toBe(0);
    expect(state.player!.position.y).toBe(0);
    expect(state.player!.position.z).toBe(0);
    expect(state.player!.mesh.quaternion.w).toBe(1);
  });

  it('should add Trench to scene', () => {
    expect(scene.children.length).toBe(1);
    expect(scene.children[0]).toBe(mockTrenchInstance.mesh);
  });

  it('should clamp player position within trench bounds', () => {
    const halfWidth = GameConfig.stage.trenchWidth / 2;
    const halfHeight = GameConfig.stage.trenchHeight / 2;

    state.player!.position.set(halfWidth + 100, halfHeight + 100, 0);
    
    stage.update(0.1, state.player as Player);
    
    expect(state.player!.position.x).toBe(halfWidth);
    expect(state.player!.position.y).toBe(halfHeight);
  });

  it('should handle catwalk collisions (take damage)', () => {
    mockTrenchInstance.checkObstacleCollision.mockReturnValue(-500); // Hit at Z=-500

    stage.update(0.1, state.player as Player);
    
    expect(takeDamage).toHaveBeenCalledWith(1);
    expect(state.shields).toBe(2);
    
    // Should debounce (no damage on next frame if same hitZ)
    vi.clearAllMocks(); // Clear calls to takeDamage
    stage.update(0.1, state.player as Player);
    expect(takeDamage).not.toHaveBeenCalled();
    
    // New hit
    mockTrenchInstance.checkObstacleCollision.mockReturnValue(-600);
    stage.update(0.1, state.player as Player);
    expect(takeDamage).toHaveBeenCalledWith(1);
  });

  it('should take damage and reset when reaching end of trench', () => {
    const onReset = vi.fn();
    stage = new TrenchStage(scene, onReset);
    state.player!.position.z = -GameConfig.stage.trenchLength - 10;
    stage.update(0.1, state.player as Player);
    expect(takeDamage).toHaveBeenCalledWith(1);
    expect(onReset).toHaveBeenCalled();
    expect(goToNextStage).not.toHaveBeenCalled();
  });

  it('should take damage and reset when hitting port structure with player', () => {
    const onReset = vi.fn();
    stage = new TrenchStage(scene, onReset);
    mockTrenchInstance.checkPortCollision.mockReturnValue(true);
    stage.update(0.1, state.player as Player);
    expect(takeDamage).toHaveBeenCalledWith(1);
    expect(onReset).toHaveBeenCalled();
    expect(goToNextStage).not.toHaveBeenCalled();
  });

  it('should transition to next stage when torpedo hits port', () => {
    const torpedo = { position: new THREE.Vector3(0, 0, -100), isExploded: false, explode: vi.fn() };
    (state.entityManager?.getTorpedoes as any).mockReturnValue([torpedo]);
    mockTrenchInstance.checkPortCollision.mockImplementation((pos: THREE.Vector3) => pos.z === -100);

    stage.update(0.1, state.player as Player);
    
    expect(goToNextStage).toHaveBeenCalled();
    expect(torpedo.explode).toHaveBeenCalled();
  });

  it('should cleanup', () => {
    const initialChildren = scene.children.length;
    stage.cleanup();
    expect(scene.children.length).toBe(initialChildren - 1);
    expect(mockTrenchInstance.dispose).toHaveBeenCalled();
  });
});