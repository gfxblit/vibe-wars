import * as THREE from 'three';
import { GameConfig } from '../config';
import { state, takeDamage } from '../state';
import { Player, PlayerUpdateOptions } from '../entities/Player';
import { Stage } from './Stage';
import { Tower } from '../entities/Tower';
import { Surface } from '../entities/Surface';

export class SurfaceStage extends Stage {
  public override get speed() { return GameConfig.player.forwardSpeeds.SURFACE; }
  private elapsedTime: number = 0;
  private surface: Surface;
  private playerBox: THREE.Box3 = new THREE.Box3();

  constructor(private scene: THREE.Scene, private onComplete: () => void, surface?: Surface) {
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
    
    this.surface = surface || new Surface();
    this.scene.add(this.surface.mesh);
  }

  public getTowers(): Tower[] {
    return this.surface.getTowers();
  }

  public override getPlayerOptions(): PlayerUpdateOptions | undefined {
    return {
      lockUpright: true,
      maxPitch: GameConfig.stages.surface.maxPitch,
      maxYaw: GameConfig.stages.surface.maxYaw,
    };
  }

  public update(deltaTime: number, player: Player, _camera: THREE.Camera): void {
    this.elapsedTime += deltaTime;

    // Apply surface constraints
    const halfWidth = GameConfig.stages.surface.width / 2;
    player.position.x = THREE.MathUtils.clamp(player.position.x, -halfWidth, halfWidth);
    player.position.y = THREE.MathUtils.clamp(player.position.y, GameConfig.stages.surface.floorY - GameConfig.stages.surface.floorClampBuffer, GameConfig.stages.surface.maxHeight);
    
    this.surface.update(deltaTime, player.position, state.entityManager || undefined);

    const playerBox = this.playerBox.setFromObject(player.mesh);
    
    const { floorHit, towerHit } = this.surface.checkCollisions(playerBox, player.position);

    if (floorHit) { 
        // Bounce player up to avoid instant death loop or getting stuck
        player.position.y = GameConfig.stages.surface.floorY + GameConfig.stages.surface.floorBounce;
    }

    if (towerHit) {
        takeDamage(GameConfig.stages.surface.collisionDamage);
        towerHit.isExploded = true; // Mark as hit so we don't hit it again immediately
    }
    
    // Check End Condition
    if (this.elapsedTime >= GameConfig.stages.surface.duration) {
      this.onComplete();
    }
  }

  public cleanup(): void {
    this.scene.remove(this.surface.mesh);
    this.surface.dispose();
  }
}
