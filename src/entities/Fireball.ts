import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';
import { SparkleVisual } from './SparkleVisual';
import { state } from '../state';

export class Fireball extends Entity {
  mesh: THREE.Group;
  velocity: THREE.Vector3;
  previousPosition: THREE.Vector3;
  isExploded: boolean = false;
  explosionTimer: number = 0;
  private visual: SparkleVisual;
  private static sharedTexture: THREE.Texture | null = null;

  constructor(position: THREE.Vector3, velocity: THREE.Vector3, size: number = GameConfig.fireball.sparkleSize) {
    super();
    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);
    this.previousPosition = position.clone();
    this.velocity = velocity.clone();

    if (!Fireball.sharedTexture) {
      Fireball.sharedTexture = Fireball.createSparkleTexture();
    }

    this.visual = new SparkleVisual({
      count: GameConfig.fireball.sparkleCount,
      size: size,
      color: new THREE.Color(GameConfig.fireball.meshColor),
      explosionVelocity: GameConfig.fireball.explosionVelocity,
      texture: Fireball.sharedTexture
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
      ctx.lineWidth = 3;

      ctx.translate(32, 32);

      // Draw an 8-pointed vector star
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, -25);
        ctx.lineTo(0, 25);
        ctx.stroke();
        ctx.rotate(Math.PI / 4);
      }

      // Add a small center diamond/square for "density"
      ctx.strokeRect(-4, -4, 8, 8);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  explode(): void {
    if (this.isExploded) return;
    this.isExploded = true;
    state.audioManager?.playExplosion(this.position);
    this.visual.explode();
  }

  update(deltaTime: number): void {
    this.previousPosition.copy(this.mesh.position);
    this.mesh.position.addScaledVector(this.velocity, deltaTime);

    // Track explosion timer
    if (this.isExploded) {
      this.explosionTimer += deltaTime;
    }

    this.visual.update(deltaTime);
  }


  isExpired(): boolean {
    return this.isExploded && this.explosionTimer >= GameConfig.fireball.explosionDuration;
  }

  projectToNDC(camera: THREE.Camera, target: THREE.Vector3): void {
    target.copy(this.position).project(camera);
  }

  getNDCDelta(camera: THREE.Camera): THREE.Vector3 {
    const pos = this.position.clone();
    pos.project(camera);
    return pos;
  }

  dispose(): void {
    this.visual.dispose();
  }
}
