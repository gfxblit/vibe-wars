import { expect, test, describe, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { EntityManager } from './entities/EntityManager';
import { TieFighter } from './entities/TieFighter';
import { state } from './state';
import { AIStrategyFactory } from './entities/AIStrategyFactory';
import { globalEvents } from './EventBus';
import { AudioSystem } from './AudioSystem';

// Mock AudioManager
const mockAudioManager = {
  playPlayerLaser: vi.fn(),
  playEnemyLaser: vi.fn(),
  playExplosion: vi.fn(),
  playTieFlyby: vi.fn(),
  init: vi.fn().mockResolvedValue(undefined),
  resume: vi.fn().mockResolvedValue(undefined),
};

describe('Audio Integration', () => {
  let entityManager: EntityManager;
  let scene: THREE.Scene;
  let hudScene: THREE.Scene;

  beforeEach(() => {
    vi.clearAllMocks();
    globalEvents.clear();
    scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    state.audioManager = mockAudioManager as any;
    state.player = { position: new THREE.Vector3(0, 0, 0) } as any;
    new AudioSystem(mockAudioManager as any, globalEvents).init();
    entityManager = new EntityManager(scene, hudScene, new AIStrategyFactory());
  });

  test('EntityManager.spawnLaser triggers playPlayerLaser', () => {
    entityManager.spawnLaser(new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), 0xffffff);
    expect(mockAudioManager.playPlayerLaser).toHaveBeenCalled();
  });

  test('TieFighter.explode triggers playExplosion', () => {
    const tf = new TieFighter({ update: vi.fn() } as any);
    tf.explode();
    expect(mockAudioManager.playExplosion).toHaveBeenCalledWith(tf.position);
  });

  test('TIE flyby triggers playTieFlyby', () => {
    let callCount = 0;
    const mockStrategy = {
      update: vi.fn((_dt, pos) => {
        if (callCount === 0) {
           pos.z = 10;
        } else {
           pos.z = -10; // Move across plane
        }
        callCount++;
      })
    };
    const tf = new TieFighter(mockStrategy as any);
    (entityManager as any).tieFighters.push(tf);
    
    const camera = new THREE.PerspectiveCamera();
    const playerPos = new THREE.Vector3(0, 0, 0);
    const playerQuat = new THREE.Quaternion();

    tf.position.set(0, 0, 10);
    
    entityManager.update(0.1, playerPos, playerQuat, false, camera, 100);
    entityManager.update(0.1, playerPos, playerQuat, false, camera, 100);
    
    expect(mockAudioManager.playTieFlyby).toHaveBeenCalled();
  });
});
