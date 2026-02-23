import * as THREE from 'three';
import { Targetable } from './Entity';

export interface SurfaceObstacle extends Targetable {
  readonly mesh: THREE.Group;
  checkCollision(playerBox: THREE.Box3): boolean;
  dispose(): void;
}
