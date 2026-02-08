import { expect, test, describe, beforeEach, vi } from 'vitest'
import * as THREE from 'three'
import { EntityManager } from './EntityManager'
import { GameConfig } from '../config'

describe('EntityManager Collision', () => {
  let scene: THREE.Scene;
  let hudScene: THREE.Scene;
  let entityManager: EntityManager;
  let playerPosition: THREE.Vector3;
  let playerQuaternion: THREE.Quaternion;
  let mockCamera: THREE.Camera;

  beforeEach(() => {
    scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    entityManager = new EntityManager(scene, hudScene);
    playerPosition = new THREE.Vector3(0, 0, 0);
    playerQuaternion = new THREE.Quaternion();
    
    // Near: 0.1, Far: 1000
    mockCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    mockCamera.position.set(0, 0, 0);
    mockCamera.updateMatrixWorld();
  })

  test('should detect collision when fireball hits near plane (screen)', () => {
    const onPlayerHit = vi.fn();
    
    // threshold is 2.0. Start at 3.0.
    const fbPos = new THREE.Vector3(0, 0, -3.0); 
    const fbVel = new THREE.Vector3(0, 0, 40); // Moves 4.0 in 0.1s
    const fireball = entityManager.spawnFireball(fbPos, fbVel);

    // Moves to z = +2.0 (behind camera). Crossing 1.5, 0, etc.
    entityManager.update(0.1, playerPosition, playerQuaternion, false, mockCamera, onPlayerHit);

    expect(onPlayerHit).toHaveBeenCalledWith(GameConfig.fireball.damage);
    expect(fireball.isExploded).toBe(true);
  });

  test('should NOT detect collision when fireball is off-screen (NDC X > 1)', () => {
    const onPlayerHit = vi.fn();
    // Way to the right. Start at z = -2.0.
    const fbPos = new THREE.Vector3(10, 0, -2.0);
    const fbVel = new THREE.Vector3(0, 0, 40);
    const fireball = entityManager.spawnFireball(fbPos, fbVel);

    entityManager.update(0.1, playerPosition, playerQuaternion, false, mockCamera, onPlayerHit);

    expect(onPlayerHit).not.toHaveBeenCalled();
    expect(fireball.isExploded).toBe(false);
  });

  test('should NOT detect collision when fireball is too far (dist > threshold)', () => {
    const onPlayerHit = vi.fn();
    // Far away, moving but won't reach threshold
    const fbPos = new THREE.Vector3(0, 0, -10);
    const fbVel = new THREE.Vector3(0, 0, 20); // Moves to -8.0
    const fireball = entityManager.spawnFireball(fbPos, fbVel);

    entityManager.update(0.1, playerPosition, playerQuaternion, false, mockCamera, onPlayerHit);

    expect(onPlayerHit).not.toHaveBeenCalled();
    expect(fireball.isExploded).toBe(false);
  });

  test('should NOT detect collision when fireball is behind the camera', () => {
    const onPlayerHit = vi.fn();
    // Behind camera (positive Z), moving further away
    const fbPos = new THREE.Vector3(0, 0, 1); 
    const fbVel = new THREE.Vector3(0, 0, 40); 
    const fireball = entityManager.spawnFireball(fbPos, fbVel);

    entityManager.update(0.1, playerPosition, playerQuaternion, false, mockCamera, onPlayerHit);

    expect(onPlayerHit).not.toHaveBeenCalled();
    expect(fireball.isExploded).toBe(false);
  });
});
