import * as THREE from 'three';
import { describe, it, expect, beforeEach } from 'vitest';
import { state, initGame } from '../state';
import { Turret } from './Turret';

describe('Torpedo-Turret Collision', () => {
  let worldScene: THREE.Scene;
  let hudScene: THREE.Scene;

  beforeEach(() => {
    worldScene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(worldScene, hudScene);
  });

  it('should allow turrets to be destroyed by torpedoes', () => {
    const turretPos = new THREE.Vector3(0, 0, -100);
    const turret = new Turret(turretPos);
    state.entityManager!.addTarget(turret);

    const torpedoPos = new THREE.Vector3(0, 0, -100);
    const torpedoVelocity = new THREE.Vector3(0, 0, -10);
    state.entityManager!.spawnTorpedo(torpedoPos, torpedoVelocity);

    const initialScore = state.score;
    const initialKills = state.kills;

    // Simulate update to trigger collision
    state.entityManager!.update(0.1, new THREE.Vector3(0, 0, 0), new THREE.Quaternion(), false, new THREE.Camera(), 0);

    expect(turret.isExploded).toBe(true);
    expect(state.score).toBe(initialScore + turret.getScore());
    expect(state.kills).toBe(initialKills + 1);
  });
});
