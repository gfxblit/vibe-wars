import * as THREE from 'three';
import { GameConfig } from './config';
import { state, GameStage } from './state';
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

    const onComplete = () => this.goToNextStage();
    const onReset = () => this.reset();

    switch (state.stage) {
      case 'DOGFIGHT':
        this.currentStage = new DogfightStage(this.worldScene, onComplete);
        break;
      case 'SURFACE':
        this.currentStage = new SurfaceStage(this.worldScene, onComplete);
        break;
      case 'TRENCH':
        this.currentStage = new TrenchStage(this.worldScene, onComplete, onReset);
        break;
    }
  }

  public setStageInstance(stage: Stage): void {
    if (this.currentStage) {
      this.currentStage.cleanup();
    }
    this.currentStage = stage;
  }

  public setStage(stage: GameStage): void {
    state.stage = stage;
    state.kills = 0;
    this.reset();
  }

  public getStage(): Stage | null {
    return this.currentStage;
  }

  public update(deltaTime: number, player: Player): void {
    if (this.currentStage) {
      this.currentStage.update(deltaTime, player);
    }
  }

  public goToNextStage(): void {
    const sequence: readonly GameStage[] = state.wave === 1 
      ? GameConfig.progression.wave1 
      : GameConfig.progression.default;
    
    const currentIndex = sequence.indexOf(state.stage);
    
    if (currentIndex !== -1 && currentIndex < sequence.length - 1) {
      state.stage = sequence[currentIndex + 1];
    } else {
      state.wave++;
      // Award shield bonus (up to max) for completing a full run
      state.shields = Math.min(GameConfig.player.maxShields, state.shields + 1);
      state.stage = sequence[0];
    }

    state.kills = 0;
    this.reset();
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

  public destroy(): void {
    if (this.currentStage) {
      this.currentStage.cleanup();
    }
  }
}