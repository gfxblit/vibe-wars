import { describe, it, expect, vi } from 'vitest';
import { EntityManager } from './EntityManager';
import * as THREE from 'three';
import { Targetable } from './Entity';

describe('EntityManager Optimization', () => {
  it('forEachTarget iterates over tieFighters and additionalTargets without allocation', () => {
    const scene = new THREE.Scene();
    const hudScene = new THREE.Scene();
    const em = new EntityManager(scene, hudScene);

    const mockTieFighter = { isExploded: false } as any;
    const mockTarget = { isExploded: false } as any;

    (em as any).tieFighters.push(mockTieFighter);
    em.addTarget(mockTarget);

    const targets: Targetable[] = [];

    // Track if array methods are called to ensure zero allocation
    const arraySpy = vi.spyOn(Array.prototype, 'concat');

    em.forEachTarget(target => {
      targets.push(target);
    });

    expect(targets.length).toBe(2);
    expect(targets).toContain(mockTieFighter);
    expect(targets).toContain(mockTarget);
    expect(arraySpy).not.toHaveBeenCalled();

    arraySpy.mockRestore();
  });
});
