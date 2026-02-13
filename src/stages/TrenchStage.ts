import * as THREE from 'three';
import { Stage } from './Stage';
import { GameConfig } from '../config';
import { state, takeDamage, addScore } from '../state';
import { Player, PlayerUpdateOptions } from '../entities/Player';
import { Trench } from '../entities/Trench';
import { Turret } from '../entities/Turret';

export class TrenchStage extends Stage {
  public override get speed() { return GameConfig.player.forwardSpeeds.TRENCH; }
  private trench: Trench;
  private lastCatwalkHitZ: number | null = null;

  constructor(private scene: THREE.Scene, private onComplete: () => void, private onReset: () => void) {
    super();
    if (state.entityManager) {
      state.entityManager.clear();
      state.entityManager.setSpawningEnabled(false);
    }

    // Reset player pose to point down the trench
    const player = state.player!;
    player.position.set(0, 0, 0);
    player.mesh.quaternion.set(0, 0, 0, 1);

    this.trench = new Trench();
    this.scene.add(this.trench.mesh);

    // Register turrets with EntityManager
    if (state.entityManager) {
      this.trench.getTurrets().forEach(turret => {
        state.entityManager!.addTarget(turret);
      });
    }
  }

  public getTurrets(): Turret[] {
    return this.trench.getTurrets();
  }

  public override getPlayerOptions(): PlayerUpdateOptions | undefined {
    return {
      lockUpright: true,
      maxPitch: GameConfig.stage.trenchMaxPitch,
      maxYaw: GameConfig.stage.trenchMaxYaw,
    };
  }

  public update(deltaTime: number, player: Player, _camera: THREE.Camera): void {
    // Apply trench constraints
    const halfWidth = GameConfig.stage.trenchWidth / 2;
    const halfHeight = GameConfig.stage.trenchHeight / 2;
    player.position.x = THREE.MathUtils.clamp(player.position.x, -halfWidth, halfWidth);
    player.position.y = THREE.MathUtils.clamp(player.position.y, -halfHeight, halfHeight);

    // Catwalk collisions
    const hitZ = this.trench.checkObstacleCollision(player.position);
    if (hitZ !== null) {
      if (hitZ !== this.lastCatwalkHitZ) {
        takeDamage(1);
        this.lastCatwalkHitZ = hitZ;
      }
    } else {
      this.lastCatwalkHitZ = null;
    }

    // Trench update logic (procedural generation etc) could go here
    this.trench.update(deltaTime);

    // If player reaches the end of the trench or hits the port, they win the stage
    const hitPort = this.trench.checkPortCollision(player.position);
    
    // Check if any torpedoes hit the port or obstacles
    let torpedoHitPort = false;
    let torpedoMissed = false;
    if (state.entityManager) {
      state.entityManager.getTorpedoes().forEach(torpedo => {
        if (!torpedo.isExploded) {
          if (this.trench.checkPortCollision(torpedo.position)) {
            torpedoHitPort = true;
            torpedo.explode();
          } else if (this.trench.checkObstacleCollision(torpedo.position) !== null) {
            torpedo.explode();
            torpedoMissed = true;
          } else if (torpedo.position.z <= -GameConfig.stage.trenchLength) {
            torpedo.explode();
            torpedoMissed = true;
          }
        }
      });
    }

    if (torpedoHitPort) {
      addScore(GameConfig.torpedo.bonusPoints);
      this.onComplete();
    } else if (torpedoMissed || hitPort || player.position.z <= -GameConfig.stage.trenchLength) {
      takeDamage(1);
      this.onReset();
    }
  }

  public override cleanup(): void {
    if (state.entityManager) {
      this.trench.getTurrets().forEach(turret => {
        state.entityManager!.removeTarget(turret);
      });
    }
    this.scene.remove(this.trench.mesh);
    this.trench.dispose();
  }
}
