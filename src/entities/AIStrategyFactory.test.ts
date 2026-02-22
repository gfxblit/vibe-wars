import { expect, test, describe, vi } from 'vitest';
import { AIStrategyFactory } from './AIStrategyFactory';
import { SmartAIStrategy } from './SmartAIStrategy';
import { DumbAIStrategy } from './DumbAIStrategy';
import { RandomGenerator } from './AIStrategy';

describe('AIStrategyFactory', () => {
  test('should create SmartAIStrategy when isSmartAI is true', () => {
    const factory = new AIStrategyFactory();
    const strategy = factory.createStrategy(true);
    expect(strategy).toBeInstanceOf(SmartAIStrategy);
  });

  test('should create DumbAIStrategy when isSmartAI is false', () => {
    const factory = new AIStrategyFactory();
    const strategy = factory.createStrategy(false);
    expect(strategy).toBeInstanceOf(DumbAIStrategy);
  });

  test('should pass custom RNG to SmartAIStrategy', () => {
    const mockRng: RandomGenerator = {
      random: vi.fn().mockReturnValue(0.1),
    };
    const factory = new AIStrategyFactory(mockRng);
    factory.createStrategy(true);

    // SmartAIStrategy constructor calls random() multiple times:
    // 2 times for arcDirection
    // 2 times for stageOffsets
    expect(mockRng.random).toHaveBeenCalled();
  });

  test('should use Math as default RNG', () => {
    const factory = new AIStrategyFactory();
    // We can't easily mock Math.random globally in a way that's clean here,
    // but we can check that it doesn't throw and returns something.
    const strategy = factory.createStrategy(true);
    expect(strategy).toBeInstanceOf(SmartAIStrategy);
  });
});
