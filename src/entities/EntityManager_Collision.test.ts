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
    
    // A fireball at z=-0.11 is just past the near plane (0.1)
    // In NDC, z = -1 is near, z = 1 is far.
    // So z=-0.11 should be very close to -1.
    const fbPos = new THREE.Vector3(0, 0, -0.11); 
    const fbVel = new THREE.Vector3(0, 0, 0);
    const fireball = entityManager.spawnFireball(fbPos, fbVel);

    const ndc = new THREE.Vector3().copy(fbPos).project(mockCamera);
    console.log(`Fireball at ${fbPos.z}, NDC: ${ndc.x}, ${ndc.y}, ${ndc.z}`);

    entityManager.update(0.1, playerPosition, playerQuaternion, false, mockCamera, onPlayerHit);

    expect(onPlayerHit).toHaveBeenCalledWith(GameConfig.fireball.damage);
    expect(fireball.isExploded).toBe(true);
  });

  test('should NOT detect collision when fireball is off-screen (NDC X > 1)', () => {
    const onPlayerHit = vi.fn();
    // Way to the right, but at same depth
    const fbPos = new THREE.Vector3(10, 0, -0.11);
    const fbVel = new THREE.Vector3(0, 0, 0);
    const fireball = entityManager.spawnFireball(fbPos, fbVel);

    entityManager.update(0.1, playerPosition, playerQuaternion, false, mockCamera, onPlayerHit);

    expect(onPlayerHit).not.toHaveBeenCalled();
    expect(fireball.isExploded).toBe(false);
  });

  test('should NOT detect collision when fireball is too far (NDC Z > threshold)', () => {
    const onPlayerHit = vi.fn();
    // Far away
    const fbPos = new THREE.Vector3(0, 0, -10);
    const fbVel = new THREE.Vector3(0, 0, 0);
    const fireball = entityManager.spawnFireball(fbPos, fbVel);

    entityManager.update(0.1, playerPosition, playerQuaternion, false, mockCamera, onPlayerHit);

    expect(onPlayerHit).not.toHaveBeenCalled();
    expect(fireball.isExploded).toBe(false);
  });

  test('should NOT detect collision when fireball is behind the camera', () => {
    const onPlayerHit = vi.fn();
    // Behind camera (positive Z)
    const fbPos = new THREE.Vector3(0, 0, 1); 
    const fbVel = new THREE.Vector3(0, 0, 0);
    const fireball = entityManager.spawnFireball(fbPos, fbVel);

    entityManager.update(0.1, playerPosition, playerQuaternion, false, mockCamera, onPlayerHit);

    // Three.js project() for points behind camera usually results in z > 1
    // or sometimes weird values, but definitely not < -0.9
    expect(onPlayerHit).not.toHaveBeenCalled();
    expect(fireball.isExploded).toBe(false);
  });
});
