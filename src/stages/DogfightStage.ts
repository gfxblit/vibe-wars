import { Stage } from './Stage';
import { GameConfig } from '../config';
import { state, goToNextStage } from '../state';
import { Player } from '../entities/Player';

export class DogfightStage implements Stage {
  public readonly speed = GameConfig.player.forwardSpeeds.DOGFIGHT;

  constructor() {
    if (state.entityManager) {
      state.entityManager.setSpawningEnabled(true);
    }
  }

  update(_deltaTime: number, _player: Player): void {
    if (state.kills >= GameConfig.stage.trenchKillsThreshold) {
      goToNextStage();
    }
  }

  cleanup(): void { }
}