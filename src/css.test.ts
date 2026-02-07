import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('CSS Style', () => {
  it('has correct vendor prefixes for user-select in #fire-button', () => {
    const cssPath = path.resolve(__dirname, 'style.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Find the #fire-button block
    const fireButtonMatch = cssContent.match(/#fire-button\s*{([^}]+)}/);
    expect(fireButtonMatch).not.toBeNull();

    const blockContent = fireButtonMatch![1];
    
    // Check for specific prefixes and order
    const lines = blockContent.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
    
    const userSelectLines = lines.filter(line => line.includes('user-select: none;'));
    
    expect(userSelectLines).toContain('-webkit-user-select: none;');
    expect(userSelectLines).toContain('-moz-user-select: none;');
    expect(userSelectLines).toContain('-ms-user-select: none;');
    expect(userSelectLines).toContain('user-select: none;');

    // Verify order: prefixes should come BEFORE the standard property
    const webkitIndex = lines.findIndex(line => line === '-webkit-user-select: none;');
    const mozIndex = lines.findIndex(line => line === '-moz-user-select: none;');
    const msIndex = lines.findIndex(line => line === '-ms-user-select: none;');
    const standardIndex = lines.findIndex(line => line === 'user-select: none;');

    expect(webkitIndex).not.toBe(-1);
    expect(mozIndex).not.toBe(-1);
    expect(msIndex).not.toBe(-1);
    expect(standardIndex).not.toBe(-1);

    expect(webkitIndex).toBeLessThan(standardIndex);
    expect(mozIndex).toBeLessThan(standardIndex);
    expect(msIndex).toBeLessThan(standardIndex);
  });
});