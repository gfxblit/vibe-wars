import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Tower } from './Tower';
import { GameConfig } from '../config';
import { state } from '../state';
import * as THREE from 'three';

describe('Tower Refactor', () => {
  let tower: Tower;

  beforeEach(() => {
    tower = new Tower(new THREE.Vector3(0, 0, 0));
  });

  afterEach(() => {
    tower.dispose();
    state.debugSurfaceFireballSize = undefined;
    state.debugSurfaceFireballSpeed = undefined;
  });

  it('should return configured fireball size and ignore global state', () => {
    // Arrange
    const configSize = GameConfig.stages.surface.fireballSize ?? GameConfig.fireball.sparkleSize;
    state.debugSurfaceFireballSize = 999;

    // Act
    const size = tower.getFireballSize();

    // Assert
    expect(size).toBe(configSize);
    expect(size).not.toBe(999);
  });

  it('should return configured fireball speed and ignore global state', () => {
    // Arrange
    const configSpeed = GameConfig.stages.surface.fireballSpeed ?? GameConfig.fireball.relativeSpeed;
    state.debugSurfaceFireballSpeed = 888;

    // Act
    const speed = tower.getFireballSpeed();

    // Assert
    expect(speed).toBe(configSpeed);
    expect(speed).not.toBe(888);
  });
});
