import { expect, test, describe, beforeEach, vi } from 'vitest'
import * as THREE from 'three'
import { EntityManager } from './EntityManager'
import { GameConfig } from '../config'
import { state, initGame } from '../state'

describe('EntityManager', () => {
  let scene: THREE.Scene;
  let hudScene: THREE.Scene;
  let entityManager: EntityManager;
  let playerPosition: THREE.Vector3;
  let playerQuaternion: THREE.Quaternion;

  beforeEach(() => {
    scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    entityManager = state.entityManager!;
    playerPosition = new THREE.Vector3(0, 0, 0);
    playerQuaternion = new THREE.Quaternion();
  })

  test('spawnTieFighter should add to scene and list', () => {
    entityManager.clear();
    entityManager.spawnTieFighter(true);
    expect(entityManager.getTieFighters().length).toBe(1);
    expect(scene.children.length).toBe(1);
  })

  test('removeTieFighter should call dispose and remove from scene', () => {
    entityManager.clear();
    entityManager.spawnTieFighter(false);
    const actualTf = entityManager.getTieFighters()[0];
    const disposeSpy = vi.spyOn(actualTf, 'dispose');
    actualTf.position.set(0, 0, GameConfig.tieFighter.cleanupDistance + 100);
    vi.spyOn(actualTf, 'update').mockReturnValue(new THREE.Vector3());
    entityManager.update(0.1, playerPosition, playerQuaternion, true, new THREE.PerspectiveCamera(), GameConfig.player.baseForwardSpeed);
    expect(entityManager.getTieFighters().length).toBe(0);
    expect(scene.children.length).toBe(0);
    expect(disposeSpy).toHaveBeenCalled();
  })

  test('clear should dispose all fighters', () => {
    entityManager.spawnTieFighter(true);
    entityManager.spawnTieFighter(false);
    const fighters = entityManager.getTieFighters();
    const spies = fighters.map(tf => vi.spyOn(tf, 'dispose'));
    entityManager.clear();
    expect(entityManager.getTieFighters().length).toBe(0);
    expect(scene.children.length).toBe(0);
    spies.forEach(spy => expect(spy).toHaveBeenCalled());
  })

  test('fireball should collide with camera when crossing threshold', () => {
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    playerPosition.set(0, 0, 100);
    playerQuaternion.set(0, 0, 0, 1);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();

    const onHit = vi.fn();
    const fbPos = new THREE.Vector3(0, 0, 90);
    const fbVel = new THREE.Vector3(0, 0, 100);
    const fb = entityManager.spawnFireball(fbPos, fbVel);

    entityManager.update(0.05, playerPosition, playerQuaternion, false, camera, GameConfig.player.baseForwardSpeed, onHit);
    expect(onHit).not.toHaveBeenCalled();
    expect(fb.isExploded).toBe(false);

    entityManager.update(0.05, playerPosition, playerQuaternion, false, camera, GameConfig.player.baseForwardSpeed, onHit);
    expect(onHit).toHaveBeenCalled();
    expect(fb.isExploded).toBe(true);
  })

  test('spawnTorpedo should add to scene and list', () => {
    entityManager.clear();
    const pos = new THREE.Vector3(0, 0, 0);
    const vel = new THREE.Vector3(0, 0, -100);
    entityManager.spawnTorpedo(pos, vel);
    expect(entityManager.getTorpedoes().length).toBe(1);
    expect(scene.children.length).toBe(1);
  });

  test('update should move torpedoes and remove expired ones', () => {
    entityManager.clear();
    const pos = new THREE.Vector3(0, 0, 0);
    const vel = new THREE.Vector3(0, 0, -100);
    const torpedo = entityManager.spawnTorpedo(pos, vel);
    
    entityManager.update(0.1, playerPosition, playerQuaternion, false, new THREE.PerspectiveCamera(), GameConfig.player.baseForwardSpeed);
    expect(torpedo.position.z).toBeCloseTo(-10);

    torpedo.explode();
    entityManager.update(GameConfig.fireball.explosionDuration + 0.1, playerPosition, playerQuaternion, false, new THREE.PerspectiveCamera(), GameConfig.player.baseForwardSpeed);
    expect(entityManager.getTorpedoes().length).toBe(0);
  });
})