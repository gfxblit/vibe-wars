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

export type GameStage = 'DOGFIGHT' | 'SURFACE' | 'TRENCH' | 'EXPLOSION';

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
  stage: GameStage;
  isGameOver: boolean;
  player: Player | null;
  entityManager: EntityManager | null;
  stageManager: StageManager | null;
  viewport: Viewport;
  gunColorToggles: boolean[];
  debug: boolean;
  isSmartAI: boolean;
  isModeColoring: boolean;
  showChassis: boolean;
  canFireTorpedo: boolean;
  hasFiredTorpedo: boolean;
  isApproachingDeathStar: boolean;
  isDeathStarDestroyed: boolean;
  debugKillsThreshold?: number;
  debugTurretSize?: number;
  debugFireballSize?: number;
  debugTieFighterSize?: number;
  debugTieFighterColor?: number;
}

const initialWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
const initialHeight = typeof window !== 'undefined' ? window.innerHeight : 768;

export const state: GameState = {
  score: 0,
  shields: GameConfig.player.maxShields,
  kills: 0,
  wave: 1,
  stage: 'DOGFIGHT',
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
  showChassis: false,
  canFireTorpedo: false,
  hasFiredTorpedo: false,
  isApproachingDeathStar: false,
  isDeathStarDestroyed: false,
  debugKillsThreshold: undefined,
  debugTurretSize: undefined,
  debugFireballSize: undefined,
  debugTieFighterSize: undefined,
  debugTieFighterColor: undefined,
};

export function saveState() {
  if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.setItem === 'function') {
    const gameState = {
      score: state.score,
      shields: state.shields,
      kills: state.kills,
      wave: state.wave,
      stage: state.stage,
    };
    window.localStorage.setItem('vibe_wars_state', JSON.stringify(gameState));
  }
}

function loadState(): Partial<GameState> | null {
  if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.getItem === 'function') {
    const stored = window.localStorage.getItem('vibe_wars_state');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
  }
  return null;
}

export function initGame(worldScene: THREE.Scene, hudScene: THREE.Scene) {
  const urlParams = new URLSearchParams(window.location.search);
  state.debug = urlParams.get('debug') === 'true';
  const shouldContinue = urlParams.get('continue') === 'true';
  const stageOverride = urlParams.get('s') || urlParams.get('stage');

  // Default values
  let initialScore = 0;
  let initialShields: number = GameConfig.player.maxShields;
  let initialKills = 0;
  let initialWave = 1;
  let initialStage: GameStage = 'DOGFIGHT';

  if (shouldContinue) {
    const saved = loadState();
    if (saved) {
      initialScore = saved.score ?? initialScore;
      initialShields = saved.shields ?? initialShields;
      initialKills = saved.kills ?? initialKills;
      initialWave = saved.wave ?? initialWave;
      initialStage = saved.stage ?? initialStage;
    }
  }

  // Override stage if provided
  if (stageOverride) {
    const validStages: GameStage[] = ['DOGFIGHT', 'SURFACE', 'TRENCH', 'EXPLOSION'];
    if (validStages.includes(stageOverride as GameStage)) {
      initialStage = stageOverride as GameStage;
    }
  }

  // Reset core game values
  state.score = initialScore;
  state.shields = initialShields;
  state.kills = initialKills;
  state.wave = initialWave;
  state.stage = initialStage;
  state.isGameOver = false;
  state.gunColorToggles = GameConfig.laser.offsets.map(() => false);
  state.canFireTorpedo = false;
  state.hasFiredTorpedo = false;
  state.isApproachingDeathStar = false;
  state.isDeathStarDestroyed = false;
  state.debugKillsThreshold = undefined;
  state.debugTurretSize = undefined;
  state.debugFireballSize = undefined;
  state.debugTieFighterSize = undefined;
  state.debugTieFighterColor = undefined;

  state.player = new Player();

  if (state.stageManager) {
    state.stageManager.destroy();
  }
  state.stageManager = new StageManager(worldScene);
  // Ensure the stage manager is set to the correct stage if we loaded a different one
  if (state.stage !== 'DOGFIGHT') {
    state.stageManager.setStage(state.stage);
  }

  if (state.entityManager) {
    state.entityManager.clear();
  }
  state.entityManager = new EntityManager(worldScene, hudScene);
  state.entityManager.spawnTieFighter(state.isSmartAI);

  console.log('Game initialized', { debug: state.debug, stage: state.stage });
}

export function updateState(deltaTime: number, camera: THREE.Camera, input: UserInput = { x: 0, y: 0, isFiring: false }) {
  if (state.isGameOver || !state.player || !state.entityManager || !state.stageManager) {
    return;
  }

  const currentSpeed = state.stageManager.getStage()?.speed ?? GameConfig.player.baseForwardSpeed;
  const effectiveInput = state.stage === 'EXPLOSION' ? { x: 0, y: 0, isFiring: false } : input;
  const playerOptions = state.stageManager.getStage()?.getPlayerOptions();

  state.player.update(effectiveInput, deltaTime, currentSpeed, state.showChassis, playerOptions);

  // Ensure camera world matrix is updated after player moves but before collision check
  camera.updateMatrixWorld();

  state.entityManager.update(
    deltaTime,
    state.player.position,
    state.player.mesh.quaternion,
    state.isSmartAI,
    camera,
    currentSpeed,
    state.stage === 'EXPLOSION' ? undefined : (damage) => takeDamage(damage)
  );

  state.stageManager.update(deltaTime, state.player, camera);
}

export function setStage(stage: GameStage) {
  if (state.stageManager) {
    state.stageManager.setStage(stage);
  } else {
    state.stage = stage;
    state.kills = 0;
  }
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

export function spawnTorpedo(position: THREE.Vector3, velocity: THREE.Vector3) {
  if (!state.entityManager) return null;
  return state.entityManager.spawnTorpedo(position, velocity);
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

export function goToNextStage() {
  if (state.stageManager) {
    state.stageManager.goToNextStage();
    saveState();
  }
}

// Basic collision check placeholder
export function checkCollision(pos1: THREE.Vector3, radius1: number, pos2: THREE.Vector3, radius2: number): boolean {
  const distance = pos1.distanceTo(pos2);
  return distance < (radius1 + radius2);
}
