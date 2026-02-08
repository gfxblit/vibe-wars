import * as THREE from 'three';
import { GameConfig } from './config';
import { state, nextPhase, takeDamage } from './state';
import { Player } from './entities/Player';
import { DeathStar } from './entities/DeathStar';
import { Trench } from './entities/Trench';

export interface Stage {
  update(deltaTime: number, player: Player): void;
  cleanup(): void;
}

class DogfightStage implements Stage {
  constructor(private manager: StageManager) {
    if (state.entityManager) {
      state.entityManager.setSpawningEnabled(true);
    }
  }

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
      nextPhase();
      this.manager.setStage(new TrenchStage(this.manager));
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
  private trench: Trench;
  private lastCatwalkHitZ: number = 0;

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
    }

    // Trench update logic (procedural generation etc) could go here
    this.trench.update(deltaTime);

    // If player reaches the end of the trench or hits the port, they win the stage
    const hitPort = this.trench.checkPortCollision(player.position);
    if (hitPort || player.position.z <= -GameConfig.stage.trenchLength) {
      nextPhase();
      this.manager.reset();
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
