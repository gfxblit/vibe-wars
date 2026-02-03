import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Player extends Entity {
  public readonly mesh: THREE.Group;
  private readonly visualMesh: THREE.LineSegments;

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
    const material = new THREE.LineBasicMaterial({ color: GameConfig.player.meshColor });
    this.visualMesh = new THREE.LineSegments(edges, material);

    this.mesh.add(this.visualMesh);
    this.position.set(0, 0, 0);
  }

  public update(input: THREE.Vector2, deltaTime: number): void {
    // Relative turning amounts
    const yawAmount = -input.x * GameConfig.player.turnSpeedYaw * deltaTime;
    const pitchAmount = input.y * GameConfig.player.turnSpeedPitch * deltaTime;

    // Create relative rotation quaternion from Euler angles
    // Order 'YXZ' is standard for relative orientation changes (Yaw then Pitch)
    const qRelative = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(pitchAmount, yawAmount, 0, 'YXZ')
    );

    // Apply relative rotation to current orientation
    // Post-multiplication applies the rotation in the object's local space
    this.mesh.quaternion.multiply(qRelative);

    // Visual Bank (Roll) - non-accumulating
    const bankRoll = -input.x * GameConfig.player.maxBank;
    this.visualMesh.rotation.z = bankRoll;

    // Calculate forward vector based on current orientation
    // Initial direction is negative Z
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.mesh.quaternion);

    // Move position forward
    this.position.add(forward.multiplyScalar(GameConfig.player.forwardSpeed * deltaTime));
  }
}
