import * as THREE from 'three';
import { AIStrategy } from './AIStrategy';
import { GameConfig } from '../config';

export class DumbAIStrategy implements AIStrategy {
  private elapsedTime: number = 0;
  private readonly offset = new THREE.Vector3();

  update(
    deltaTime: number,
    entityPosition: THREE.Vector3,
    entityQuaternion: THREE.Quaternion,
    playerPosition: THREE.Vector3,
    playerQuaternion: THREE.Quaternion
  ): void {
    this.elapsedTime += deltaTime;
    
    // Calculate relative offset in front of player
    this.offset.set(0, 0, -GameConfig.tieFighter.distance);

    // Apply horizontal oscillation
    const oscillation = Math.sin(this.elapsedTime * GameConfig.tieFighter.oscillationFrequency) * GameConfig.tieFighter.oscillationAmplitude;
    this.offset.x += oscillation;

    // Rotate the offset by the player's quaternion to keep it relative to player's heading
    this.offset.applyQuaternion(playerQuaternion);

    // Add player's position to get world position
    entityPosition.copy(playerPosition).add(this.offset);

    // Maintain orientation matching player
    entityQuaternion.copy(playerQuaternion);
  }
}
