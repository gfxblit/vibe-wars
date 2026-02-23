import { describe, it, expect, beforeEach } from 'vitest';
import { Tower } from './Tower';
import { FireballDebugContext } from './Entity';
import { GameConfig } from '../config';
import * as THREE from 'three';

describe('Tower Debug Context', () => {
  let tower: Tower;

  beforeEach(() => {
    // Reset configuration (though it's frozen, we can't mutate it)
    tower = new Tower(new THREE.Vector3(0, 0, 0));
  });

  it('should use default fireball size when no context is provided', () => {
    const size = tower.getFireballSize();
    expect(size).toBe(GameConfig.stages.surface.fireballSize ?? GameConfig.fireball.sparkleSize);
  });

  it('should use default fireball speed when no context is provided', () => {
    const speed = tower.getFireballSpeed();
    expect(speed).toBe(GameConfig.stages.surface.fireballSpeed ?? GameConfig.fireball.relativeSpeed);
  });

  it('should use default fireball size when context has no override', () => {
    const context: FireballDebugContext = {};
    const size = tower.getFireballSize(context);
    expect(size).toBe(GameConfig.stages.surface.fireballSize ?? GameConfig.fireball.sparkleSize);
  });

  it('should use override fireball size from context', () => {
    const context: FireballDebugContext = { surfaceFireballSize: 999 };
    const size = tower.getFireballSize(context);
    expect(size).toBe(999);
  });

  it('should use override fireball speed from context', () => {
    const context: FireballDebugContext = { surfaceFireballSpeed: 888 };
    const speed = tower.getFireballSpeed(context);
    expect(speed).toBe(888);
  });

  it('should ignore other properties in context', () => {
    // In TS we can cast to bypass type checking for extra props if we want to be sure runtime behavior is safe
    const context: any = { otherProp: 123, surfaceFireballSize: 50 };
    const size = tower.getFireballSize(context);
    expect(size).toBe(50);
  });
});
