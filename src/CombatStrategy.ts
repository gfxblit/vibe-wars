import * as THREE from 'three';
import { UserInput } from './input';

export interface CombatStrategy {
  update(deltaTime: number, input: UserInput, camera: THREE.Camera): void;
}
