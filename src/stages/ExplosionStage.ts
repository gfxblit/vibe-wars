import * as THREE from 'three';
import { Stage } from './Stage';
import { GameConfig } from '../config';
import { state, goToNextStage } from '../state';
import { Player } from '../entities/Player';
import { DeathStar } from '../entities/DeathStar';

export class ExplosionStage extends Stage {
  public override get speed() { return GameConfig.explosionStage.escapeSpeed; }
  public override get showStarField(): boolean { return true; }
  private deathStar: DeathStar;
  private elapsedTime: number = 0;
  private hasExploded: boolean = false;
  private camera: THREE.Camera | null = null;

  constructor(private scene: THREE.Scene) {
    super();
    if (state.entityManager) {
      state.entityManager.clear();
      state.entityManager.setSpawningEnabled(false);
    }

    // Spawn Death Star at origin
    this.deathStar = new DeathStar(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.deathStar.mesh);

    // Position Player close to Death Star, facing away (World +Z)
    const player = state.player!;
    // Death Star radius is 100.
    player.position.set(0, 0, 200);
    // Face +Z. Default is -Z. Rotate Y 180.
    player.mesh.quaternion.setFromEuler(new THREE.Euler(0, Math.PI, 0)); 
  }

  public update(deltaTime: number, _player: Player, camera: THREE.Camera): void {
    this.camera = camera;
    this.elapsedTime += deltaTime;

    // Override camera to look back at Death Star
    // Player is moving +Z.
    // We want to see the front of the ship (relative to camera) and the Death Star behind it.
    // So Camera should be at World Z > Player Z.
    // Player Local -Z is World +Z.
    // So Camera Local Position (0, 5, -20) -> World (0, 5, PlayerZ + 20).
    
    camera.position.set(0, 5, -50);
    camera.lookAt(this.deathStar.position); // Look at world 0,0,0

    // Explosion Logic
    if (!this.hasExploded && this.elapsedTime >= GameConfig.explosionStage.shatterDelay) {
      this.deathStar.explode();
      this.hasExploded = true;
      state.isDeathStarDestroyed = true;

      // Spawn particles (Fireballs)
      if (state.entityManager) {
        for (let i = 0; i < GameConfig.deathStarExplosion.particleCount; i++) {
          const pos = new THREE.Vector3(
            (Math.random() - 0.5) * GameConfig.stages.deathStar.size * 2,
            (Math.random() - 0.5) * GameConfig.stages.deathStar.size * 2,
            (Math.random() - 0.5) * GameConfig.stages.deathStar.size * 2
          );
          const vel = pos.clone().normalize().multiplyScalar(GameConfig.deathStarExplosion.fragmentVelocity * (0.5 + Math.random()));
          state.entityManager.spawnFireball(pos, vel);
        }
      }
    }
    
    this.deathStar.update(deltaTime);

    // End Logic
    if (this.elapsedTime >= GameConfig.explosionStage.duration) {
       goToNextStage();
    }
  }

  public cleanup(): void {
    // Reset Camera to default local position
    if (this.camera) {
        const { position } = GameConfig.camera;
        this.camera.position.set(position.x, position.y, position.z);
        this.camera.quaternion.set(0, 0, 0, 1);
    }

    this.scene.remove(this.deathStar.mesh);
    this.deathStar.dispose();
    state.isDeathStarDestroyed = false;
    
    // Reset Player for next stage
    if (state.player) {
        state.player.position.set(0, 0, 0);
        state.player.mesh.quaternion.set(0, 0, 0, 1);
    }
  }
}
