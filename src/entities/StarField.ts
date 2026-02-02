import * as THREE from 'three';
import { Entity } from './Entity';

export class StarField extends Entity {
  public static readonly NUM_STARS = 1500;
  public static readonly FIELD_SIZE = 500;
  public readonly points: THREE.Points;
  private readonly geometry: THREE.BufferGeometry;
  private readonly material: THREE.PointsMaterial;

  constructor() {
    super();
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(StarField.NUM_STARS * 3);

    for (let i = 0; i < StarField.NUM_STARS; i++) {
      positions[i * 3] = (Math.random() - 0.5) * StarField.FIELD_SIZE;     // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * StarField.FIELD_SIZE; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * StarField.FIELD_SIZE; // Z
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    });

    this.points = new THREE.Points(this.geometry, this.material);
  }

  public update(playerPosition: THREE.Vector3) {
    const positions = this.geometry.attributes.position.array as Float32Array;
    const halfSize = StarField.FIELD_SIZE / 2;

    for (let i = 0; i < StarField.NUM_STARS; i++) {
      const xIndex = i * 3;
      const yIndex = i * 3 + 1;
      const zIndex = i * 3 + 2;

      // Recycle stars in X
      if (positions[xIndex] - playerPosition.x > halfSize) {
        positions[xIndex] -= StarField.FIELD_SIZE;
      } else if (positions[xIndex] - playerPosition.x < -halfSize) {
        positions[xIndex] += StarField.FIELD_SIZE;
      }

      // Recycle stars in Y
      if (positions[yIndex] - playerPosition.y > halfSize) {
        positions[yIndex] -= StarField.FIELD_SIZE;
      } else if (positions[yIndex] - playerPosition.y < -halfSize) {
        positions[yIndex] += StarField.FIELD_SIZE;
      }

      // Recycle stars in Z
      if (positions[zIndex] - playerPosition.z > halfSize) {
        positions[zIndex] -= StarField.FIELD_SIZE;
      } else if (positions[zIndex] - playerPosition.z < -halfSize) {
        positions[zIndex] += StarField.FIELD_SIZE;
      }
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
}
