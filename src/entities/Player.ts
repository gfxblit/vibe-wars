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
    // Determine current visual bank (roll)
    const bankRoll = -input.x * this.MAX_BANK;

    // Calculate rotation axes relative to the banked orientation
    // These axes are in the local space of the player entity (before banking is applied)
    const localUp = new THREE.Vector3(0, 1, 0);
    const localRight = new THREE.Vector3(1, 0, 0);
    
    // Create a temporary bank quaternion to tilt the rotation axes
    const qBank = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), bankRoll);
    localUp.applyQuaternion(qBank);
    localRight.applyQuaternion(qBank);

    // Relative turning around the banked axes
    // Left input (negative X) -> Rotate around banked local up
    const yawAmount = -input.x * this.TURN_SPEED_YAW * deltaTime;
    this.mesh.rotateOnAxis(localUp, yawAmount);
    
    // Up input (positive Y) -> Rotate around banked local right
    const pitchAmount = input.y * this.TURN_SPEED_PITCH * deltaTime;
    this.mesh.rotateOnAxis(localRight, pitchAmount);

    // Visual Bank (Roll) - non-accumulating
    this.visualMesh.rotation.z = bankRoll;

    // Calculate forward vector based on current orientation
    // Initial direction is negative Z
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.mesh.quaternion);
    
    // Move position forward
    this.position.add(forward.multiplyScalar(this.FORWARD_SPEED * deltaTime));
  }
}