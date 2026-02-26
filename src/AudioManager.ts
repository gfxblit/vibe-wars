import * as THREE from 'three';
import { GameConfig } from './config';

export interface PlayOptions {
  volume?: number;
  pitch?: number;
  pitchRange?: number;
}

export class AudioManager {
  private context: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private buffers: Map<string, AudioBuffer> = new Map();
  private initialized = false;

  constructor() {}

  private getContext(): AudioContext | null {
    if (this.context) return this.context;

    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('Web Audio API is not supported in this browser');
      return null;
    }

    try {
      this.context = new AudioContextClass();
      
      this.sfxGain = this.context!.createGain();
      this.sfxGain.gain.value = GameConfig.audio.sfxVolume;

      const masterGain = this.context!.createGain();
      masterGain.gain.value = GameConfig.audio.masterVolume;
      
      this.sfxGain.connect(masterGain);
      masterGain.connect(this.context!.destination);
      
      return this.context;
    } catch (e) {
      console.warn('Failed to initialize AudioContext', e);
      return null;
    }
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    
    const ctx = this.getContext();
    if (!ctx) return;

    const assets = GameConfig.audio.assets;
    const loadPromises = Object.entries(assets).map(async ([name, url]) => {
      try {
        const buffer = await this.loadAudio(url);
        this.buffers.set(name, buffer);
      } catch (e) {
        console.error(`Failed to load audio: ${name} from ${url}`, e);
      }
    });

    await Promise.all(loadPromises);
    this.initialized = true;
  }

  /**
   * More robust resume that awaits the state change.
   */
  async resume(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch (err) {
        console.error('Error resuming AudioContext:', err);
      }
    }

    // iOS "Unlock" - must be a synchronous side-effect of a user gesture.
    // We do this even if state is already 'running' just to be sure.
    try {
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch (e) {
      // Ignore
    }
  }

  getState(): string {
    const ctx = this.getContext();
    return ctx ? ctx.state : 'uninitialized';
  }

  updateListener(camera: THREE.Camera): void {
    const ctx = this.getContext();
    if (!ctx) return;
    const listener = ctx.listener;
    
    // Get camera world position and orientation
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    camera.getWorldPosition(position);
    camera.getWorldQuaternion(quaternion);

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(quaternion);

    if (listener.positionX) {
      const now = ctx.currentTime;
      listener.positionX.setValueAtTime(position.x, now);
      listener.positionY.setValueAtTime(position.y, now);
      listener.positionZ.setValueAtTime(position.z, now);
      listener.forwardX.setValueAtTime(forward.x, now);
      listener.forwardY.setValueAtTime(forward.y, now);
      listener.forwardZ.setValueAtTime(forward.z, now);
      listener.upX.setValueAtTime(up.x, now);
      listener.upY.setValueAtTime(up.y, now);
      listener.upZ.setValueAtTime(up.z, now);
    } else {
      (listener as any).setPosition(position.x, position.y, position.z);
      (listener as any).setOrientation(forward.x, forward.y, forward.z, up.x, up.y, up.z);
    }
  }

  async loadAudio(url: string): Promise<AudioBuffer> {
    const ctx = this.getContext();
    if (!ctx) throw new Error('AudioContext not initialized');

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.status} ${response.statusText} from ${url}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    
    return new Promise((resolve, reject) => {
      ctx.decodeAudioData(
        arrayBuffer,
        (buffer) => resolve(buffer),
        (error) => {
          console.error(`Error decoding audio from ${url}:`, error);
          reject(error);
        }
      );
    });
  }

  /**
   * Internal helper that ensures context is resumed before playing.
   */
  private async ensureContextRunning(): Promise<boolean> {
    const ctx = this.getContext();
    if (!ctx) return false;

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch (e) {
        console.error('Failed to resume context before playback:', e);
      }
    }
    return ctx.state === 'running';
  }

  async playEffect(name: string, options: PlayOptions = {}): Promise<AudioBufferSourceNode | null> {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return null;

    await this.ensureContextRunning();

    const buffer = this.buffers.get(name);
    if (!buffer) return null;

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gainNode = ctx.createGain();
    gainNode.gain.value = options.volume ?? 1.0;

    let playbackRate = options.pitch ?? 1.0;
    if (options.pitchRange) {
      playbackRate += (Math.random() - 0.5) * options.pitchRange;
    }
    source.playbackRate.value = playbackRate;

    source.connect(gainNode);
    gainNode.connect(this.sfxGain);
    source.start(0);

    return source;
  }

  async playSpatialEffect(name: string, position: THREE.Vector3, options: PlayOptions = {}): Promise<AudioBufferSourceNode | null> {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return null;

    await this.ensureContextRunning();

    const buffer = this.buffers.get(name);
    if (!buffer) return null;

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gainNode = ctx.createGain();
    gainNode.gain.value = options.volume ?? 1.0;

    const panner = ctx.createPanner();
    panner.panningModel = 'equalpower';
    panner.distanceModel = 'inverse';
    panner.refDistance = 50;
    panner.maxDistance = 2000;
    panner.rolloffFactor = 1;

    if (panner.positionX) {
      const now = ctx.currentTime;
      panner.positionX.setValueAtTime(position.x, now);
      panner.positionY.setValueAtTime(position.y, now);
      panner.positionZ.setValueAtTime(position.z, now);
    } else {
      panner.setPosition(position.x, position.y, position.z);
    }

    let playbackRate = options.pitch ?? 1.0;
    if (options.pitchRange) {
      playbackRate += (Math.random() - 0.5) * options.pitchRange;
    }
    source.playbackRate.value = playbackRate;

    source.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(this.sfxGain);
    source.start(0);

    return source;
  }

  playPlayerLaser(): void {
    this.playEffect('laser', { pitch: 1.3, pitchRange: 0.1, volume: 0.6 }).catch(console.error);
  }

  playEnemyLaser(position: THREE.Vector3): void {
    this.playSpatialEffect('laser', position, { pitch: 0.8, pitchRange: 0.1, volume: 1.2 }).catch(console.error);
  }

  playExplosion(position: THREE.Vector3): void {
    this.playSpatialEffect('explosion', position, { pitch: 0.9, pitchRange: 0.3, volume: 8.0 }).catch(console.error);
  }

  playTieFlyby(position: THREE.Vector3): void {
    this.playSpatialEffect('tieFighter', position, { pitch: 1.0, pitchRange: 0.1, volume: 1.2 }).catch(console.error);
  }
}
