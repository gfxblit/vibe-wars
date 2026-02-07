import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { state, initGame, updateState } from './state';
import { CombatSystem } from './CombatSystem';
import { Fireball } from './entities/Fireball';

describe('Fireball Explosion Integration', () => {
  let combatSystem: CombatSystem;
  let hudScene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;

  beforeEach(() => {
    initGame();
    hudScene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);
    camera.updateMatrixWorld();

    combatSystem = new CombatSystem(hudScene, camera);
  });

  it('should explode a fireball when hit by a laser', () => {
    const fbPos = new THREE.Vector3(0, 0, -20);
    const fireball = new Fireball(fbPos, new THREE.Vector3(0, 0, 10));
    state.fireballs.push(fireball);

    // Create a laser that will hit the fireball
    // projected NDC of (0,0,-20) with camera at (0,0,0) looking at -Z should be (0,0)
    const input = { x: 0, y: 0, isFiring: true };

    // We need to simulate the laser update. 
    // CombatSystem.fire creates lasers.
    // @ts-ignore - access private fire for testing
    combatSystem.fire(input);

    expect(state.lasers.length).toBeGreaterThan(0);
    const laser = state.lasers[0];

    // Prevent laser from moving away from (0,0)
    vi.spyOn(laser, 'update').mockImplementation(() => { });

    // Position laser at the same NDC as fireball
    // The laser mesh position is its center in NDC.
    laser.mesh.position.set(0, 0, 0);

    const initialScore = state.score;

    combatSystem.update(0.01, input);

    expect(fireball.isExploded).toBe(true);
    expect(state.score).toBeGreaterThan(initialScore);
  });

  it('should not damage player if fireball is exploded', () => {
    const fbPos = state.player!.position.clone().add(new THREE.Vector3(0, 0, -1)); // Right in front
    const fireball = new Fireball(fbPos, new THREE.Vector3(0, 0, 10));
    state.fireballs.push(fireball);

    fireball.explode();

    const initialShields = state.shields;
    updateState(0.1);

    expect(state.shields).toBe(initialShields);
  });

  it('should keep exploded fireball in state array until animation completes', () => {
    // Position fireball close to player (at origin) to avoid expiration distance check
    const fireball = new Fireball(new THREE.Vector3(0, 0, -5), new THREE.Vector3(0, 0, 0));
    state.fireballs.push(fireball);

    fireball.explode();

    // Update for less than explosion duration (0.5s)
    updateState(0.3);

    // Fireball should still be in the array
    expect(state.fireballs).toContain(fireball);
    expect(fireball.isExploded).toBe(true);
  });

  it('should remove exploded fireball after animation completes', () => {
    // Position fireball close to player to avoid expiration distance check
    const fireball = new Fireball(new THREE.Vector3(0, 0, -5), new THREE.Vector3(0, 0, 0));
    state.fireballs.push(fireball);

    fireball.explode();

    // Update for more than explosion duration (0.5s)
    updateState(0.6);

    // Fireball should be removed
    expect(state.fireballs).not.toContain(fireball);
  });
});
