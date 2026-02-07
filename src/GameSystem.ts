import * as THREE from 'three';
import { updateState } from './state';
import { UserInput } from './input';
import { CombatSystem } from './CombatSystem';

export class GameSystem {
  private combatSystem: CombatSystem;

  constructor(hudScene: THREE.Scene, camera: THREE.Camera) {
    this.combatSystem = new CombatSystem(hudScene, camera);
  }

  public update(deltaTime: number, input: UserInput, scene: THREE.Scene) {
    // 1. Update Entities (Movement)
    const { newFireballs, expiredFireballs } = updateState(deltaTime, input);

    // Add/remove fireballs from scene
    newFireballs.forEach(fb => {
      scene.add(fb.mesh);
    });
    expiredFireballs.forEach(fb => {
      scene.remove(fb.mesh);
      fb.dispose();
    });

    // 2. Update Combat (Firing, Hits, Lasers)
    this.combatSystem.update(deltaTime, input, scene);
  }
}