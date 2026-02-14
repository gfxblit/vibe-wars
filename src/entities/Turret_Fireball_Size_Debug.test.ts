import * as THREE from 'three';
import { describe, it, expect, beforeEach } from 'vitest';
import { Turret } from './Turret';
import { EntityManager } from './EntityManager';
import { GameConfig } from '../config';
import { state } from '../state';

describe('Turret and Fireball Size Debug', () => {
  const position = new THREE.Vector3(0, 0, -500);
  const velocity = new THREE.Vector3(0, 0, -100);

  beforeEach(() => {
    state.stage = 'TRENCH';
    state.debugTurretSize = undefined;
    state.debugFireballSize = undefined;
  });

  it('should use default turret size when no debug override is set', () => {
    const turret = new Turret(position);
    const baseMesh = turret.mesh.children[0] as THREE.Mesh;
    baseMesh.geometry.computeBoundingBox();
    const box = baseMesh.geometry.boundingBox!;
    const size = GameConfig.turret.meshSize;
    expect(box.max.x - box.min.x).toBeCloseTo(size * 0.8);
  });

  it('should use debug turret size from state', () => {
    state.debugTurretSize = 25.0;
    const turret = new Turret(position);
    const baseMesh = turret.mesh.children[0] as THREE.Mesh;
    baseMesh.geometry.computeBoundingBox();
    const box = baseMesh.geometry.boundingBox!;
    expect(box.max.x - box.min.x).toBeCloseTo(25.0 * 0.8);
  });

  it('should use default fireball size when no debug override is set', () => {
    const worldScene = new THREE.Scene();
    const hudScene = new THREE.Scene();
    const entityManager = new EntityManager(worldScene, hudScene);
    const fireball = entityManager.spawnFireball(position, velocity);
    // Fireball uses sparkleSize for sparkles (which are children)
    const sparkle = fireball.mesh.children[0] as THREE.Sprite;
    const size = GameConfig.fireball.sparkleSize;
    expect(sparkle.scale.x).toBeCloseTo(size);
  });

  it('should use debug fireball size from state', () => {
    state.debugFireballSize = 15.0;
    const worldScene = new THREE.Scene();
    const hudScene = new THREE.Scene();
    const entityManager = new EntityManager(worldScene, hudScene);
    const fireball = entityManager.spawnFireball(position, velocity);
    const sparkle = fireball.mesh.children[0] as THREE.Sprite;
    expect(sparkle.scale.x).toBeCloseTo(15.0);
  });

  it('should use debug fireball size from state when spawned from target', () => {
    state.debugFireballSize = 10.0;
    const worldScene = new THREE.Scene();
    const hudScene = new THREE.Scene();
    const entityManager = new EntityManager(worldScene, hudScene);
    
    const turretPos = new THREE.Vector3(10, 0, -100);
    const turret = new Turret(turretPos);
    
    entityManager.addTarget(turret);
    
    // Player in front of turret
    const playerPos = new THREE.Vector3(10, 0, 0); 
    const playerQuat = new THREE.Quaternion();
    
    // EntityManager update will handle the firing. 
    // Pass enough deltaTime to overcome initial random cooldown.
    entityManager.update(2.0, playerPos, playerQuat, true, new THREE.PerspectiveCamera(), 100);
    
    const fireballs = entityManager.getFireballs();
    expect(fireballs.length).toBe(1);
    const sparkle = fireballs[0].mesh.children[0] as THREE.Sprite;
    expect(sparkle.scale.x).toBeCloseTo(10.0);
  });
});
