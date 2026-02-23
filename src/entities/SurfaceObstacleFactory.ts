import * as THREE from 'three';
import { Tower } from './Tower';
import { Turret } from './Turret';
import { GameConfig } from '../config';
import { SurfaceObstacle } from './SurfaceObstacle';

export class SurfaceObstacleFactory {
  public createTower(position: THREE.Vector3): SurfaceObstacle {
    return new Tower(position);
  }

  public createTurret(position: THREE.Vector3): SurfaceObstacle {
    const { turretSize, fireballSize, fireballSpeed } = GameConfig.stages.surface;
    const turret = new Turret(position, turretSize, fireballSize, fireballSpeed);
    // Rotate turret to lie flat on the ground
    turret.mesh.rotation.x = -Math.PI / 2;
    return turret;
  }

  public createRandom(position: THREE.Vector3): SurfaceObstacle {
    const { turretSpawnProbability } = GameConfig.stages.surface;
    if (Math.random() < turretSpawnProbability) {
      return this.createTurret(position);
    } else {
      return this.createTower(position);
    }
  }
}
