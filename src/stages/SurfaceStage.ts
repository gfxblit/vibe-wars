import * as THREE from 'three';
import { GameConfig } from '../config';
import { state, takeDamage } from '../state';
import { Player } from '../entities/Player';
import { Stage } from './Stage';
import { Tower } from '../entities/Tower';
import { Surface } from '../entities/Surface';

export class SurfaceStage extends Stage {
  public override get speed() { return GameConfig.player.forwardSpeeds.SURFACE; }
  private elapsedTime: number = 0;
  private surface: Surface;
  private playerBox: THREE.Box3 = new THREE.Box3();

  constructor(private scene: THREE.Scene, private onComplete: () => void) {
    super();
    // Clear existing enemies for a clean transition
    if (state.entityManager) {
      state.entityManager.clear();
      state.entityManager.setSpawningEnabled(false);
    }
    
    // Reset player pose to point down the surface
    const player = state.player!;
    player.position.set(0, 0, 0);
    player.mesh.quaternion.set(0, 0, 0, 1);
    
    this.surface = new Surface();
    this.scene.add(this.surface.mesh);
  }

  public getTowers(): Tower[] {
    return this.surface.getTowers();
  }

  public update(deltaTime: number, player: Player): void {
    this.elapsedTime += deltaTime;
    
    this.surface.update(deltaTime, player.position, (pos, vel) => {
        if (state.entityManager) {
            state.entityManager.spawnFireball(pos, vel);
        }
    });

    const playerBox = this.playerBox.setFromObject(player.mesh);
    
    const { floorHit, towerHit } = this.surface.checkCollisions(playerBox, player.position);

    if (floorHit) { 
        takeDamage(GameConfig.stage.surfaceCollisionDamage);
        // Bounce player up to avoid instant death loop or getting stuck
        player.position.y = GameConfig.stage.surfaceFloorY + GameConfig.stage.surfaceFloorBounce;
    }

    if (towerHit) {
        takeDamage(GameConfig.stage.surfaceCollisionDamage);
        towerHit.isDestroyed = true; // Mark as hit so we don't hit it again immediately
    }
    
    // Check End Condition
    if (this.elapsedTime >= GameConfig.stage.surfaceDuration) {
      this.onComplete();
    }
  }

  public cleanup(): void {
    this.scene.remove(this.surface.mesh);
    this.surface.dispose();
  }
}
