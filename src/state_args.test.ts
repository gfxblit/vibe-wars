import { expect, test, beforeEach, vi, afterEach, describe } from 'vitest'
import { state, initGame, saveState } from './state'
import * as THREE from 'three';

const scene = new THREE.Scene();
const hudScene = new THREE.Scene();

// Mock window.location
const originalLocation = window.location;

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

beforeEach(() => {
  // Reset state
  state.score = 0;
  state.stage = 'DOGFIGHT';
  
  // Reset window.location mock
  // Note: We cannot delete window.location in some environments, but we can try to mock it or its properties.
  // In happy-dom/jsdom, we can usually write to it.
  // If not, we might need to rely on the implementation using a wrapper we can mock.
  // But let's try modifying search directly if possible or redefining the property.
  
  // A safer way for vitest with happy-dom:
  // window.location is an object. We can modify search.
  // However, initGame uses `new URLSearchParams(window.location.search)`.
  
  // Let's assume we can set it.
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      search: '',
      reload: vi.fn(),
      assign: vi.fn(),
    }
  });

  localStorage.clear();
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
    localStorage.setItem('vibe_wars_state', JSON.stringify(savedState));

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
    localStorage.setItem('vibe_wars_state', JSON.stringify(savedState));

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
    
    const stored = localStorage.getItem('vibe_wars_state');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.score).toBe(999);
    expect(parsed.wave).toBe(5);
    expect(parsed.stage).toBe('SURFACE');
  });
});
