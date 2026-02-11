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
    expect(debugPanel?.textContent).toContain('STATS');
    expect(debugPanel?.textContent).toContain('TIE FIGHTERS:');
    expect(debugPanel?.textContent).toContain('0');
  });

  it('should update TIE fighter count', () => {
    // Update mock to return 5 tie fighters
    mockState.entityManager!.getTieFighters = vi.fn().mockReturnValue(new Array(5));
    
    uiManager.update(mockState);
    
    const debugPanel = document.getElementById('debug-panel');
    expect(debugPanel?.textContent).toContain('TIE FIGHTERS:');
    
    // Check specific element value if possible, or just text content
    // We didn't set an ID for the value span, but we can verify the text content of the panel
    // It should contain '5' now.
    expect(debugPanel?.textContent).toContain('5');
    
    // More robust check:
    // Find the span that contains the value.
    // In our implementation: 
    // const tfRow = ...
    // ... textContent = 'TIE FIGHTERS:'
    // this.tieFighterCountValue = ...
    
    // We can traverse the DOM to find it
    
    // Since we know the implementation puts them in a flex row:
    // <div><span>TIE FIGHTERS:</span><span>5</span></div>
    
    const rows = debugPanel?.querySelectorAll('div.flex.justify-between');
    let found = false;
    rows?.forEach(row => {
        if (row.textContent?.includes('TIE FIGHTERS:')) {
            expect(row.textContent).toContain('5');
            found = true;
        }
    });
    expect(found).toBe(true);
  });
});
