import * as THREE from 'three';
import { Entity } from './Entity';

export class Player extends Entity {
  public readonly mesh: THREE.LineSegments;
  public yaw: number = 0;
  public pitch: number = 0;

  private readonly FORWARD_SPEED = 20;
  private readonly TURN_SPEED_YAW = Math.PI / 1.5; // ~120 degrees per second
  private readonly TURN_SPEED_PITCH = Math.PI / 1.5;
  
  private readonly MAX_BANK = Math.PI / 4; // 45 degrees
  
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
    // Accumulate heading
    // Left input (negative X) -> Increase yaw (turn left)
    // Right input (positive X) -> Decrease yaw (turn right)
    this.yaw -= input.x * this.TURN_SPEED_YAW * deltaTime;
    
    // Up input (positive Y) -> Increase pitch (tilt up)
    // Down input (negative Y) -> Decrease pitch (tilt down)
    this.pitch += input.y * this.TURN_SPEED_PITCH * deltaTime;

    // Bank (Roll) based on X input
    const bank = -input.x * this.MAX_BANK;

    // Update mesh rotation using YXZ order (Yaw, then Pitch, then Roll)
    this.mesh.rotation.set(this.pitch, this.yaw, bank, 'YXZ');

    // Calculate forward vector based on current yaw and pitch
    // Initial direction is negative Z
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'));
    
    // Move position forward
    this.position.add(forward.multiplyScalar(this.FORWARD_SPEED * deltaTime));
  }
}