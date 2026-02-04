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

  it('should have a crosshair (+) geometry in the SVG', () => {
    const cursor = document.getElementById('cursor');
    const lines = cursor?.querySelectorAll('svg line');
    // We expect at least 2 lines for the central cross
    expect(lines?.length).toBeGreaterThanOrEqual(2);
  });

  it('should have corner brackets in the SVG', () => {
    const cursor = document.getElementById('cursor');
    // The corner brackets are implemented using <path> elements.
    const paths = cursor?.querySelectorAll('svg path');
    expect(paths?.length).toBe(4);
  });
});
