import * as THREE from 'three';
import { state, updateState } from './state';
import { UserInput } from './input';
import { CombatSystem } from './CombatSystem';
import { materialSystem } from './MaterialSystem';

export class GameSystem {
  private combatSystem: CombatSystem;
  private camera: THREE.Camera;

  constructor(camera: THREE.Camera) {
    this.camera = camera;
    this.combatSystem = new CombatSystem(camera);
  }

  public update(deltaTime: number, input: UserInput) {
    // 1. Update State (includes Player and EntityManager/Entities)
    updateState(deltaTime, this.camera, input);

    // 2. Update Combat (Firing, Hits, Lasers)
    this.combatSystem.update(deltaTime, input);

    // 3. Update Audio Listener
    state.audioManager?.updateListener(this.camera);

    // 4. Update Materials (Bloom intensity, etc.)
    materialSystem.update();
  }
}