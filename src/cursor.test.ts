/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Cursor } from './Cursor';
import { state } from './state';

describe('Cursor', () => {
  beforeEach(() => {
    const htmlPath = resolve(__dirname, '../index.html');
    const html = readFileSync(htmlPath, 'utf-8');
    document.documentElement.innerHTML = html;
    
    // Reset state viewport for testing
    state.viewport = {
      width: 1000,
      height: 800,
      centerX: 500,
      centerY: 400
    };
  });

  describe('Visual Structure', () => {
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

  describe('Class Logic', () => {
    it('should update position based on input', () => {
      const cursor = new Cursor();
      const cursorElement = document.getElementById('cursor')!;
      
      // Input (0.5, 0.5) should be at 75% width, 25% height
      // centerX = 500, centerY = 400
      // x = 500 + 0.5 * 500 = 750
      // y = 400 - 0.5 * 400 = 200
      cursor.update({ x: 0.5, y: 0.5 });
      
      expect(cursorElement.style.transform).toContain('750px');
      expect(cursorElement.style.transform).toContain('200px');
      expect(cursorElement.style.display).toBe('block');
    });

    it('should hide when visible=false', () => {
      const cursor = new Cursor();
      const cursorElement = document.getElementById('cursor')!;
      
      cursor.update({ x: 0, y: 0 }, false);
      
      expect(cursorElement.style.display).toBe('none');
    });

    it('should show when visible=true', () => {
      const cursor = new Cursor();
      const cursorElement = document.getElementById('cursor')!;
      cursorElement.style.display = 'none';
      
      cursor.update({ x: 0, y: 0 }, true);
      
      expect(cursorElement.style.display).toBe('block');
    });
  });
});
