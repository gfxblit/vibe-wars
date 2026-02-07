import * as THREE from 'three';
import { AIStrategy, RandomGenerator } from './AIStrategy';
import { GameConfig } from '../config';

export class SmartAIStrategy implements AIStrategy {
  private elapsedTime: number = 0;
  private shadowTimer: number = 0;
  private escapeTimer: number = 0;
  private extraIntensity: number = 0;
  private isInitialized: boolean = false;
  private phase: 'APPROACH' | 'SHADOW' | 'ESCAPE' = 'APPROACH';
  private readonly offset = new THREE.Vector3();
  private readonly escapeDirection = new THREE.Vector3(0, 0, -1);
  private readonly arcDirection = new THREE.Vector2();
  private readonly phaseOffsets = { x: 0, y: 0 };

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
    this.phaseOffsets.x = this.rng.random() * Math.PI * 2;
    this.phaseOffsets.y = this.rng.random() * Math.PI * 2;
  }

  public getColor(debug: boolean = false): number {
    if (!debug) return GameConfig.tieFighter.meshColor;
    if (this.phase === 'ESCAPE') return 0xffff00; // Yellow for Escape
    if (this.phase === 'SHADOW') return 0x00ffff; // Cyan for Shadow
    return GameConfig.tieFighter.meshColor; // Red for Approach
  }

  update(
    deltaTime: number,
    entityPosition: THREE.Vector3,
    entityQuaternion: THREE.Quaternion,
    playerPosition: THREE.Vector3,
    playerQuaternion: THREE.Quaternion
  ): void {
    this.elapsedTime += deltaTime;

    if (!this.isInitialized) {
      const initialZOffset = GameConfig.tieFighter.spawnDistanceBehind + this.rng.random() * GameConfig.tieFighter.smartSpawnRandomZ;
      this.offset.set(
        (this.rng.random() - 0.5) * GameConfig.tieFighter.smartSpawnRandomX,
        (this.rng.random() - 0.5) * GameConfig.tieFighter.smartSpawnRandomY,
        initialZOffset
      );
      this.isInitialized = true;
    }

    this.prevWorldPos.copy(entityPosition);
    const relativeSpeed = GameConfig.tieFighter.smartSpeed - GameConfig.player.forwardSpeed;

    // Phase transitions and Z-Movement logic
    let speedFactor = 1.0;
    if (this.phase === 'APPROACH') {
      const distToShadow = this.offset.z - GameConfig.tieFighter.smartShadowDistance;
      const brakingZone = GameConfig.tieFighter.smartBrakingZone;
      
      // Continuous deceleration to zero
      speedFactor = Math.max(0, Math.min(1.0, distToShadow / brakingZone));
      this.offset.z -= relativeSpeed * speedFactor * deltaTime;

      // Smoothly ramp up extra intensity as we approach
      this.extraIntensity = GameConfig.tieFighter.smartIntensityMax * (1.0 - speedFactor);

      if (distToShadow <= GameConfig.tieFighter.smartPhaseThreshold) {
        this.phase = 'SHADOW';
        this.shadowTimer = 0;
        this.offset.z = GameConfig.tieFighter.smartShadowDistance;
        this.extraIntensity = GameConfig.tieFighter.smartIntensityMax;
      }
    } else if (this.phase === 'SHADOW') {
      this.shadowTimer += deltaTime;
      this.offset.z = GameConfig.tieFighter.smartShadowDistance;
      this.extraIntensity = GameConfig.tieFighter.smartIntensityMax;
      if (this.shadowTimer >= GameConfig.tieFighter.smartShadowDuration) {
        this.phase = 'ESCAPE';
        this.escapeTimer = 0;
        
        // Randomize escape trajectory
        const isFarAway = this.rng.random() > 0.5;
        if (isFarAway) {
          // Fly deep into the distance (-Z dominant)
          this.escapeDirection.set(
            (this.rng.random() - 0.5) * GameConfig.tieFighter.smartEscapeFarRandomX,
            (this.rng.random() - 0.5) * GameConfig.tieFighter.smartEscapeFarRandomY,
            GameConfig.tieFighter.smartEscapeFarZ
          ).normalize();
        } else {
          // Exit screen quickly (High X/Y components)
          this.escapeDirection.set(
            (this.rng.random() - 0.5) * GameConfig.tieFighter.smartEscapeQuickRandomX,
            (this.rng.random() - 0.5) * GameConfig.tieFighter.smartEscapeQuickRandomY,
            GameConfig.tieFighter.smartEscapeQuickZ
          ).normalize();
        }
      }
    } else if (this.phase === 'ESCAPE') {
      this.escapeTimer += deltaTime;
      const accelerationDuration = GameConfig.tieFighter.smartEscapeAccelerationDuration;
      const t = Math.min(1.0, this.escapeTimer / accelerationDuration);
      speedFactor = t * t; 
      
      // Move along the randomized escape vector
      const moveAmount = relativeSpeed * speedFactor * deltaTime;
      this.offset.x += this.escapeDirection.x * moveAmount;
      this.offset.y += this.escapeDirection.y * moveAmount;
      this.offset.z += this.escapeDirection.z * moveAmount;

      // Fade out
      this.extraIntensity = Math.max(0, GameConfig.tieFighter.smartIntensityMax * (1.0 - this.escapeTimer / GameConfig.tieFighter.smartEscapeFadeDuration));
    }

    // Cinematic Arc: Intensity is high near the player and during shadowing
    const arcIntensity = Math.exp(-Math.pow(this.offset.z / GameConfig.tieFighter.smartArcFalloff, 2)) + this.extraIntensity;
    const xArc = Math.sin(this.elapsedTime * GameConfig.tieFighter.smartArcFrequency + this.phaseOffsets.x) * 
                 GameConfig.tieFighter.smartArcAmplitude * arcIntensity * this.arcDirection.x;
    const yArc = Math.cos(this.elapsedTime * GameConfig.tieFighter.smartArcFrequency * GameConfig.tieFighter.smartArcFrequencyMult + this.phaseOffsets.y) * 
                 GameConfig.tieFighter.smartArcAmplitude * GameConfig.tieFighter.smartArcAmplitudeMult * arcIntensity * this.arcDirection.y;

    // Small persistent oscillation
    const xOsc = Math.sin(this.elapsedTime * GameConfig.tieFighter.smartOscillationFreq) * GameConfig.tieFighter.smartOscillationAmp;
    
    this.currentRelativePos.copy(this.offset);
    this.currentRelativePos.x += xArc + xOsc;
    this.currentRelativePos.y += yArc;

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
    entityQuaternion.slerp(this.targetQuat, Math.min(1.0, deltaTime * GameConfig.tieFighter.smartRotationSpeed));
  }
}