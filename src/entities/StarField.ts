import * as THREE from 'three';
import { Entity } from './Entity';

export class StarField extends Entity {
  public points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private numStars: number = 1500;
  private fieldSize: number = 500;

  constructor() {
    super();
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.numStars * 3);

    for (let i = 0; i < this.numStars; i++) {
      positions[i * 3] = (Math.random() - 0.5) * this.fieldSize;     // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * this.fieldSize; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * this.fieldSize; // Z
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
    const halfSize = this.fieldSize / 2;

    for (let i = 0; i < this.numStars; i++) {
      const zIndex = i * 3 + 2;
      let z = positions[zIndex];

      // Recycle stars
      if (z - playerPosition.z > halfSize) {
        positions[zIndex] -= this.fieldSize;
      } else if (z - playerPosition.z < -halfSize) {
        positions[zIndex] += this.fieldSize;
      }
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
}
