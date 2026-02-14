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
      addTarget: vi.fn(),
      removeTarget: vi.fn(),
    },
    player: {
      position: new THREE.Vector3(0, 0, 0),
      mesh: {
        quaternion: new THREE.Quaternion(),
        lookAt: vi.fn(),
      },
    },
    isDeathStarDestroyed: false,
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
    
    stage = new ExplosionStage(scene);
    mockDeathStar = (DeathStar as any).mock.results[0].value;
  });

  it('should initialize correctly', () => {
    expect(state.entityManager?.clear).toHaveBeenCalled();
    expect(state.entityManager?.setSpawningEnabled).toHaveBeenCalledWith(false);
    expect(scene.children.length).toBeGreaterThan(0);
    // Player positioned close to DeathStar (which is at origin)
    expect(state.player?.position.z).toBe(200);
  });

  it('should have correct speed', () => {
    expect(stage.speed).toBe(GameConfig.explosionStage.escapeSpeed);
  });

  it('should override camera position based on player position', () => {
    // Set player position manually to simulate movement
    state.player!.position.set(0, 0, 300);
    
    // Mock update call
    stage.update(0.1, state.player as any, mockCamera);
    
    expect(mockCamera.position.x).toBe(0);
    expect(mockCamera.position.y).toBe(5);
    expect(mockCamera.position.z).toBe(-50);
  });

  it('should explode DeathStar after delay', () => {
    mockDeathStar = (DeathStar as any).mock.results[0].value;

    // delay is 2.0s
    stage.update(1.9, state.player as any, mockCamera);
    expect(mockDeathStar.explode).not.toHaveBeenCalled();
    
    stage.update(0.2, state.player as any, mockCamera); // total 2.1
    expect(mockDeathStar.explode).toHaveBeenCalled();
    expect(state.isDeathStarDestroyed).toBe(true);
    expect(state.entityManager?.spawnFireball).toHaveBeenCalled();
  });

  it('should transition to next stage after duration', () => {
    // duration is 5.0s
    stage.update(4.9, state.player as any, mockCamera);
    expect(goToNextStage).not.toHaveBeenCalled();
    
    stage.update(0.2, state.player as any, mockCamera); // total 5.1
    expect(goToNextStage).toHaveBeenCalled();
  });
  
  it('should cleanup', () => {
    mockDeathStar = (DeathStar as any).mock.results[0].value;
    
    stage.cleanup();
    expect(scene.children).not.toContain(mockDeathStar.mesh);
    expect(mockDeathStar.dispose).toHaveBeenCalled();
    expect(state.isDeathStarDestroyed).toBe(false);
  });
});
