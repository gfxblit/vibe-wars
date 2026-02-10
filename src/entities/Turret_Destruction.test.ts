import * as THREE from 'three';
import { describe, it, expect, beforeEach } from 'vitest';
import { state, initGame } from '../state';
import { CombatSystem } from '../CombatSystem';

describe('Turret Destruction', () => {
  let worldScene: THREE.Scene;
  let hudScene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let combatSystem: CombatSystem;

  beforeEach(() => {
    worldScene = new THREE.Scene();
    hudScene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10000);
    initGame(worldScene, hudScene);
    combatSystem = new CombatSystem(camera);

    // Transition to TRENCH stage
    state.stage = 'TRENCH';
    if (state.stageManager) {
        state.stageManager.reset();
    }
  });

  it('should allow turrets to be destroyed and award points', () => {
    const initialScore = state.score;
    const initialKills = state.kills;

    // Get a turret from the entityManager
    const targets = state.entityManager!.getTargets();
    const turret = targets.find(t => t.constructor.name === 'Turret');
    
    expect(turret).toBeDefined();
    expect(turret!.isExploded).toBe(false);

    // Position camera to look at the turret
    camera.position.copy(turret!.position).add(new THREE.Vector3(0, 0, 100));
    camera.lookAt(turret!.position);
    camera.updateMatrixWorld();

    // Simulate firing at the turret
    // We need to calculate the NDC coordinates of the turret
    const projected = turret!.position.clone().project(camera);
    const input = { x: projected.x, y: projected.y, isFiring: true, isLaunchingTorpedo: false };

    combatSystem.update(0.1, input);

    expect(turret!.isExploded).toBe(true);
    expect(state.score).toBe(initialScore + turret!.getScore());
    expect(state.kills).toBe(initialKills + 1);
  });
});
