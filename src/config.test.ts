import { describe, it, expect } from 'vitest';
import { GameConfig } from './config';

describe('GameConfig', () => {
  it('should have core settings', () => {
    expect(GameConfig.core.deltaTimeCap).toBe(0.1);
  });

  it('should have camera settings', () => {
    expect(GameConfig.camera.fov).toBe(75);
    expect(GameConfig.camera.near).toBe(0.05);
    expect(GameConfig.camera.far).toBe(1000);
    expect(GameConfig.camera.position).toEqual({ x: 0, y: 0, z: 0 });
    expect(GameConfig.camera.lookAt).toEqual({ x: 0, y: 0, z: -1 });
    expect(GameConfig.camera.backgroundColor).toBe(0x000000);
  });

  it('should have cockpit settings', () => {
    expect(GameConfig.cockpit.colors).toEqual({ primary: 0xff0000, secondary: 0x0000ff });
    expect(GameConfig.cockpit.nose).toBeDefined();
    expect(GameConfig.cockpit.guns).toBeDefined();
  });

  it('should have player settings', () => {
    expect(GameConfig.player.forwardSpeed).toBe(100);
    expect(GameConfig.player.turnSpeedYaw).toBeCloseTo(Math.PI / 1.5);
    expect(GameConfig.player.turnSpeedPitch).toBeCloseTo(Math.PI / 1.5);
    expect(GameConfig.player.maxBank).toBeCloseTo(Math.PI / 4);
    expect(GameConfig.player.meshColor).toBe(0x00ff00);
    expect(GameConfig.player.meshSize).toBe(1);
  });

  it('should have starfield settings', () => {
    expect(GameConfig.starField.numStars).toBe(1500);
    expect(GameConfig.starField.fieldSize).toBe(500);
    expect(GameConfig.starField.starColor).toBe(0xffffff);
    expect(GameConfig.starField.starSize).toBe(0.1);
  });

  it('should have input settings', () => {
    expect(GameConfig.input.sensitivity).toBe(5.0);
  });

  it('should be immutable (type-level check)', () => {
    if (false as boolean) {
      // @ts-expect-error - GameConfig should be immutable
      GameConfig.core.deltaTimeCap = 0.2;
    }
    expect(GameConfig.core.deltaTimeCap).toBe(0.1);
  });
});
