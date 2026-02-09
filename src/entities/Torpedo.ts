import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Torpedo extends Entity {
  mesh: THREE.Group;
  velocity: THREE.Vector3;
  previousPosition: THREE.Vector3;
  isExploded: boolean = false;
  explosionTimer: number = 0;
  private sparkleVelocities: THREE.Vector3[] = [];
  private sparkleRotationSpeeds: number[] = [];

  constructor(position: THREE.Vector3, velocity: THREE.Vector3) {
    super();
    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);
    this.previousPosition = position.clone();
    this.velocity = velocity.clone();

    // Use cyan/blue for proton torpedoes
    const color = new THREE.Color(0x00ffff);
    const size = GameConfig.torpedo.sparkleSize * 1.5;

    for (let i = 0; i < GameConfig.torpedo.sparkleCount; i++) {
      const material = new THREE.SpriteMaterial({
        map: this.createSparkleTexture(),
        color: color,
        transparent: true,
        blending: THREE.AdditiveBlending,
        rotation: Math.random() * Math.PI * 2,
      });

      const sparkle = new THREE.Sprite(material);
      sparkle.scale.set(size, size, 1);
      
      // Random offset
      sparkle.position.set(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      );

      this.mesh.add(sparkle);
      this.sparkleVelocities.push(new THREE.Vector3());
      this.sparkleRotationSpeeds.push((Math.random() - 0.5) * 10.0);
    }
  }

  private createSparkleTexture(): THREE.Texture {
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

    this.mesh.children.forEach((_, i) => {
      const direction = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      this.sparkleVelocities[i].copy(direction).multiplyScalar(GameConfig.torpedo.explosionVelocity * 1.5);
      this.sparkleRotationSpeeds[i] *= 3;
    });
  }

  update(deltaTime: number): void {
    this.previousPosition.copy(this.mesh.position);
    this.mesh.position.addScaledVector(this.velocity, deltaTime);

    if (this.isExploded) {
      this.explosionTimer += deltaTime;
    }

    this.mesh.children.forEach((child, i) => {
      if (child instanceof THREE.Sprite) {
        child.material.rotation += this.sparkleRotationSpeeds[i] * deltaTime;
        if (this.isExploded) {
          child.position.addScaledVector(this.sparkleVelocities[i], deltaTime);
        }
      }
    });
  }

  isExpired(): boolean {
    return this.isExploded && this.explosionTimer >= GameConfig.torpedo.explosionDuration;
  }

  dispose(): void {
    this.mesh.children.forEach(child => {
      if (child instanceof THREE.Sprite) {
        child.material.map?.dispose();
        child.material.dispose();
      }
    });
  }
}
