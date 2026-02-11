import { Player } from '../entities/Player';
import { Turret } from '../entities/Turret';

export abstract class Stage {
  public abstract get speed(): number;
  public abstract update(deltaTime: number, player: Player): void;
  public abstract cleanup(): void;
  public getTurrets(): Turret[] {
    return [];
  }
}
