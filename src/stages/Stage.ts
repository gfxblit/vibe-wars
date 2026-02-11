import { Player } from '../entities/Player';

export abstract class Stage {
  public abstract get speed(): number;
  public abstract update(deltaTime: number, player: Player): void;
  public abstract cleanup(): void;
}
