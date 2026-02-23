import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';
import { SparkleVisual } from './SparkleVisual';

export class Torpedo extends Entity {
  mesh: THREE.Group;
  velocity: THREE.Vector3;
  previousPosition: THREE.Vector3;
  isExploded: boolean = false;
  explosionTimer: number = 0;
  private visual: SparkleVisual;
  private static sparkleTexture: THREE.Texture | null = null;

  constructor(position: THREE.Vector3, velocity: THREE.Vector3) {
    super();
    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);
    this.previousPosition = position.clone();
    this.velocity = velocity.clone();

    // Use cyan/blue for proton torpedoes
    const color = new THREE.Color(0x00ffff);
    const size = GameConfig.torpedo.sparkleSize * 1.5;

    if (!Torpedo.sparkleTexture) {
      Torpedo.sparkleTexture = Torpedo.createSparkleTexture();
    }

    this.visual = new SparkleVisual({
      count: GameConfig.torpedo.sparkleCount,
      size: size,
      color: color,
      explosionVelocity: GameConfig.torpedo.explosionVelocity * 1.5,
      texture: Torpedo.sparkleTexture
    });

    this.mesh.add(this.visual.group);
  }

  private static createSparkleTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.translate(32, 32);

      // Proton torpedoes are "balls of energy", so let's give them a cross-like star
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.moveTo(0, -30);
        ctx.lineTo(0, 30);
        ctx.stroke();
        ctx.rotate(Math.PI / 2);
      }
      
      // Add a circular glow
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.stroke();
    }

    return new THREE.CanvasTexture(canvas);
  }

  get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  explode(): void {
    if (this.isExploded) return;
    this.isExploded = true;
    this.visual.explode();
  }

  update(deltaTime: number): void {
    this.previousPosition.copy(this.mesh.position);
    this.mesh.position.addScaledVector(this.velocity, deltaTime);

    if (this.isExploded) {
      this.explosionTimer += deltaTime;
    }

    this.visual.update(deltaTime);
  }

  isExpired(): boolean {
    return this.isExploded && this.explosionTimer >= GameConfig.torpedo.explosionDuration;
  }

  dispose(): void {
    this.visual.dispose();
  }
}
