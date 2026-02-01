/**
 * STUB: This game state implementation is a placeholder and subject to 
 * major refactoring as the architecture is finalized.
 */
import * as THREE from 'three';
import { Player } from './entities/Player';

export type GamePhase = 'DOGFIGHT' | 'SURFACE' | 'TRENCH';

export interface GameState {
  score: number;
  shields: number;
  wave: number;
  phase: GamePhase;
  isGameOver: boolean;
  player: Player | null;
}

export const state: GameState = {
  score: 0,
  shields: 6,
  wave: 1,
  phase: 'DOGFIGHT',
  isGameOver: false,
  player: null,
};

const PLAYER_SPEED = 20;

export function initGame() {
  state.score = 0;
  state.shields = 6;
  state.wave = 1;
  state.phase = 'DOGFIGHT';
  state.isGameOver = false;
  state.player = new Player();
  console.log('Game initialized');
}

export function updateState(deltaTime: number) {
  if (state.isGameOver || !state.player) return;

  // Move player forward (negative Z)
  state.player.position.z -= PLAYER_SPEED * deltaTime;
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