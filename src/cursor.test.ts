/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Cursor Visuals', () => {
  let html: string;

  beforeEach(() => {
    const htmlPath = resolve(__dirname, '../index.html');
    html = readFileSync(htmlPath, 'utf-8');
    document.documentElement.innerHTML = html;
  });

  it('should have a #cursor element', () => {
    const cursor = document.getElementById('cursor');
    expect(cursor).not.toBeNull();
  });

  it('should contain an SVG element for the targeting crosshair', () => {
    const cursor = document.getElementById('cursor');
    const svg = cursor?.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('should have 4 arrowhead paths in the SVG', () => {
    const cursor = document.getElementById('cursor');
    const paths = cursor?.querySelectorAll('svg path');
    expect(paths?.length).toBe(4);
  });

  it('should be hollow with cyan stroke', () => {
    const cursor = document.getElementById('cursor');
    const paths = cursor?.querySelectorAll('svg path');
    paths?.forEach(path => {
      expect(path.getAttribute('fill')).toBe('none');
      expect(path.getAttribute('stroke')).toBe('cyan');
    });
  });

  it('should be rotated by 45 degrees', () => {
    const cursor = document.getElementById('cursor');
    const group = cursor?.querySelector('svg g');
    expect(group?.getAttribute('transform')).toContain('rotate(45');
  });
});
