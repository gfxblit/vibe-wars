import * as THREE from 'three';
import { Player, PlayerUpdateOptions } from '../entities/Player';
import { Turret } from '../entities/Turret';

export abstract class Stage {
  public abstract get speed(): number;
  public abstract update(deltaTime: number, player: Player, camera: THREE.Camera): void;
  public abstract cleanup(): void;
  public get showStarField(): boolean {
    return false;
  }
  public get showTitle(): boolean {
    return true;
  }
  public getTurrets(): Turret[] {
    return [];
  }
  public getPlayerOptions(): PlayerUpdateOptions | undefined {
    return undefined;
  }
}
