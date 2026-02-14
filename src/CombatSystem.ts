import * as THREE from 'three';
import { state } from './state';
import { UserInput } from './input';
import { CombatStrategy } from './CombatStrategy';
import { DogfightCombatStrategy, SurfaceCombatStrategy, TrenchCombatStrategy } from './CombatStrategies';
import { GameStage } from './state';

export class CombatSystem {
  private camera: THREE.Camera;
  private currentStrategy: CombatStrategy | null = null;
  private currentStage: GameStage | null = null;

  constructor(camera: THREE.Camera) {
    this.camera = camera;
    this.updateStrategy();
  }

  public update(deltaTime: number, input: UserInput) {
    this.updateStrategy();
    this.camera.updateMatrixWorld();
    if (this.currentStrategy) {
      this.currentStrategy.update(deltaTime, input, this.camera);
    }
  }

  private updateStrategy() {
    if (this.currentStage === state.stage && this.currentStrategy) {
      return;
    }

    this.currentStage = state.stage;
    switch (this.currentStage) {
      case 'DOGFIGHT':
        this.currentStrategy = new DogfightCombatStrategy();
        break;
      case 'SURFACE':
        this.currentStrategy = new SurfaceCombatStrategy();
        break;
      case 'TRENCH':
        this.currentStrategy = new TrenchCombatStrategy();
        break;
      default:
        this.currentStrategy = null;
    }
  }
}