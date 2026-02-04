export const GameConfig = {
  core: {
    deltaTimeCap: 0.1,
  },
  camera: {
    fov: 75,
    near: 0.05,
    far: 1000,
    position: { x: 0, y: 0, z: 0 },
    lookAt: { x: 0, y: 0, z: -1 },
    backgroundColor: 0x000000,
  },
  player: {
    forwardSpeed: 100,
    turnSpeedYaw: Math.PI / 1.5,
    turnSpeedPitch: Math.PI / 1.5,
    maxBank: Math.PI / 4,
    meshColor: 0x00ff00,
    meshSize: 1,
  },
  cockpit: {
    colors: {
      primary: 0xff0000,
      secondary: 0x0000ff,
    },
    nose: {
      widthBase: 0.5,
      widthTip: 0.2,
      length: 1.0,
      position: { x: 0, y: -0.3, z: -0.5 },
    },
    guns: {
      width: 0.05,
      height: 0.05,
      length: 0.8,
      offset: { x: 0.8, y: -0.4, z: -0.4 },
    },
  },
  starField: {
    numStars: 1500,
    fieldSize: 500,
    starColor: 0xffffff,
    starSize: 0.1,
  },
  input: {
    sensitivity: 5.0,
    touchRadius: 100,
  },
} as const;
