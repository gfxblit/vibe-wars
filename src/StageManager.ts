import * as THREE from 'three';
import { GameConfig } from './config';
import { state } from './state';
import { Player } from './entities/Player';
import { checkAim } from './collision';
import { UserInput } from './input';
import { Stage } from './stages/Stage';
import { DogfightStage } from './stages/DogfightStage';
import { SurfaceStage } from './stages/SurfaceStage';
import { TrenchStage } from './stages/TrenchStage';

export class StageManager {
  private currentStage: Stage | null = null;

  constructor(public worldScene: THREE.Scene) {
    this.initStage();
  }

  private initStage(): void {
    state.hasFiredTorpedo = false;
    state.canFireTorpedo = false;
    switch (state.stage) {
      case 'DOGFIGHT':
        this.currentStage = new DogfightStage(this.worldScene);
        break;
      case 'SURFACE':
        this.currentStage = new SurfaceStage(this.worldScene);
        break;
      case 'TRENCH':
        this.currentStage = new TrenchStage(this.worldScene, () => this.reset());
        break;
    }
  }

  public setStage(stage: Stage): void {
    if (this.currentStage) {
      this.currentStage.cleanup();
    }
    this.currentStage = stage;
  }

  public getStage(): Stage | null {
    return this.currentStage;
  }

  public update(deltaTime: number, player: Player): void {
    if (this.currentStage) {
      this.currentStage.update(deltaTime, player);
    }
  }

  public checkExhaustPortHit(input: UserInput, camera: THREE.Camera): boolean {
    if (!state.player) return false;

    const { catwalkEndZ, exhaustPortZOffset, trenchHeight } = GameConfig.stage;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    const portY = -trenchHeight / 2 + 10;
    const portPos = new THREE.Vector3(0, portY, portZ);

    const distanceToPort = Math.abs(state.player.position.z - portZ);
    if (distanceToPort > GameConfig.torpedo.range) return false;

    return checkAim(portPos, input, camera);
  }

  public reset(): void {
    if (this.currentStage) {
      this.currentStage.cleanup();
    }
    this.initStage();
  }
}