/**
 * STUB: This game state implementation is a placeholder and subject to 
 * major refactoring as the architecture is finalized.
 */
import * as THREE from 'three';
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
  console.log('Game initialized');
}

export function updateState(deltaTime: number, input: UserInput = { x: 0, y: 0, isFiring: false }) {
  if (state.isGameOver || !state.player) return;

  state.player.update(input, deltaTime);

  state.tieFighters.forEach(tf => {
    tf.update(deltaTime, state.player!.position, state.player!.mesh.quaternion);
  });
}

export function spawnLasers(camera: THREE.Camera, crosshairPos: { x: number, y: number }): Laser[] {
  camera.updateMatrixWorld();
  // Use world position of the camera
  const cameraWorldPos = new THREE.Vector3();
  camera.getWorldPosition(cameraWorldPos);

  // Calculate target world position using crosshairPos (unprojected at targetDepth).
  // crosshairPos is in [-1, 1] range.
  const targetWorldPos = new THREE.Vector3(crosshairPos.x, crosshairPos.y, 0.5)
    .unproject(camera)
    .sub(cameraWorldPos)
    .normalize()
    .multiplyScalar(GameConfig.laser.targetDepth)
    .add(cameraWorldPos);

  const newLasers: Laser[] = [];

  GameConfig.laser.offsets.forEach(offset => {
    // Get origin in world space relative to camera.
    // Using -1 for z in unproject gives us a point on the near plane.
    const origin = new THREE.Vector3(offset.x, offset.y, -1).unproject(camera);
    
    // Direction from origin to target
    const direction = targetWorldPos.clone().sub(origin).normalize();
    
    const laser = new Laser(origin, direction);
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