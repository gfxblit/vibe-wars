import * as THREE from 'three';
import { GameConfig } from '../config';
import { state, takeDamage } from '../state';
import { Player, PlayerUpdateOptions } from '../entities/Player';
import { Stage } from './Stage';
import { Tower } from '../entities/Tower';
import { Surface } from '../entities/Surface';
import { SurfaceSpawner } from '../entities/SurfaceSpawner';
import { SurfaceObstacleFactory } from '../entities/SurfaceObstacleFactory';

export class SurfaceStage extends Stage {
  public override get speed() { return GameConfig.player.forwardSpeeds.SURFACE; }
  private elapsedTime: number = 0;
  public readonly surface: Surface;
  private spawner: SurfaceSpawner;
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

    const factory = new SurfaceObstacleFactory();
    this.spawner = new SurfaceSpawner(this.scene, factory, state.entityManager!);
  }

  public getTowers(): Tower[] {
    return this.spawner.getObstacles().filter((o): o is Tower => o instanceof Tower);
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
    
    this.surface.update(deltaTime, player.position);
    this.spawner.update(deltaTime, player.position);

    const playerBox = this.playerBox.setFromObject(player.mesh);
    
    const floorHit = this.surface.checkFloorCollision(player.position);
    const obstacleHit = this.spawner.checkCollisions(playerBox);

    if (floorHit) { 
        // Bounce player up to avoid instant death loop or getting stuck
        player.position.y = GameConfig.stages.surface.floorY + GameConfig.stages.surface.floorBounce;
    }

    if (obstacleHit) {
        takeDamage(GameConfig.stages.surface.collisionDamage);
        obstacleHit.explode();
    }
    
    // Check End Condition
    if (this.elapsedTime >= GameConfig.stages.surface.duration) {
      this.onComplete();
    }
  }

  public cleanup(): void {
    this.scene.remove(this.surface.mesh);
    this.surface.dispose();
    this.spawner.dispose();
  }
}
