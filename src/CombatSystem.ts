import * as THREE from 'three';
import { state } from './state';
import { UserInput } from './input';
import { CombatStrategy } from './CombatStrategy';
import { DogfightCombatStrategy, SurfaceCombatStrategy, TrenchCombatStrategy } from './CombatStrategies';
import { GameStage } from './state';
import { GameConfig } from './config';

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
    const strategyConfig = {
      maxRange: GameConfig.laser.maxRange,
      fireCooldown: GameConfig.laser.cooldown,
      fireballCollisionRadiusNDC: GameConfig.fireball.collisionRadiusNDC,
      fireballPoints: GameConfig.fireball.points,
      baseForwardSpeed: GameConfig.player.baseForwardSpeed,
      torpedoSpeedMultiplier: GameConfig.torpedo.speedMultiplier,
    };

    switch (this.currentStage) {
      case 'DOGFIGHT':
        this.currentStrategy = new DogfightCombatStrategy(strategyConfig);
        break;
      case 'SURFACE':
        this.currentStrategy = new SurfaceCombatStrategy(strategyConfig);
        break;
      case 'TRENCH':
        this.currentStrategy = new TrenchCombatStrategy(strategyConfig);
        break;
      default:
        this.currentStrategy = null;
    }
  }
}