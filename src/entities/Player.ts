import * as THREE from 'three';
import { Entity } from './Entity';

export class Player extends Entity {
  public readonly mesh: THREE.LineSegments;

  private readonly FORWARD_SPEED = 20;
  private readonly HORIZONTAL_SPEED = 15;
  private readonly VERTICAL_SPEED = 15;
  
  private readonly MAX_BANK = Math.PI / 4; // 45 degrees
  private readonly MAX_PITCH = Math.PI / 6; // 30 degrees
  
  private readonly BOUNDS_X = 15;
  private readonly BOUNDS_Y = 10;

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor() {
    super();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Green wireframe
    this.mesh = new THREE.LineSegments(edges, material);
    this.position.set(0, 0, 0);
  }

  public update(input: THREE.Vector2, deltaTime: number): void {
    // Forward motion (negative Z)
    this.position.z -= this.FORWARD_SPEED * deltaTime;

    // Horizontal and Vertical motion
    this.position.x += input.x * this.HORIZONTAL_SPEED * deltaTime;
    this.position.y += input.y * this.VERTICAL_SPEED * deltaTime;

    // Clamp within bounds
    this.position.x = THREE.MathUtils.clamp(this.position.x, -this.BOUNDS_X, this.BOUNDS_X);
    this.position.y = THREE.MathUtils.clamp(this.position.y, -this.BOUNDS_Y, this.BOUNDS_Y);

    // Rotation (Banking and Pitching)
    // Bank (Roll around Z) based on X input.
    // Negative X input (left) -> positive Z rotation (bank right? usually bank left)
    // Let's match typical flight sim: left input -> roll left.
    // Roll left is positive rotation around Z if using right-handed system?
    // In Three.js, positive Z rotation is counter-clockwise.
    // If looking down negative Z, counter-clockwise is rolling left. Correct.
    this.mesh.rotation.z = -input.x * this.MAX_BANK;

    // Pitch (around X) based on Y input.
    // Up input (positive Y) -> tilt up.
    // Tilt up is positive rotation around X? 
    // If looking down negative Z, positive X is right.
    // Positive rotation around X is tilt down (towards negative Y).
    // So positive Y input should be negative X rotation.
    this.mesh.rotation.x = -input.y * this.MAX_PITCH;
  }
}
