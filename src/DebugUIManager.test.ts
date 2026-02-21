// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DebugUIManager } from './DebugUIManager';
import { state } from './state';
import { GameConfig } from './config';

describe('DebugUIManager', () => {
  let debugManager: DebugUIManager;

  beforeEach(() => {
    document.body.innerHTML = '';
    // Reset state debug values
    state.debug = true;
    state.debugSurfaceFireballSize = undefined;
    state.debugSurfaceFireballSpeed = undefined;
    
    // Mock entityManager
    state.entityManager = {
        getTieFighters: () => [],
    } as any;

    debugManager = new DebugUIManager();
  });

  afterEach(() => {
    debugManager.destroy();
    document.body.innerHTML = '';
  });

  it('should create debug panel', () => {
    const panel = document.getElementById('debug-panel');
    expect(panel).toBeTruthy();
  });

  it('should create Surface Fireball Size input', () => {
    const input = document.getElementById('debug-surface-fireball-size-input') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.placeholder).toContain(GameConfig.stages.surface.fireballSize.toString());
  });

  it('should update state when Surface Fireball Size input changes', () => {
    const input = document.getElementById('debug-surface-fireball-size-input') as HTMLInputElement;
    input.value = '55';
    input.dispatchEvent(new Event('change'));
    
    expect(state.debugSurfaceFireballSize).toBe(55);
  });

  it('should create Surface Fireball Speed input', () => {
    const input = document.getElementById('debug-surface-fireball-speed-input') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.placeholder).toContain(GameConfig.stages.surface.fireballSpeed.toString());
  });

  it('should update state when Surface Fireball Speed input changes', () => {
    const input = document.getElementById('debug-surface-fireball-speed-input') as HTMLInputElement;
    input.value = '123';
    input.dispatchEvent(new Event('change'));
    
    expect(state.debugSurfaceFireballSpeed).toBe(123);
  });

  it('should update stats in update loop', () => {
     // Mock tie fighters
     state.entityManager = {
         getTieFighters: () => [{}, {}]
     } as any;

     debugManager.update(state);

     const count = document.getElementById('debug-tie-fighter-count');
     expect(count?.textContent).toBe('2');
  });
});
