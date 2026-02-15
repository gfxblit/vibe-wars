import { describe, it, expect, beforeAll } from 'vitest';
import { UIManager } from './UIManager';
import { state } from './state';
import * as fs from 'fs';
import * as path from 'path';

describe('UI Font Requirements', () => {
  let cssContent: string;
  let tailwindConfigContent: string;

  beforeAll(() => {
    const cssPath = path.resolve(__dirname, './style.css');
    cssContent = fs.readFileSync(cssPath, 'utf-8');

    const configPath = path.resolve(__dirname, '../tailwind.config.js');
    tailwindConfigContent = fs.readFileSync(configPath, 'utf-8');
  });

  it('tailwind.config.js should use Vector Battle for retro font family', () => {
    // Check if Vector Battle is present in the retro font family
    expect(tailwindConfigContent).toContain("'retro': ['Vector Battle', 'monospace']");
  });

  it('src/style.css should have @font-face for Vector Battle', () => {
    expect(cssContent).toContain("@font-face");
    expect(cssContent).toContain("font-family: 'Vector Battle'");
    expect(cssContent).toContain("src: url('./assets/fonts/vector-battle.woff') format('woff')");
    expect(cssContent).toContain("url('./assets/fonts/vector-battle.ttf') format('truetype')");
  });

  it('src/style.css should not contain Courier New', () => {
    expect(cssContent).not.toContain('Courier New');
  });

  it('UIManager should use font-retro for main UI elements', () => {
    document.body.innerHTML = '';
    state.debug = true;
    const ui = new UIManager();
    
    const hud = document.getElementById('hud');
    expect(hud?.classList.contains('font-retro')).toBe(true);

    const gameOver = document.getElementById('game-over');
    // The game over text is inside the game-over container
    const gameOverText = gameOver?.querySelector('div');
    expect(gameOverText?.classList.contains('font-retro')).toBe(true);

    const debugPanel = document.getElementById('debug-panel');
    expect(debugPanel?.classList.contains('font-retro')).toBe(true);

    // Verify debug panel buttons use font-retro
    const debugButtons = debugPanel?.querySelectorAll('button');
    expect(debugButtons?.length).toBeGreaterThan(0);
    debugButtons?.forEach(btn => {
      expect(btn.classList.contains('font-retro')).toBe(true);
    });

    ui.destroy();
  });

  it('fire-button in style.css should use Vector Battle', () => {
     expect(cssContent).toContain("font-family: theme('fontFamily.retro');");
  });
});
