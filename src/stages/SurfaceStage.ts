import * as THREE from 'three';
import { GameConfig } from '../config';
import { state, goToNextStage } from '../state';
import { Player } from '../entities/Player';
import { DeathStar } from '../entities/DeathStar';
import { Stage } from './Stage';

export class SurfaceStage implements Stage {
  public readonly speed = GameConfig.player.forwardSpeeds.SURFACE;
  private deathStar: DeathStar;

  constructor(private scene: THREE.Scene) {
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
    this.scene.add(this.deathStar.mesh);
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
    this.scene.remove(this.deathStar.mesh);
    this.deathStar.dispose();
  }
}
