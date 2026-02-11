import * as THREE from 'three';
import { describe, it, expect, beforeEach } from 'vitest';
import { state, initGame } from '../state';

describe('EntityManager Turret Leak', () => {
  let worldScene: THREE.Scene;
  let hudScene: THREE.Scene;

  beforeEach(() => {
    worldScene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(worldScene, hudScene);
  });

  it('should not leak turrets in EntityManager when resetting TRENCH stage', () => {
    // 1. Enter TRENCH stage
    state.stage = 'TRENCH';
    state.stageManager!.reset();
    
    const initialTurretCount = state.entityManager!.getTargets().filter(t => t.constructor.name === 'Turret').length;
    expect(initialTurretCount).toBeGreaterThan(0);

    // 2. Reset TRENCH stage (simulating restart)
    state.stageManager!.reset();
    
    const secondTurretCount = state.entityManager!.getTargets().filter(t => t.constructor.name === 'Turret').length;
    
    // If it leaks, secondTurretCount will be 2 * initialTurretCount
    expect(secondTurretCount).toBe(initialTurretCount);
  });

  it('should remove turrets from EntityManager when TrenchStage is cleaned up', () => {
    // 1. Enter TRENCH stage
    state.stage = 'TRENCH';
    state.stageManager!.reset();
    
    const initialTurretCount = state.entityManager!.getTargets().filter(t => t.constructor.name === 'Turret').length;
    expect(initialTurretCount).toBeGreaterThan(0);

    // 2. Transition to DOGFIGHT stage (calls cleanup() on TrenchStage)
    state.stage = 'DOGFIGHT';
    state.stageManager!.reset();
    
    const finalTurretCount = state.entityManager!.getTargets().filter(t => t.constructor.name === 'Turret').length;
    expect(finalTurretCount).toBe(0);
  });
});
