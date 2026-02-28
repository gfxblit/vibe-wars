import { describe, it, expect, beforeEach } from 'vitest';
import { EntityManager } from './EntityManager';
import * as THREE from 'three';
import { AIStrategyFactory } from './AIStrategyFactory';
import { Targetable } from './Entity';

describe('EntityManager Optimization', () => {
  let entityManager: EntityManager;
  let worldScene: THREE.Scene;
  let hudScene: THREE.Scene;

  beforeEach(() => {
    worldScene = new THREE.Scene();
    hudScene = new THREE.Scene();
    entityManager = new EntityManager(worldScene, hudScene, new AIStrategyFactory());
  });

  it('forEachTarget should iterate over all tieFighters and additionalTargets', () => {
    // Add two tie fighters
    entityManager.spawnTieFighter(false);
    entityManager.spawnTieFighter(true);

    // Create a mock additional target
    const mockTarget: Targetable = {
      position: new THREE.Vector3(),
      isExploded: false,
      explode: () => {},
      getScore: () => 100,
      getWorldPosition: (out: THREE.Vector3) => out.set(0, 0, 0),
      update: () => null,
    };
    entityManager.addTarget(mockTarget);

    const iteratedTargets: Targetable[] = [];

    // Run the optimized iteration method
    entityManager.forEachTarget((target) => {
      iteratedTargets.push(target);
    });

    // The total iterated targets should equal the tie fighters (2) + additional target (1)
    expect(iteratedTargets.length).toBe(3);

    // Ensure the mock target is in the list
    expect(iteratedTargets).toContain(mockTarget);

    // Ensure tie fighters are in the list
    const tieFighters = entityManager.getTieFighters();
    expect(iteratedTargets).toContain(tieFighters[0]);
    expect(iteratedTargets).toContain(tieFighters[1]);
  });
});
