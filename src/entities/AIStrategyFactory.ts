import { AIStrategy, RandomGenerator } from './AIStrategy';
import { DumbAIStrategy } from './DumbAIStrategy';
import { SmartAIStrategy } from './SmartAIStrategy';

export class AIStrategyFactory {
  constructor(private readonly rng: RandomGenerator = Math) {}

  public createStrategy(isSmartAI: boolean): AIStrategy {
    return isSmartAI ? new SmartAIStrategy(this.rng) : new DumbAIStrategy();
  }
}
