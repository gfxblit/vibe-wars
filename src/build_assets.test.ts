import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('Build Assets', () => {
  it('should generate relative paths for assets in index.html', () => {
    // Run the build
    // specific timeout for build command if needed, but the test timeout handles total duration
    try {
      execSync('pnpm build', { stdio: 'pipe' }); // Use pipe to avoid cluttering output unless needed, or ignore
    } catch (error) {
      // If build fails, the test fails
      throw new Error(`Build failed: ${error}`);
    }

    const distPath = join(process.cwd(), 'dist');
    const indexHtmlPath = join(distPath, 'index.html');

    expect(existsSync(indexHtmlPath)).toBe(true);

    const indexHtml = readFileSync(indexHtmlPath, 'utf-8');

    // Check for absolute paths starting with /assets (Vite default)
    // We strictly want to avoid these as they break on subpaths
    
    // Actually, specifically checking /assets is safer as / might be used for other things. 
    // But the issue specifically mentions 404s for resources.
    // Let's look for /assets/
    
    const absoluteAssetPath = /(src|href)="\/assets\//.test(indexHtml);
    
    expect(absoluteAssetPath).toBe(false);

    // Check for relative paths
    const relativeAssetPath = /(src|href)="(\.\/)?assets\//.test(indexHtml);
    expect(relativeAssetPath).toBe(true);
  }, 60000); // 60s timeout just in case
});
