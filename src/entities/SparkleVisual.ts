import * as THREE from 'three';

export interface SparkleConfig {
  count: number;
  size: number;
  color: THREE.Color;
  explosionVelocity: number;
  texture: THREE.Texture;
}

export class SparkleVisual {
  group: THREE.Group;
  private sparkleVelocities: THREE.Vector3[] = [];
  private sparkleRotationSpeeds: number[] = [];
  private isExploded: boolean = false;
  private explosionVelocity: number;

  constructor(config: SparkleConfig) {
    this.group = new THREE.Group();
    this.explosionVelocity = config.explosionVelocity;

    for (let i = 0; i < config.count; i++) {
      const color = config.color.clone();
      // Add slight variation to color to match existing behavior
      color.offsetHSL((Math.random() - 0.5) * 0.1, 0, (Math.random() - 0.5) * 0.2);

      const material = new THREE.SpriteMaterial({
        map: config.texture,
        color: color,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false, // Fix for black background artifacts
        rotation: Math.random() * Math.PI * 2,
      });

      const sparkle = new THREE.Sprite(material);
      sparkle.scale.set(config.size, config.size, 1);

      // Initial small random offset in 3D space
      sparkle.position.set(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      );

      this.group.add(sparkle);
      this.sparkleVelocities.push(new THREE.Vector3());
      // Random rotation speed: -4 to 4 radians per second
      this.sparkleRotationSpeeds.push((Math.random() - 0.5) * 8.0);
    }
  }

  explode(): void {
    if (this.isExploded) return;
    this.isExploded = true;

    this.group.children.forEach((child, i) => {
      if (child instanceof THREE.Sprite) {
        const direction = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize();
        this.sparkleVelocities[i].copy(direction).multiplyScalar(this.explosionVelocity);

        // Speed up rotation on explosion for extra "energy"
        this.sparkleRotationSpeeds[i] *= 2.5;
      }
    });
  }

  update(deltaTime: number, intensity: number = 1.0): void {
    this.group.children.forEach((child, i) => {
      if (child instanceof THREE.Sprite) {
        // Apply individual rotation
        child.material.rotation += this.sparkleRotationSpeeds[i] * deltaTime;

        // Apply bloom intensity (we use a hacky way to store base color in userData or just trust it's 0-1)
        // Actually, we can just use the current color and ensure we don't multiply it every frame without resetting.
        // But SpriteMaterial.color is persistent.
        // Let's store the base color once.
        if (!(child as any).baseColor) {
           (child as any).baseColor = child.material.color.clone();
        }
        child.material.color.copy((child as any).baseColor).multiplyScalar(intensity);

        // Apply outward movement if exploded
        if (this.isExploded) {
          child.position.addScaledVector(this.sparkleVelocities[i], deltaTime);
        }
      }
    });
  }

  dispose(): void {
    this.group.children.forEach(child => {
      if (child instanceof THREE.Sprite) {
        child.material.dispose();
      }
    });
  }
}
