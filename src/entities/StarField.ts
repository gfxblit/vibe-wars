import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';
import { GamePhase } from '../state';

export class StarField extends Entity {
  public readonly points: THREE.Points;
  private readonly geometry: THREE.BufferGeometry;
  private readonly material: THREE.PointsMaterial;

  constructor() {
    super();
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(GameConfig.starField.numStars * 3);

    for (let i = 0; i < GameConfig.starField.numStars; i++) {
      positions[i * 3] = (Math.random() - 0.5) * GameConfig.starField.fieldSize;     // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * GameConfig.starField.fieldSize; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * GameConfig.starField.fieldSize; // Z
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.material = new THREE.PointsMaterial({
      color: GameConfig.starField.starColor,
      size: GameConfig.starField.starSize,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
  }

  public update(playerPosition: THREE.Vector3, phase: GamePhase = 'DOGFIGHT') {
    this.points.visible = phase !== 'TRENCH';
    if (!this.points.visible) return;

    const positions = this.geometry.attributes.position.array as Float32Array;
    const halfSize = GameConfig.starField.fieldSize / 2;

    for (let i = 0; i < GameConfig.starField.numStars; i++) {
      const xIndex = i * 3;
      const yIndex = i * 3 + 1;
      const zIndex = i * 3 + 2;

      // Recycle stars in X
      if (positions[xIndex] - playerPosition.x > halfSize) {
        positions[xIndex] -= GameConfig.starField.fieldSize;
      } else if (positions[xIndex] - playerPosition.x < -halfSize) {
        positions[xIndex] += GameConfig.starField.fieldSize;
      }

      // Recycle stars in Y
      if (positions[yIndex] - playerPosition.y > halfSize) {
        positions[yIndex] -= GameConfig.starField.fieldSize;
      } else if (positions[yIndex] - playerPosition.y < -halfSize) {
        positions[yIndex] += GameConfig.starField.fieldSize;
      }

      // Recycle stars in Z
      if (positions[zIndex] - playerPosition.z > halfSize) {
        positions[zIndex] -= GameConfig.starField.fieldSize;
      } else if (positions[zIndex] - playerPosition.z < -halfSize) {
        positions[zIndex] += GameConfig.starField.fieldSize;
      }
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
}
