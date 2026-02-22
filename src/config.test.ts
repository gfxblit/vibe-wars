import { expect, test, describe } from 'vitest'
import { GameConfig } from './config'

describe('GameConfig', () => {
  test('should have core settings', () => {
    expect(GameConfig.core.deltaTimeCap).toBe(0.1);
    expect(GameConfig.core.stages).toEqual(['DOGFIGHT', 'SURFACE', 'TRENCH', 'EXPLOSION']);
  });

  test('should have camera settings', () => {
    expect(GameConfig.camera.fov).toBe(75);
    expect(GameConfig.camera.near).toBe(0.1);
    expect(GameConfig.camera.far).toBe(5000);
  });

  test('should have player settings', () => {
    expect(GameConfig.player.baseForwardSpeed).toBe(100);
    expect(GameConfig.player.forwardSpeeds.DOGFIGHT).toBe(100);
    expect(GameConfig.player.forwardSpeeds.SURFACE).toBe(200);
    expect(GameConfig.player.forwardSpeeds.TRENCH).toBe(500);
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
    expect(GameConfig.fireball.expirationDistance).toBe(2000);
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
    
    const smart = GameConfig.tieFighter.smartAI;
    expect(smart.speed).toBe(180);
    expect(smart.spawnRandomZ).toBe(50);
    expect(smart.spawnRandomX).toBe(40);
    expect(smart.spawnRandomY).toBe(30);
    expect(smart.brakingZone).toBe(60);
    expect(smart.arcIntensity).toBe(0.8);
    expect(smart.stageThreshold).toBe(0.1);
    expect(smart.escapeAccelerationDuration).toBe(6.0);
    expect(smart.escapeFadeDuration).toBe(3.0);
    expect(smart.arcFalloff).toBe(60);
    expect(smart.rotationSpeed).toBe(10.0);
    expect(smart.escapeFarRandomX).toBe(0.4);
    expect(smart.escapeFarRandomY).toBe(0.4);
    expect(smart.escapeFarZ).toBe(-1.0);
    expect(smart.escapeQuickRandomX).toBe(2.5);
    expect(smart.escapeQuickRandomY).toBe(2.0);
    expect(smart.escapeQuickZ).toBe(-0.5);
  });

  test('should have stage settings', () => {
    expect(GameConfig.stages.deathStar.size).toBe(100);
    expect(GameConfig.stages.deathStar.dishSize).toBe(20);
    expect(GameConfig.stages.deathStar.trenchWidth).toBe(4);
    expect(GameConfig.stages.deathStar.color).toBe(0x00ff00);
    expect(GameConfig.stages.deathStar.dishColor).toBe(0xccffcc);
    expect(GameConfig.stages.deathStar.distance).toBe(1000);
    expect(GameConfig.stages.trench.width).toBe(100);
    expect(GameConfig.stages.trench.catwalkColor).toBe(0xaaaaaa);
    expect(GameConfig.stages.trench.wallColor).toBe(0x00ff00);
    expect(GameConfig.stages.trench.verticalDetailSpacing).toBe(200);
    expect(GameConfig.stages.trench.horizontalDetailSpacing).toBe(50);
    expect(GameConfig.stages.trench.exhaustPortColor).toBe(0xffff00);
    expect(GameConfig.stages.trench.transitionDistance).toBe(100);
    expect(GameConfig.stages.surface.floorBounce).toBe(2);
    expect(GameConfig.stages.surface.towerPoints).toBe(200);
    expect(GameConfig.stages.deathStar.spawnAngle).toBeCloseTo(Math.PI / 4);
  });

  test('should be immutable at the type level', () => {
    // This test passes if the TypeScript compiler shows an error on the line below.
    // It's a way to enforce readonly properties in the test suite.
    // @ts-expect-error - GameConfig should be immutable
    expect(() => { GameConfig.core.deltaTimeCap = 0.2; }).toThrow();
  });
});
