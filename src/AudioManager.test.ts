import { expect, test, describe, vi, beforeEach } from 'vitest';
import { AudioManager } from './AudioManager';

// Mock Web Audio API
class MockAudioContext {
  state = 'suspended';
  destination = {};
  createGain = vi.fn(() => ({
    connect: vi.fn(),
    gain: { value: 1, setValueAtTime: vi.fn() },
  }));
  createPanner = vi.fn(() => ({
    connect: vi.fn(),
    panningModel: '',
    distanceModel: '',
    refDistance: 1,
    maxDistance: 1000,
    rolloffFactor: 1,
    positionX: { value: 0, setValueAtTime: vi.fn() },
    positionY: { value: 0, setValueAtTime: vi.fn() },
    positionZ: { value: 0, setValueAtTime: vi.fn() },
  }));
  createBufferSource = vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    buffer: null,
    playbackRate: { value: 1, setValueAtTime: vi.fn() },
  }));
  decodeAudioData = vi.fn().mockResolvedValue({ duration: 1 });
  resume = vi.fn().mockImplementation(() => {
    this.state = 'running';
    return Promise.resolve();
  });
}

const MockAudioContextSpy = vi.fn(() => new MockAudioContext());
(global as any).AudioContext = MockAudioContextSpy;
(global as any).webkitAudioContext = MockAudioContextSpy;

describe('AudioManager', () => {
  let audioManager: AudioManager;

  beforeEach(() => {
    vi.clearAllMocks();
    audioManager = new AudioManager();
  });

  test('should initialize with an AudioContext', () => {
    expect(audioManager).toBeDefined();
    expect(global.AudioContext).toHaveBeenCalled();
  });

  test('resume() should resume the AudioContext', async () => {
    await audioManager.resume();
    const ctx = (audioManager as any).context;
    expect(ctx.resume).toHaveBeenCalled();
  });

  test('loadAudio() should fetch and decode audio data', async () => {
    const mockBuffer = { duration: 2 };
    const ctx = (audioManager as any).context;
    ctx.decodeAudioData.mockResolvedValue(mockBuffer);
    
    // Mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(10)),
    });

    const buffer = await audioManager.loadAudio('test.wav');
    expect(global.fetch).toHaveBeenCalledWith('test.wav');
    expect(ctx.decodeAudioData).toHaveBeenCalled();
    expect(buffer).toBe(mockBuffer);
  });

  test('playEffect() should play a one-shot sound', async () => {
    const mockBuffer = { duration: 1 };
    (audioManager as any).buffers.set('laser', mockBuffer);
    
    const ctx = (audioManager as any).context;
    audioManager.playEffect('laser');
    
    expect(ctx.createBufferSource).toHaveBeenCalled();
    const source = ctx.createBufferSource.mock.results[0].value;
    expect(source.buffer).toBe(mockBuffer);
    expect(source.connect).toHaveBeenCalled();
    expect(source.start).toHaveBeenCalled();
  });

  test('playEffect() with pitch randomization', async () => {
    const mockBuffer = { duration: 1 };
    (audioManager as any).buffers.set('laser', mockBuffer);
    
    const ctx = (audioManager as any).context;
    audioManager.playEffect('laser', { pitchRange: 0.5 });
    
    const source = ctx.createBufferSource.mock.results[0].value;
    expect(source.playbackRate.value).not.toBe(1);
  });

  test('playSpatialEffect() should use PannerNode', () => {
    const mockBuffer = { duration: 1 };
    (audioManager as any).buffers.set('explosion', mockBuffer);
    
    const ctx = (audioManager as any).context;
    const mockPosition = { x: 10, y: 0, z: -50 };
    
    audioManager.playSpatialEffect('explosion', mockPosition as any);
    
    expect(ctx.createPanner).toHaveBeenCalled();
    const panner = ctx.createPanner.mock.results[0].value;
    expect(panner.positionX.setValueAtTime).toHaveBeenCalled();
  });
});
