import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DogfightStage } from './DogfightStage';
import { GameConfig } from '../config';
import { state } from '../state';
import { Player } from '../entities/Player';

// Mock dependencies
vi.mock('../state', () => ({
  state: {
    entityManager: {
      setSpawningEnabled: vi.fn(),
    },
    kills: 0,
  },
  goToNextStage: vi.fn(),
}));

import { goToNextStage } from '../state';

describe('DogfightStage', () => {
  let stage: DogfightStage;

  beforeEach(() => {
    vi.clearAllMocks();
    (state.entityManager?.setSpawningEnabled as any).mockClear();
    state.kills = 0;
  });

  it('should enable spawning on initialization', () => {
    stage = new DogfightStage();
    expect(state.entityManager?.setSpawningEnabled).toHaveBeenCalledWith(true);
  });

  it('should have correct speed', () => {
    stage = new DogfightStage();
    expect(stage.speed).toBe(GameConfig.player.forwardSpeeds.DOGFIGHT);
  });

  it('should trigger next stage when kill threshold is met', () => {
    stage = new DogfightStage();
    state.kills = GameConfig.stage.trenchKillsThreshold;
    
    // Mock player (not used in this stage but required by interface)
    const mockPlayer = {} as Player;
    
    stage.update(0.1, mockPlayer);
    expect(goToNextStage).toHaveBeenCalled();
  });

  it('should not trigger next stage when kill threshold is not met', () => {
    stage = new DogfightStage();
    state.kills = GameConfig.stage.trenchKillsThreshold - 1;
    
    const mockPlayer = {} as Player;
    
    stage.update(0.1, mockPlayer);
    expect(goToNextStage).not.toHaveBeenCalled();
  });
});
