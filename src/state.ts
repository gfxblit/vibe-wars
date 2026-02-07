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
  entityManager: EntityManager | null;
  fireballs: Fireball[];
  viewport: Viewport;
  lasers: Laser[];
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
  wave: 1,
  phase: 'DOGFIGHT',
  isGameOver: false,
  player: null,
  entityManager: null,
  fireballs: [],
  viewport: {
    width: initialWidth,
    height: initialHeight,
    centerX: initialWidth / 2,
    centerY: initialHeight / 2,
  },
  lasers: [],
  gunColorToggles: GameConfig.laser.offsets.map(() => false),
  debug: false,
  isSmartAI: true,
  isModeColoring: false,
};

export function initGame(scene: THREE.Scene) {
  const urlParams = new URLSearchParams(window.location.search);
  state.debug = urlParams.get('debug') === 'true';

  // Reset core game values
  state.score = 0;
  state.shields = GameConfig.player.maxShields;
  state.wave = 1;
  state.phase = 'DOGFIGHT';
  state.isGameOver = false;
  state.lasers = [];
  state.gunColorToggles = GameConfig.laser.offsets.map(() => false);
  state.fireballs = [];

  state.player = new Player();
  
  if (state.entityManager) {
    state.entityManager.clear();
  }
  state.entityManager = new EntityManager(scene);
  state.entityManager.spawnTieFighter(state.isSmartAI);
  
  console.log('Game initialized', { debug: state.debug });
}

export function updateState(deltaTime: number, input: UserInput = { x: 0, y: 0, isFiring: false }) {
  if (state.isGameOver || !state.player || !state.entityManager) {
    return { newFireballs: [], expiredFireballs: [] };
  }

  state.player.update(input, deltaTime);

  const { newFireballs } = state.entityManager.update(deltaTime, state.player.position, state.player.mesh.quaternion, state.isSmartAI);
  state.fireballs.push(...newFireballs);

  const expiredFireballs: Fireball[] = [];
  const playerForward = new THREE.Vector3(0, 0, -1).applyQuaternion(state.player.mesh.quaternion);
  const toFireball = new THREE.Vector3();

  // Update fireballs and check for player collision
  for (let i = state.fireballs.length - 1; i >= 0; i--) {
    const fb = state.fireballs[i];
    fb.update(deltaTime);

    // If fireball is far behind player, expire it
    toFireball.subVectors(fb.position, state.player.position);
    const dot = toFireball.dot(playerForward);
    
    // If it's more than configured units behind the player, it's missed
    if (dot < -GameConfig.fireball.expirationDistance) {
      expiredFireballs.push(fb);
      state.fireballs.splice(i, 1);
      continue;
    }

    if (checkCollision(fb.position, GameConfig.fireball.collisionRadiusWorld, state.player.position, GameConfig.player.meshSize)) {
      takeDamage(GameConfig.fireball.damage);
      expiredFireballs.push(fb);
      state.fireballs.splice(i, 1);
    }
  }

  return { newFireballs, expiredFireballs };
}

export function spawnFireball(position: THREE.Vector3, velocity: THREE.Vector3): Fireball {
  const fireball = new Fireball(position, velocity);
  state.fireballs.push(fireball);
  return fireball;
}

export function spawnLasers(input: Pick<UserInput, 'x' | 'y'>): Laser[] {
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
