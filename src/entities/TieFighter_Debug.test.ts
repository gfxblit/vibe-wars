import { describe, it, expect, beforeEach, vi } from 'vitest';
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
    expect(tf.mesh.scale.x).toBe(GameConfig.tieFighter.meshSize);
  });

  it('should accept an initial size in constructor', () => {
    const initialSize = 2.5;
    const tf = new TieFighter(strategy, initialSize);
    expect(tf.mesh.scale.x).toBe(initialSize);
  });

  it('should update scale when overrideSize is provided to update()', () => {
    const tf = new TieFighter(strategy);
    const overrideSize = 3.0;
    
    // Mock update arguments
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    
    tf.update(0.1, pos, quat, 100, false, overrideSize);
    
    expect(tf.mesh.scale.x).toBe(overrideSize);
  });

  it('should revert to base size when overrideSize is undefined', () => {
    const baseSize = 1.5;
    const tf = new TieFighter(strategy, baseSize);
    
    // First update with override
    tf.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), 100, false, 5.0);
    expect(tf.mesh.scale.x).toBe(5.0);
    
    // Second update without override
    tf.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), 100, false);
    expect(tf.mesh.scale.x).toBe(baseSize);
  });

  it('should update material color when overrideColor is provided', () => {
    const tf = new TieFighter(strategy);
    const overrideColor = 0x00FF00; // Green
    
    tf.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), 100, false, undefined, overrideColor);
    
    // Check if children have the color
    tf.mesh.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
         expect((child.material as THREE.MeshBasicMaterial).color.getHex()).toBe(overrideColor);
      }
    });
  });

  it('should revert to default color when overrideColor is undefined', () => {
    const tf = new TieFighter(strategy);
    const overrideColor = 0x00FF00; // Green
    const defaultColor = GameConfig.tieFighter.meshColor;

    // Apply override
    tf.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), 100, false, undefined, overrideColor);
    
    // Verify override applied
    tf.mesh.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
         expect((child.material as THREE.MeshBasicMaterial).color.getHex()).toBe(overrideColor);
      }
    });

    // Remove override
    tf.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), 100, false, undefined, undefined);

    // Verify reverted to default
    tf.mesh.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
         expect((child.material as THREE.MeshBasicMaterial).color.getHex()).toBe(defaultColor);
      }
    });
  });

  it('should pass isModeColoring to strategy.getColor', () => {
    const mockStrategy = {
      update: vi.fn(),
      getColor: vi.fn().mockReturnValue(0xFF0000)
    };
    const tf = new TieFighter(mockStrategy as any);
    const isModeColoring = true;
    
    // In strict TDD, this call will fail compilation first because the signature is not updated yet.
    // But we are verifying logic.
    tf.update(0.1, new THREE.Vector3(), new THREE.Quaternion(), 100, isModeColoring);
    
    expect(mockStrategy.getColor).toHaveBeenCalledWith(isModeColoring);
  });
});
