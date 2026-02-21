import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Surface } from './Surface';
import { EntityManager } from './EntityManager';
import * as THREE from 'three';

describe('Surface Refactor', () => {
    let surface: Surface;
    let entityManager: EntityManager;

    beforeEach(() => {
        surface = new Surface();
        entityManager = {
            addTarget: vi.fn(),
            removeTarget: vi.fn(),
            spawnFireball: vi.fn()
        } as any as EntityManager;
    });

    it('should add towers to EntityManager upon creation', () => {
        // Trigger tower spawn
        surface.update(0.1, new THREE.Vector3(0,0,0), entityManager);
        
        expect(entityManager.addTarget).toHaveBeenCalled();
    });

    it('should NOT accept a spawnFireball callback in update', () => {
        // Currently update takes 4 arguments. We want it to take 3 (or less if optional).
        // Check function arity.
        expect(surface.update.length).toBeLessThanOrEqual(3);
    });
});
