import * as THREE from 'three';

/**
 * STUB: This entity base class is a placeholder and subject to 
 * major refactoring as the architecture is finalized.
 */
export class Entity {
}

export interface Targetable {
  readonly position: THREE.Vector3;
  getWorldPosition(target: THREE.Vector3): THREE.Vector3;
  readonly isExploded: boolean;
  explode(): void;
  getScore(): number;
  update?(deltaTime: number, playerPosition: THREE.Vector3, playerQuaternion: THREE.Quaternion, playerSpeed: number): THREE.Vector3 | null;
  getVelocity?(playerForward: THREE.Vector3, playerSpeed: number): THREE.Vector3;
  getFireballSize?(): number;
  getFireballSpeed?(): number;
}
