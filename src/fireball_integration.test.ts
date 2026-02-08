import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { initGame, state, updateState } from './state';
import { GameConfig } from './config';
import { Fireball } from './entities/Fireball';

describe('Fireball Integration', () => {
  let scene: THREE.Scene;
  let hudScene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;

  beforeEach(() => {
    scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);
    camera.updateMatrixWorld();
    
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
      updateState(dt, camera);
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
      updateState(0.1, camera);
      const fireballs = state.entityManager!.getFireballs();
      if (fireballs.length > beforeCount) fb = fireballs[fireballs.length - 1];
    }

    expect(fb).toBeDefined();
    const initialDist = fb!.position.distanceTo(state.player!.position);

    updateState(0.01, camera);
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
      updateState(0.1, camera);
      const fireballs = state.entityManager!.getFireballs();
      if (fireballs.length > beforeCount) fb = fireballs[fireballs.length - 1];
    }

    const initialShields = state.shields;
    
    if (fb) {
         // Teleport player and camera to origin
         state.player!.position.set(0, 0, 0);
         camera.position.set(0, 0, 0);
         camera.updateMatrixWorld();
         
         // Start outside threshold (2.0) and move through it
         fb.mesh.position.set(0, 0, -3.0);
         fb.velocity.set(0, 0, 40); // Will move 4.0 in 0.1s, reaching +1.0
    }

    updateState(0.1, camera);

    expect(state.shields).toBeLessThan(initialShields);
  });

  it('should not damage player if exploded', () => {
    // Fireball moving across threshold but already exploded
    const fireball = new Fireball(new THREE.Vector3(0, 0, -2.0), new THREE.Vector3(0, 0, 40));
    fireball.explode();
    state.entityManager!.getFireballs().push(fireball);

    const initialShields = state.shields;

    updateState(0.1, camera);

    expect(state.shields).toBe(initialShields);
  });

  it('should not register another hit if already exploded', () => {
    // This test verifies that CombatSystem skips exploded fireballs
    const fireball = new Fireball(new THREE.Vector3(0, 0, -2.0), new THREE.Vector3(0, 0, 40));
    fireball.explode();
    state.entityManager!.getFireballs().push(fireball);

    const initialScore = state.score;

    // Even if we update, the exploded fireball shouldn't award more points
    updateState(0.1, camera);

    expect(state.score).toBe(initialScore);
  });
});
