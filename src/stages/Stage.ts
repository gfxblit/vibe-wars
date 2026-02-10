import { Player } from '../entities/Player';

export interface Stage {
  readonly speed: number;
  update(deltaTime: number, player: Player): void;
  cleanup(): void;
}
