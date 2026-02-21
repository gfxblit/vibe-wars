import { expect, test, beforeEach, vi, afterEach, describe } from 'vitest'
import { state, initGame, saveState, setStorageService } from './state'
import * as THREE from 'three';
import { InMemoryStorageService } from './services/StorageService';
import { STORAGE_KEY } from './services/PersistenceService';

const scene = new THREE.Scene();
const hudScene = new THREE.Scene();

// Mock window.location
const originalLocation = window.location;

let storageService: InMemoryStorageService;

beforeEach(() => {
  // Reset state
  state.score = 0;
  state.stage = 'DOGFIGHT';
  
  // Use in-memory storage
  storageService = new InMemoryStorageService();
  setStorageService(storageService);

  // Mock location
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      search: '',
      reload: vi.fn(),
      assign: vi.fn(),
    }
  });
});

afterEach(() => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: originalLocation
  });
});

describe('Game State Args', () => {
  test('initGame respects ?s=SURFACE', () => {
    window.location.search = '?s=SURFACE';
    initGame(scene, hudScene);
    expect(state.stage).toBe('SURFACE');
  });

  test('initGame respects ?s=TRENCH', () => {
    window.location.search = '?s=TRENCH';
    initGame(scene, hudScene);
    expect(state.stage).toBe('TRENCH');
  });
  
  test('initGame handles invalid ?s gracefully', () => {
    window.location.search = '?s=INVALID_STAGE';
    initGame(scene, hudScene);
    // Should fallback to default 'DOGFIGHT'
    expect(state.stage).toBe('DOGFIGHT');
  });

  test('initGame respects ?continue=true to load state', () => {
    const savedState = {
      score: 12345,
      wave: 3,
      stage: 'TRENCH',
      shields: 2,
    };
    storageService.setItem(STORAGE_KEY, JSON.stringify(savedState));

    window.location.search = '?continue=true';
    initGame(scene, hudScene);
    
    expect(state.score).toBe(12345);
    expect(state.wave).toBe(3);
    expect(state.stage).toBe('TRENCH');
    expect(state.shields).toBe(2);
  });

  test('initGame prioritizes ?s over saved stage when ?continue=true', () => {
    const savedState = {
      score: 12345,
      wave: 3,
      stage: 'TRENCH',
    };
    storageService.setItem(STORAGE_KEY, JSON.stringify(savedState));

    window.location.search = '?continue=true&s=DOGFIGHT';
    initGame(scene, hudScene);

    expect(state.score).toBe(12345); // Restored score
    expect(state.stage).toBe('DOGFIGHT'); // Overridden stage
  });
  
  test('saveState persists current state', () => {
    state.score = 999;
    state.wave = 5;
    state.stage = 'SURFACE';
    
    saveState();
    
    const stored = storageService.getItem(STORAGE_KEY);
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.score).toBe(999);
    expect(parsed.wave).toBe(5);
    expect(parsed.stage).toBe('SURFACE');
  });
});
