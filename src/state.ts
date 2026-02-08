/**
 * STUB: This game state implementation is a placeholder and subject to 
 * major refactoring as the architecture is finalized.
 */
import * as THREE from 'three';
import { Player } from './entities/Player';
import { UserInput } from './input';
import { Laser } from './entities/Laser';
import { Fireball } from './entities/Fireball';
import { GameConfig } from './config';
import { EntityManager } from './entities/EntityManager';
import { StageManager } from './StageManager';

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
  kills: number;
  wave: number;
  phase: GamePhase;
  isGameOver: boolean;
  player: Player | null;
  entityManager: EntityManager | null;
  stageManager: StageManager | null;
  viewport: Viewport;
  gunColorToggles: boolean[];
  debug: boolean;
  isSmartAI: boolean;
  isModeColoring: boolean;
}

const initialWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
const initialHeight = typeof window !== 'undefined' ? window.innerHeight : 768;

export const state: GameState = {
  score: 0,
  shields: GameConfig.player.maxShields,
  kills: 0,
  wave: 1,
  phase: 'DOGFIGHT',
  isGameOver: false,
  player: null,
  entityManager: null,
  stageManager: null,
  viewport: {
    width: initialWidth,
    height: initialHeight,
    centerX: initialWidth / 2,
    centerY: initialHeight / 2,
  },
  gunColorToggles: GameConfig.laser.offsets.map(() => false),
  debug: false,
  isSmartAI: true,
  isModeColoring: false,
};

export function initGame(worldScene: THREE.Scene, hudScene: THREE.Scene) {
  const urlParams = new URLSearchParams(window.location.search);
  state.debug = urlParams.get('debug') === 'true';

  // Reset core game values
  state.score = 0;
  state.shields = GameConfig.player.maxShields;
  state.kills = 0;
  state.wave = 1;
  state.phase = 'DOGFIGHT';
  state.isGameOver = false;
  state.gunColorToggles = GameConfig.laser.offsets.map(() => false);

  state.player = new Player();

  if (state.entityManager) {
    state.entityManager.clear();
  }
  state.entityManager = new EntityManager(worldScene, hudScene);
  state.entityManager.spawnTieFighter(state.isSmartAI);

  state.stageManager = new StageManager(worldScene);

  console.log('Game initialized', { debug: state.debug });
}

export function updateState(deltaTime: number, camera: THREE.Camera, input: UserInput = { x: 0, y: 0, isFiring: false, isLaunchingTorpedo: false }) {
  if (state.isGameOver || !state.player || !state.entityManager || !state.stageManager) {
    return;
  }

  state.player.update(input, deltaTime);

  state.entityManager.update(
    deltaTime,
    state.player.position,
    state.player.mesh.quaternion,
    state.isSmartAI,
    camera,
    (damage) => takeDamage(damage)
  );

  state.stageManager.update(deltaTime, state.player);
}

export function spawnLasers(input: Pick<UserInput, 'x' | 'y'>): Laser[] {
  if (!state.entityManager) return [];

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
    const target2D = new THREE.Vector2(input.x, input.y);

    const laser = state.entityManager!.spawnLaser(origin2D, target2D, color);
    newLasers.push(laser);
  });

  return newLasers;
}

export function spawnFireball(position: THREE.Vector3, velocity: THREE.Vector3): Fireball | null {
  if (!state.entityManager) return null;
  return state.entityManager.spawnFireball(position, velocity);
}

export function addScore(points: number) {
  state.score += points;
}

export function addKill() {
  state.kills++;
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
