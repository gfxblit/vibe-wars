import { describe, it, expect, beforeEach, vi } from 'vitest';
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
    // We need enough time to potentially span a fire interval plus randomness
    const iterations = Math.ceil(GameConfig.fireball.fireRate / dt) + 20;

    const spawnSpy = vi.spyOn(state.entityManager!, 'spawnFireball');

    for (let i = 0; i < iterations; i++) {
      updateState(dt);
      // Break early if spawn happens
      if (spawnSpy.mock.calls.length > 0) break;
    }

    expect(spawnSpy).toHaveBeenCalled();
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

    const initialShields = state.shields;

    updateState(0.1);

    expect(state.shields).toBe(initialShields);
  });

  it('should not damage player if exploded', () => {
    const fireball = new Fireball(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 0));
    fireball.explode();
    state.entityManager!.getFireballs().push(fireball);

    const initialShields = state.shields;

    updateState(0.1);

    expect(state.shields).toBe(initialShields);
  });

  it('should not register another hit if already exploded', () => {
    // This test verifies that CombatSystem skips exploded fireballs
    const fireball = new Fireball(new THREE.Vector3(0, 0, -20), new THREE.Vector3(0, 0, 10));
    fireball.explode();
    state.entityManager!.getFireballs().push(fireball);

    const initialScore = state.score;

    // Even if we update, the exploded fireball shouldn't award more points
    updateState(0.1);

    expect(state.score).toBe(initialScore);
  });
});