import { describe, it, expect, beforeEach } from 'vitest';
import { initGame, state, updateState } from './state';
import { GameConfig } from './config';

describe('Fireball Integration', () => {
  beforeEach(() => {
    initGame();
    // Ensure we have a player and a tie fighter
    expect(state.player).toBeDefined();
    expect(state.tieFighters.length).toBeGreaterThan(0);
  });

  it('Tie Fighters should spawn fireballs over time', () => {
    // Use smaller steps
    const dt = 0.1;
    const iterations = Math.ceil(GameConfig.fireball.fireRate / dt) + 5;

    let spawned = false;
    for (let i = 0; i < iterations; i++) {
      const { newFireballs } = updateState(dt);
      if (newFireballs.length > 0) spawned = true;
    }

    expect(spawned).toBe(true);
  });

  it('Fireballs should move toward the player', () => {
    initGame();
    let fb: any = null;
    for (let i = 0; i < 100 && !fb; i++) {
      const { newFireballs } = updateState(0.1);
      if (newFireballs.length > 0) fb = newFireballs[0];
    }

    expect(fb).toBeDefined();
    const initialDist = fb.position.distanceTo(state.player!.position);

    updateState(0.01); 
    const newDist = fb.position.distanceTo(state.player!.position);

    expect(newDist).toBeLessThan(initialDist);
  });

  it('Fireballs should damage player on collision', () => {
    initGame();
    // Spawn a fireball
    let fb: any = null;
    for (let i = 0; i < 100 && !fb; i++) {
      const { newFireballs } = updateState(0.1);
      if (newFireballs.length > 0) fb = newFireballs[0];
    }
    
    expect(fb).toBeDefined();
    const initialShields = state.shields;
    
    // Teleport fireball to player
    fb.position.copy(state.player!.position);

    updateState(0.01);

    expect(state.shields).toBeLessThan(initialShields);
  });
});
