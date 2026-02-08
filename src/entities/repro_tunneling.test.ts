import { expect, test, describe, beforeEach, vi } from 'vitest'
import * as THREE from 'three'
import { EntityManager } from './EntityManager'

describe('EntityManager Tunneling Repro', () => {
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
    
    mockCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    mockCamera.position.set(0, 0, 0);
    mockCamera.updateMatrixWorld();
  })

  test('should detect collision even when fireball tunnels over the detection zone', () => {
    const onPlayerHit = vi.fn();
    
    // threshold = 1.5
    // Start at z = -2.0 (dist = 2.0)
    // Move to z = +3.0 (dist = -3.0)
    // dt = 0.05, velocity = 100
    
    const fbPos = new THREE.Vector3(0, 0, -2.0);
    const fbVel = new THREE.Vector3(0, 0, 100); 
    const fireball = entityManager.spawnFireball(fbPos, fbVel);

    // This update will move fireball from -2.0 to 3.0.
    // Crossing the threshold at 1.5.
    entityManager.update(0.05, playerPosition, playerQuaternion, false, mockCamera, onPlayerHit);

    expect(onPlayerHit).toHaveBeenCalled();
    expect(fireball.isExploded).toBe(true);
  });
});
