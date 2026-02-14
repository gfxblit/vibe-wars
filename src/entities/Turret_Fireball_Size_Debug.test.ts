import * as THREE from 'three';
import { describe, it, expect } from 'vitest';
import { Turret } from './Turret';
import { Fireball } from './Fireball';
import { EntityManager } from './EntityManager';
import { GameConfig } from '../config';

describe('Turret and Fireball Size Debug', () => {
  const position = new THREE.Vector3(0, 0, -500);
  const velocity = new THREE.Vector3(0, 0, -100);

  it('should use default turret size when no size is provided', () => {
    const turret = new Turret(position);
    const baseMesh = turret.mesh.children[0] as THREE.Mesh;
    baseMesh.geometry.computeBoundingBox();
    const box = baseMesh.geometry.boundingBox!;
    const size = GameConfig.turret.meshSize;
    expect(box.max.x - box.min.x).toBeCloseTo(size * 0.8);
  });

  it('should use provided turret size', () => {
    const turret = new Turret(position, 25.0);
    const baseMesh = turret.mesh.children[0] as THREE.Mesh;
    baseMesh.geometry.computeBoundingBox();
    const box = baseMesh.geometry.boundingBox!;
    expect(box.max.x - box.min.x).toBeCloseTo(25.0 * 0.8);
  });

  it('should use default fireball size when no size is provided', () => {
    const fireball = new Fireball(position, velocity);
    // Fireball uses sparkleSize for sparkles (which are children)
    const sparkle = fireball.mesh.children[0] as THREE.Sprite;
    const size = GameConfig.fireball.sparkleSize;
    expect(sparkle.scale.x).toBeCloseTo(size);
  });

  it('should use provided fireball size', () => {
    const fireball = new Fireball(position, velocity, 15.0);
    const sparkle = fireball.mesh.children[0] as THREE.Sprite;
    expect(sparkle.scale.x).toBeCloseTo(15.0);
  });

  it('should pass fireballSize from Turret to spawned Fireball via EntityManager', () => {
    const worldScene = new THREE.Scene();
    const hudScene = new THREE.Scene();
    const entityManager = new EntityManager(worldScene, hudScene);
    
    const turretPos = new THREE.Vector3(10, 0, -100);
    const customTurretSize = 20;
    const customFireballSize = 10;
    const turret = new Turret(turretPos, customTurretSize, customFireballSize);
    
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
    expect(sparkle.scale.x).toBeCloseTo(customFireballSize);
  });
});
