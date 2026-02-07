import * as THREE from 'three';
import { updateState } from './state';
import { UserInput } from './input';
import { CombatSystem } from './CombatSystem';

export class GameSystem {
  private combatSystem: CombatSystem;

  constructor(hudScene: THREE.Scene, camera: THREE.Camera) {
    this.combatSystem = new CombatSystem(hudScene, camera);
  }

  public update(deltaTime: number, input: UserInput) {
    // 1. Update Entities (Movement)
    updateState(deltaTime, input);

    // 2. Update Combat (Firing, Hits, Lasers)
    this.combatSystem.update(deltaTime, input);
  }
}
