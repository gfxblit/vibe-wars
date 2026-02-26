import * as THREE from 'three';
import { Tower } from './Tower';
import { Turret } from './Turret';
import { GameConfig } from '../config';
import { SurfaceObstacle } from './SurfaceObstacle';
import { state } from '../state';

export class SurfaceObstacleFactory {
  public createTower(position: THREE.Vector3): SurfaceObstacle {
    return new Tower(position);
  }

  public createTurret(position: THREE.Vector3): SurfaceObstacle {
    const turretSize = state.debugTurretSize ?? GameConfig.stages.surface.turretSize;
    const fireballSize = state.debugSurfaceFireballSize ?? GameConfig.stages.surface.fireballSize;
    const fireballSpeed = state.debugSurfaceFireballSpeed ?? GameConfig.stages.surface.fireballSpeed;
    
    const turret = new Turret(position, turretSize, fireballSize, fireballSpeed);
    // Rotate turret so its local Z (normal) points UP (world +Y)
    turret.mesh.rotation.x = -Math.PI / 2;
    return turret;
  }

  public createRandom(position: THREE.Vector3, wave: number = 1): SurfaceObstacle {
    let scaledDensity: number;
    
    if (state.debugSurfaceTurretDensity !== undefined) {
      scaledDensity = state.debugSurfaceTurretDensity;
    } else {
      const { turretDensity } = GameConfig.stages.surface;
      const multiplier = GameConfig.getDifficultyMultiplier(wave);
      scaledDensity = Math.min(1.0, turretDensity * multiplier);
    }
    
    if (Math.random() < scaledDensity) {
      return this.createTurret(position);
    } else {
      return this.createTower(position);
    }
  }
}
