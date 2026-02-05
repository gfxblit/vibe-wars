export const GameConfig = {
  core: {
    deltaTimeCap: 0.1,
  },
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: { x: 0, y: 2, z: 10 },
    lookAt: { x: 0, y: 0, z: 0 },
    backgroundColor: 0x000000,
  },
  player: {
    forwardSpeed: 100,
    turnSpeedYaw: Math.PI / 1.5,
    turnSpeedPitch: Math.PI / 1.5,
    maxBank: Math.PI / 4,
    meshColor: 0x00ff00,
    meshSize: 1,
    maxShields: 6,
  },
  starField: {
    numStars: 1500,
    fieldSize: 500,
    starColor: 0xffffff,
    starSize: 0.5,
  },
  input: {
    sensitivity: 5.0,
    touchRadius: 100,
  },
  ui: {
    highScore: 10000,
  },
} as const;
