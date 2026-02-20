import { describe, it, expect, beforeEach } from 'vitest';
import { TieFighter } from './TieFighter';
import { DumbAIStrategy } from './DumbAIStrategy';
import { GameConfig } from '../config';
import * as THREE from 'three';

describe('TieFighter Refactor Verification', () => {
  let strategy: DumbAIStrategy;

  beforeEach(() => {
    strategy = new DumbAIStrategy();
  });

  it('should initialize with config size by default', () => {
    const tf = new TieFighter(strategy);
    // After refactor, geometry is 1.0, scale is size based.
    // Initially (before refactor), scale is 1.0. If config size is 1.0, this passes trivially.
    // But if we change config size, it might fail.
    // However, the purpose is to verify the refactor logic.
    // Let's assume we want to verify that scale IS set to the config size.
    // In current code, scale is 1.0 always.
    // In new code, scale should be GameConfig.tieFighter.meshSize.
    expect(tf.mesh.scale.x).toBe(GameConfig.tieFighter.meshSize);
  });

  it('should accept an initial size in constructor', () => {
    const initialSize = 2.5;
    // @ts-ignore: Testing new signature before implementation
    const tf = new TieFighter(strategy, initialSize);
    expect(tf.mesh.scale.x).toBe(initialSize);
  });

  it('should update scale when overrideSize is provided to update()', () => {
    const tf = new TieFighter(strategy);
    const overrideSize = 3.0;
    
    // Mock update arguments
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    
    // @ts-ignore: Testing new signature
    tf.update(0.1, pos, quat, 100, overrideSize);
    
    expect(tf.mesh.scale.x).toBe(overrideSize);
  });

  it('should revert to base size when overrideSize is undefined', () => {
    const baseSize = 1.5;
    // @ts-ignore: Testing new signature
    const tf = new TieFighter(strategy, baseSize);
    
    // First update with override
    // @ts-ignore: Testing new signature
    tf.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), 100, 5.0);
    expect(tf.mesh.scale.x).toBe(5.0);
    
    // Second update without override
    // @ts-ignore: Testing new signature
    tf.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), 100);
    expect(tf.mesh.scale.x).toBe(baseSize);
  });

  it('should update material color when overrideColor is provided', () => {
    const tf = new TieFighter(strategy);
    const overrideColor = 0x00FF00; // Green
    
    // @ts-ignore: Testing new signature
    tf.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), 100, undefined, overrideColor);
    
    // Check if children have the color
    tf.mesh.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
         expect((child.material as THREE.MeshBasicMaterial).color.getHex()).toBe(overrideColor);
      }
    });
  });
});
