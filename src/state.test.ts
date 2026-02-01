import { expect, test, beforeEach, describe } from 'vitest'
import { state, initGame, addScore, takeDamage, nextPhase, checkCollision, update } from './state'
import * as THREE from 'three';

beforeEach(() => {
  initGame();
});

describe('Game State', () => {
  test('initial state', () => {
    expect(state.score).toBe(0)
    expect(state.shields).toBe(6)
    expect(state.phase).toBe('DOGFIGHT')
    expect(state.playerPos.x).toBe(0)
    expect(state.playerPos.y).toBe(0)
    expect(state.playerPos.z).toBe(0)
    expect(state.crosshairPos.x).toBe(0)
    expect(state.crosshairPos.y).toBe(0)
  })

  test('update increments playerPos.z (forward movement)', () => {
    const initialZ = state.playerPos.z;
    update(0.1); // dt = 0.1s
    expect(state.playerPos.z).toBeGreaterThan(initialZ);
  })

  test('crosshair chases targetInput', () => {
    state.targetInput.set(1, 1);
    update(0.1);
    expect(state.crosshairPos.x).toBeGreaterThan(0);
    expect(state.crosshairPos.y).toBeGreaterThan(0);
  })

  test('playerPos chases crosshairPos', () => {
    state.targetInput.set(1, 1);
    update(0.1); // This moves crosshairPos towards (10, 10)
    update(0.1); // This moves playerPos towards crosshairPos
    expect(state.playerPos.x).toBeGreaterThan(0);
    expect(state.playerPos.y).toBeGreaterThan(0);
  })

  test('playerRot.z (banking) changes based on horizontal movement', () => {
    state.crosshairPos.set(1, 0, 0);
    update(0.1);
    expect(state.playerRot.z).not.toBe(0);
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