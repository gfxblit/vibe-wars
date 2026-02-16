import * as THREE from 'three';
import { describe, it, expect, beforeEach } from 'vitest';
import { state, initGame } from './state';
import { CombatSystem } from './CombatSystem';
import { Turret } from './entities/Turret';

describe('Issue 124 Reproduction: Hitting one turret destroys them all', () => {
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

  it('should only destroy the targeted turret', () => {
    // Clear existing targets if any
    state.entityManager?.clear();

    // Spawn two turrets at different positions
    const turret1 = new Turret(new THREE.Vector3(0, 0, -100));
    const turret2 = new Turret(new THREE.Vector3(100, 0, -100));
    
    state.entityManager?.addTarget(turret1);
    state.entityManager?.addTarget(turret2);
    worldScene.add(turret1.mesh);
    worldScene.add(turret2.mesh);

    expect(turret1.isExploded).toBe(false);
    expect(turret2.isExploded).toBe(false);

    // Position camera to look at turret1
    camera.position.set(0, 0, 0);
    camera.lookAt(new THREE.Vector3(0, 0, -100));
    camera.updateMatrixWorld();

    // Calculate NDC for turret1 (should be 0, 0 since we're looking right at it)
    const turret1Pos = new THREE.Vector3();
    turret1.getWorldPosition(turret1Pos);
    const projected = turret1Pos.clone().project(camera);

    // Fire at turret1
    const input = { x: projected.x, y: projected.y, isFiring: true, isLaunchingTorpedo: false };
    combatSystem.update(0.1, input);

    // Verify turret1 is exploded
    expect(turret1.isExploded).toBe(true);
    
    // Verify turret2 is NOT exploded
    expect(turret2.isExploded).toBe(false);
  });

  it('should only destroy the closest turret among many', () => {
    state.entityManager?.clear();
    const turrets: Turret[] = [];
    for (let i = 0; i < 10; i++) {
      const turret = new Turret(new THREE.Vector3(0, 0, -100 - i * 10));
      state.entityManager?.addTarget(turret);
      worldScene.add(turret.mesh);
      turrets.push(turret);
    }

    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);
    camera.updateMatrixWorld();

    // Fire at the front (should be turrets[0])
    const input = { x: 0, y: 0, isFiring: true, isLaunchingTorpedo: false };
    combatSystem.update(0.1, input);

    expect(turrets[0].isExploded).toBe(true);
    for (let i = 1; i < 10; i++) {
      expect(turrets[i].isExploded).toBe(false);
    }
  });

  it('should not share materials between turrets', () => {
    const turret1 = new Turret(new THREE.Vector3(0, 0, 0));
    const turret2 = new Turret(new THREE.Vector3(100, 0, 0));

    const materials1: THREE.Material[] = [];
    turret1.mesh.traverse(child => {
      if (child instanceof THREE.Mesh) {
        materials1.push(child.material);
      }
    });

    const materials2: THREE.Material[] = [];
    turret2.mesh.traverse(child => {
      if (child instanceof THREE.Mesh) {
        materials2.push(child.material);
      }
    });

    expect(materials1.length).toBeGreaterThan(0);
    expect(materials2.length).toBeGreaterThan(0);

    materials1.forEach(m1 => {
      materials2.forEach(m2 => {
        expect(m1).not.toBe(m2);
      });
    });
  });
});
