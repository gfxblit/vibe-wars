import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { Window } from 'happy-dom';

describe('Content Security Policy', () => {
  it('should have a CSP meta tag in index.html', () => {
    const htmlPath = path.join(process.cwd(), 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Create a new window to parse the HTML
    const window = new Window();
    const document = window.document;
    document.write(html);

    const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');

    // It should fail if the meta tag is missing (reproduction)
    // After fixing, this expectation will be met.
    // For now, I expect it to be null if I were asserting failure, but the test is designed to verify the fix.
    // So I will assert that it exists.
    expect(meta).not.toBeNull();

    if (meta) {
      const content = meta.getAttribute('content');
      expect(content).toContain("default-src 'self'");
      expect(content).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'");
      expect(content).toContain("style-src 'self' 'unsafe-inline'");
      expect(content).toContain("img-src 'self' data:");
      expect(content).toContain("font-src 'self' data:");
      expect(content).toMatch(/connect-src 'self' ws: wss:;?/);
    }
  });
});
