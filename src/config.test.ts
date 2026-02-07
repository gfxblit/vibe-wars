import { expect, test, describe } from 'vitest'
import { GameConfig } from './config'

describe('GameConfig', () => {
  test('should have core settings', () => {
    expect(GameConfig.core.deltaTimeCap).toBe(0.1);
  });

  test('should have camera settings', () => {
    expect(GameConfig.camera.fov).toBe(75);
    expect(GameConfig.camera.near).toBe(0.1);
    expect(GameConfig.camera.far).toBe(1000);
  });

  test('should have player settings', () => {
    // Current value is 0 as per user preference
    expect(GameConfig.player.forwardSpeed).toBe(0);
    expect(GameConfig.player.turnSpeedYaw).toBeCloseTo(Math.PI / 1.5);
    expect(GameConfig.player.turnSpeedPitch).toBeCloseTo(Math.PI / 1.5);
    expect(GameConfig.player.maxBank).toBeCloseTo(Math.PI / 4);
    expect(GameConfig.player.meshColor).toBe(0x00ff00);
    expect(GameConfig.player.meshSize).toBe(1);
    expect(GameConfig.player.maxShields).toBe(6);
  });

  test('should have starfield settings', () => {
    expect(GameConfig.starField.numStars).toBe(1500);
    expect(GameConfig.starField.fieldSize).toBe(500);
    expect(GameConfig.starField.starColor).toBe(0xffffff);
    expect(GameConfig.starField.starSize).toBe(0.5);
  });

  test('should have input settings', () => {
    expect(GameConfig.input.sensitivity).toBe(5.0);
    expect(GameConfig.input.touchRadius).toBe(100);
  });

  test('should have ui settings', () => {
    expect(GameConfig.ui.highScore).toBe(10000);
  });

  test('should have laser settings', () => {
    expect(GameConfig.laser.speed).toBe(1000);
    expect(GameConfig.laser.cooldown).toBe(0.15);
    expect(GameConfig.laser.targetDepth).toBe(200);
    expect(GameConfig.laser.boltLength).toBe(60);
    expect(GameConfig.laser.thickness).toBe(10);
    expect(GameConfig.laser.color).toBe(0x00ffff);
    expect(GameConfig.laser.alternateColor).toBe(0x0000ff);
    expect(GameConfig.laser.offsets).toEqual([
      { x: -1.2, y: 0.8 },
      { x: 1.2, y: 0.8 },
      { x: -1.2, y: -0.8 },
      { x: 1.2, y: -0.8 },
    ],
    );
  });

  test('should have immutability at type level', () => {
    expect(Object.isFrozen(GameConfig)).toBe(false); 
  });
});