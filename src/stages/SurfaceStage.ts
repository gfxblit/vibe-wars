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
  public readonly surface: Surface;
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
    
    this.surface = surface || new Surface(
      state.debugSurfaceVerticalLineHeight ?? GameConfig.stages.surface.verticalLineHeight,
      state.debugSurfaceVerticalLineNoise ?? GameConfig.stages.surface.verticalLineNoise,
      state.debugSurfaceVerticalLineDensity ?? GameConfig.stages.surface.verticalLineDensity
    );
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
    player.position.y = THREE.MathUtils.clamp(player.position.y, GameConfig.stages.surface.floorY - GameConfig.stages.surface.floorClampBuffer, GameConfig.stages.surface.maxHeight);
    
    const { spawned, removed } = this.surface.update(deltaTime, player.position);

    if (state.entityManager) {
      spawned.forEach(t => state.entityManager!.addTarget(t));
      removed.forEach(t => state.entityManager!.removeTarget(t));
    }

    const playerBox = this.playerBox.setFromObject(player.mesh);
    
    const { floorHit, towerHit, turretHit } = this.surface.checkCollisions(playerBox, player.position);

    if (floorHit) { 
        // Bounce player up to avoid instant death loop or getting stuck
        player.position.y = GameConfig.stages.surface.floorY + GameConfig.stages.surface.floorBounce;
    }

    if (towerHit) {
        takeDamage(GameConfig.stages.surface.collisionDamage);
        towerHit.explode(); // Mark as hit so we don't hit it again immediately
    }

    if (turretHit) {
      takeDamage(GameConfig.stages.surface.collisionDamage);
      turretHit.explode();
    }
    
    // Check End Condition
    if (this.elapsedTime >= GameConfig.stages.surface.duration) {
      this.onComplete();
    }
  }

  public cleanup(): void {
    if (state.entityManager) {
      this.surface.getTowers().forEach(t => state.entityManager!.removeTarget(t));
    }
    this.scene.remove(this.surface.mesh);
    this.surface.dispose();
  }
}
