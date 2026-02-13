import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { ExplosionStage } from './ExplosionStage';
import { GameConfig } from '../config';
import { state, goToNextStage } from '../state';

// Mock dependencies
vi.mock('../state', () => ({
  state: {
    entityManager: {
      clear: vi.fn(),
      setSpawningEnabled: vi.fn(),
      spawnFireball: vi.fn(),
    },
    player: {
      position: new THREE.Vector3(0, 0, 0),
      mesh: {
        quaternion: new THREE.Quaternion(),
        lookAt: vi.fn(),
      },
    },
  },
  goToNextStage: vi.fn(),
}));

vi.mock('../entities/DeathStar', () => {
  return {
    DeathStar: vi.fn(() => ({
      mesh: new THREE.Group(),
      position: new THREE.Vector3(0, 0, 0),
      update: vi.fn(),
      explode: vi.fn(),
      dispose: vi.fn(),
    }))
  };
});

import { DeathStar } from '../entities/DeathStar';

describe('ExplosionStage', () => {
  let stage: ExplosionStage;
  let scene: THREE.Scene;
  let mockDeathStar: any;
  let mockCamera: THREE.Camera;

  beforeEach(() => {
    vi.clearAllMocks();
    scene = new THREE.Scene();
    mockCamera = new THREE.PerspectiveCamera();
    
    // We expect constructor to fail if we try to instantiate before defining the class
    // But since we are writing tests first, the import will fail or the constructor will be empty if we create a stub.
    // I'll assume we'll create the file shortly.
    // For TDD, I need to create the file first but empty or stubbed?
    // The instructions say "Write tests FIRST (they should fail initially)". 
    // If the file doesn't exist, the test runner will error out on import, which is technically a fail.
    // But better to have a stub class.
    
    try {
        stage = new ExplosionStage(scene);
        mockDeathStar = (DeathStar as any).mock.results[0].value;
    } catch (e) {
        // Allow failure during setup if class not implemented
    }
  });

  it('should initialize correctly', () => {
    expect(state.entityManager?.clear).toHaveBeenCalled();
    expect(state.entityManager?.setSpawningEnabled).toHaveBeenCalledWith(false);
    expect(scene.children.length).toBeGreaterThan(0);
    // Player positioned close to DeathStar (which is at origin)
    expect(state.player?.position.z).toBe(200);
  });

  it('should have correct speed', () => {
    if (!stage) stage = new ExplosionStage(scene);
    expect(stage.speed).toBe(GameConfig.explosionStage.escapeSpeed);
  });

  it('should override camera position based on player position', () => {
    if (!stage) stage = new ExplosionStage(scene);
    
    // Set player position manually to simulate movement
    state.player!.position.set(0, 0, 300);
    
    // Mock update call
    stage.update(0.1, state.player as any, mockCamera);
    
    // Camera Local (0, 5, -50) relative to Player facing +Z (Rot Y=180)
    // Player Local +Z is World -Z.
    // Player Local -Z is World +Z.
    // Camera Local -Z (-50) is World +Z (+50).
    // So Camera World Z = Player World Z + 50 = 300 + 50 = 350?
    // Wait. My logic earlier:
    // Player Rot Y=180.
    // Local (0,0,-1) -> World (0,0,1).
    // Local (0,0,1) -> World (0,0,-1).
    // Camera Local (0, 5, -50).
    // World Position = PlayerPos + (0, 5, 50).
    // So (0, 5, 350).
    
    // Let's check logic again.
    // Player Local -Z is FORWARD.
    // Player Rot 180 means FORWARD is World +Z.
    // So Local -Z is World +Z.
    // Camera Local Z = -50.
    // So World Z contribution is +50.
    // So Player Z (300) + 50 = 350.
    
    // Wait, earlier I said:
    // "Camera Local -Z (-50) is World +Z (+50). So Camera World Z = Player World Z + 50 = 350?"
    // Yes.
    // But earlier I said: "Local (0, 5, -50) -> World (0, 5, 200 + 50) = (0, 5, 250)."
    // Wait.
    // If Player Local -Z (-50) maps to World +Z (+50).
    // Then 300 + 50 = 350.
    
    // If Camera Local +Z (50) maps to World -Z (-50).
    // Then 300 - 50 = 250.
    
    // I set `camera.position.set(0, 5, -50)`.
    // So result should be 350.
    
    // Wait, `camera.position.set` sets LOCAL position relative to parent (Player).
    // Player IS parent.
    // So if I read `mockCamera.position`, it returns LOCAL position (0, 5, -50).
    // UNLESS I call `getWorldPosition`.
    // But `mockCamera` is not attached to `state.player.mesh` in the test environment!
    // `mockCamera` is standalone.
    // `stage.update` sets `camera.position.set(0, 5, -50)`.
    // Since `camera` has no parent in test, `position` IS World Position.
    // So expected is (0, 5, -50).
    
    // BUT in real game, camera IS attached to player.
    // So `stage.update` sets LOCAL position.
    
    // So my test should verify that `stage.update` sets `camera.position` to (0, 5, -50).
    // Regardless of player position (because it's local).
    
    expect(mockCamera.position.x).toBe(0);
    expect(mockCamera.position.y).toBe(5);
    expect(mockCamera.position.z).toBe(-50);
  });

  it('should explode DeathStar after delay', () => {
    if (!stage) stage = new ExplosionStage(scene);
    mockDeathStar = (DeathStar as any).mock.results[0].value;

    // delay is 2.0s
    stage.update(1.9, state.player as any, mockCamera);
    expect(mockDeathStar.explode).not.toHaveBeenCalled();
    
    stage.update(0.2, state.player as any, mockCamera); // total 2.1
    expect(mockDeathStar.explode).toHaveBeenCalled();
    expect(state.entityManager?.spawnFireball).toHaveBeenCalled();
  });

  it('should transition to next stage after duration', () => {
    if (!stage) stage = new ExplosionStage(scene);

    // duration is 5.0s
    stage.update(4.9, state.player as any, mockCamera);
    expect(goToNextStage).not.toHaveBeenCalled();
    
    stage.update(0.2, state.player as any, mockCamera); // total 5.1
    expect(goToNextStage).toHaveBeenCalled();
  });
  
  it('should cleanup', () => {
    if (!stage) stage = new ExplosionStage(scene);
    mockDeathStar = (DeathStar as any).mock.results[0].value;
    
    stage.cleanup();
    expect(scene.children).not.toContain(mockDeathStar.mesh);
    expect(mockDeathStar.dispose).toHaveBeenCalled();
  });
});
