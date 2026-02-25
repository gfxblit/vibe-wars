import { expect, test, describe, beforeEach } from 'vitest'
import * as THREE from 'three'
import { EntityManager } from './EntityManager'
import { Targetable } from './Entity'
import { initGame, state } from '../state'

describe('EntityManager Optimization', () => {
  let scene: THREE.Scene;
  let hudScene: THREE.Scene;
  let entityManager: EntityManager;

  beforeEach(() => {
    scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    entityManager = state.entityManager!;
  })

  test('forEachTarget should iterate over both TieFighters and additional targets', () => {
    entityManager.clear();

    // Add a TieFighter
    entityManager.spawnTieFighter(false);
    expect(entityManager.getTieFighters().length).toBe(1);

    // Add a mock target
    const mockTarget: Targetable = {
      position: new THREE.Vector3(),
      getWorldPosition: () => new THREE.Vector3(),
      isExploded: false,
      explode: () => {},
      getScore: () => 100
    };
    entityManager.addTarget(mockTarget);

    // Check baseline
    expect(entityManager.getTargets().length).toBe(2);

    const visited: Targetable[] = [];
    entityManager.forEachTarget((target) => {
        visited.push(target);
    });

    expect(visited.length).toBe(2);
    expect(visited).toContain(entityManager.getTieFighters()[0]);
    expect(visited).toContain(mockTarget);
  });
});
