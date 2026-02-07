import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { initGame, state, updateState } from './state';
import { GameConfig } from './config';
import { Fireball } from './entities/Fireball';

describe('Fireball Integration', () => {
  let scene: THREE.Scene;
  let hudScene: THREE.Scene;

  beforeEach(() => {
    scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    // Ensure we have a player and a tie fighter
    expect(state.player).toBeDefined();
    expect(state.entityManager?.getTieFighters().length).toBeGreaterThan(0);
  });

  it('Tie Fighters should spawn fireballs over time', () => {
    // Use smaller steps
    const dt = 0.1;
    const iterations = Math.ceil(GameConfig.fireball.fireRate / dt) + 10;

    let spawned = false;
    for (let i = 0; i < iterations; i++) {
      const beforeCount = state.entityManager!.getFireballs().length;
      updateState(dt);
      const afterCount = state.entityManager!.getFireballs().length;
      if (afterCount > beforeCount) spawned = true;
    }

    expect(spawned).toBe(true);
  });

  it('Fireballs should move toward the player', () => {
    state.isSmartAI = false;
    initGame(scene, hudScene);
    let fb: Fireball | null = null;
    for (let i = 0; i < 200 && !fb; i++) {
      const beforeCount = state.entityManager!.getFireballs().length;
      updateState(0.1);
      const fireballs = state.entityManager!.getFireballs();
      if (fireballs.length > beforeCount) fb = fireballs[fireballs.length - 1];
    }

    expect(fb).toBeDefined();
    const initialDist = fb!.position.distanceTo(state.player!.position);

    updateState(0.01); 
    const newDist = fb!.position.distanceTo(state.player!.position);

    expect(newDist).toBeLessThan(initialDist);
  });

  it('Fireballs should damage player on collision', () => {
    state.isSmartAI = false;
    initGame(scene, hudScene);
    // Spawn a fireball
    let fb: Fireball | null = null;
    for (let i = 0; i < 200 && !fb; i++) {
      const beforeCount = state.entityManager!.getFireballs().length;
      updateState(0.1);
      const fireballs = state.entityManager!.getFireballs();
      if (fireballs.length > beforeCount) fb = fireballs[fireballs.length - 1];
    }
    
    expect(fb).toBeDefined();
    const initialShields = state.shields;
    
    // Teleport fireball to player
    fb!.position.copy(state.player!.position);

    updateState(0.01);

    expect(state.shields).toBeLessThan(initialShields);
  });
});
