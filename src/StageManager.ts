import * as THREE from 'three';
import { GameConfig } from './config';
import { state, nextPhase } from './state';
import { Player } from './entities/Player';
import { DeathStar } from './entities/DeathStar';
import { Trench } from './entities/Trench';

export interface Stage {
  update(deltaTime: number, player: Player): void;
  cleanup(): void;
}

class DogfightStage implements Stage {
  constructor(private manager: StageManager) {}

  update(_deltaTime: number, _player: Player): void {
    if (state.kills >= GameConfig.stage.trenchKillsThreshold) {
      nextPhase();
      this.manager.setStage(new SurfaceStage(this.manager));
    }
  }

  cleanup(): void {}
}

class SurfaceStage implements Stage {
  private deathStar: DeathStar;

  constructor(private manager: StageManager) {
    this.deathStar = new DeathStar();
    this.manager.worldScene.add(this.deathStar.mesh);
  }

  update(deltaTime: number, player: Player): void {
    const dist = player.position.distanceTo(this.deathStar.position);
    if (dist < GameConfig.stage.trenchTransitionDistance) {
      nextPhase();
      this.manager.setStage(new TrenchStage(this.manager));
    }
    this.deathStar.update(deltaTime);
  }

  cleanup(): void {
    this.manager.worldScene.remove(this.deathStar.mesh);
    this.deathStar.dispose();
  }
}

class TrenchStage implements Stage {
  private trench: Trench;

  constructor(private manager: StageManager) {
    this.trench = new Trench();
    this.manager.worldScene.add(this.trench.mesh);
  }

  update(deltaTime: number, player: Player): void {
    // Apply trench constraints
    const halfWidth = GameConfig.stage.trenchWidth / 2;
    const halfHeight = GameConfig.stage.trenchHeight / 2;
    player.position.x = THREE.MathUtils.clamp(player.position.x, -halfWidth, halfWidth);
    player.position.y = THREE.MathUtils.clamp(player.position.y, -halfHeight, halfHeight);

    // Trench update logic (procedural generation etc) could go here
    this.trench.update(deltaTime);
  }

  cleanup(): void {
    this.manager.worldScene.remove(this.trench.mesh);
    this.trench.dispose();
  }
}

export class StageManager {
  private currentStage: Stage | null = null;

  constructor(public worldScene: THREE.Scene) {
    this.initStage();
  }

  private initStage(): void {
    switch (state.phase) {
      case 'DOGFIGHT':
        this.currentStage = new DogfightStage(this);
        break;
      case 'SURFACE':
        this.currentStage = new SurfaceStage(this);
        break;
      case 'TRENCH':
        this.currentStage = new TrenchStage(this);
        break;
    }
  }

  public setStage(stage: Stage): void {
    if (this.currentStage) {
      this.currentStage.cleanup();
    }
    this.currentStage = stage;
  }

  public update(deltaTime: number, player: Player): void {
    if (this.currentStage) {
      this.currentStage.update(deltaTime, player);
    }
  }

  public reset(): void {
    if (this.currentStage) {
      this.currentStage.cleanup();
    }
    this.initStage();
  }
}
