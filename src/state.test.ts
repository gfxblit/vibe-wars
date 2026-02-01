import { expect, test, beforeEach, describe } from 'vitest'
import { state, initGame, addScore, takeDamage, nextPhase, checkCollision, updateState } from './state'
import * as THREE from 'three';
import { Player } from './entities/Player';

beforeEach(() => {
  initGame();
});

describe('Game State', () => {
  test('initial state', () => {
    expect(state.score).toBe(0)
    expect(state.shields).toBe(6)
    expect(state.phase).toBe('DOGFIGHT')
    expect(state.player).toBeInstanceOf(Player)
  })

  test('updateState moves player forward', () => {
    const initialZ = state.player.position.z;
    updateState(1); // 1 second
    // Forward motion is negative Z.
    // Let's assume some speed, e.g., 10 units/sec.
    expect(state.player.position.z).toBeLessThan(initialZ);
  })

  test('updateState should not move player if game is over', () => {
    takeDamage(6);
    expect(state.isGameOver).toBe(true);
    const initialZ = state.player.position.z;
    updateState(1);
    expect(state.player.position.z).toBe(initialZ);
  })

  test('addScore increases score', () => {
    addScore(100);
    expect(state.score).toBe(100);
  })

  test('takeDamage reduces shields', () => {
    takeDamage(1);
    expect(state.shields).toBe(5);
  })

  test('takeDamage triggers game over', () => {
    takeDamage(6);
    expect(state.shields).toBe(0);
    expect(state.isGameOver).toBe(true);
  })

  test('nextPhase transitions through phases', () => {
    expect(state.phase).toBe('DOGFIGHT');
    nextPhase();
    expect(state.phase).toBe('SURFACE');
    nextPhase();
    expect(state.phase).toBe('TRENCH');
    nextPhase();
    expect(state.phase).toBe('DOGFIGHT');
    expect(state.wave).toBe(2);
  })
});

describe('Physics Utils', () => {
  test('checkCollision detects overlapping spheres', () => {
    const pos1 = new THREE.Vector3(0, 0, 0);
    const pos2 = new THREE.Vector3(1, 0, 0);
    expect(checkCollision(pos1, 0.6, pos2, 0.6)).toBe(true);
  })

  test('checkCollision detects non-overlapping spheres', () => {
    const pos1 = new THREE.Vector3(0, 0, 0);
    const pos2 = new THREE.Vector3(2, 0, 0);
    expect(checkCollision(pos1, 0.5, pos2, 0.5)).toBe(false);
  })
});