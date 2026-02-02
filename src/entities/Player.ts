import * as THREE from 'three';
import { Entity } from './Entity';

export class Player extends Entity {
  public readonly mesh: THREE.Group;
  private readonly visualMesh: THREE.LineSegments;

  private readonly FORWARD_SPEED = 20;
  private readonly TURN_SPEED_YAW = Math.PI / 1.5; // ~120 degrees per second
  private readonly TURN_SPEED_PITCH = Math.PI / 1.5;
  
  private readonly MAX_BANK = Math.PI / 4; // 45 degrees
  
  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor() {
    super();
    this.mesh = new THREE.Group();
    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Green wireframe
    this.visualMesh = new THREE.LineSegments(edges, material);
    
    this.mesh.add(this.visualMesh);
    this.position.set(0, 0, 0);
  }

  public update(input: THREE.Vector2, deltaTime: number): void {
    // Relative turning amounts
    const yawAmount = -input.x * this.TURN_SPEED_YAW * deltaTime;
    const pitchAmount = input.y * this.TURN_SPEED_PITCH * deltaTime;

    // Create relative rotation quaternion from Euler angles
    // Order 'YXZ' is standard for relative orientation changes (Yaw then Pitch)
    const qRelative = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(pitchAmount, yawAmount, 0, 'YXZ')
    );
    
    // Apply relative rotation to current orientation
    // Post-multiplication applies the rotation in the object's local space
    this.mesh.quaternion.multiply(qRelative);

    // Visual Bank (Roll) - non-accumulating
    const bankRoll = -input.x * this.MAX_BANK;
    this.visualMesh.rotation.z = bankRoll;

    // Calculate forward vector based on current orientation
    // Initial direction is negative Z
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.mesh.quaternion);
    
    // Move position forward
    this.position.add(forward.multiplyScalar(this.FORWARD_SPEED * deltaTime));
  }
}