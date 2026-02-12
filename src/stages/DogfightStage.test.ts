import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { DogfightStage } from './DogfightStage';
import { GameConfig } from '../config';
import { state } from '../state';
import { Player } from '../entities/Player';

// Mock dependencies
vi.mock('../state', () => ({
  state: {
    entityManager: {
      setSpawningEnabled: vi.fn(),
      clear: vi.fn(),
    },
    kills: 0,
    player: {
      mesh: {
        quaternion: new THREE.Quaternion(),
      },
      position: new THREE.Vector3(),
    },
    debugKillsThreshold: undefined,
  },
  goToNextStage: vi.fn(),
}));

// Mock DeathStar
vi.mock('../entities/DeathStar', () => {
  return {
    DeathStar: class {
      mesh: THREE.Mesh;
      position: THREE.Vector3;
      constructor(pos: THREE.Vector3) {
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial());
        this.position = this.mesh.position;
        this.position.copy(pos);
      }
      update(_deltaTime: number) {}
      dispose() {}
    }
  };
});

import { goToNextStage } from '../state';

describe('DogfightStage', () => {
  let stage: DogfightStage;
  let scene: THREE.Scene;
  let player: Player;

  beforeEach(() => {
    vi.clearAllMocks();
    scene = new THREE.Scene();
    player = state.player as any;
    (state.entityManager?.setSpawningEnabled as any).mockClear();
    (state.entityManager?.clear as any).mockClear();
    state.kills = 0;
    state.debugKillsThreshold = undefined;
    player.position.set(0, 0, 0);
    player.mesh.quaternion.set(0, 0, 0, 1);
  });

  it('should enable spawning on initialization', () => {
    stage = new DogfightStage(scene);
    expect(state.entityManager?.setSpawningEnabled).toHaveBeenCalledWith(true);
  });

  it('should start with DOGFIGHT speed', () => {
    stage = new DogfightStage(scene);
    expect(stage.speed).toBe(GameConfig.player.forwardSpeeds.DOGFIGHT);
  });

  it('should transition to approach phase when kill threshold is met', () => {
    stage = new DogfightStage(scene);
    state.kills = GameConfig.stage.dogfightKillsThreshold;
    
    stage.update(0.1, player);

    // Should clear enemies and disable spawning
    expect(state.entityManager?.clear).toHaveBeenCalled();
    expect(state.entityManager?.setSpawningEnabled).toHaveBeenCalledWith(false);
    
    // Should spawn DeathStar
    const deathStar = scene.children.find(c => c.type === 'Mesh' && (c as THREE.Mesh).geometry.type === 'SphereGeometry');
    expect(deathStar).toBeDefined();

    // Speed should change to SURFACE speed
    expect(stage.speed).toBe(GameConfig.player.forwardSpeeds.SURFACE);
  });

  it('should NOT trigger next stage immediately when kill threshold is met', () => {
    stage = new DogfightStage(scene);
    state.kills = GameConfig.stage.dogfightKillsThreshold;
    
    stage.update(0.1, player);
    expect(goToNextStage).not.toHaveBeenCalled();
  });

  it('should trigger next stage when close enough to DeathStar in approach phase', () => {
    stage = new DogfightStage(scene);
    state.kills = GameConfig.stage.dogfightKillsThreshold;
    
    // Trigger transition to approach phase
    stage.update(0.1, player);
    
    // Find DeathStar
    const deathStar = scene.children.find(c => c.type === 'Mesh' && (c as THREE.Mesh).geometry.type === 'SphereGeometry') as THREE.Mesh;
    
    // Move player close to DeathStar
    const targetDist = GameConfig.stage.trenchTransitionDistance + GameConfig.stage.deathStarSize - 10;
    player.position.copy(deathStar.position).add(new THREE.Vector3(0, 0, targetDist));

    stage.update(0.1, player);
    expect(goToNextStage).toHaveBeenCalled();
  });

  it('should cleanup DeathStar on cleanup', () => {
    stage = new DogfightStage(scene);
    state.kills = GameConfig.stage.dogfightKillsThreshold;
    stage.update(0.1, player); // Spawn DeathStar

    const initialChildren = scene.children.length;
    expect(initialChildren).toBeGreaterThan(0);

    stage.cleanup();
    expect(scene.children.length).toBe(initialChildren - 1);
  });

  it('should not trigger next stage when kill threshold is not met', () => {
    stage = new DogfightStage(scene);
    state.kills = GameConfig.stage.dogfightKillsThreshold - 1;
    
    stage.update(0.1, player);
    expect(state.entityManager?.clear).not.toHaveBeenCalled();
  });

  it('should use debug kill threshold if set', () => {
    stage = new DogfightStage(scene);
    const debugThreshold = 2;
    state.debugKillsThreshold = debugThreshold;
    state.kills = debugThreshold;
    
    stage.update(0.1, player);
    expect(state.entityManager?.clear).toHaveBeenCalled();
  });
});
