import * as THREE from 'three';
import { Stage } from './Stage';
import { GameConfig } from '../config';
import { state } from '../state';
import { Player } from '../entities/Player';
import { DeathStar } from '../entities/DeathStar';

export enum DogfightPhase {
  COMBAT,
  APPROACH
}

export class DogfightStage extends Stage {
  private phase: DogfightPhase = DogfightPhase.COMBAT;
  private deathStar: DeathStar | null = null;
  private toDeathStar = new THREE.Vector3();
  private targetRotation = new THREE.Quaternion();
  private forward = new THREE.Vector3(0, 0, -1);

  constructor(private scene: THREE.Scene, private onComplete: () => void) {
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

  public override get showStarField(): boolean {
    return true;
  }

  public update(deltaTime: number, player: Player, _camera: THREE.Camera): void {
    if (this.phase === DogfightPhase.COMBAT) {
      const threshold = state.debugKillsThreshold ?? GameConfig.stages.dogfight.killsThreshold;

      if (state.kills >= threshold) {
        this.startApproach(player);
      }
    } else {
      this.updateApproach(deltaTime, player);
    }
  }

  private startApproach(player: Player): void {
    this.phase = DogfightPhase.APPROACH;
    state.isApproachingDeathStar = true;
    
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
    const angle = GameConfig.stages.deathStar.spawnAngle; // 45 degrees
    spawnDir.applyAxisAngle(axis, angle);

    const spawnPos = player.position.clone().add(spawnDir.multiplyScalar(GameConfig.stages.deathStar.distance));

    this.deathStar = new DeathStar(spawnPos);
    this.scene.add(this.deathStar.mesh);
  }

  private updateApproach(deltaTime: number, player: Player): void {
    if (!this.deathStar) return;

    this.toDeathStar.subVectors(this.deathStar.position, player.position);
    const dist = this.toDeathStar.length();

    if (dist < GameConfig.stages.trench.transitionDistance + GameConfig.stages.deathStar.size) {
      this.onComplete();
      return;
    }

    // Magnetic Steering: Slowly rotate player towards Death Star
    if (dist > 0) {
      this.toDeathStar.divideScalar(dist); // Normalize in-place
      this.targetRotation.setFromUnitVectors(
        this.forward,
        this.toDeathStar
      );
      player.mesh.quaternion.slerp(this.targetRotation, GameConfig.stages.trench.steeringStrength * deltaTime);
    }

    this.deathStar.update(deltaTime);
  }

  public cleanup(): void {
    state.isApproachingDeathStar = false;
    if (this.deathStar) {
      this.scene.remove(this.deathStar.mesh);
      this.deathStar.dispose();
      this.deathStar = null;
    }
  }
}
