/**
 * STUB: This game state implementation is a placeholder and subject to 
 * major refactoring as the architecture is finalized.
 */
import * as THREE from 'three';

export type GamePhase = 'DOGFIGHT' | 'SURFACE' | 'TRENCH';

export interface GameState {
  score: number;
  shields: number;
  wave: number;
  phase: GamePhase;
  isGameOver: boolean;
  playerPos: THREE.Vector3;
  playerRot: THREE.Euler;
  crosshairPos: THREE.Vector3;
  targetInput: THREE.Vector2;
}

export const FORWARD_SPEED = 50;
export const CROSSHAIR_LERP = 10;
export const STEER_SPEED = 40;
export const BANKING_FACTOR = 0.02;
export const CROSSHAIR_MOVEMENT_RANGE = 8;
export const CROSSHAIR_DISTANCE = 20;

export const state: GameState = {
  score: 0,
  shields: 6,
  wave: 1,
  phase: 'DOGFIGHT',
  isGameOver: false,
  playerPos: new THREE.Vector3(),
  playerRot: new THREE.Euler(),
  crosshairPos: new THREE.Vector3(),
  targetInput: new THREE.Vector2(),
};

export function initGame() {
  state.score = 0;
  state.shields = 6;
  state.wave = 1;
  state.phase = 'DOGFIGHT';
  state.isGameOver = false;
  state.playerPos.set(0, 0, 0);
  state.playerRot.set(0, 0, 0);
  state.crosshairPos.set(0, 0, 0);
  state.targetInput.set(0, 0);
}

export function update(dt: number) {
  // Constant forward movement
  state.playerPos.z += FORWARD_SPEED * dt;

  // Continuous horizontal/vertical movement based on input
  const prevX = state.playerPos.x;
  state.playerPos.x += state.targetInput.x * STEER_SPEED * dt;
  state.playerPos.y += state.targetInput.y * STEER_SPEED * dt;

  // Crosshair chases a target offset from the player
  const targetCrosshairX = state.playerPos.x + state.targetInput.x * CROSSHAIR_MOVEMENT_RANGE;
  const targetCrosshairY = state.playerPos.y + state.targetInput.y * CROSSHAIR_MOVEMENT_RANGE;
  
  state.crosshairPos.x += (targetCrosshairX - state.crosshairPos.x) * CROSSHAIR_LERP * dt;
  state.crosshairPos.y += (targetCrosshairY - state.crosshairPos.y) * CROSSHAIR_LERP * dt;
  state.crosshairPos.z = state.playerPos.z + CROSSHAIR_DISTANCE;

  // Banking based on horizontal velocity
  const dx = state.playerPos.x - prevX;
  state.playerRot.z = -(dx / dt) * BANKING_FACTOR;
}

export function addScore(points: number) {
  state.score += points;
}

export function takeDamage(amount: number = 1) {
  state.shields -= amount;
  if (state.shields <= 0) {
    state.isGameOver = true;
  }
}

export function nextPhase() {
  const phases: GamePhase[] = ['DOGFIGHT', 'SURFACE', 'TRENCH'];
  const currentIndex = phases.indexOf(state.phase);
  if (currentIndex < phases.length - 1) {
    state.phase = phases[currentIndex + 1];
  } else {
    state.phase = 'DOGFIGHT';
    state.wave++;
  }
}

// Basic collision check placeholder
export function checkCollision(pos1: THREE.Vector3, radius1: number, pos2: THREE.Vector3, radius2: number): boolean {
  const distance = pos1.distanceTo(pos2);
  return distance < (radius1 + radius2);
}