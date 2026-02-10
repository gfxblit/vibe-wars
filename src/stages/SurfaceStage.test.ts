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
}));

import { goToNextStage } from '../state';

describe('SurfaceStage', () => {
  let stage: SurfaceStage;
  let scene: THREE.Scene;

  beforeEach(() => {
    vi.clearAllMocks();
    scene = new THREE.Scene();
    if (state.player) {
      state.player.position.set(0, 0, 0);
      state.player.mesh.quaternion.set(0, 0, 0, 1);
    }
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

  it('should NOT spawn DeathStar in the scene', () => {
    stage = new SurfaceStage(scene);
    expect(scene.getObjectByName('DeathStar')).toBeFalsy();
  });

  it('should transition to next stage after timer expires', () => {
    stage = new SurfaceStage(scene);
    
    // Update with small delta
    stage.update(1.0, state.player as Player);
    expect(goToNextStage).not.toHaveBeenCalled();

    // Update with enough delta to pass the transition time
    stage.update(GameConfig.stage.surfaceDuration + 1, state.player as Player);
    expect(goToNextStage).toHaveBeenCalled();
  });
});
