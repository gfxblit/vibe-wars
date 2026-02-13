import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { GameState, state } from './state';

describe('UIManager Debug Stats', () => {
  let uiManager: UIManager;
  let mockState: GameState;

  beforeEach(() => {
    vi.useFakeTimers();
    // Reset singleton state
    state.debug = true;
    state.isSmartAI = true;

    // Setup mock state
    // We need to cast to any or Partial to avoid mocking everything
    mockState = {
        ...state,
        entityManager: {
            getTieFighters: vi.fn().mockReturnValue([]),
        } as any,
    };

    // Clean up body
    document.body.innerHTML = '';
    uiManager = new UIManager();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should display TIE fighter count in debug panel', () => {
    const debugPanel = document.getElementById('debug-panel');
    expect(debugPanel).not.toBeNull();
    const countElement = document.getElementById('debug-tie-fighter-count');
    expect(countElement).not.toBeNull();
    expect(countElement?.textContent).toBe('0');
  });

  it('should update TIE fighter count', () => {
    // Update mock to return 5 tie fighters
    mockState.entityManager!.getTieFighters = vi.fn().mockReturnValue(new Array(5));
    
    uiManager.update(mockState);
    
    const countElement = document.getElementById('debug-tie-fighter-count');
    expect(countElement).not.toBeNull();
    expect(countElement?.textContent).toBe('5');
  });
});
