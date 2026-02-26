import * as THREE from 'three';
import { AIStrategy, RandomGenerator } from './AIStrategy';
import { GameConfig } from '../config';
import { state } from '../state';

export class SmartAIStrategy implements AIStrategy {
  private elapsedTime: number = 0;
  private shadowTimer: number = 0;
  private escapeTimer: number = 0;
  private extraIntensity: number = 0;
  private isInitialized: boolean = false;
  private stage: 'APPROACH' | 'SHADOW' | 'ESCAPE' = 'APPROACH';
  private readonly offset = new THREE.Vector3();
  private readonly escapeDirection = new THREE.Vector3(0, 0, -1);
  private readonly arcDirection = new THREE.Vector2();
  private readonly stageOffsets = { x: 0, y: 0 };

  // Reusable objects to avoid GC pressure
  private readonly prevWorldPos = new THREE.Vector3();
  private readonly currentRelativePos = new THREE.Vector3();
  private readonly velocity = new THREE.Vector3();
  private readonly lookTarget = new THREE.Vector3();
  private readonly targetQuat = new THREE.Quaternion();
  private readonly lookMat = new THREE.Matrix4();
  private readonly upVector = new THREE.Vector3(0, 1, 0);
  private readonly tempVector = new THREE.Vector3();

  constructor(private readonly rng: RandomGenerator = Math) {
    this.arcDirection.set(
      this.rng.random() > 0.5 ? 1 : -1,
      this.rng.random() > 0.5 ? 1 : -1
    );
    this.stageOffsets.x = this.rng.random() * Math.PI * 2;
    this.stageOffsets.y = this.rng.random() * Math.PI * 2;
  }

  public getColor(debug: boolean = false): number {
    if (!debug) return GameConfig.tieFighter.meshColor;
    if (this.stage === 'ESCAPE') return 0xffff00; // Yellow for Escape
    if (this.stage === 'SHADOW') return 0x00ffff; // Cyan for Shadow
    return GameConfig.tieFighter.meshColor; // Green for Approach
  }

  update(
    deltaTime: number,
    entityPosition: THREE.Vector3,
    entityQuaternion: THREE.Quaternion,
    playerPosition: THREE.Vector3,
    playerQuaternion: THREE.Quaternion,
    playerSpeed: number
  ): void {
    const cfg = GameConfig.tieFighter.smartAI;
    this.elapsedTime += deltaTime;

    if (!this.isInitialized) {
      const initialZOffset = cfg.spawnDistanceBehind + this.rng.random() * cfg.spawnRandomZ;
      this.offset.set(
        (this.rng.random() - 0.5) * cfg.spawnRandomX,
        (this.rng.random() - 0.5) * cfg.spawnRandomY,
        initialZOffset
      );
      this.isInitialized = true;
    }

    this.prevWorldPos.copy(entityPosition);
    const multiplier = GameConfig.getDifficultyMultiplier(state.wave);
    const scaledSpeed = GameConfig.getScaledSpeed(cfg.speed, multiplier);
    const relativeSpeed = scaledSpeed - playerSpeed;

    // Stage transitions and Z-Movement logic
    let speedFactor = 1.0;
    if (this.stage === 'APPROACH') {
      const distToShadow = this.offset.z - cfg.shadowDistance;
      speedFactor = THREE.MathUtils.clamp(distToShadow / cfg.brakingZone, 0, 1);
      this.offset.z -= relativeSpeed * speedFactor * deltaTime;

      // Smoothly ramp up extra intensity as we approach
      this.extraIntensity = cfg.arcIntensity * (1.0 - speedFactor);

      if (distToShadow <= cfg.stageThreshold) {
        this.stage = 'SHADOW';
        this.shadowTimer = 0;
        this.offset.z = cfg.shadowDistance;
        this.extraIntensity = cfg.arcIntensity;
      }
    } else if (this.stage === 'SHADOW') {
      this.shadowTimer += deltaTime;
      this.offset.z = cfg.shadowDistance;
      this.extraIntensity = cfg.arcIntensity;
      if (this.shadowTimer >= cfg.shadowDuration) {
        this.stage = 'ESCAPE';
        this.escapeTimer = 0;

        // Randomize escape trajectory
        const isFarAway = this.rng.random() > 0.5;
        if (isFarAway) {
          // Fly deep into the distance (-Z dominant)
          this.escapeDirection.set(
            (this.rng.random() - 0.5) * cfg.escapeFarRandomX,
            (this.rng.random() - 0.5) * cfg.escapeFarRandomY,
            cfg.escapeFarZ
          ).normalize();
        } else {
          // Exit screen quickly (High X/Y components)
          this.escapeDirection.set(
            (this.rng.random() - 0.5) * cfg.escapeQuickRandomX,
            (this.rng.random() - 0.5) * cfg.escapeQuickRandomY,
            cfg.escapeQuickZ
          ).normalize();
        }
      }
    } else if (this.stage === 'ESCAPE') {
      this.escapeTimer += deltaTime;
      const t = THREE.MathUtils.clamp(this.escapeTimer / cfg.escapeAccelerationDuration, 0, 1);
      speedFactor = t * t; // Smooth acceleration

      // Move along the randomized escape vector
      const moveAmount = relativeSpeed * speedFactor * deltaTime;
      this.offset.x += this.escapeDirection.x * moveAmount;
      this.offset.y += this.escapeDirection.y * moveAmount;
      this.offset.z += this.escapeDirection.z * moveAmount;

      // Fade out
      this.extraIntensity = Math.max(0, cfg.arcIntensity * (1.0 - this.escapeTimer / cfg.escapeFadeDuration));
    }

    // Cinematic Swerve: Unified oscillation and arc logic
    const dist = Math.abs(this.offset.z);
    const baseIntensity = 1.0 - Math.max(0, Math.min(1.0, dist / cfg.arcFalloff));
    const intensity = baseIntensity + this.extraIntensity;

    const phase = this.elapsedTime * cfg.arcFrequency;
    const swerveX = Math.sin(phase + this.stageOffsets.x) * cfg.arcAmplitude * intensity * this.arcDirection.x;
    const swerveY = Math.cos(phase + this.stageOffsets.y) * cfg.arcAmplitude * cfg.verticalSwayRatio * intensity * this.arcDirection.y;

    // Small persistent oscillation
    const oscX = Math.sin(this.elapsedTime * cfg.oscillationFreq) * cfg.oscillationAmp;

    this.currentRelativePos.copy(this.offset);
    this.currentRelativePos.x += swerveX + oscX;
    this.currentRelativePos.y += swerveY;

    // Transform relative position to world position
    entityPosition.copy(this.currentRelativePos).applyQuaternion(playerQuaternion).add(playerPosition);

    // Face the direction of motion with smooth interpolation
    this.velocity.copy(entityPosition).sub(this.prevWorldPos);

    if (this.velocity.lengthSq() > 0.0001) {
      this.lookTarget.copy(entityPosition).add(this.velocity);
      this.tempVector.copy(this.upVector).applyQuaternion(playerQuaternion);
      this.lookMat.lookAt(entityPosition, this.lookTarget, this.tempVector);
      this.targetQuat.setFromRotationMatrix(this.lookMat);
    } else {
      this.targetQuat.copy(playerQuaternion);
    }

    // Smoothly rotate towards the target orientation to eliminate snaps
    entityQuaternion.slerp(this.targetQuat, Math.min(1.0, deltaTime * cfg.rotationSpeed));
  }
}