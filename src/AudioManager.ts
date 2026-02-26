import * as THREE from 'three';
import { GameConfig } from './config';

export interface PlayOptions {
  volume?: number;
  pitch?: number;
  pitchRange?: number;
}

export class AudioManager {
  private context?: AudioContext;
  private sfxGain?: GainNode;
  private buffers: Map<string, AudioBuffer> = new Map();

  constructor() {
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('Web Audio API is not supported in this browser');
      return;
    }
    try {
      const context = new AudioContextClass();
      this.context = context;
      
      const masterGain = context.createGain();
      masterGain.gain.value = GameConfig.audio.masterVolume;
      masterGain.connect(context.destination);

      const sfxGain = context.createGain();
      this.sfxGain = sfxGain;
      sfxGain.gain.value = GameConfig.audio.sfxVolume;
      sfxGain.connect(masterGain);
    } catch (e) {
      console.warn('Failed to initialize AudioContext', e);
    }
  }

  async init(): Promise<void> {
    if (!this.context) return;
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
  }

  async resume(): Promise<void> {
    if (this.context && this.context.state === 'suspended') {
      await this.context.resume();
    }
  }

  async loadAudio(url: string): Promise<AudioBuffer> {
    if (!this.context) throw new Error('AudioContext not initialized');
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await this.context.decodeAudioData(arrayBuffer);
  }

  playEffect(name: string, options: PlayOptions = {}): AudioBufferSourceNode | null {
    if (!this.context || !this.sfxGain) return null;
    const buffer = this.buffers.get(name);
    if (!buffer) return null;

    const source = this.context.createBufferSource();
    source.buffer = buffer;

    const gainNode = this.context.createGain();
    gainNode.gain.value = options.volume ?? 1.0;

    let playbackRate = options.pitch ?? 1.0;
    if (options.pitchRange) {
      playbackRate += (Math.random() - 0.5) * options.pitchRange;
    }
    source.playbackRate.value = playbackRate;

    source.connect(gainNode);
    gainNode.connect(this.sfxGain);
    source.start();

    return source;
  }

  playSpatialEffect(name: string, position: THREE.Vector3, options: PlayOptions = {}): AudioBufferSourceNode | null {
    if (!this.context || !this.sfxGain) return null;
    const buffer = this.buffers.get(name);
    if (!buffer) return null;

    const source = this.context.createBufferSource();
    source.buffer = buffer;

    const gainNode = this.context.createGain();
    gainNode.gain.value = options.volume ?? 1.0;

    const panner = this.context.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 10;
    panner.maxDistance = 1000;
    panner.rolloffFactor = 1;

    panner.positionX.setValueAtTime(position.x, this.context.currentTime);
    panner.positionY.setValueAtTime(position.y, this.context.currentTime);
    panner.positionZ.setValueAtTime(position.z, this.context.currentTime);

    let playbackRate = options.pitch ?? 1.0;
    if (options.pitchRange) {
      playbackRate += (Math.random() - 0.5) * options.pitchRange;
    }
    source.playbackRate.value = playbackRate;

    source.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(this.sfxGain);
    source.start();

    return source;
  }

  playPlayerLaser(): void {
    this.playEffect('laser', { pitch: 1.2, pitchRange: 0.1, volume: 0.8 });
  }

  playEnemyLaser(position: THREE.Vector3): void {
    this.playSpatialEffect('laser', position, { pitch: 0.8, pitchRange: 0.1, volume: 0.6 });
  }

  playExplosion(position: THREE.Vector3): void {
    this.playSpatialEffect('explosion', position, { pitch: 1.0, pitchRange: 0.2, volume: 1.0 });
  }

  playTieFlyby(position: THREE.Vector3): void {
    this.playSpatialEffect('tieFighter', position, { pitch: 1.0, pitchRange: 0.1, volume: 1.0 });
  }
}
