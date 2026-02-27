import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';
import { UserInput } from '../input';
import { materialSystem } from '../MaterialSystem';

export interface PlayerUpdateOptions {
  lockUpright?: boolean;
  maxPitch?: number;
  maxYaw?: number;
}

export class Player extends Entity {
  public readonly mesh: THREE.Group;
  public readonly visualMesh: THREE.LineSegments;

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor() {
    super();
    this.mesh = new THREE.Group();

    const geometry = new THREE.BoxGeometry(
      GameConfig.player.meshSize,
      GameConfig.player.meshSize,
      GameConfig.player.meshSize
    );
    const edges = new THREE.EdgesGeometry(geometry);
    geometry.dispose();
    const material = new THREE.LineBasicMaterial({ color: GameConfig.player.meshColor });
    this.visualMesh = new THREE.LineSegments(edges, material);
    this.visualMesh.visible = false;

    materialSystem.register(material, 'Player', GameConfig.player.meshColor);

    this.mesh.add(this.visualMesh);
    this.position.set(0, 0, 0);
  }

  public dispose(): void {
    materialSystem.unregister(this.visualMesh.material as THREE.Material);
    (this.visualMesh.material as THREE.Material).dispose();
  }

  public update(
    input: UserInput,
    deltaTime: number,
    speed: number,
    showChassis: boolean = false,
    options?: PlayerUpdateOptions
  ): void {
    this.visualMesh.visible = showChassis;

    // Relative turning amounts
    const yawAmount = -input.x * GameConfig.player.turnSpeedYaw * deltaTime;
    const pitchAmount = input.y * GameConfig.player.turnSpeedPitch * deltaTime;

    if (options?.lockUpright) {
      // For locked upright movement (e.g. Trench Run), we use absolute Euler clamping
      // Extract current Euler angles
      const currentEuler = new THREE.Euler().setFromQuaternion(this.mesh.quaternion, 'YXZ');

      let targetPitch = currentEuler.x + pitchAmount;
      let targetYaw = currentEuler.y + yawAmount;

      // Apply clamping if options provided
      if (options.maxPitch !== undefined) {
        targetPitch = THREE.MathUtils.clamp(targetPitch, -options.maxPitch, options.maxPitch);
      }
      if (options.maxYaw !== undefined) {
        targetYaw = THREE.MathUtils.clamp(targetYaw, -options.maxYaw, options.maxYaw);
      }

      // Set new orientation, forcing Roll to 0
      this.mesh.quaternion.setFromEuler(new THREE.Euler(targetPitch, targetYaw, 0, 'YXZ'));
    } else {
      // Create relative rotation quaternion from Euler angles
      // Order 'YXZ' is standard for relative orientation changes (Yaw then Pitch)
      const qRelative = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(pitchAmount, yawAmount, 0, 'YXZ')
      );

      // Apply relative rotation to current orientation
      // Post-multiplication applies the rotation in the object's local space
      this.mesh.quaternion.multiply(qRelative);
    }

    // Visual Bank (Roll) - non-accumulating
    const bankRoll = -input.x * GameConfig.player.maxBank;
    this.visualMesh.rotation.z = bankRoll;

    // Calculate forward vector based on current orientation
    // Initial direction is negative Z
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.mesh.quaternion);

    // Move position forward
    this.position.add(forward.multiplyScalar(speed * deltaTime));
  }
}
