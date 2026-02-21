import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveGameState, loadGameState, STORAGE_KEY } from './PersistenceService';
import { InMemoryStorageService } from './StorageService';
import { GameState } from '../state';

describe('PersistenceService', () => {
  let storage: InMemoryStorageService;

  beforeEach(() => {
    storage = new InMemoryStorageService();
  });

  const mockState = {
    score: 100,
    shields: 5,
    kills: 10,
    wave: 2,
    stage: 'TRENCH',
    // Other properties that should NOT be saved
    isGameOver: false,
    player: null,
    debug: true,
  } as unknown as GameState;

  it('saveGameState should save relevant state properties to storage', () => {
    saveGameState(mockState, storage);
    
    const stored = storage.getItem(STORAGE_KEY);
    expect(stored).not.toBeNull();
    
    const parsed = JSON.parse(stored!);
    expect(parsed).toEqual({
      score: 100,
      shields: 5,
      kills: 10,
      wave: 2,
      stage: 'TRENCH'
    });
    
    // Ensure irrelevant properties are not saved
    expect(parsed.isGameOver).toBeUndefined();
    expect(parsed.debug).toBeUndefined();
  });

  it('loadGameState should retrieve and parse state from storage', () => {
    const savedState = {
      score: 200,
      shields: 3,
      kills: 20,
      wave: 3,
      stage: 'SURFACE'
    };
    storage.setItem(STORAGE_KEY, JSON.stringify(savedState));

    const loaded = loadGameState(storage);
    expect(loaded).toEqual(savedState);
  });

  it('loadGameState should return null if no state exists', () => {
    const loaded = loadGameState(storage);
    expect(loaded).toBeNull();
  });

  it('loadGameState should handle corrupted JSON gracefully', () => {
    storage.setItem(STORAGE_KEY, '{ invalid json }');
    
    // Should log error but not throw, and return null?
    // Current implementation of loadState in state.ts catches parse errors.
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    let loaded;
    expect(() => { loaded = loadGameState(storage); }).not.toThrow();
    expect(loaded).toBeNull();
    
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
