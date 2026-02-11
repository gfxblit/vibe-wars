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

// Mock DeathStar to avoid Three.js/Asset loading issues during test
vi.mock('../entities/DeathStar', () => {
  return {
    DeathStar: class {
      mesh: THREE.Group;
      position: THREE.Vector3;
      constructor(pos: THREE.Vector3) {
        this.mesh = new THREE.Group();
        this.mesh.name = 'DeathStar';
        this.position = this.mesh.position;
        this.position.copy(pos);
      }
      update(_deltaTime: number) {}
      dispose() {}
    }
  };
});

describe('SurfaceStage', () => {
  let stage: SurfaceStage;
  let scene: THREE.Scene;

  beforeEach(() => {
    vi.clearAllMocks();
    scene = new THREE.Scene();
    state.player!.position.set(0, 0, 0);
    state.player!.mesh.quaternion.set(0, 0, 0, 1);
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

  it('should spawn DeathStar in the scene', () => {
    stage = new SurfaceStage(scene);
    const deathStar = scene.getObjectByName('DeathStar');
    expect(deathStar).toBeDefined();
  });

  it('should transition to next stage when close to DeathStar', () => {
    stage = new SurfaceStage(scene);
    
    // Find death star position from scene
    const deathStar = scene.getObjectByName('DeathStar');
    expect(deathStar).toBeDefined();
    
    // Move player close to DS
    // dist < trenchTransitionDistance + deathStarSize
    const targetDist = GameConfig.stage.trenchTransitionDistance + GameConfig.stage.deathStarSize - 10;
    
    // Place player such that distance is targetDist
    // DS is at some position. Player is at 0,0,0 usually.
    // Let's just move player to DS position + offset
    state.player!.position.copy(deathStar!.position).add(new THREE.Vector3(0, 0, targetDist)); // Z offset
    
    stage.update(0.1, state.player as Player);
    expect(goToNextStage).toHaveBeenCalled();
  });
  
  it('should cleanup by removing DeathStar from scene', () => {
    stage = new SurfaceStage(scene);
    const initialChildren = scene.children.length;
    expect(initialChildren).toBeGreaterThan(0);
    stage.cleanup();
    expect(scene.children.length).toBe(initialChildren - 1);
  });
});