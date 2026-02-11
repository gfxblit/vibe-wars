import * as THREE from 'three';
import { Stage } from './Stage';
import { GameConfig } from '../config';
import { state, goToNextStage } from '../state';
import { Player } from '../entities/Player';
import { DeathStar } from '../entities/DeathStar';

export enum DogfightPhase {
  COMBAT,
  APPROACH
}

export class DogfightStage extends Stage {
  private phase: DogfightPhase = DogfightPhase.COMBAT;
  private deathStar: DeathStar | null = null;

  constructor(private scene: THREE.Scene) {
    super();
    if (state.entityManager) {
      state.entityManager.setSpawningEnabled(true);
    }
  }

  public get speed(): number {
    return this.phase === DogfightPhase.APPROACH
      ? GameConfig.player.forwardSpeeds.SURFACE
      : GameConfig.player.forwardSpeeds.DOGFIGHT;
  }

  public update(deltaTime: number, player: Player): void {
    if (this.phase === DogfightPhase.COMBAT) {
      if (state.kills >= GameConfig.stage.trenchKillsThreshold) {
        this.startApproach(player);
      }
    } else {
      this.updateApproach(deltaTime, player);
    }
  }

  private startApproach(player: Player): void {
    this.phase = DogfightPhase.APPROACH;
    
    if (state.entityManager) {
      state.entityManager.clear();
      state.entityManager.setSpawningEnabled(false);
    }

    // Spawn Death Star logic
    // Calculate a spawn position ahead, but 45 degrees off-center
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(player.mesh.quaternion);
    const spawnDir = forward.clone();
    
    // Use player's up vector for horizontal rotation relative to player
    const axis = new THREE.Vector3(0, 1, 0).applyQuaternion(player.mesh.quaternion);
    const angle = GameConfig.stage.deathStarSpawnAngle; // 45 degrees
    spawnDir.applyAxisAngle(axis, angle);

    const spawnPos = player.position.clone().add(spawnDir.multiplyScalar(GameConfig.stage.deathStarDistance));

    this.deathStar = new DeathStar(spawnPos);
    this.scene.add(this.deathStar.mesh);
  }

  private updateApproach(deltaTime: number, player: Player): void {
    if (!this.deathStar) return;

    const toDeathStar = new THREE.Vector3().subVectors(this.deathStar.position, player.position);
    const dist = toDeathStar.length();

    if (dist < GameConfig.stage.trenchTransitionDistance + GameConfig.stage.deathStarSize) {
      goToNextStage();
      return;
    }

    // Magnetic Steering: Slowly rotate player towards Death Star
    if (dist > 0) {
      const targetRotation = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, -1),
        toDeathStar.normalize()
      );
      player.mesh.quaternion.slerp(targetRotation, GameConfig.stage.steeringStrength * deltaTime);
    }

    this.deathStar.update(deltaTime);
  }

  public cleanup(): void {
    if (this.deathStar) {
      this.scene.remove(this.deathStar.mesh);
      this.deathStar.dispose();
      this.deathStar = null;
    }
  }
}
