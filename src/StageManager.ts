import * as THREE from 'three';
import { GameConfig } from './config';
import { state, goToNextStage, takeDamage } from './state';
import { Player } from './entities/Player';
import { DeathStar } from './entities/DeathStar';
import { Trench } from './entities/Trench';
import { checkAim } from './collision';
import { UserInput } from './input';

export interface Stage {
  readonly speed: number;
  update(deltaTime: number, player: Player): void;
  cleanup(): void;
}

class DogfightStage implements Stage {
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

class SurfaceStage implements Stage {
  public readonly speed = GameConfig.player.forwardSpeeds.SURFACE;
  private deathStar: DeathStar;

  constructor(private manager: StageManager) {
    // Clear existing enemies for a clean transition
    if (state.entityManager) {
      state.entityManager.clear();
      state.entityManager.setSpawningEnabled(false);
    }

    const player = state.player!;
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(player.mesh.quaternion);

    // Calculate a spawn position 2000 units ahead, but 45 degrees off-center
    // We use the player's "up" vector to rotate the forward vector horizontally
    const spawnDir = forward.clone();
    const axis = new THREE.Vector3(0, 1, 0).applyQuaternion(player.mesh.quaternion);

    // If player is turning, spawn in the direction of the turn, otherwise just to the right
    const angle = Math.PI / 4; // 45 degrees
    spawnDir.applyAxisAngle(axis, angle);

    const spawnPos = player.position.clone().add(spawnDir.multiplyScalar(GameConfig.stage.deathStarDistance));

    this.deathStar = new DeathStar(spawnPos);
    this.manager.worldScene.add(this.deathStar.mesh);
  }

  update(deltaTime: number, player: Player): void {
    const toDeathStar = new THREE.Vector3().subVectors(this.deathStar.position, player.position);
    const dist = toDeathStar.length();

    if (dist < GameConfig.stage.trenchTransitionDistance + GameConfig.stage.deathStarSize) {
      goToNextStage();
    }

    // Magnetic Steering: Slowly rotate player towards Death Star
    if (dist > 0) {
      const targetRotation = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, -1),
        toDeathStar.normalize()
      );

      // Gradually nudge the player's orientation
      player.mesh.quaternion.slerp(targetRotation, GameConfig.stage.steeringStrength * deltaTime);
    }

    this.deathStar.update(deltaTime);
  }

  cleanup(): void {
    this.manager.worldScene.remove(this.deathStar.mesh);
    this.deathStar.dispose();
  }
}

class TrenchStage implements Stage {
  public readonly speed = GameConfig.player.forwardSpeeds.TRENCH;
  private trench: Trench;
  private lastCatwalkHitZ: number | null = null;

  constructor(private manager: StageManager) {
    if (state.entityManager) {
      state.entityManager.setSpawningEnabled(false);
    }

    // Reset player pose to point down the trench
    const player = state.player!;
    player.position.set(0, 0, 0);
    player.mesh.quaternion.set(0, 0, 0, 1);

    this.trench = new Trench();
    this.manager.worldScene.add(this.trench.mesh);
  }

  update(deltaTime: number, player: Player): void {
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
    if (hitPort || player.position.z <= -GameConfig.stage.trenchLength) {
      goToNextStage();
    }
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
    switch (state.stage) {
      case 'DOGFIGHT':
        this.currentStage = new DogfightStage();
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

  public getStage(): Stage | null {
    return this.currentStage;
  }

  public update(deltaTime: number, player: Player): void {
    if (this.currentStage) {
      this.currentStage.update(deltaTime, player);
    }
  }

  public checkExhaustPortHit(input: UserInput, camera: THREE.Camera): boolean {
    if (state.stage !== 'TRENCH' || !this.currentStage) return false;
    if (!state.player) return false;

    // The port position is fixed in world space based on config
    const { catwalkEndZ, exhaustPortZOffset, trenchHeight } = GameConfig.stage;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    const portY = -trenchHeight / 2 + 10;
    const portPos = new THREE.Vector3(0, portY, portZ);

    // Range Check: Can only hit when close enough
    const distanceToPort = Math.abs(state.player.position.z - portZ);
    if (distanceToPort > 2000) return false;

    return checkAim(portPos, input, camera);
  }

  public reset(): void {
    if (this.currentStage) {
      this.currentStage.cleanup();
    }
    this.initStage();
  }
}