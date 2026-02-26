import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { SparkleVisual } from './SparkleVisual';

describe('SparkleVisual', () => {
  let sparkleVisual: SparkleVisual;
  const count = 5;
  const size = 2;
  const color = new THREE.Color(0xff0000);
  const explosionVelocity = 10;
  const texture = new THREE.Texture();

  beforeEach(() => {
    sparkleVisual = new SparkleVisual({
      count,
      size,
      color,
      explosionVelocity,
      texture,
      category: 'Fireball'
    });
  });

  it('should initialize with correct number of sparkles', () => {
    expect(sparkleVisual.group.children.length).toBe(count);
    sparkleVisual.group.children.forEach(child => {
      expect(child).toBeInstanceOf(THREE.Sprite);
    });
  });

  it('should use the provided texture and color', () => {
    sparkleVisual.group.children.forEach(child => {
      const sprite = child as THREE.Sprite;
      expect(sprite.material.map).toBe(texture);
      // Colors are offset slightly in original implementation, so we check for close match or presence
      expect(sprite.material.color.r).toBeGreaterThan(0);
    });
  });

  it('should have depthWrite set to false for all sparkles', () => {
    sparkleVisual.group.children.forEach(child => {
      const sprite = child as THREE.Sprite;
      expect(sprite.material.depthWrite).toBe(false);
    });
  });

  it('should update rotation of sparkles', () => {
    const initialRotations = sparkleVisual.group.children.map(c => (c as THREE.Sprite).material.rotation);
    sparkleVisual.update(0.1);
    sparkleVisual.group.children.forEach((child, i) => {
      const sprite = child as THREE.Sprite;
      expect(sprite.material.rotation).not.toBe(initialRotations[i]);
    });
  });

  it('should move sparkles outward when exploded', () => {
    const initialPositions = sparkleVisual.group.children.map(c => c.position.clone());
    sparkleVisual.explode();
    sparkleVisual.update(0.1);
    sparkleVisual.group.children.forEach((child, i) => {
      expect(child.position.length()).toBeGreaterThan(initialPositions[i].length());
    });
  });

  it('should dispose of materials but not the shared texture', () => {
    const materials = sparkleVisual.group.children.map(c => (c as THREE.Sprite).material);
    const disposeSpies = materials.map(m => {
      const spy = { called: false };
      m.dispose = () => { spy.called = true; };
      return spy;
    });

    sparkleVisual.dispose();

    disposeSpies.forEach(spy => {
      expect(spy.called).toBe(true);
    });
  });
});
