import * as THREE from 'three';

export interface VisualComponent {
  readonly mesh: THREE.Object3D;
}
