import * as THREE from 'three';
import { UserInput } from './input';

export interface CombatStrategyConfig {
  maxRange: number;
  fireCooldown: number;
  fireballCollisionRadiusNDC: number;
  fireballPoints: number;
  baseForwardSpeed: number;
  torpedoSpeedMultiplier: number;
}

export interface CombatStrategy {
  update(deltaTime: number, input: UserInput, camera: THREE.Camera): void;
}
