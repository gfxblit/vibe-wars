function deepFreeze<T extends object>(obj: T): T {
  Object.keys(obj).forEach((prop) => {
    // @ts-ignore
    const value = obj[prop];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}

export const GameConfig = deepFreeze({
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
    centeringSpeed: 2.0,
  },
  ui: {
    highScore: 10000,
  },
  tieFighter: {
    speed: 50,
    oscillationFrequency: 1.0,
    oscillationAmplitude: 15,
    distance: 60,
    meshColor: 0xff0000,
    meshSize: 1,
  },
  laser: {
    speed: 2000,
    cooldown: 0.15,
    targetDepth: 200,
    boltLength: 30,
    thickness: 10,
    color: 0x00ffff,
    alternateColor: 0x0000ff,
    offsets: [
      { x: -1.2, y: 0.8 },
      { x: 1.2, y: 0.8 },
      { x: -1.2, y: -0.8 },
      { x: 1.2, y: -0.8 },
    ],
  },
} as const);
