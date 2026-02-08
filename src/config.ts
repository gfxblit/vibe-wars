function deepFreeze<T extends object>(obj: T): T {
  Object.keys(obj).forEach((prop) => {
    const value = (obj as any)[prop];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}

export const GameConfig = deepFreeze({
  core: {
    deltaTimeCap: 0.1,
    aimTolerance: 0.15,
  },
  camera: {
    fov: 75,
    near: 0.1,
    far: 5000,
    position: { x: 0, y: 0.5, z: 0 },
    lookAt: { x: 0, y: 0.5, z: -1 },
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
    damageFlashDuration: 150,
  },
  stage: {
    trenchKillsThreshold: 10,
    deathStarDistance: 1000,
    trenchTransitionDistance: 100,
    trenchWidth: 100,
    trenchHeight: 100,
    deathStarSize: 100,
    deathStarColor: 0x00ff00,
    steeringStrength: 0.5,
    trenchLength: 5000,
    catwalkStartZ: -500,
    catwalkEndZ: -4500,
    catwalkSpacing: 500,
    catwalkYOffset: 20,
    catwalkDepth: 20,
    catwalkCollisionThreshold: 15, // Tolerance for Z-axis hit detection
    catwalkHeightThreshold: 15,    // Tolerance for Y-axis hit detection
    exhaustPortZOffset: 400,
  },
  tieFighter: {
    speed: 50,
    oscillationFrequency: 1.0,
    oscillationAmplitude: 15,
    distance: 60,
    meshColor: 0xff0000,
    meshSize: 1,
    explosionVelocity: 50,
    spawnInterval: 3.0,
    cleanupDistance: 600,
    smartSpeed: 180,
    smartOscillationFreq: 2.0,
    smartOscillationAmp: 10,
    smartSwoopFreq: 0.5,
    smartSwoopAmp: 5,
    spawnDistanceBehind: 100,
    smartArcAmplitude: 40,
    smartArcFrequency: 0.5,
    smartArcFrequencyMult: 0.7,
    smartArcAmplitudeMult: 0.5,
    smartShadowDistance: -50,
    smartShadowDuration: 3.0,
    smartSpawnRandomZ: 50,
    smartSpawnRandomX: 40,
    smartSpawnRandomY: 30,
    smartBrakingZone: 60,
    smartIntensityMax: 0.8,
    smartPhaseThreshold: 0.1,
    smartEscapeAccelerationDuration: 6.0,
    smartEscapeFadeDuration: 3.0,
    smartArcFalloff: 60,
    smartRotationSpeed: 10.0,
    smartEscapeFarRandomX: 0.4,
    smartEscapeFarRandomY: 0.4,
    smartEscapeFarZ: -1.0,
    smartEscapeQuickRandomX: 2.5,
    smartEscapeQuickRandomY: 2.0,
    smartEscapeQuickZ: -0.5,
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
  fireball: {
    meshSize: 3.0,
    meshColor: 0xff4500, // Orange-red
    relativeSpeed: 40,
    fireRate: 2.0, // Seconds between shots
    collisionRadiusWorld: 2.0,
    collisionRadiusNDC: 0.05,
    points: 100,
    damage: 1,
    expirationDistance: 500,
    sparkleCount: 8,
    sparkleSize: 4.0,
    explosionVelocity: 30,
        explosionDuration: 0.5, // Seconds before removing exploded fireball
        hitZThreshold: -0.8,
        hitDistanceThreshold: 2.0,
        hitNDCThreshold: 1.2,
      },
    } as const);
    