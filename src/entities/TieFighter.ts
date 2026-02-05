import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class TieFighter extends Entity {
  public readonly mesh: THREE.Group;
  private readonly visualMesh: THREE.LineSegments;
  private elapsedTime: number = 0;

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor() {
    super();
    this.mesh = new THREE.Group();

    const geometry = new THREE.BoxGeometry(
      GameConfig.tieFighter.meshSize,
      GameConfig.tieFighter.meshSize,
      GameConfig.tieFighter.meshSize
    );
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: GameConfig.tieFighter.meshColor });
    this.visualMesh = new THREE.LineSegments(edges, material);

    this.mesh.add(this.visualMesh);
  }

  public update(deltaTime: number, playerPosition: THREE.Vector3, playerQuaternion: THREE.Quaternion): void {
    this.elapsedTime += deltaTime;

    // Calculate relative offset in front of player
    const offset = new THREE.Vector3(0, 0, -GameConfig.tieFighter.distance);

    // Apply horizontal oscillation
    const oscillation = Math.sin(this.elapsedTime * GameConfig.tieFighter.oscillationFrequency) * GameConfig.tieFighter.oscillationAmplitude;
    offset.x += oscillation;

    // Rotate the offset by the player's quaternion to keep it relative to player's heading
    offset.applyQuaternion(playerQuaternion);

    // Add player's position to get world position
    this.position.copy(playerPosition).add(offset);

    // Maintain orientation matching player for now
    this.mesh.quaternion.copy(playerQuaternion);
  }
}
