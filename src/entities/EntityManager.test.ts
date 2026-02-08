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
    // Use spawnTieFighter to get it in the list properly or add it via a testing-only method if we had one
    // Since we don't, we'll just use spawnTieFighter and then override its position
    entityManager.spawnTieFighter(false);
    const actualTf = entityManager.getTieFighters()[0];
    
    const disposeSpy = vi.spyOn(actualTf, 'dispose');
    
    // Set position far away
    actualTf.position.set(0, 0, GameConfig.tieFighter.cleanupDistance + 100);
    
    // We need to make sure the strategy doesn't move it back during update
    vi.spyOn(actualTf, 'update').mockReturnValue(new THREE.Vector3());
    
    entityManager.update(0.1, playerPosition, playerQuaternion, true, new THREE.PerspectiveCamera());
    
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
})
