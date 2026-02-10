import * as THREE from 'three';
import { GameConfig } from '../config';
import { state, goToNextStage } from '../state';
import { Player } from '../entities/Player';
import { Stage } from './Stage';

export class SurfaceStage implements Stage {
  public readonly speed = GameConfig.player.forwardSpeeds.SURFACE;
  private elapsedTime: number = 0;
  private readonly TRANSITION_DELAY = 2.0;

  constructor(_scene: THREE.Scene) {
    // Clear existing enemies for a clean transition
    if (state.entityManager) {
      state.entityManager.clear();
      state.entityManager.setSpawningEnabled(false);
    }
  }

  update(deltaTime: number, _player: Player): void {
    this.elapsedTime += deltaTime;
    
    if (this.elapsedTime >= this.TRANSITION_DELAY) {
      goToNextStage();
    }
  }

  cleanup(): void {
    // Nothing to cleanup for now
  }
}