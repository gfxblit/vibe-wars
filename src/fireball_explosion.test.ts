import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { state, initGame, updateState } from './state';
import { CombatSystem } from './CombatSystem';

describe('Fireball Explosion Integration', () => {
  let combatSystem: CombatSystem;
  let scene: THREE.Scene;
  let hudScene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;

  beforeEach(() => {
    scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);
    camera.updateMatrixWorld();

    combatSystem = new CombatSystem(camera);
  });

  it('should explode a fireball when hit by a laser', () => {
    const fbPos = new THREE.Vector3(0, 0, -20);
    const fireball = state.entityManager!.spawnFireball(fbPos, new THREE.Vector3(0, 0, 10));

    // Create a laser that will hit the fireball
    // projected NDC of (0,0,-20) with camera at (0,0,0) looking at -Z should be (0,0)
    const input = { x: 0, y: 0, isFiring: true };

    const initialScore = state.score;

    // 1. Initial update to spawn lasers
    combatSystem.update(0.01, input);

    // 2. Get the spawned laser and move it to (0,0) to ensure a hit
    // Lasers spawn at gun offsets, so they might not hit in the first frame naturally
    const lasers = state.entityManager!.getLasers();
    expect(lasers.length).toBeGreaterThan(0);
    const laser = lasers[0];
    laser.mesh.position.set(0, 0, 0);

    // 3. Update again to check for collisions (turn off firing to avoid spawning more)
    combatSystem.update(0.01, { ...input, isFiring: false });

    expect(fireball.isExploded).toBe(true);
    expect(state.score).toBeGreaterThan(initialScore);
  });

  it('should not damage player if fireball is exploded', () => {
    const fbPos = state.player!.position.clone().add(new THREE.Vector3(0, 0, -1)); // Right in front
    const fireball = state.entityManager!.spawnFireball(fbPos, new THREE.Vector3(0, 0, 10));

    fireball.explode();

    const initialShields = state.shields;
    updateState(0.1);

    expect(state.shields).toBe(initialShields);
  });

  it('should keep exploded fireball in state array until animation completes', () => {
    // Position fireball close to player (at origin) to avoid expiration distance check
    // Give it the same forward velocity as the player so it doesn't get left behind
    const playerForwardVelocity = new THREE.Vector3(0, 0, -1).multiplyScalar(state.player!.mesh.userData.forwardSpeed || 100);
    const fireball = state.entityManager!.spawnFireball(new THREE.Vector3(0, 0, -5), playerForwardVelocity);

    fireball.explode();

    // Update for less than explosion duration (0.5s)
    updateState(0.3);

    // Fireball should still in the array
    expect(state.entityManager!.getFireballs()).toContain(fireball);
    expect(fireball.isExploded).toBe(true);
  });

  it('should remove exploded fireball after animation completes', () => {
    // Position fireball close to player to avoid expiration distance check
    // Give it the same forward velocity as the player so it doesn't get left behind
    const playerForwardVelocity = new THREE.Vector3(0, 0, -1).multiplyScalar(state.player!.mesh.userData.forwardSpeed || 100);
    const fireball = state.entityManager!.spawnFireball(new THREE.Vector3(0, 0, -5), playerForwardVelocity);

    fireball.explode();

    // Update for more than explosion duration (0.5s)
    updateState(0.6);

    // Fireball should be removed
    expect(state.entityManager!.getFireballs()).not.toContain(fireball);
  });
});
