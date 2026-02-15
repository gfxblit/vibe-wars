import * as THREE from 'three';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TrenchStage } from './TrenchStage';
import { state } from '../state';
import { GameConfig } from '../config';
import { Player } from '../entities/Player';
import { EntityManager } from '../entities/EntityManager';

describe('TrenchStage Size Debug Integration', () => {
  let scene: THREE.Scene;
  let onComplete: () => void;
  let onReset: () => void;

  beforeEach(() => {
    scene = new THREE.Scene();
    onComplete = vi.fn();
    onReset = vi.fn();
    
    // Setup global state
    state.player = new Player();
    state.entityManager = new EntityManager(scene, new THREE.Scene());
    state.stage = 'TRENCH';
    state.debugTurretSize = undefined;
    state.debugFireballSize = undefined;
  });

  it('should use default sizes when no debug override is set', () => {
    const stage = new TrenchStage(scene, onComplete, onReset);
    const turrets = stage.getTurrets();
    expect(turrets.length).toBeGreaterThan(0);
    
    const turret = turrets[0];
    const baseMesh = turret.mesh.children[0] as THREE.Mesh;
    baseMesh.geometry.computeBoundingBox();
    const box = baseMesh.geometry.boundingBox!;
    const size = GameConfig.stages.trench.turretSize;
    expect(box.max.x - box.min.x).toBeCloseTo(size * 0.8);
    
    // Check fireball size via EntityManager
    const fireball = state.entityManager!.spawnFireball(new THREE.Vector3(), new THREE.Vector3());
    const sparkle = fireball.mesh.children[0] as THREE.Sprite;
    expect(sparkle.scale.x).toBeCloseTo(GameConfig.fireball.sparkleSize);
  });

  it('should use debug turret size override', () => {
    state.debugTurretSize = 42.0;
    const stage = new TrenchStage(scene, onComplete, onReset);
    const turrets = stage.getTurrets();
    
    const turret = turrets[0];
    const baseMesh = turret.mesh.children[0] as THREE.Mesh;
    baseMesh.geometry.computeBoundingBox();
    const box = baseMesh.geometry.boundingBox!;
    expect(box.max.x - box.min.x).toBeCloseTo(42.0 * 0.8);
  });

  it('should use debug fireball size override', () => {
    state.debugFireballSize = 13.0;
    new TrenchStage(scene, onComplete, onReset);
    
    const fireball = state.entityManager!.spawnFireball(new THREE.Vector3(), new THREE.Vector3());
    const sparkle = fireball.mesh.children[0] as THREE.Sprite;
    expect(sparkle.scale.x).toBeCloseTo(13.0);
  });
});
