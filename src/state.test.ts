import { expect, test, beforeEach } from 'vitest'
import { state, initGame, addScore, takeDamage, nextPhase } from './state'

beforeEach(() => {
  initGame();
});

test('initial state', () => {
  expect(state.score).toBe(0)
  expect(state.shields).toBe(6)
  expect(state.phase).toBe('DOGFIGHT')
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