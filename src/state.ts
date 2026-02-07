/**
 * STUB: This game state implementation is a placeholder and subject to 
 * major refactoring as the architecture is finalized.
 */
import * as THREE from 'three';
import { Player } from './entities/Player';
import { TieFighter } from './entities/TieFighter';
import { UserInput } from './input';
import { Laser } from './entities/Laser';
import { GameConfig } from './config';

export type GamePhase = 'DOGFIGHT' | 'SURFACE' | 'TRENCH';

export interface Viewport {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

export interface GameState {
  score: number;
  shields: number;
  wave: number;
  phase: GamePhase;
  isGameOver: boolean;
  player: Player | null;
  tieFighters: TieFighter[];
  viewport: Viewport;
  lasers: Laser[];
  gunColorToggles: boolean[];
}

const initialWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
const initialHeight = typeof window !== 'undefined' ? window.innerHeight : 768;

export const state: GameState = {
  score: 0,
  shields: GameConfig.player.maxShields,
  wave: 1,
  phase: 'DOGFIGHT',
  isGameOver: false,
  player: null,
  tieFighters: [],
  viewport: {
    width: initialWidth,
    height: initialHeight,
    centerX: initialWidth / 2,
    centerY: initialHeight / 2,
  },
  lasers: [],
  gunColorToggles: GameConfig.laser.offsets.map(() => false),
};

export function initGame() {
  state.score = 0;
  state.shields = GameConfig.player.maxShields;
  state.wave = 1;
  state.phase = 'DOGFIGHT';
  state.isGameOver = false;
  state.player = new Player();
  state.tieFighters = [new TieFighter()];
  state.lasers = [];
  state.gunColorToggles = GameConfig.laser.offsets.map(() => false);
  console.log('Game initialized');
}

export function updateState(deltaTime: number, input: UserInput = { x: 0, y: 0, isFiring: false }) {
  if (state.isGameOver || !state.player) return;

  state.player.update(input, deltaTime);

  state.tieFighters.forEach(tf => {
    tf.update(deltaTime, state.player!.position, state.player!.mesh.quaternion);
  });
}

export function spawnLasers(crosshairPos: { x: number, y: number }): Laser[] {
  const newLasers: Laser[] = [];

  // Randomize which guns fire (at least 2)
  const allIndices = GameConfig.laser.offsets.map((_, i) => i);
  for (let i = allIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
  }
  
  const minGuns = Math.min(2, allIndices.length);
  const numGuns = Math.floor(Math.random() * (allIndices.length - minGuns + 1)) + minGuns;
  const selectedIndices = allIndices.slice(0, numGuns);

  selectedIndices.forEach(index => {
    // Strictly alternate color per direction (gun index)
    const useAltColor = state.gunColorToggles[index];
    const color = useAltColor ? GameConfig.laser.alternateColor : GameConfig.laser.color;
    state.gunColorToggles[index] = !useAltColor; // Flip for next shot from this gun

    const offset = GameConfig.laser.offsets[index];
    const origin2D = new THREE.Vector2(offset.x, offset.y);
    const target2D = new THREE.Vector2(crosshairPos.x, crosshairPos.y);
    
    const laser = new Laser(origin2D, target2D, color);
    state.lasers.push(laser);
    newLasers.push(laser);
  });

  return newLasers;
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