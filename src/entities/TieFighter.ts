import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class TieFighter extends Entity {
  private static geometry: THREE.EdgesGeometry | null = null;
  private static material: THREE.LineBasicMaterial | null = null;

  public readonly mesh: THREE.Group;
  private readonly visualMesh: THREE.LineSegments;
  private elapsedTime: number = 0;
  private readonly offset = new THREE.Vector3();

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor() {
    super();
    this.mesh = new THREE.Group();

    if (!TieFighter.geometry) {
      const box = new THREE.BoxGeometry(
        GameConfig.tieFighter.meshSize,
        GameConfig.tieFighter.meshSize,
        GameConfig.tieFighter.meshSize
      );
      TieFighter.geometry = new THREE.EdgesGeometry(box);
    }

    if (!TieFighter.material) {
      TieFighter.material = new THREE.LineBasicMaterial({ color: GameConfig.tieFighter.meshColor });
    }

    this.visualMesh = new THREE.LineSegments(TieFighter.geometry, TieFighter.material);

    this.mesh.add(this.visualMesh);
  }

  public update(deltaTime: number, playerPosition: THREE.Vector3, playerQuaternion: THREE.Quaternion): void {
    this.elapsedTime += deltaTime;

    // Calculate relative offset in front of player
    this.offset.set(0, 0, -GameConfig.tieFighter.distance);

    // Apply horizontal oscillation
    const oscillation = Math.sin(this.elapsedTime * GameConfig.tieFighter.oscillationFrequency) * GameConfig.tieFighter.oscillationAmplitude;
    this.offset.x += oscillation;

    // Rotate the offset by the player's quaternion to keep it relative to player's heading
    this.offset.applyQuaternion(playerQuaternion);

    // Add player's position to get world position
    this.position.copy(playerPosition).add(this.offset);

    // Maintain orientation matching player for now
    this.mesh.quaternion.copy(playerQuaternion);
  }
}
