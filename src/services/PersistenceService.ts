import { GameState } from '../state';
import { StorageService } from './StorageService';

export const STORAGE_KEY = 'vibe_wars_state';

export function saveGameState(state: GameState, storage: StorageService): void {
  const gameState = {
    score: state.score,
    shields: state.shields,
    kills: state.kills,
    wave: state.wave,
    stage: state.stage,
  };
  storage.setItem(STORAGE_KEY, JSON.stringify(gameState));
}

export function loadGameState(storage: StorageService): Partial<GameState> | null {
  const stored = storage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse saved state', e);
    }
  }
  return null;
}
