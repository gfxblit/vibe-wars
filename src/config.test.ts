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
    expect(GameConfig.player.forwardSpeed).toBe(100);
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
    expect(GameConfig.laser.speed).toBe(2000);
    expect(GameConfig.laser.cooldown).toBe(0.15);
    expect(GameConfig.laser.targetDepth).toBe(200);
    expect(GameConfig.laser.boltLength).toBe(30);
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

  test('should have fireball settings', () => {
    expect(GameConfig.fireball.meshSize).toBe(1.5);
    expect(GameConfig.fireball.meshColor).toBe(0xff4500);
    expect(GameConfig.fireball.relativeSpeed).toBe(40);
    expect(GameConfig.fireball.fireRate).toBe(2.0);
    expect(GameConfig.fireball.damage).toBe(1);
    expect(GameConfig.fireball.expirationDistance).toBe(10);
  });

  test('should be immutable at the type level', () => {
    // This test passes if the TypeScript compiler shows an error on the line below.
    // It's a way to enforce readonly properties in the test suite.
    // @ts-expect-error - GameConfig should be immutable
    expect(() => { GameConfig.core.deltaTimeCap = 0.2; }).toThrow();
  });
});