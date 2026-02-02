import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import { readFileSync, existsSync, rmSync } from 'fs';
import { join } from 'path';

describe('Build Assets', () => {
  const distPath = join(process.cwd(), 'dist');
  const indexHtmlPath = join(distPath, 'index.html');

  beforeAll(() => {
    // Run the build once before tests
    try {
      execSync('pnpm build', { stdio: 'pipe' });
    } catch (error) {
      throw new Error(`Build failed: ${error}`);
    }
  }, 60000);

  afterAll(() => {
    // Clean up dist folder after tests
    if (existsSync(distPath)) {
      rmSync(distPath, { recursive: true, force: true });
    }
  });

  it('should generate relative paths for assets in index.html', () => {
    expect(existsSync(indexHtmlPath)).toBe(true);

    const indexHtml = readFileSync(indexHtmlPath, 'utf-8');

    // Check for absolute paths starting with /assets (Vite default)
    const absoluteAssetPath = /(src|href)="\/assets\//.test(indexHtml);
    expect(absoluteAssetPath).toBe(false);

    // Check for relative paths
    const relativeAssetPath = /(src|href)="(\.\/)?assets\//.test(indexHtml);
    expect(relativeAssetPath).toBe(true);
  });
});