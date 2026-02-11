import * as THREE from 'three';
import { GameConfig } from '../config';
import { state, goToNextStage, takeDamage } from '../state';
import { Player } from '../entities/Player';
import { Stage } from './Stage';
import { Tower } from '../entities/Tower';
import { Surface } from '../entities/Surface';

export class SurfaceStage extends Stage {
  public override get speed() { return GameConfig.player.forwardSpeeds.SURFACE; }
  private elapsedTime: number = 0;
  private surface: Surface;

  constructor(private scene: THREE.Scene) {
    super();
    // Clear existing enemies for a clean transition
    if (state.entityManager) {
      state.entityManager.clear();
      state.entityManager.setSpawningEnabled(false);
    }
    
    this.surface = new Surface();
    this.scene.add(this.surface.mesh);
  }

  public getTowers(): Tower[] {
    return this.surface.getTowers();
  }

  public update(deltaTime: number, player: Player): void {
    this.elapsedTime += deltaTime;
    
    this.surface.update(deltaTime, player.position.z);

    const playerBox = new THREE.Box3().setFromObject(player.mesh);
    
    const { floorHit, towerHit } = this.surface.checkCollisions(playerBox, player.position);

    if (floorHit) { 
        takeDamage(1);
        // Bounce player up to avoid instant death loop or getting stuck
        player.position.y = GameConfig.stage.surfaceFloorY + 2;
    }

    if (towerHit) {
        takeDamage(1);
        towerHit.isDestroyed = true; // Mark as hit so we don't hit it again immediately
    }
    
    // Check End Condition
    if (this.elapsedTime >= GameConfig.stage.surfaceDuration) {
      goToNextStage();
    }
  }

  public cleanup(): void {
    this.scene.remove(this.surface.mesh);
    this.surface.dispose();
  }
}
