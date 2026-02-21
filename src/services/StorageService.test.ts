import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LocalStorageService, InMemoryStorageService } from './StorageService';

describe('InMemoryStorageService', () => {
  let service: InMemoryStorageService;

  beforeEach(() => {
    service = new InMemoryStorageService();
  });

  it('should store and retrieve items', () => {
    service.setItem('test-key', 'test-value');
    expect(service.getItem('test-key')).toBe('test-value');
  });

  it('should return null for non-existent items', () => {
    expect(service.getItem('non-existent')).toBeNull();
  });

  it('should remove items', () => {
    service.setItem('test-key', 'test-value');
    service.removeItem('test-key');
    expect(service.getItem('test-key')).toBeNull();
  });

  it('should clear all items', () => {
    service.setItem('key1', 'value1');
    service.setItem('key2', 'value2');
    service.clear();
    expect(service.getItem('key1')).toBeNull();
    expect(service.getItem('key2')).toBeNull();
  });
});

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  
  const mockStorage: Record<string, string> = {};

  const setItemMock = vi.fn((key: string, value: string) => {
    mockStorage[key] = value;
  });
  const getItemMock = vi.fn((key: string) => {
    return mockStorage[key] || null;
  });
  const removeItemMock = vi.fn((key: string) => {
    delete mockStorage[key];
  });
  const clearMock = vi.fn(() => {
    for (const key in mockStorage) delete mockStorage[key];
  });

  const localStorageMock = {
    getItem: getItemMock,
    setItem: setItemMock,
    removeItem: removeItemMock,
    clear: clearMock,
  };

  beforeEach(() => {
    // Reset mock storage
    for (const key in mockStorage) delete mockStorage[key];
    vi.clearAllMocks();

    // Mock window.localStorage
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
      configurable: true // Important to allow re-definition or restoration
    });

    service = new LocalStorageService();
  });

  it('should call localStorage.setItem', () => {
    service.setItem('test-key', 'test-value');
    expect(setItemMock).toHaveBeenCalledWith('test-key', 'test-value');
  });

  it('should call localStorage.getItem', () => {
    mockStorage['test-key'] = 'test-value';
    const val = service.getItem('test-key');
    expect(getItemMock).toHaveBeenCalledWith('test-key');
    expect(val).toBe('test-value');
  });

  it('should handle QuotaExceededError gracefully', () => {
    // Make setItem throw
    setItemMock.mockImplementationOnce(() => {
      throw new Error('QuotaExceededError');
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Should not throw
    expect(() => service.setItem('key', 'huge-value')).not.toThrow();
    
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should handle SecurityError gracefully', () => {
    setItemMock.mockImplementationOnce(() => {
      throw new Error('SecurityError');
    });
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => service.setItem('key', 'value')).not.toThrow();
    consoleSpy.mockRestore();
  });
  
  it('should handle getItem errors gracefully', () => {
     getItemMock.mockImplementationOnce(() => {
      throw new Error('Some error');
    });
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    let val;
    expect(() => { val = service.getItem('key'); }).not.toThrow();
    expect(val).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
