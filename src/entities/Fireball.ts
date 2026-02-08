import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Fireball extends Entity {
  mesh: THREE.Group;
  velocity: THREE.Vector3;
  isExploded: boolean = false;
  explosionTimer: number = 0;
  private sparkleVelocities: THREE.Vector3[] = [];
  private sparkleRotationSpeeds: number[] = [];

  constructor(position: THREE.Vector3, velocity: THREE.Vector3) {
    super();
    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);
    this.velocity = velocity.clone();

    const size = GameConfig.fireball.sparkleSize;
    const baseColor = new THREE.Color(GameConfig.fireball.meshColor);

    for (let i = 0; i < GameConfig.fireball.sparkleCount; i++) {
      // Create a unique material for each sparkle to allow random rotation and color variations
      const color = baseColor.clone();
      // Add slight variation to color
      color.offsetHSL((Math.random() - 0.5) * 0.1, 0, (Math.random() - 0.5) * 0.2);

      const material = new THREE.SpriteMaterial({
        map: this.createSparkleTexture(),
        color: color,
        transparent: true,
        blending: THREE.AdditiveBlending,
        rotation: Math.random() * Math.PI * 2, // Random initial 2D orientation
      });

      const sparkle = new THREE.Sprite(material);
      sparkle.scale.set(size, size, 1);

      // Initial small random offset in 3D space
      sparkle.position.set(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      );

      this.mesh.add(sparkle);
      this.sparkleVelocities.push(new THREE.Vector3());
      // Random rotation speed: -4 to 4 radians per second
      this.sparkleRotationSpeeds.push((Math.random() - 0.5) * 8.0);
    }
  }

  private createSparkleTexture(): THREE.Texture {
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

    this.mesh.children.forEach((_, i) => {
      // Shards burst outward from the center
      const direction = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      this.sparkleVelocities[i].copy(direction).multiplyScalar(GameConfig.fireball.explosionVelocity);

      // Speed up rotation on explosion for extra "energy"
      this.sparkleRotationSpeeds[i] *= 2.5;
    });
  }

  update(deltaTime: number, targetPosition?: THREE.Vector3): void {
    if (targetPosition && !this.isExploded) {
      const speed = this.velocity.length();
      const currentDir = this.velocity.clone().normalize();
      const targetDir = targetPosition.clone().sub(this.position).normalize();
      
      // Pseudo-tracking: rotate velocity towards target
      const angle = currentDir.angleTo(targetDir);
      
      if (angle > 0.0001) {
        const maxRotation = GameConfig.fireball.trackingStrength * deltaTime;
        const actualRotation = Math.min(angle, maxRotation);
        
        const axis = new THREE.Vector3().crossVectors(currentDir, targetDir).normalize();
        if (axis.lengthSq() > 0.0001) {
          currentDir.applyAxisAngle(axis, actualRotation);
          this.velocity.copy(currentDir).multiplyScalar(speed);
        }
      }
    }

    this.mesh.position.addScaledVector(this.velocity, deltaTime);

    // Track explosion timer
    if (this.isExploded) {
      this.explosionTimer += deltaTime;
    }

    this.mesh.children.forEach((child, i) => {
      if (child instanceof THREE.Sprite) {
        // Apply individual rotation
        child.material.rotation += this.sparkleRotationSpeeds[i] * deltaTime;

        // Apply outward movement if exploded
        if (this.isExploded) {
          child.position.addScaledVector(this.sparkleVelocities[i], deltaTime);
        }
      }
    });
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
    this.mesh.children.forEach(child => {
      if (child instanceof THREE.Sprite) {
        child.material.map?.dispose();
        child.material.dispose();
      }
    });
  }
}