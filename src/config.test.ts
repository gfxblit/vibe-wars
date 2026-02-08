import { expect, test, describe } from 'vitest'
import { GameConfig } from './config'

describe('GameConfig', () => {
  test('should have core settings', () => {
    expect(GameConfig.core.deltaTimeCap).toBe(0.1);
  });

  test('should have camera settings', () => {
    expect(GameConfig.camera.fov).toBe(75);
    expect(GameConfig.camera.near).toBe(0.1);
    expect(GameConfig.camera.far).toBe(5000);
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
    expect(GameConfig.fireball.meshSize).toBe(3.0);
    expect(GameConfig.fireball.meshColor).toBe(0xff4500);
    expect(GameConfig.fireball.relativeSpeed).toBe(40);
    expect(GameConfig.fireball.fireRate).toBe(2.0);
    expect(GameConfig.fireball.damage).toBe(1);
    expect(GameConfig.fireball.expirationDistance).toBe(500);
    expect(GameConfig.fireball.sparkleCount).toBe(8);
    expect(GameConfig.fireball.sparkleSize).toBe(4.0);
    expect(GameConfig.fireball.explosionVelocity).toBe(30);
    expect(GameConfig.fireball.explosionDuration).toBe(0.5);
    expect(GameConfig.fireball.explosionDuration).toBeGreaterThan(0);
    expect(GameConfig.fireball.hitZThreshold).toBe(-0.8);
  });

  test('should have tieFighter settings', () => {
    expect(GameConfig.tieFighter.speed).toBe(50);
    expect(GameConfig.tieFighter.oscillationFrequency).toBe(1.0);
    expect(GameConfig.tieFighter.oscillationAmplitude).toBe(15);
    expect(GameConfig.tieFighter.distance).toBe(60);
    expect(GameConfig.tieFighter.meshColor).toBe(0xff0000);
    expect(GameConfig.tieFighter.meshSize).toBe(1);
    expect(GameConfig.tieFighter.spawnInterval).toBe(3.0);
    expect(GameConfig.tieFighter.cleanupDistance).toBe(600);
    expect(GameConfig.tieFighter.smartSpeed).toBe(180);
    expect(GameConfig.tieFighter.smartSpawnRandomZ).toBe(50);
    expect(GameConfig.tieFighter.smartSpawnRandomX).toBe(40);
    expect(GameConfig.tieFighter.smartSpawnRandomY).toBe(30);
    expect(GameConfig.tieFighter.smartBrakingZone).toBe(60);
    expect(GameConfig.tieFighter.smartIntensityMax).toBe(0.8);
    expect(GameConfig.tieFighter.smartPhaseThreshold).toBe(0.1);
    expect(GameConfig.tieFighter.smartEscapeAccelerationDuration).toBe(6.0);
    expect(GameConfig.tieFighter.smartEscapeFadeDuration).toBe(3.0);
    expect(GameConfig.tieFighter.smartArcFalloff).toBe(60);
    expect(GameConfig.tieFighter.smartRotationSpeed).toBe(10.0);
    expect(GameConfig.tieFighter.smartEscapeFarRandomX).toBe(0.4);
    expect(GameConfig.tieFighter.smartEscapeFarRandomY).toBe(0.4);
    expect(GameConfig.tieFighter.smartEscapeFarZ).toBe(-1.0);
    expect(GameConfig.tieFighter.smartEscapeQuickRandomX).toBe(2.5);
    expect(GameConfig.tieFighter.smartEscapeQuickRandomY).toBe(2.0);
    expect(GameConfig.tieFighter.smartEscapeQuickZ).toBe(-0.5);
  });

  test('should be immutable at the type level', () => {
    // This test passes if the TypeScript compiler shows an error on the line below.
    // It's a way to enforce readonly properties in the test suite.
    // @ts-expect-error - GameConfig should be immutable
    expect(() => { GameConfig.core.deltaTimeCap = 0.2; }).toThrow();
  });
});
