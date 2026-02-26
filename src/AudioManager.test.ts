import { expect, test, describe, vi, beforeEach } from 'vitest';
import { AudioManager } from './AudioManager';

// Mock Web Audio API
class MockAudioContext {
  state = 'suspended';
  destination = {};
  currentTime = 0;
  listener = {
    positionX: { value: 0, setValueAtTime: vi.fn() },
    positionY: { value: 0, setValueAtTime: vi.fn() },
    positionZ: { value: 0, setValueAtTime: vi.fn() },
    forwardX: { value: 0, setValueAtTime: vi.fn() },
    forwardY: { value: 0, setValueAtTime: vi.fn() },
    forwardZ: { value: 0, setValueAtTime: vi.fn() },
    upX: { value: 0, setValueAtTime: vi.fn() },
    upY: { value: 0, setValueAtTime: vi.fn() },
    upZ: { value: 0, setValueAtTime: vi.fn() },
  };
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
    setPosition: vi.fn(),
  }));
  createBuffer = vi.fn(() => ({
    getChannelData: vi.fn(),
  }));
  createBufferSource = vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    buffer: null,
    playbackRate: { value: 1, setValueAtTime: vi.fn() },
  }));
  decodeAudioData = vi.fn((_data: any, success: any) => {
    if (success) setTimeout(() => success({ duration: 1 }), 0);
    return Promise.resolve({ duration: 1 });
  });
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

  test('should initialize context on resume', async () => {
    expect(audioManager).toBeDefined();
    await audioManager.resume();
    expect(global.AudioContext).toHaveBeenCalled();
  });

  test('resume() should resume the AudioContext', async () => {
    await audioManager.resume();
    const ctx = (audioManager as any).getContext();
    expect(ctx.resume).toHaveBeenCalled();
  });

  test('loadAudio() should fetch and decode audio data', async () => {
    const mockBuffer = { duration: 2 };
    
    // Trigger context creation
    await audioManager.resume();
    const ctx = (audioManager as any).getContext();
    
    // Override the mock implementation for this specific test
    ctx.decodeAudioData.mockImplementation((_data: any, success: any) => {
      if (success) success(mockBuffer);
    });
    
    // Mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(10)),
    });

    const buffer = await audioManager.loadAudio('test.wav');
    expect(global.fetch).toHaveBeenCalledWith('test.wav');
    expect(ctx.decodeAudioData).toHaveBeenCalled();
    expect(buffer).toBe(mockBuffer);
  });

  test('playEffect() should play a one-shot sound', async () => {
    const mockBuffer = { duration: 1 };
    
    // Trigger context creation and mock buffer
    await audioManager.resume(); // Calls createBufferSource for silent kick
    (audioManager as any).buffers.set('laser', mockBuffer);
    
    const ctx = (audioManager as any).getContext();
    await audioManager.playEffect('laser');
    
    // We expect 2 calls: 1 for silent kick, 1 for laser
    expect(ctx.createBufferSource).toHaveBeenCalledTimes(2);
    const source = ctx.createBufferSource.mock.results[1].value;
    expect(source.buffer).toBe(mockBuffer);
    expect(source.connect).toHaveBeenCalled();
    expect(source.start).toHaveBeenCalled();
  });

  test('playEffect() with pitch randomization', async () => {
    const mockBuffer = { duration: 1 };
    
    await audioManager.resume();
    (audioManager as any).buffers.set('laser', mockBuffer);
    
    const ctx = (audioManager as any).getContext();
    await audioManager.playEffect('laser', { pitchRange: 0.5 });
    
    const source = ctx.createBufferSource.mock.results[1].value;
    expect(source.playbackRate.value).not.toBe(1);
  });

  test('playSpatialEffect() should use PannerNode', async () => {
    const mockBuffer = { duration: 1 };
    
    await audioManager.resume();
    (audioManager as any).buffers.set('explosion', mockBuffer);
    
    const ctx = (audioManager as any).getContext();
    const mockPosition = { x: 10, y: 0, z: -50 };
    
    await audioManager.playSpatialEffect('explosion', mockPosition as any);
    
    expect(ctx.createPanner).toHaveBeenCalled();
    const panner = ctx.createPanner.mock.results[0].value;
    expect(panner.positionX.setValueAtTime).toHaveBeenCalled();
  });
});
