import * as THREE from 'three';

export interface RandomGenerator {
  random(): number;
}

export interface AIStrategy {
  update(
    deltaTime: number,
    entityPosition: THREE.Vector3,
    entityQuaternion: THREE.Quaternion,
    playerPosition: THREE.Vector3,
    playerQuaternion: THREE.Quaternion
  ): void;

  getColor?(debug?: boolean): number;
}
